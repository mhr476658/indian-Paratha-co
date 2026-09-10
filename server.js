import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// In-memory store for orders and franchise inquiries during runtime
// Seed initial authentic highway orders
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

// Seed initial franchise investment inquiries
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

// Operational settings
let storeSettings = {
  isStoreOpen: true,
  prepTimeMinutes: 18,
  activeHighwayCorridor: 'NH7 Bangalore - Hyderabad Corridor',
  serviceAlert: 'Full dine-in & express highway takeaway active.',
  contactHotline: '+91 98808 83061',
};

// Item out of stock (86'd) tracker
const unavailableItemIds = new Set();

// Dynamic custom menu items added via Admin Dashboard
let customMenuItems = [];

// Track items explicitly deleted (especially base hardcoded ones)
const deletedItemIds = new Set();

// Admin Auth Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
  name: 'Nirmal Sandhu / Station Master',
  role: 'General Manager - NH7 Bangalore Hub',
};

// Active valid session tokens
const validTokens = new Set(['ipc-default-session-token']);

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
  const { customerName, customerPhone, phone, orderType, items, total, subtotal, vehicleNumber, instructions, notes } = req.body;
  const custName = customerName || 'Valued Guest';
  const custPhone = customerPhone || phone || 'Not provided';

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Please provide valid items.' });
    return;
  }

  const orderId = `IPC-${Date.now().toString().slice(-6)}`;
  const record = {
    orderId,
    customerName: custName,
    phone: custPhone,
    orderType: orderType || 'highway-pickup',
    items,
    total: total || subtotal || 0,
    timestamp: new Date().toISOString(),
    status: 'Confirmed - Preparing Fresh',
  };

  ordersDatabase.unshift(record);

  // Generate WhatsApp pre-filled order string
  const itemsSummary = items
    .map((item) => `• ${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
    .join('%0A');
  const whatsappText = `Hello Indian Paratha Company!%0A%0AI would like to place an order:%0A*Order ID:* ${orderId}%0A*Customer:* ${encodeURIComponent(custName)}%0A*Phone:* ${custPhone}%0A*Type:* ${encodeURIComponent(orderType || 'Express Takeaway')}%0A${vehicleNumber ? `*Vehicle:* ${encodeURIComponent(vehicleNumber)}%0A` : ''}%0A*Items:*%0A${itemsSummary}%0A%0A*Total Amount:* ₹${total || subtotal || 0}%0A%0A${notes || instructions ? `*Notes:* ${encodeURIComponent(notes || instructions)}%0A` : ''}Please confirm preparation time. Thank you!`;

  res.json({
    success: true,
    orderId,
    order: { id: orderId, ...record },
    message: 'Order received successfully. Preparing fresh on order.',
    estimatedMinutes: orderType === 'highway-pickup' ? 15 : 20,
    whatsappUrl: `https://wa.me/919880883061?text=${whatsappText}`,
    record,
  });
};

app.post('/api/order', handleOrderCreation);
app.post('/api/orders', handleOrderCreation);

app.post('/api/franchise-inquiry', (req, res) => {
  const { fullName, phone, email, city, model, notes } = req.body;

  if (!fullName || !phone || !email || !city || !model) {
    res.status(400).json({ error: 'Please fill in all required fields.' });
    return;
  }

  const inquiryId = `FRAN-${Date.now().toString().slice(-5)}`;
  const inquiry = {
    id: inquiryId,
    fullName,
    phone,
    email,
    city,
    model,
    notes,
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
});

// ==========================================
// ADMIN DASHBOARD & AUTHENTICATION ROUTES
// ==========================================

// Helper auth middleware
const verifyAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized: Missing admin authorization token' });
    return;
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!validTokens.has(token)) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session token' });
    return;
  }
  next();
};

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  if (
    username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
    password.trim() === ADMIN_CREDENTIALS.password
  ) {
    const token = `ipc-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    validTokens.add(token);

    res.json({
      success: true,
      token,
      user: {
        username: ADMIN_CREDENTIALS.username,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
      },
      message: 'Welcome back to Indian Paratha Company Highway Station Command.',
    });
    return;
  }

  res.status(401).json({
    error: 'Invalid staff username or password. Access restricted to authorized station staff.',
  });
});

// Admin Verify Session
app.get('/api/admin/me', verifyAdminAuth, (req, res) => {
  res.json({
    authenticated: true,
    user: {
      username: ADMIN_CREDENTIALS.username,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
    },
    storeSettings,
  });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    validTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Admin Comprehensive Dashboard Data
app.get('/api/admin/dashboard', verifyAdminAuth, (req, res) => {
  const totalRevenue = ordersDatabase.reduce((sum, order) => sum + (order.total || 0), 0);
  const activeOrders = ordersDatabase.filter(
    (order) => order.status !== 'Completed' && order.status !== 'Cancelled'
  );
  const completedOrders = ordersDatabase.filter((order) => order.status === 'Completed');

  // Breakdown by order type
  const orderTypeCounts = {};
  ordersDatabase.forEach((order) => {
    orderTypeCounts[order.orderType] = (orderTypeCounts[order.orderType] || 0) + 1;
  });

  // Top selling items
  const itemPopularity = {};
  ordersDatabase.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemPopularity[item.name]) {
        itemPopularity[item.name] = { name: item.name, count: 0, revenue: 0 };
      }
      itemPopularity[item.name].count += item.quantity;
      itemPopularity[item.name].revenue += item.price * item.quantity;
    });
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

// Admin Update Order Status
app.patch('/api/admin/orders/:orderId', verifyAdminAuth, (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const orderIndex = ordersDatabase.findIndex((o) => o.orderId === orderId);
  if (orderIndex === -1) {
    res.status(404).json({ error: `Order ${orderId} not found.` });
    return;
  }

  if (status) {
    ordersDatabase[orderIndex].status = status;
  }

  res.json({
    success: true,
    message: `Order ${orderId} updated to ${status}.`,
    order: ordersDatabase[orderIndex],
  });
});

// Admin Update Franchise Inquiry Status
app.patch('/api/admin/franchise/:inquiryId', verifyAdminAuth, (req, res) => {
  const { inquiryId } = req.params;
  const { status, notes } = req.body;

  const leadIndex = franchiseInquiries.findIndex((f) => f.id === inquiryId);
  if (leadIndex === -1) {
    res.status(404).json({ error: `Franchise inquiry ${inquiryId} not found.` });
    return;
  }

  if (status) franchiseInquiries[leadIndex].status = status;
  if (notes !== undefined) franchiseInquiries[leadIndex].notes = notes;

  res.json({
    success: true,
    message: `Lead ${inquiryId} updated.`,
    inquiry: franchiseInquiries[leadIndex],
  });
});

// Admin Update Operational Store Settings
app.patch('/api/admin/settings', verifyAdminAuth, (req, res) => {
  const { isStoreOpen, prepTimeMinutes, activeHighwayCorridor, serviceAlert, contactHotline } = req.body;

  if (isStoreOpen !== undefined) storeSettings.isStoreOpen = Boolean(isStoreOpen);
  if (prepTimeMinutes !== undefined) storeSettings.prepTimeMinutes = Number(prepTimeMinutes);
  if (activeHighwayCorridor !== undefined) storeSettings.activeHighwayCorridor = String(activeHighwayCorridor);
  if (serviceAlert !== undefined) storeSettings.serviceAlert = String(serviceAlert);
  if (contactHotline !== undefined) storeSettings.contactHotline = String(contactHotline);

  res.json({
    success: true,
    message: 'Operational settings saved successfully.',
    settings: storeSettings,
  });
});

// Admin Toggle 86 (Out of Stock) for Menu Items
app.post('/api/admin/toggle-item-stock', verifyAdminAuth, (req, res) => {
  const { itemId, itemName, isAvailable } = req.body;

  if (!itemId) {
    res.status(400).json({ error: 'itemId is required.' });
    return;
  }

  if (isAvailable === false) {
    unavailableItemIds.add(itemId);
  } else if (isAvailable === true) {
    unavailableItemIds.delete(itemId);
  } else {
    // Toggle
    if (unavailableItemIds.has(itemId)) {
      unavailableItemIds.delete(itemId);
    } else {
      unavailableItemIds.add(itemId);
    }
  }

  res.json({
    success: true,
    itemId,
    isAvailable: !unavailableItemIds.has(itemId),
    unavailableItemIds: Array.from(unavailableItemIds),
    message: `${itemName || itemId} is now ${!unavailableItemIds.has(itemId) ? 'Available in Kitchen' : '86’d (Marked Out of Stock)'}.`,
  });
});

// Get all custom menu items and stock availability
app.get('/api/menu/items', (req, res) => {
  res.json({
    success: true,
    customMenuItems,
    unavailableItemIds: Array.from(unavailableItemIds),
    deletedItemIds: Array.from(deletedItemIds),
  });
});

// Admin Add New Menu Item
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
  } = req.body;

  if (!name || !category || !price) {
    res.status(400).json({ error: 'Name, Category, and Price are required.' });
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

  const newItem = {
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: String(name).trim(),
    hindiName: hindiName ? String(hindiName).trim() : undefined,
    category,
    price: Math.max(1, Number(price) || 100),
    description: description ? String(description).trim() : 'Freshly prepared at Indian Paratha Company Highway Kitchen.',
    image: image && image.trim().startsWith('http') ? image.trim() : (defaultImages[category] || defaultImages.PARATHAS),
    isVegetarian: isVegetarian !== undefined ? Boolean(isVegetarian) : true,
    isSignature: Boolean(isSignature),
    isBestseller: Boolean(isBestseller),
    isNew: isNew !== undefined ? Boolean(isNew) : true,
    spiceLevel: [1, 2, 3].includes(Number(spiceLevel)) ? Number(spiceLevel) : 1,
    pairing: pairing ? String(pairing).trim() : undefined,
    allergens: Array.isArray(allergens) ? allergens : ['Gluten', 'Dairy'],
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

// Admin Update Custom Menu Item
app.put('/api/admin/menu/items/:itemId', verifyAdminAuth, (req, res) => {
  const { itemId } = req.params;
  const updates = req.body;
  
  const index = customMenuItems.findIndex((i) => i.id === itemId);
  if (index === -1) {
    // If not in custom items, it means they are editing a base hardcoded item.
    // Add it as a custom item to override the base item.
    const newItem = {
      ...updates,
      id: itemId,
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

  // Update item
  customMenuItems[index] = {
    ...customMenuItems[index],
    ...updates,
    id: itemId, // ensure ID doesn't change
  };

  res.json({
    success: true,
    message: 'Menu item updated successfully.',
    item: customMenuItems[index],
    customMenuItems,
  });
});

// Admin Delete Custom Menu Item
app.delete('/api/admin/menu/items/:itemId', verifyAdminAuth, (req, res) => {
  const { itemId } = req.params;
  customMenuItems = customMenuItems.filter((i) => i.id !== itemId);
  
  // Track as deleted so clients hide it
  deletedItemIds.add(itemId);

  // Also remove from unavailable set if present
  unavailableItemIds.delete(itemId);

  res.json({
    success: true,
    message: 'Menu item removed successfully.',
    customMenuItems,
    deletedItemIds: Array.from(deletedItemIds),
  });
});

// Upload or save custom hero background image
app.post('/api/upload-hero-image', (req, res) => {
  const { dataUrl, filename } = req.body;
  if (!dataUrl) {
    res.status(400).json({ error: 'dataUrl is required' });
    return;
  }

  try {
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const publicDir = path.join(process.cwd(), 'public');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const targetFile = filename || 'IMG-20260906-WA0007.jpg';
    fs.writeFileSync(path.join(publicDir, targetFile), buffer);
    fs.writeFileSync(path.join(publicDir, 'IMG-20260906-WA0007.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'hero-bg.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'home-bg.jpg'), buffer);
    fs.writeFileSync(path.join(publicDir, 'hero-banner.jpg'), buffer);

    res.json({
      success: true,
      url: `/${targetFile}`,
      message: 'Background image saved successfully.',
    });
  } catch (err) {
    console.error('Failed to save background image:', err);
    res.status(500).json({ error: 'Failed to write image file.' });
  }
});

// Check if hero image file exists
app.get('/api/hero-image-status', (req, res) => {
  const p1 = path.join(process.cwd(), 'public', 'IMG-20260906-WA0007.jpg');
  const p2 = path.join(process.cwd(), 'public', 'hero-banner.jpg');
  const hasImage = fs.existsSync(p1) || fs.existsSync(p2);
  res.json({ hasCustomImage: hasImage });
});

// ==========================================
// VITE & STATIC MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
    console.log(`Indian Paratha Company JavaScript server running on port ${PORT}`);
  });
}

startServer();
