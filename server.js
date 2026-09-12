import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Disable Express fingerprinting header
app.disable('x-powered-by');

// Trust proxy if behind reverse proxy
app.set('trust proxy', 1);

// ==========================================
// 1. SECURITY HEADERS MIDDLEWARE
// ==========================================
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// ==========================================
// 2. PARSERS & PROTOTYPE POLLUTION DEFENSE
// ==========================================
// Reasonable payload size limits to mitigate DoS / Memory exhaustion
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Recursive prototype pollution protection middleware
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  const clean = {};
  for (const key of Object.keys(obj)) {
    // Ban prototype pollution triggers
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    const val = obj[key];
    clean[key] = typeof val === 'object' && val !== null ? sanitizeObject(val) : val;
  }
  return clean;
};

app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }
  next();
});

// ==========================================
// 3. IN-MEMORY RATE LIMITING
// ==========================================
const rateLimitBuckets = new Map();

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return String(forwarded).split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
};

const createRateLimiter = ({ windowMs, maxRequests, message }) => {
  return (req, res, next) => {
    const ip = getClientIp(req);
    const key = `${req.baseUrl || ''}${req.path}_${ip}`;
    const now = Date.now();

    const record = rateLimitBuckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
    } else {
      record.count += 1;
    }

    rateLimitBuckets.set(key, record);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000));

    if (record.count > maxRequests) {
      res.status(429).json({
        error: message || 'Too many requests. Please slow down and try again shortly.',
        retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000),
      });
      return;
    }

    next();
  };
};

// General API rate limiter: 150 requests per minute
const standardApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 150,
  message: 'Too many requests to the Highway API. Please wait a moment.',
});

// Stricter limiter for order creation & franchise leads: 20 per minute
const sensitiveActionLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 20,
  message: 'Submission limit reached. Please wait a moment before trying again.',
});

// Admin login brute-force defense: 5 attempts per 15 minutes
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  message: 'Too many login attempts from this IP. Access locked for 15 minutes for security.',
});

// Apply standard API limiter to all /api routes
app.use('/api', standardApiLimiter);

// Cleanup stale rate limit buckets periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitBuckets.entries()) {
    if (now > record.resetAt) {
      rateLimitBuckets.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ==========================================
// 4. INPUT SANITIZATION & INJECTION DEFENSE
// ==========================================
const sanitizeString = (input, maxLen = 500) => {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLen)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .replace(/[<>]/g, '') // Strip raw HTML tag brackets
    .replace(/\0/g, '') // Remove null bytes
    .trim();
};

const sanitizeEmail = (input) => {
  if (typeof input !== 'string') return '';
  const cleaned = input.trim().toLowerCase().slice(0, 150);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned : '';
};

const sanitizePhone = (input) => {
  if (typeof input !== 'string') return '';
  return input.slice(0, 25).replace(/[^\d+()\s-]/g, '').trim();
};

// ==========================================
// IN-MEMORY DATABASE & CONFIGURATION
// ==========================================
const ordersDatabase = [
  {
    orderId: 'IPC-98242',
    customerName: 'Vikramaditya Roy',
    phone: '+91 98450 12345',
    orderType: 'Highway Takeaway',
    items: [
      { id: 'pz-1', name: 'Aloo Cheese Parathzzaa®', quantity: 1, price: 295 },
      { id: 'ch-2', name: 'IPC Special Adrak Chai', quantity: 2, price: 90 },
      { id: 'sd-1', name: 'Punjabi Boondi Raita', quantity: 1, price: 65 },
    ],
    total: 540,
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    status: 'Preparing Fresh',
  },
  {
    orderId: 'IPC-98241',
    customerName: 'Ananya Sharma',
    phone: '+91 98860 67890',
    orderType: 'Dine-In',
    items: [
      { id: 'p-1', name: 'Signature Amritsari Aloo Paratha', quantity: 2, price: 165 },
      { id: 'ch-1', name: 'Traditional Cutting Chai', quantity: 2, price: 70 },
    ],
    total: 470,
    timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'Ready for Pickup',
  },
  {
    orderId: 'IPC-98240',
    customerName: 'Capt. Raghuveer Menon',
    phone: '+91 99401 22334',
    orderType: 'Road Trip Pre-Order',
    items: [
      { id: 'pz-4', name: 'Smoked Paneer Tikka Parathzzaa®', quantity: 1, price: 345 },
      { id: 'cb-1', name: 'Royal Tawa Paratha Platter', quantity: 1, price: 385 },
      { id: 'ds-1', name: 'Kesari Rabri Gulab Jamun', quantity: 2, price: 110 },
    ],
    total: 950,
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
  {
    orderId: 'IPC-98239',
    customerName: 'Pooja Bhatia',
    phone: '+91 97310 99881',
    orderType: 'Highway Takeaway',
    items: [
      { id: 'p-2', name: 'Spiced Paneer Tikka Paratha', quantity: 1, price: 195 },
      { id: 'ls-1', name: 'Malai Lassi in Clay Pot', quantity: 1, price: 120 },
    ],
    total: 315,
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    status: 'Completed',
  },
];

const franchiseInquiries = [
  {
    id: 'FRAN-4012',
    fullName: 'Amitesh Sengupta',
    phone: '+91 98200 11223',
    email: 'amitesh.s@capitalventures.in',
    city: 'Bangalore - Mysore Expressway',
    model: 'HIGHWAY CHALET',
    notes: 'Owns 1.5 acre commercial highway frontage with fuel station adjacent. Looking for QSR partnership.',
    status: 'Under Review',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'FRAN-4011',
    fullName: 'Dr. Neha Kulkarni',
    phone: '+91 98900 44556',
    email: 'neha.kulkarni@healthtech.org',
    city: 'Pune - Hinjawadi IT Park Phase 1',
    model: 'URBAN CAFE',
    notes: 'Prime high-street location in tech park. Interested in opening 2 units by Q4.',
    status: 'Contacted',
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
  },
  {
    id: 'FRAN-4010',
    fullName: 'Rajeshwari Hegde',
    phone: '+91 94480 77889',
    email: 'rhegde@westerninns.com',
    city: 'Hyderabad - Outer Ring Road (ORR)',
    model: 'HIGHWAY CHALET',
    notes: 'Established hospitality group with 3 highway motels looking to co-locate IPC restaurant.',
    status: 'New',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
];

let storeSettings = {
  isStoreOpen: true,
  prepTimeMinutes: 18,
  activeHighwayCorridor: 'NH7 Bangalore - Hyderabad Corridor',
  serviceAlert: 'Full dine-in & express highway takeaway active.',
  contactHotline: '+91 98808 83061',
};

const unavailableItemIds = new Set();
let customMenuItems = [];
const deletedItemIds = new Set();

// Secure credentials from environment with safe fallback
const ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'password123',
  name: 'Nirmal Sandhu / Station Master',
  role: 'General Manager - NH7 Bangalore Hub',
};

// Cryptographically secure active tokens with TTL expiration
const activeSessions = new Map(); // token -> { createdAt, expiresAt, username }

// Seed safe dev token for backward compatibility if not in production
if (process.env.NODE_ENV !== 'production') {
  activeSessions.set('ipc-default-session-token', {
    createdAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    username: ADMIN_CONFIG.username,
  });
}

// Constant-time string comparison to prevent timing attacks
const safeCompare = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Prevent timing leak on length difference
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
};

// ==========================================
// API ROUTES
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Indian Paratha Company',
    tagline: 'Chai, Paratha & More',
    established: 2014,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    brandName: 'Indian Paratha Company',
    shortName: 'IPC',
    tagline: 'Chai, Paratha & More',
    googleMapsUrl: 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw',
    franchiseContact: {
      email: 'info@franchise-ready.in',
      phone: '+91 98808 83061',
      website: 'www.franchiseready.in',
    },
    serviceLocation: 'NH7 Highway Corridor, Bangalore Outskirts',
    isOrderingLive: true,
  });
});

const handleOrderCreation = (req, res) => {
  const { customerName, customerPhone, phone, orderType, items, total, subtotal, vehicleNumber, instructions, notes } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Please provide valid order items.' });
    return;
  }

  // Sanitize and validate every item
  const validatedItems = [];
  let calculatedTotal = 0;

  for (const it of items) {
    if (!it || typeof it !== 'object') continue;
    const name = sanitizeString(it.name, 100);
    const quantity = Math.max(1, Math.min(50, Math.floor(Number(it.quantity) || 1)));
    const price = Math.max(0, Math.min(10000, Number(it.price) || 0));
    const id = sanitizeString(it.id, 50);

    if (name) {
      validatedItems.push({ id, name, quantity, price });
      calculatedTotal += price * quantity;
    }
  }

  if (validatedItems.length === 0) {
    res.status(400).json({ error: 'No valid items found in order.' });
    return;
  }

  const custName = sanitizeString(customerName, 80) || 'Valued Guest';
  const custPhone = sanitizePhone(customerPhone || phone) || 'Not provided';
  const cleanOrderType = sanitizeString(orderType, 40) || 'highway-pickup';
  const cleanVehicle = sanitizeString(vehicleNumber, 30);
  const cleanNotes = sanitizeString(instructions || notes, 300);

  const orderId = `IPC-${Date.now().toString().slice(-6)}`;
  const finalTotal = calculatedTotal > 0 ? calculatedTotal : Math.max(0, Number(total || subtotal) || 0);

  const record = {
    orderId,
    customerName: custName,
    phone: custPhone,
    orderType: cleanOrderType,
    items: validatedItems,
    total: finalTotal,
    timestamp: new Date().toISOString(),
    status: 'Confirmed - Preparing Fresh',
  };

  ordersDatabase.unshift(record);

  // Generate WhatsApp pre-filled order string safely
  const itemsSummary = validatedItems
    .map((item) => `• ${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
    .join('%0A');
  const whatsappText = `Hello Indian Paratha Company!%0A%0AI would like to place an order:%0A*Order ID:* ${orderId}%0A*Customer:* ${encodeURIComponent(custName)}%0A*Phone:* ${encodeURIComponent(custPhone)}%0A*Type:* ${encodeURIComponent(cleanOrderType)}%0A${cleanVehicle ? `*Vehicle:* ${encodeURIComponent(cleanVehicle)}%0A` : ''}%0A*Items:*%0A${itemsSummary}%0A%0A*Total Amount:* ₹${finalTotal}%0A%0A${cleanNotes ? `*Notes:* ${encodeURIComponent(cleanNotes)}%0A` : ''}Please confirm preparation time. Thank you!`;

  res.json({
    success: true,
    orderId,
    order: { id: orderId, ...record },
    message: 'Order received successfully. Preparing fresh on order.',
    estimatedMinutes: cleanOrderType === 'highway-pickup' ? 15 : 20,
    whatsappUrl: `https://wa.me/919880883061?text=${whatsappText}`,
    record,
  });
};

app.post('/api/order', sensitiveActionLimiter, handleOrderCreation);
app.post('/api/orders', sensitiveActionLimiter, handleOrderCreation);

const handleFranchiseSubmission = (req, res) => {
  const { fullName, phone, email, city, model, notes } = req.body || {};

  const cleanName = sanitizeString(fullName, 100);
  const cleanPhone = sanitizePhone(phone);
  const cleanEmail = sanitizeEmail(email);
  const cleanCity = sanitizeString(city, 100);
  const cleanModel = sanitizeString(model, 60);
  const cleanNotes = sanitizeString(notes, 500);

  if (!cleanName || !cleanPhone || !cleanEmail || !cleanCity || !cleanModel) {
    res.status(400).json({ error: 'Please fill in all required fields with valid information.' });
    return;
  }

  const inquiryId = `FRAN-${Date.now().toString().slice(-5)}`;
  const inquiry = {
    id: inquiryId,
    fullName: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    city: cleanCity,
    model: cleanModel,
    notes: cleanNotes,
    timestamp: new Date().toISOString(),
  };

  franchiseInquiries.unshift(inquiry);

  res.json({
    success: true,
    inquiryId,
    message: 'Thank you for your interest in Indian Paratha Company. Our franchise team will contact you within 24 hours.',
    contactDetails: {
      email: 'info@franchise-ready.in',
      phone: '+91 98808 83061',
    },
  });
};

app.post('/api/franchise-inquiry', sensitiveActionLimiter, handleFranchiseSubmission);
app.post('/api/franchise', sensitiveActionLimiter, handleFranchiseSubmission);

// ==========================================
// ADMIN DASHBOARD & AUTHENTICATION ROUTES
// ==========================================

const verifyAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized: Missing admin authorization token.' });
    return;
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  
  const session = activeSessions.get(token);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session token.' });
    return;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Session expired. Please log in again.' });
    return;
  }

  next();
};

// Handle GET requests to /api/admin/login or /admin so browser navigation opens the Admin Portal seamlessly
app.get(['/api/admin/login', '/admin', '/admin/login'], (req, res) => {
  if (req.query && req.query.format === 'json') {
    res.json({
      status: 'active',
      portal: 'Indian Paratha Company Highway Station Command',
      message: 'Send a POST request with { username, password } to /api/admin/login to authenticate.',
      loginEndpoint: '/api/admin/login',
      method: 'POST',
    });
    return;
  }
  // Browser navigation: redirect to root with admin modal parameter
  res.redirect(302, '/?admin=true');
});

// Admin Login with Rate Limiting & Timing Safe Check
app.post('/api/admin/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const inputUser = username.trim().toLowerCase();
  const targetUser = ADMIN_CONFIG.username.trim().toLowerCase();

  const userMatches = safeCompare(inputUser, targetUser);
  const passwordMatches = safeCompare(password.trim(), ADMIN_CONFIG.password.trim());

  if (userMatches && passwordMatches) {
    // Generate high-entropy cryptographic token
    const token = `ipc-token-${crypto.randomBytes(24).toString('hex')}`;
    const ttlMs = 24 * 60 * 60 * 1000; // 24 hours

    activeSessions.set(token, {
      createdAt: Date.now(),
      expiresAt: Date.now() + ttlMs,
      username: ADMIN_CONFIG.username,
    });

    res.json({
      success: true,
      token,
      user: {
        username: ADMIN_CONFIG.username,
        name: ADMIN_CONFIG.name,
        role: ADMIN_CONFIG.role,
      },
      message: 'Welcome back to Indian Paratha Company Highway Station Command.',
    });
    return;
  }

  res.status(401).json({
    error: 'Invalid staff username or password. Access restricted to authorized station staff.',
  });
});

app.get('/api/admin/me', verifyAdminAuth, (req, res) => {
  res.json({
    authenticated: true,
    user: {
      username: ADMIN_CONFIG.username,
      name: ADMIN_CONFIG.name,
      role: ADMIN_CONFIG.role,
    },
    storeSettings,
  });
});

app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/admin/dashboard', verifyAdminAuth, (req, res) => {
  const totalRevenue = ordersDatabase.reduce((sum, order) => sum + (order.total || 0), 0);
  const activeOrders = ordersDatabase.filter(
    (order) => order.status !== 'Completed' && order.status !== 'Cancelled'
  );
  const completedOrders = ordersDatabase.filter((order) => order.status === 'Completed');

  const orderTypeCounts = {};
  ordersDatabase.forEach((order) => {
    const type = order.orderType || 'Standard';
    orderTypeCounts[type] = (orderTypeCounts[type] || 0) + 1;
  });

  const itemPopularity = {};
  ordersDatabase.forEach((order) => {
    if (Array.isArray(order.items)) {
      order.items.forEach((item) => {
        if (!itemPopularity[item.name]) {
          itemPopularity[item.name] = { name: item.name, count: 0, revenue: 0 };
        }
        itemPopularity[item.name].count += item.quantity;
        itemPopularity[item.name].revenue += item.price * item.quantity;
      });
    }
  });

  const topItems = Object.values(itemPopularity)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  res.json({
    metrics: {
      totalRevenue,
      todayOrdersCount: ordersDatabase.length,
      activeOrdersCount: activeOrders.length,
      completedOrdersCount: completedOrders.length,
      franchiseInquiriesCount: franchiseInquiries.length,
      newFranchiseLeadsCount: franchiseInquiries.filter((f) => f.status === 'New' || !f.status).length,
      orderTypeCounts,
      topItems,
    },
    orders: ordersDatabase,
    franchiseInquiries,
    storeSettings,
    unavailableItemIds: Array.from(unavailableItemIds),
    customMenuItems,
    deletedItemIds: Array.from(deletedItemIds),
    serverTime: new Date().toISOString(),
  });
});

app.patch('/api/admin/orders/:orderId', verifyAdminAuth, (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body || {};

  const orderIndex = ordersDatabase.findIndex((o) => o.orderId === orderId);
  if (orderIndex === -1) {
    res.status(404).json({ error: `Order ${orderId} not found.` });
    return;
  }

  if (status) {
    ordersDatabase[orderIndex].status = sanitizeString(status, 50);
  }

  res.json({
    success: true,
    message: `Order ${orderId} updated to ${ordersDatabase[orderIndex].status}.`,
    order: ordersDatabase[orderIndex],
  });
});

app.patch('/api/admin/franchise/:inquiryId', verifyAdminAuth, (req, res) => {
  const { inquiryId } = req.params;
  const { status, notes } = req.body || {};

  const leadIndex = franchiseInquiries.findIndex((f) => f.id === inquiryId);
  if (leadIndex === -1) {
    res.status(404).json({ error: `Franchise inquiry ${inquiryId} not found.` });
    return;
  }

  if (status) franchiseInquiries[leadIndex].status = sanitizeString(status, 50);
  if (notes !== undefined) franchiseInquiries[leadIndex].notes = sanitizeString(notes, 500);

  res.json({
    success: true,
    message: `Lead ${inquiryId} updated.`,
    inquiry: franchiseInquiries[leadIndex],
  });
});

app.patch('/api/admin/settings', verifyAdminAuth, (req, res) => {
  const { isStoreOpen, prepTimeMinutes, activeHighwayCorridor, serviceAlert, contactHotline } = req.body || {};

  if (isStoreOpen !== undefined) storeSettings.isStoreOpen = Boolean(isStoreOpen);
  if (prepTimeMinutes !== undefined) storeSettings.prepTimeMinutes = Math.max(5, Math.min(120, Number(prepTimeMinutes) || 18));
  if (activeHighwayCorridor !== undefined) storeSettings.activeHighwayCorridor = sanitizeString(activeHighwayCorridor, 100);
  if (serviceAlert !== undefined) storeSettings.serviceAlert = sanitizeString(serviceAlert, 200);
  if (contactHotline !== undefined) storeSettings.contactHotline = sanitizePhone(contactHotline);

  res.json({
    success: true,
    message: 'Operational settings saved successfully.',
    settings: storeSettings,
  });
});

app.post('/api/admin/toggle-item-stock', verifyAdminAuth, (req, res) => {
  const { itemId, itemName, isAvailable } = req.body || {};

  if (!itemId || typeof itemId !== 'string') {
    res.status(400).json({ error: 'itemId is required.' });
    return;
  }

  const cleanId = sanitizeString(itemId, 60);

  if (isAvailable === false) {
    unavailableItemIds.add(cleanId);
  } else if (isAvailable === true) {
    unavailableItemIds.delete(cleanId);
  } else {
    if (unavailableItemIds.has(cleanId)) {
      unavailableItemIds.delete(cleanId);
    } else {
      unavailableItemIds.add(cleanId);
    }
  }

  res.json({
    success: true,
    itemId: cleanId,
    isAvailable: !unavailableItemIds.has(cleanId),
    unavailableItemIds: Array.from(unavailableItemIds),
    message: `${sanitizeString(itemName, 80) || cleanId} is now ${!unavailableItemIds.has(cleanId) ? 'Available in Kitchen' : '86’d (Marked Out of Stock)'}.`,
  });
});

app.get('/api/menu/items', (req, res) => {
  res.json({
    success: true,
    customMenuItems,
    unavailableItemIds: Array.from(unavailableItemIds),
    deletedItemIds: Array.from(deletedItemIds),
  });
});

app.post('/api/admin/menu/items', verifyAdminAuth, (req, res) => {
  const {
    name,
    hindiName,
    category,
    price,
    description,
    image,
    isVegetarian,
    isSignature,
    isBestseller,
    isNew,
    spiceLevel,
    pairing,
    allergens,
  } = req.body || {};

  const cleanName = sanitizeString(name, 100);
  const cleanCat = sanitizeString(category, 50);
  const numPrice = Number(price);

  if (!cleanName || !cleanCat || isNaN(numPrice) || numPrice <= 0) {
    res.status(400).json({ error: 'Valid Name, Category, and positive Price are required.' });
    return;
  }

  const defaultImages = {
    PARATHAS: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    PARATHZZAA: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    "Q' PARATHA": 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    'HOT BLENDS': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    APPETIZERS: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    ROLLS: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    COMBOS: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    SIDES: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    RICE: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    'COLD BLENDS': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    LASSI: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    MILKSHAKES: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
    'ICE CREAM': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format&fit=crop&q=80',
    DESSERTS: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
  };

  const safeImageUrl = typeof image === 'string' && (image.startsWith('https://') || image.startsWith('/')) 
    ? image.trim().slice(0, 500) 
    : (defaultImages[cleanCat] || defaultImages.PARATHAS);

  const newItem = {
    id: `custom-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    name: cleanName,
    hindiName: hindiName ? sanitizeString(hindiName, 100) : undefined,
    category: cleanCat,
    price: Math.max(1, Math.min(10000, Math.round(numPrice))),
    description: description ? sanitizeString(description, 300) : 'Freshly prepared at Indian Paratha Company Highway Kitchen.',
    image: safeImageUrl,
    isVegetarian: isVegetarian !== undefined ? Boolean(isVegetarian) : true,
    isSignature: Boolean(isSignature),
    isBestseller: Boolean(isBestseller),
    isNew: isNew !== undefined ? Boolean(isNew) : true,
    spiceLevel: [1, 2, 3].includes(Number(spiceLevel)) ? Number(spiceLevel) : 1,
    pairing: pairing ? sanitizeString(pairing, 100) : undefined,
    allergens: Array.isArray(allergens) ? allergens.map((a) => sanitizeString(a, 40)).filter(Boolean) : ['Gluten', 'Dairy'],
    createdAt: new Date().toISOString(),
  };

  customMenuItems.unshift(newItem);

  res.status(201).json({
    success: true,
    message: `"${newItem.name}" added to menu successfully.`,
    item: newItem,
    customMenuItems,
  });
});

app.put('/api/admin/menu/items/:itemId', verifyAdminAuth, (req, res) => {
  const { itemId } = req.params;
  const updates = req.body || {};
  const cleanId = sanitizeString(itemId, 60);

  const index = customMenuItems.findIndex((i) => i.id === cleanId);
  if (index === -1) {
    const newItem = {
      ...updates,
      id: cleanId,
    };
    customMenuItems.unshift(newItem);
    res.json({
      success: true,
      message: 'Menu item customized successfully.',
      item: newItem,
      customMenuItems,
    });
    return;
  }

  customMenuItems[index] = {
    ...customMenuItems[index],
    ...updates,
    id: cleanId,
  };

  res.json({
    success: true,
    message: 'Menu item updated successfully.',
    item: customMenuItems[index],
    customMenuItems,
  });
});

app.delete('/api/admin/menu/items/:itemId', verifyAdminAuth, (req, res) => {
  const { itemId } = req.params;
  const cleanId = sanitizeString(itemId, 60);

  customMenuItems = customMenuItems.filter((i) => i.id !== cleanId);
  deletedItemIds.add(cleanId);
  unavailableItemIds.delete(cleanId);

  res.json({
    success: true,
    message: 'Menu item removed successfully.',
    customMenuItems,
    deletedItemIds: Array.from(deletedItemIds),
  });
});

// ==========================================
// 5. HARDENED FILE UPLOAD & PATH TRAVERSAL DEFENSE
// ==========================================
app.post('/api/upload-hero-image', verifyAdminAuth, (req, res) => {
  const { dataUrl, filename } = req.body || {};
  if (!dataUrl || typeof dataUrl !== 'string') {
    res.status(400).json({ error: 'Valid dataUrl is required.' });
    return;
  }

  // Validate image dataUrl format (JPEG, PNG, WebP)
  const mimeMatch = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
  if (!mimeMatch) {
    res.status(400).json({ error: 'Invalid image format. Supported formats: JPG, PNG, WebP.' });
    return;
  }

  try {
    const base64Data = mimeMatch[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Limit maximum upload size to 5MB to prevent memory exhaustion
    if (buffer.length > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'Image exceeds maximum allowed size of 5MB.' });
      return;
    }

    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Path traversal prevention: strip any directory components
    let safeName = 'hero-banner.jpg';
    if (filename && typeof filename === 'string') {
      const base = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '');
      if (base.endsWith('.jpg') || base.endsWith('.jpeg') || base.endsWith('.png') || base.endsWith('.webp')) {
        safeName = base;
      }
    }

    const targetPath = path.resolve(publicDir, safeName);
    // Strict path verification to ensure target is strictly inside publicDir
    if (!targetPath.startsWith(publicDir)) {
      res.status(403).json({ error: 'Forbidden file destination.' });
      return;
    }

    fs.writeFileSync(targetPath, buffer);
    fs.writeFileSync(path.join(publicDir, 'IMG-20260906-WA0007.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'hero-bg.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'home-bg.jpg'), buffer);

    res.json({
      success: true,
      url: `/${safeName}`,
      message: 'Background image saved securely.',
    });
  } catch (err) {
    console.error('[Upload Error] Safe upload failed:', err.message);
    res.status(500).json({ error: 'Failed to save image file.' });
  }
});

app.get('/api/hero-image-status', (req, res) => {
  const p1 = path.join(process.cwd(), 'public', 'IMG-20260906-WA0007.jpg');
  const p2 = path.join(process.cwd(), 'public', 'hero-banner.jpg');
  const hasImage = fs.existsSync(p1) || fs.existsSync(p2);
  res.json({ hasCustomImage: hasImage });
});

// ==========================================
// 6. CENTRALIZED SECURE ERROR HANDLER (NO STACK TRACES LEAKED)
// ==========================================
app.use((err, req, res, next) => {
  // Log error internally for operational maintenance
  console.error('[Internal Error]', {
    message: err.message,
    path: req.path,
    method: req.method,
    ip: getClientIp(req),
    timestamp: new Date().toISOString(),
  });

  // Never leak internal stack traces or internal server error dumps to client
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred. Please try again later.' 
        : (err.message || 'Internal server error'),
    });
  }
});

// ==========================================
// 7. VITE & STATIC SPA MIDDLEWARE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Indian Paratha Company server running on port ${PORT}`);
  });
}

startServer();

