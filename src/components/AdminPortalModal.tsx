import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Key,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Settings,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  LogOut,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ALL_MENU_ITEMS } from '../data/menu';
import { adminStore } from '../lib/adminStore';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ipc_admin_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'franchise' | 'inventory' | 'settings' | 'add-item'>('orders');

  // Dashboard Data State
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // New Menu Item Form
  const [newItem, setNewItem] = useState({
    name: '',
    hindiName: '',
    category: 'PARATHAS',
    price: 180,
    description: '',
    isVegetarian: true,
    isSignature: false,
    spiceLevel: 1,
  });

  // Check auth and load dashboard
  const fetchDashboard = async (authToken: string) => {
    setIsRefreshing(true);
    try {
      const data = await adminStore.getDashboard(authToken);
      if (data) {
        setDashboardData(data);
      }
    } catch (err: any) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchDashboard(token);
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const { token: sessionToken } = await adminStore.login(username, password);
      if (sessionToken) {
        setToken(sessionToken);
        fetchDashboard(sessionToken);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials. Please verify username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setToken(null);
    setDashboardData(null);
    localStorage.removeItem('ipc_admin_token');
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!token) return;
    try {
      await adminStore.updateOrderStatus(token, orderId, newStatus);
      showSuccessBanner(`Order #${orderId} updated to "${newStatus}"`);
      fetchDashboard(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Update franchise inquiry status
  const handleUpdateFranchiseStatus = async (inquiryId: string, newStatus: string) => {
    if (!token) return;
    try {
      await adminStore.updateFranchiseStatus(token, inquiryId, newStatus);
      showSuccessBanner(`Franchise lead #${inquiryId} updated to "${newStatus}"`);
      fetchDashboard(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle item stock (86'd)
  const handleToggleStock = async (itemId: string, itemName: string, isAvailable: boolean) => {
    if (!token) return;
    try {
      await adminStore.toggleStock(token, itemId, itemName, !isAvailable);
      showSuccessBanner(`${itemName} is now marked ${!isAvailable ? '86’d (Out of Stock)' : 'In Stock'}.`);
      fetchDashboard(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Save Store Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !dashboardData?.storeSettings) return;
    try {
      await adminStore.saveSettings(token, dashboardData.storeSettings);
      showSuccessBanner('Operational station settings saved successfully.');
      fetchDashboard(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Add custom dish
  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newItem.name || !newItem.price) return;
    try {
      await adminStore.addMenuItem(token, newItem);
      showSuccessBanner(`"${newItem.name}" added to highway menu catalog.`);
      setNewItem({
        name: '',
        hindiName: '',
        category: 'PARATHAS',
        price: 180,
        description: '',
        isVegetarian: true,
        isSignature: false,
        spiceLevel: 1,
      });
      setActiveTab('inventory');
      fetchDashboard(token);
    } catch (err) {
      console.error(err);
    }
  };

  const showSuccessBanner = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="admin-portal-modal"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0A100C] border border-[#E5A93C]/30 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F1712] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide font-sans">
                  Indian Paratha Company
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/30 uppercase">
                  Station Master Portal
                </span>
              </div>
              <p className="text-xs text-white/60">NH7 Highway Command &amp; Live Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {actionSuccess && (
          <div className="bg-[#25D366]/20 border-b border-[#25D366]/40 px-6 py-2 text-xs text-[#25D366] font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Area */}
        {!token ? (
          /* LOGIN VIEW */
          <div className="p-6 sm:p-10 max-w-md mx-auto w-full my-auto">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white font-serif-luxury">Highway Command Login</h4>
              <p className="text-xs text-white/60 mt-1">
                Authorized staff portal for order fulfillment, inventory &amp; franchise reviews.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Staff Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full bg-[#141E17] border border-white/15 focus:border-[#E5A93C] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#141E17] border border-white/15 focus:border-[#E5A93C] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E5A93C] hover:bg-[#F2B84B] text-black font-bold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#E5A93C]/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Command Center</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Auto-Fill Demo Credentials Helper */}
              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('admin');
                    setPassword('password123');
                  }}
                  className="text-xs text-[#E5A93C] hover:underline font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-[#E5A93C]/30 hover:bg-[#E5A93C]/10 transition-colors"
                >
                  Fill Default Credentials (admin / password123)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Top Navigation Tabs & Quick Metrics */}
            <div className="bg-[#0C140F] border-b border-white/10 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Live Orders</span>
                  {dashboardData?.orders?.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-mono">
                      {dashboardData.orders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('franchise')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'franchise'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Franchise Leads</span>
                  {dashboardData?.franchiseInquiries?.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-mono">
                      {dashboardData.franchiseInquiries.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'inventory'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Kitchen Menu &amp; 86 Stock</span>
                </button>

                <button
                  onClick={() => setActiveTab('add-item')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'add-item'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Dish</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Operations</span>
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={() => token && fetchDashboard(token)}
                disabled={isRefreshing}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
                title="Refresh dashboard data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#E5A93C]' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {/* Quick Summary Cards */}
            {dashboardData?.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:px-6 bg-[#0E1712] border-b border-white/10">
                <div className="p-3 rounded-xl bg-[#141F17] border border-white/10">
                  <p className="text-[11px] text-white/60 uppercase font-mono">Today's Revenue</p>
                  <p className="text-lg font-bold text-[#E5A93C] font-mono">
                    ₹{dashboardData.metrics.totalRevenue || 0}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#141F17] border border-white/10">
                  <p className="text-[11px] text-white/60 uppercase font-mono">Orders Placed</p>
                  <p className="text-lg font-bold text-white font-mono">
                    {dashboardData.metrics.todayOrdersCount || 0}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#141F17] border border-white/10">
                  <p className="text-[11px] text-white/60 uppercase font-mono">Active in Kitchen</p>
                  <p className="text-lg font-bold text-amber-400 font-mono">
                    {dashboardData.metrics.activeOrdersCount || 0}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#141F17] border border-white/10">
                  <p className="text-[11px] text-white/60 uppercase font-mono">Franchise Leads</p>
                  <p className="text-lg font-bold text-[#25D366] font-mono">
                    {dashboardData.metrics.franchiseInquiriesCount || 0}
                  </p>
                </div>
              </div>
            )}

            {/* Body Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* TAB 1: LIVE ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Live Kitchen &amp; Highway Orders
                    </h4>
                    <span className="text-xs text-white/50">Auto-updating live queue</span>
                  </div>

                  {(!dashboardData?.orders || dashboardData.orders.length === 0) ? (
                    <div className="p-8 text-center bg-[#121B15] rounded-xl border border-white/10 text-white/50 text-sm">
                      No customer orders currently in queue.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dashboardData.orders.map((order: any) => (
                        <div
                          key={order.orderId}
                          className="p-4 rounded-xl bg-[#131E17] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-sm font-bold text-[#E5A93C]">
                                #{order.orderId}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white">
                                {order.orderType}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  order.status === 'Completed'
                                    ? 'bg-[#25D366]/20 text-[#25D366]'
                                    : order.status === 'Cancelled'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {order.status}
                              </span>
                              <span className="text-[11px] text-white/40 font-mono">
                                {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="text-xs text-white/80 flex items-center gap-4 flex-wrap">
                              <span className="font-semibold text-white">{order.customerName}</span>
                              <span className="text-white/60 font-mono flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#E5A93C]" />
                                {order.phone}
                              </span>
                            </div>

                            {/* Items list */}
                            <div className="text-xs text-white/70 bg-black/20 p-2.5 rounded-lg space-y-1">
                              {order.items?.map((it: any, idx: number) => (
                                <div key={idx} className="flex justify-between">
                                  <span>
                                    {it.quantity}x {it.name}
                                  </span>
                                  <span className="font-mono text-white/50">₹{it.price * it.quantity}</span>
                                </div>
                              ))}
                              <div className="pt-1 border-t border-white/10 flex justify-between font-bold text-white">
                                <span>Total Amount:</span>
                                <span className="text-[#E5A93C] font-mono">₹{order.total}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Status Controls */}
                          <div className="flex flex-wrap md:flex-col gap-1.5 shrink-0">
                            <span className="text-[10px] text-white/40 uppercase font-mono mb-0.5">Update Status:</span>
                            <div className="flex gap-1 flex-wrap">
                              <button
                                onClick={() => handleUpdateOrderStatus(order.orderId, 'Preparing Fresh')}
                                className="px-2.5 py-1 rounded text-[11px] font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors"
                              >
                                Preparing
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(order.orderId, 'Ready for Pickup')}
                                className="px-2.5 py-1 rounded text-[11px] font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 transition-colors"
                              >
                                Ready
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(order.orderId, 'Completed')}
                                className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 transition-colors"
                              >
                                Completed
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(order.orderId, 'Cancelled')}
                                className="px-2.5 py-1 rounded text-[11px] font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: FRANCHISE LEADS */}
              {activeTab === 'franchise' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Highway Franchise Partnership Applications
                    </h4>
                    <span className="text-xs text-white/50">Exclusive NH7 &amp; Express corridor expansion</span>
                  </div>

                  {(!dashboardData?.franchiseInquiries || dashboardData.franchiseInquiries.length === 0) ? (
                    <div className="p-8 text-center bg-[#121B15] rounded-xl border border-white/10 text-white/50 text-sm">
                      No franchise inquiries registered yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dashboardData.franchiseInquiries.map((lead: any) => (
                        <div
                          key={lead.id}
                          className="p-4 rounded-xl bg-[#131E17] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-sm font-bold text-[#E5A93C]">
                                #{lead.id}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/30">
                                {lead.model}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 text-white">
                                {lead.status || 'New'}
                              </span>
                              <span className="text-[11px] text-white/40 font-mono">
                                {new Date(lead.timestamp).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-white/40 block text-[10px] uppercase">Partner Name</span>
                                <span className="font-semibold text-white">{lead.fullName}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[10px] uppercase">Proposed City / Location</span>
                                <span className="text-white flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#E5A93C]" />
                                  {lead.city}
                                </span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[10px] uppercase">Phone Hotline</span>
                                <a href={`tel:${lead.phone}`} className="text-[#E5A93C] font-mono hover:underline">
                                  {lead.phone}
                                </a>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[10px] uppercase">Email</span>
                                <a href={`mailto:${lead.email}`} className="text-white/80 hover:underline">
                                  {lead.email}
                                </a>
                              </div>
                            </div>

                            {lead.notes && (
                              <div className="bg-black/20 p-2.5 rounded-lg text-xs text-white/70 border border-white/5">
                                <span className="text-white/40 block text-[10px] uppercase font-mono mb-0.5">Notes:</span>
                                {lead.notes}
                              </div>
                            )}
                          </div>

                          {/* Status buttons */}
                          <div className="flex flex-wrap md:flex-col gap-1.5 shrink-0">
                            <span className="text-[10px] text-white/40 uppercase font-mono">Lead Stage:</span>
                            <div className="flex gap-1 flex-wrap">
                              <button
                                onClick={() => handleUpdateFranchiseStatus(lead.id, 'Under Review')}
                                className="px-2 py-1 rounded text-[11px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors"
                              >
                                Reviewing
                              </button>
                              <button
                                onClick={() => handleUpdateFranchiseStatus(lead.id, 'Contacted')}
                                className="px-2 py-1 rounded text-[11px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 transition-colors"
                              >
                                Contacted
                              </button>
                              <button
                                onClick={() => handleUpdateFranchiseStatus(lead.id, 'Approved')}
                                className="px-2 py-1 rounded text-[11px] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 transition-colors"
                              >
                                Approved
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INVENTORY & 86'd STOCK */}
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Kitchen Inventory &amp; 86 Stock Management
                      </h4>
                      <p className="text-xs text-white/60">
                        Toggle dishes that run out of fresh ingredients to mark them 86’d (Unavailable) live.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ALL_MENU_ITEMS.map((item) => {
                      const isUnavailable = dashboardData?.unavailableItemIds?.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            isUnavailable
                              ? 'bg-red-950/20 border-red-500/30'
                              : 'bg-[#131E17] border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover bg-black/40"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div>
                              <p className="text-xs font-bold text-white leading-tight">{item.name}</p>
                              <p className="text-[11px] text-[#E5A93C] font-mono">₹{item.price}</p>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider ${
                                  isUnavailable ? 'text-red-400' : 'text-[#25D366]'
                                }`}
                              >
                                {isUnavailable ? '86’d (Out of Stock)' : 'Available in Kitchen'}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleStock(item.id, item.name, !isUnavailable)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isUnavailable
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                          >
                            {isUnavailable ? 'Mark In Stock' : '86 Dish'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ADD NEW MENU DISH */}
              {activeTab === 'add-item' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Add New Signature Dish to Highway Menu
                    </h4>
                    <p className="text-xs text-white/60">
                      Creates a new dish entry in the live restaurant catalog.
                    </p>
                  </div>

                  <form onSubmit={handleAddDish} className="space-y-3 bg-[#131E17] p-5 rounded-xl border border-white/10">
                    <div>
                      <label className="block text-xs text-white/70 font-medium mb-1">Dish Name *</label>
                      <input
                        type="text"
                        required
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="e.g. Tandoori Paneer Kulcha"
                        className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-white/70 font-medium mb-1">Category *</label>
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                          className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                        >
                          <option value="PARATHAS">PARATHAS</option>
                          <option value="PARATHZZAA">PARATHZZAA</option>
                          <option value="Q' PARATHA">Q' PARATHA</option>
                          <option value="HOT BLENDS">HOT BLENDS (CHAI)</option>
                          <option value="APPETIZERS">APPETIZERS</option>
                          <option value="COMBOS">COMBOS</option>
                          <option value="DESSERTS">DESSERTS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-white/70 font-medium mb-1">Price (₹) *</label>
                        <input
                          type="number"
                          required
                          min="10"
                          max="5000"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                          className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 font-medium mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="Fresh handmade tawa delicacy with spices..."
                        className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newItem.isVegetarian}
                          onChange={(e) => setNewItem({ ...newItem, isVegetarian: e.target.checked })}
                          className="rounded bg-black/40 border-white/20 text-[#25D366]"
                        />
                        <span>100% Pure Veg</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newItem.isSignature}
                          onChange={(e) => setNewItem({ ...newItem, isSignature: e.target.checked })}
                          className="rounded bg-black/40 border-white/20 text-[#E5A93C]"
                        />
                        <span>Chef Signature</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E5A93C] hover:bg-[#F2B84B] text-black font-bold py-2.5 rounded-lg text-xs transition-colors mt-2 cursor-pointer"
                    >
                      Publish Dish to Menu
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: OPERATIONAL SETTINGS */}
              {activeTab === 'settings' && dashboardData?.storeSettings && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Operational Highway Station Settings
                    </h4>
                    <p className="text-xs text-white/60">
                      Configure live status, prep times, and corridor announcements.
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4 bg-[#131E17] p-5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                      <div>
                        <p className="text-xs font-bold text-white">Store Live Ordering Status</p>
                        <p className="text-[11px] text-white/50">Enable or pause customer order checkout</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setDashboardData({
                            ...dashboardData,
                            storeSettings: {
                              ...dashboardData.storeSettings,
                              isStoreOpen: !dashboardData.storeSettings.isStoreOpen,
                            },
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          dashboardData.storeSettings.isStoreOpen
                            ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {dashboardData.storeSettings.isStoreOpen ? 'KITCHEN OPEN' : 'KITCHEN PAUSED'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 font-medium mb-1">
                        Preparation Time Estimate (Minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="90"
                        value={dashboardData.storeSettings.prepTimeMinutes}
                        onChange={(e) =>
                          setDashboardData({
                            ...dashboardData,
                            storeSettings: {
                              ...dashboardData.storeSettings,
                              prepTimeMinutes: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 font-medium mb-1">
                        Active Highway Corridor Alert
                      </label>
                      <input
                        type="text"
                        value={dashboardData.storeSettings.serviceAlert}
                        onChange={(e) =>
                          setDashboardData({
                            ...dashboardData,
                            storeSettings: {
                              ...dashboardData.storeSettings,
                              serviceAlert: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 font-medium mb-1">
                        Station Master Contact Hotline
                      </label>
                      <input
                        type="text"
                        value={dashboardData.storeSettings.contactHotline}
                        onChange={(e) =>
                          setDashboardData({
                            ...dashboardData,
                            storeSettings: {
                              ...dashboardData.storeSettings,
                              contactHotline: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#0E1611] border border-white/15 focus:border-[#E5A93C] rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E5A93C] hover:bg-[#F2B84B] text-black font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Save Station Settings
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
