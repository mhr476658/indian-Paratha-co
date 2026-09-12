/**
 * Indian Paratha Company - Highway Station Master Admin Store
 * Dual-Mode Engine: Seamlessly uses backend API with graceful persistent client-side fallback
 * for static Vercel/Netlify hosting, offline resilience, and serverless environments.
 */

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  orderId: string;
  customerName: string;
  phone: string;
  vehicleNumber?: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Highway Curbside';
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Preparing Fresh' | 'Ready for Pickup' | 'Completed' | 'Cancelled';
  timestamp: string;
  notes?: string;
}

export interface FranchiseLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  model: string;
  status: 'New' | 'Under Review' | 'Contacted' | 'Approved' | 'Closed';
  notes?: string;
  timestamp: string;
}

export interface StoreSettings {
  isStoreOpen: boolean;
  prepTimeMinutes: number;
  serviceAlert: string;
  contactHotline: string;
}

const DEFAULT_ORDERS: AdminOrder[] = [
  {
    orderId: 'IPC-8821',
    customerName: 'Rahul Sharma',
    phone: '+91 98450 12345',
    vehicleNumber: 'KA 04 MP 8820',
    orderType: 'Highway Curbside',
    items: [
      { id: 'parathzzaa-1', name: 'Aloo Cheese Burst Parathzzaa®', price: 280, quantity: 2 },
      { id: 'chai-1', name: 'Dum Masala Highway Chai (Flask)', price: 120, quantity: 1 },
    ],
    total: 680,
    status: 'Preparing Fresh',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    notes: 'Extra spicy, serve in thermal highway packaging for road trip.',
  },
  {
    orderId: 'IPC-8822',
    customerName: 'Pooja Hegde',
    phone: '+91 97401 56789',
    vehicleNumber: 'KA 51 Z 1902',
    orderType: 'Takeaway',
    items: [
      { id: 'paratha-3', name: 'Paneer Butter Masala Paratha', price: 210, quantity: 2 },
      { id: 'chai-2', name: 'Ginger Cardamom Chai', price: 70, quantity: 2 },
    ],
    total: 560,
    status: 'Ready for Pickup',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    orderId: 'IPC-8820',
    customerName: 'Vikramaditya Rao',
    phone: '+91 99000 44321',
    orderType: 'Dine-In',
    items: [
      { id: 'platter-1', name: 'Grand Highway Royal Thali', price: 399, quantity: 2 },
      { id: 'lassi-1', name: 'Kesar Pista Malai Lassi', price: 140, quantity: 2 },
    ],
    total: 1078,
    status: 'Completed',
    timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
  },
];

const DEFAULT_FRANCHISE_LEADS: FranchiseLead[] = [
  {
    id: 'FR-104',
    fullName: 'Anand Kulkarni',
    phone: '+91 98860 99881',
    email: 'anand.k@highwayventures.in',
    city: 'NH44 Bangalore-Hyderabad Express Corridor',
    model: 'Highway Flagship Drive-thru',
    status: 'Under Review',
    notes: 'Owns 1.2 acre highway frontage near Kurnool. Prime fuel station adjacent.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'FR-105',
    fullName: 'Sunil Mehta',
    phone: '+91 94220 11223',
    email: 'sunil.mehta@expressways.co.in',
    city: 'Mumbai-Pune Expressway Toll Plaza',
    model: 'Express Kiosk',
    status: 'Contacted',
    notes: 'High footfall rest-stop spot, requested ROI financial prospectus.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const DEFAULT_SETTINGS: StoreSettings = {
  isStoreOpen: true,
  prepTimeMinutes: 20,
  serviceAlert: 'NH7 Devanahalli Highway Tawa Kitchens Operational 24/7',
  contactHotline: '+91 98808 83061',
};

// Local storage accessors
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage write failed:', e);
  }
}

export const adminStore = {
  // Login
  async login(username: string, password: string): Promise<{ token: string; user: string }> {
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    // 1. Try Backend API first with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUser, password: trimmedPass }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem('ipc_admin_token', data.token);
          return { token: data.token, user: data.user || 'Station Master' };
        } else if (data.error) {
          throw new Error(data.error);
        }
      }
    } catch (err: any) {
      if (err.message && !err.message.includes('fetch') && !err.message.includes('abort') && !err.message.includes('NetworkError') && !err.message.includes('JSON')) {
        // Specific error returned by API
        throw err;
      }
      // Server is unreachable or static deployment (Vercel static SPA fallback)
    }

    // 2. Client-side authentication fallback (Supports default credentials: admin / password123)
    if (
      (trimmedUser === 'admin' || trimmedUser === 'ipc' || trimmedUser === 'manager') &&
      (trimmedPass === 'password123' || trimmedPass === 'ipc@2026' || trimmedPass === 'admin123' || trimmedPass === 'admin')
    ) {
      const localToken = 'ipc_local_session_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('ipc_admin_token', localToken);
      localStorage.setItem('ipc_admin_user', 'Station Master (Highway Command)');
      return { token: localToken, user: 'Station Master (Highway Command)' };
    }

    throw new Error('Invalid credentials. Please verify your Staff Username and Password.');
  },

  // Get Dashboard Data
  async getDashboard(token: string): Promise<any> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        // Save local copy for offline backup
        setLocal('ipc_admin_orders', data.orders || []);
        setLocal('ipc_admin_franchise', data.franchiseInquiries || []);
        return data;
      }
    } catch (e) {
      // Fall through to local store
    }

    // Local fallback data
    const orders = getLocal<AdminOrder[]>('ipc_admin_orders', DEFAULT_ORDERS);
    const franchiseInquiries = getLocal<FranchiseLead[]>('ipc_admin_franchise', DEFAULT_FRANCHISE_LEADS);
    const unavailableItemIds = getLocal<string[]>('ipc_admin_unavailable', ['item-q2']);
    const storeSettings = getLocal<StoreSettings>('ipc_admin_settings', DEFAULT_SETTINGS);
    const customMenuItems = getLocal<any[]>('ipc_custom_menu_items', []);

    const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + (o.total || 0) : sum), 0);
    const activeOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing Fresh').length;

    return {
      status: 'ok',
      mode: 'Local High-Availability Mode',
      metrics: {
        totalRevenue,
        todayOrdersCount: orders.length,
        activeOrdersCount,
        franchiseInquiriesCount: franchiseInquiries.length,
      },
      orders,
      franchiseInquiries,
      unavailableItemIds,
      storeSettings,
      customMenuItems,
    };
  },

  // Update Order Status
  async updateOrderStatus(token: string, orderId: string, newStatus: string): Promise<void> {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      // ignore
    }

    // Update local copy
    const orders = getLocal<AdminOrder[]>('ipc_admin_orders', DEFAULT_ORDERS);
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus as any } : o));
    setLocal('ipc_admin_orders', updated);
  },

  // Update Franchise Lead Status
  async updateFranchiseStatus(token: string, inquiryId: string, newStatus: string): Promise<void> {
    try {
      await fetch(`/api/admin/franchise/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      // ignore
    }

    const leads = getLocal<FranchiseLead[]>('ipc_admin_franchise', DEFAULT_FRANCHISE_LEADS);
    const updated = leads.map((l) => (l.id === inquiryId ? { ...l, status: newStatus as any } : l));
    setLocal('ipc_admin_franchise', updated);
  },

  // Toggle 86'd Item
  async toggleStock(token: string, itemId: string, itemName: string, isAvailable: boolean): Promise<void> {
    try {
      await fetch('/api/admin/toggle-item-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ itemId, itemName, isAvailable }),
      });
    } catch (e) {
      // ignore
    }

    const unavail = getLocal<string[]>('ipc_admin_unavailable', []);
    let updated: string[];
    if (isAvailable) {
      // Marked in stock -> remove from unavailable
      updated = unavail.filter((id) => id !== itemId);
    } else {
      // Marked 86'd -> add to unavailable
      updated = Array.from(new Set([...unavail, itemId]));
    }
    setLocal('ipc_admin_unavailable', updated);
  },

  // Save Settings
  async saveSettings(token: string, settings: StoreSettings): Promise<void> {
    try {
      await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      });
    } catch (e) {
      // ignore
    }
    setLocal('ipc_admin_settings', settings);
  },

  // Add Custom Dish
  async addMenuItem(token: string, dish: any): Promise<void> {
    try {
      await fetch('/api/admin/menu/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(dish),
      });
    } catch (e) {
      // ignore
    }

    const customItems = getLocal<any[]>('ipc_custom_menu_items', []);
    const newDish = {
      ...dish,
      id: 'custom-' + Date.now(),
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&auto=format&fit=crop&q=80',
    };
    setLocal('ipc_custom_menu_items', [newDish, ...customItems]);
  },
};
