import React, { useState, useEffect } from 'react';
import { IPCLogo } from '../IPCLogo';
import { LiveOrdersTab } from './LiveOrdersTab';
import { FranchiseLeadsTab } from './FranchiseLeadsTab';
import { MenuManagerTab } from './MenuManagerTab';
import { OperationsTab } from './OperationsTab';
import {
  subscribeToOrders,
  updateOrderStatusInFirestore,
  subscribeToFranchiseInquiries,
  updateFranchiseInquiryStatusInFirestore,
  updateStoreSettingsInFirestore,
  subscribeToStoreSettings,
  toggleStockInFirestore,
} from '../../services/firestoreService';
import { menuStore } from '../../data/menuStore';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  ListOrdered,
  Settings,
  LogOut,
  ExternalLink,
  IndianRupee,
  Clock,
  Car,
  Users,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Power,
  Shield,
  ChefHat,
} from 'lucide-react';

interface AdminDashboardProps {
  token: string;
  user: { username: string; name: string; role: string };
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  user,
  onLogout,
  onViewWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'franchise' | 'menu' | 'operations'
  >('overview');

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        onLogout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch dashboard data');
      }

      setDashboardData(data);
      
      // Sync menu store with server
      if (data.customMenuItems || data.deletedItemIds) {
        menuStore.setCustomItems(data.customMenuItems || [], data.deletedItemIds || []);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // 1. Real-time Firestore orders listener
    const unsubOrders = subscribeToOrders((firestoreOrders) => {
      if (firestoreOrders && firestoreOrders.length > 0) {
        setDashboardData((prev: any) => {
          if (!prev) return prev;
          const mappedOrders = firestoreOrders.map((o: any) => ({
            orderId: o.orderId || o.id || 'IPC-ORDER',
            customerName: o.customerName || o.name || 'Valued Guest',
            phone: o.customerPhone || o.phone || '',
            orderType: o.orderType || 'Highway Takeaway',
            items: o.items || [],
            total: o.totalAmount || o.total || 0,
            timestamp: o.createdAt || o.timestamp || new Date().toISOString(),
            status:
              o.status === 'RECEIVED'
                ? 'Preparing Fresh'
                : o.status === 'PREPARING'
                ? 'Preparing Fresh'
                : o.status === 'READY'
                ? 'Ready for Pickup'
                : o.status === 'COMPLETED'
                ? 'Completed'
                : o.status || 'Preparing Fresh',
          }));
          const activeCount = mappedOrders.filter(
            (o) => o.status !== 'Completed' && o.status !== 'Cancelled'
          ).length;
          return {
            ...prev,
            orders: mappedOrders,
            metrics: {
              ...prev.metrics,
              activeOrdersCount: activeCount,
            },
          };
        });
      }
    });

    // 2. Real-time Firestore franchise leads listener
    const unsubFranchise = subscribeToFranchiseInquiries((leads) => {
      if (leads && leads.length > 0) {
        setDashboardData((prev: any) => {
          if (!prev) return prev;
          const mappedLeads = leads.map((l: any) => ({
            id: l.id || `FRAN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
            fullName: l.fullName || l.name || 'Highway Partner',
            phone: l.phone || '',
            email: l.email || '',
            city: l.city || l.highwayStretch || 'Bangalore Corridor',
            model: l.model || l.investmentCapacity || 'HIGHWAY CHALET',
            notes: l.notes || l.experience || '',
            status:
              l.status === 'NEW'
                ? 'New'
                : l.status === 'CONTACTED'
                ? 'Contacted'
                : l.status === 'SHORTLISTED'
                ? 'Under Review'
                : l.status || 'New',
            timestamp: l.timestamp || l.createdAt || new Date().toISOString(),
          }));
          return {
            ...prev,
            franchiseInquiries: mappedLeads,
          };
        });
      }
    });

    // 3. Real-time Firestore store settings listener
    const unsubSettings = subscribeToStoreSettings((settings) => {
      if (settings) {
        setDashboardData((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            storeSettings: {
              ...prev.storeSettings,
              isStoreOpen: settings.isOpen !== undefined ? settings.isOpen : prev.storeSettings?.isStoreOpen,
              prepTimeMinutes: settings.prepTimeMinutes || prev.storeSettings?.prepTimeMinutes,
              specialNotice: settings.specialNotice !== undefined ? settings.specialNotice : prev.storeSettings?.specialNotice,
              highwayAlert: settings.highwayAlert !== undefined ? settings.highwayAlert : prev.storeSettings?.highwayAlert,
            },
            unavailableItemIds: settings.unavailableItemIds || prev.unavailableItemIds,
          };
        });
      }
    });

    return () => {
      unsubOrders();
      unsubFranchise();
      unsubSettings();
    };
  }, [token]);

  // Order status updater
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      // Sync to Firestore
      updateOrderStatusInFirestore(orderId, status as any).catch((e) =>
        console.warn('Firestore order status sync:', e)
      );

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update order status');

      // Update state locally
      setDashboardData((prev: any) => {
        if (!prev) return prev;
        const updatedOrders = prev.orders.map((o: any) =>
          o.orderId === orderId ? { ...o, status } : o
        );
        const activeCount = updatedOrders.filter(
          (o: any) => o.status !== 'Completed' && o.status !== 'Cancelled'
        ).length;
        return {
          ...prev,
          orders: updatedOrders,
          metrics: {
            ...prev.metrics,
            activeOrdersCount: activeCount,
          },
        };
      });
    } catch (err: any) {
      alert(err.message || 'Error updating order');
    }
  };

  // Franchise lead updater
  const handleUpdateFranchiseLead = async (id: string, status?: string, notes?: string) => {
    try {
      // Sync to Firestore
      if (status) {
        updateFranchiseInquiryStatusInFirestore(id, status as any).catch((e) =>
          console.warn('Firestore lead status sync:', e)
        );
      }

      const response = await fetch(`/api/admin/franchise/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) throw new Error('Failed to update lead');

      setDashboardData((prev: any) => {
        if (!prev) return prev;
        const updated = prev.franchiseInquiries.map((f: any) => {
          if (f.id === id) {
            return {
              ...f,
              ...(status ? { status } : {}),
              ...(notes !== undefined ? { notes } : {}),
            };
          }
          return f;
        });
        return {
          ...prev,
          franchiseInquiries: updated,
        };
      });
    } catch (err: any) {
      alert(err.message || 'Error updating franchise lead');
    }
  };

  // Menu item availability 86 toggle
  const handleToggleMenuStock = async (itemId: string, itemName: string, isAvailable: boolean) => {
    try {
      // Sync to Firestore
      toggleStockInFirestore(
        itemId,
        isAvailable,
        dashboardData?.unavailableItemIds || []
      ).catch((e) => console.warn('Firestore stock toggle sync:', e));

      const response = await fetch('/api/admin/toggle-item-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, itemName, isAvailable }),
      });

      if (!response.ok) throw new Error('Failed to toggle item availability');
      const data = await response.json();

      setDashboardData((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          unavailableItemIds: data.unavailableItemIds,
        };
      });
    } catch (err: any) {
      alert(err.message || 'Error toggling item');
    }
  };

  // Operational settings updater
  const handleUpdateSettings = async (newSettings: any) => {
    try {
      // Sync to Firestore
      updateStoreSettingsInFirestore({
        isOpen: newSettings.isStoreOpen,
        prepTimeMinutes: newSettings.prepTimeMinutes,
        specialNotice: newSettings.specialNotice,
        highwayAlert: newSettings.highwayAlert,
      }).catch((e) => console.warn('Firestore settings sync:', e));

      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      const data = await response.json();

      setDashboardData((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          storeSettings: data.settings,
        };
      });
    } catch (err: any) {
      alert(err.message || 'Error updating operational settings');
    }
  };

  const metrics = dashboardData?.metrics || {
    totalRevenue: 2275,
    todayOrdersCount: 4,
    activeOrdersCount: 2,
    completedOrdersCount: 2,
    franchiseInquiriesCount: 3,
    newFranchiseLeadsCount: 1,
    orderTypeCounts: {},
    topItems: [],
  };

  const storeSettings = dashboardData?.storeSettings || {
    isStoreOpen: true,
    prepTimeMinutes: 18,
    activeHighwayCorridor: 'NH7 Bangalore Corridor',
    serviceAlert: 'Highway takeaway active.',
    contactHotline: '+91 98808 83061',
  };

  return (
    <div className="min-h-screen bg-[#080D0A] text-white font-sans flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-white/5 border-b border-white/10 sticky top-0 z-40 shadow-2xl backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Brand Emblem & Station Identity */}
            <div className="flex items-center gap-3">
              <IPCLogo variant="light" size="sm" badgeOnly={true} className="shrink-0 drop-shadow-md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-white text-base sm:text-lg tracking-wider">
                    IPC COMMAND
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-[#E5A93C]">
                    <Shield className="w-3 h-3" />
                    <span>NH7 Hub</span>
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live DB</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        storeSettings.isStoreOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-[11px] font-mono">
                      {storeSettings.isStoreOpen ? 'KITCHEN OPEN' : 'KITCHEN PAUSED'}
                    </span>
                  </span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="text-[11px] font-mono text-white/50 hidden sm:inline">
                    EST. {storeSettings.prepTimeMinutes}M PREP
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions & Profile */}
            <div className="flex items-center gap-3">
              {/* Customer Website Switcher */}
              <button
                onClick={onViewWebsite}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center gap-2 backdrop-blur-md"
                title="View customer facing website"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span className="hidden md:inline tracking-wider">Customer Site</span>
              </button>

              {/* Logged in User Pill */}
              <div className="hidden lg:flex flex-col text-right px-2">
                <span className="text-xs font-bold text-white tracking-wider">{user.name}</span>
                <span className="text-[10px] font-mono text-[#E5A93C] uppercase">{user.role}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 sm:px-4 sm:py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                title="Sign out of station"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center lg:justify-center overflow-x-auto scrollbar-none py-4 border-t border-white/10">
            <nav className="inline-flex items-center p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl space-x-1 min-w-max">
              {[
                {
                  id: 'overview',
                  label: 'Overview & Analytics',
                  icon: LayoutDashboard,
                  badge: null,
                },
                {
                  id: 'orders',
                  label: 'Live Kitchen',
                  icon: ChefHat,
                  badge: metrics.activeOrdersCount > 0 ? `${metrics.activeOrdersCount}` : null,
                  badgeColor: 'bg-[#E5A93C] text-black',
                },
                {
                  id: 'franchise',
                  label: 'Franchise CRM',
                  icon: Building2,
                  badge: metrics.newFranchiseLeadsCount > 0 ? `${metrics.newFranchiseLeadsCount} New` : null,
                  badgeColor: 'bg-[#E5A93C] text-black',
                },
                {
                  id: 'menu',
                  label: 'Menu & 86 System',
                  icon: ListOrdered,
                  badge: dashboardData?.unavailableItemIds?.length
                    ? `${dashboardData.unavailableItemIds.length} 86'd`
                    : null,
                  badgeColor: 'bg-red-500 text-white',
                },
                {
                  id: 'operations',
                  label: 'Operations',
                  icon: Settings,
                  badge: null,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-100'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${tab.badgeColor}`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchDashboardData}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Revenue */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Today's Revenue
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-wider">
                  ₹{metrics.totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Fresh highway orders processed</span>
                </div>
              </div>

              {/* Active Kitchen Orders */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Active Kitchen Orders
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#E5A93C]/20 text-[#E5A93C] flex items-center justify-center border border-[#E5A93C]/30">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-wider">
                  {metrics.activeOrdersCount}
                </div>
                <div className="text-xs text-[#E5A93C] mt-2 flex items-center gap-1">
                  <span>Rolling on hot tawas right now</span>
                </div>
              </div>

              {/* Completed Orders */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Total Delivered Today
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-wider">
                  {metrics.todayOrdersCount}
                </div>
                <div className="text-xs text-white/50 mt-2">
                  100% freshly rolled & cooked on order
                </div>
              </div>

              {/* Franchise Investor Inquiries */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Franchise Leads
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#E5A93C]/20 text-[#E5A93C] flex items-center justify-center border border-[#E5A93C]/30">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-wider">
                  {metrics.franchiseInquiriesCount}
                </div>
                <div className="text-xs text-[#E5A93C] mt-2 font-semibold">
                  {metrics.newFranchiseLeadsCount} new applicants awaiting contact
                </div>
              </div>
            </div>

            {/* Middle Section: Top Sellers & Channel Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Top Selling Items (7 cols) */}
              <div className="lg:col-span-7 bg-[#0F1712]/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-white tracking-wider">
                      Top Selling Specialties Today
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Most requested parathas, parathzzaas, and highway chai
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="text-xs text-[#E5A93C] hover:underline font-bold"
                  >
                    View All Menu →
                  </button>
                </div>

                <div className="space-y-3">
                  {metrics.topItems && metrics.topItems.length > 0 ? (
                    metrics.topItems.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-black/40 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-white/5 text-[#E5A93C] font-sans font-black text-xs flex items-center justify-center border border-white/10">
                            #{idx + 1}
                          </span>
                          <div>
                            <span className="font-semibold text-white text-sm block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-white/50">
                              {item.count} portions sold
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-white text-sm block">
                            ₹{item.revenue}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            High Demand
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/50 text-xs">
                      No order items recorded yet today.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Channels & Highway Station Info (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Channel Distribution */}
                <div className="bg-[#0F1712]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                  <h3 className="font-sans text-lg font-bold text-white mb-1 tracking-wider">
                    Dining & Pickup Channels
                  </h3>
                  <p className="text-xs text-white/50 mb-4">
                    Distribution of traveler orders across formats
                  </p>

                  <div className="space-y-3">
                    {[
                      { label: 'Highway Takeaway', count: 2, pct: '50%', color: 'bg-[#E5A93C]' },
                      { label: 'Dine-In', count: 1, pct: '25%', color: 'bg-emerald-500' },
                      { label: 'Road Trip Pre-Order', count: 1, pct: '25%', color: 'bg-blue-500' },
                    ].map((channel, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/80 font-medium">{channel.label}</span>
                          <span className="font-mono text-white font-bold">{channel.pct}</span>
                        </div>
                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full ${channel.color}`} style={{ width: channel.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highway Station Operations Snapshot */}
                <div className="bg-[#0F1712]/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-3 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E5A93C]">
                      Station Corridor
                    </span>
                    <button
                      onClick={() => setActiveTab('operations')}
                      className="text-xs text-white/50 hover:text-white underline"
                    >
                      Configure
                    </button>
                  </div>

                  <h4 className="font-sans font-bold text-white text-base tracking-wider">
                    {storeSettings.activeHighwayCorridor}
                  </h4>

                  <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-xs space-y-1">
                    <div className="flex justify-between text-white/70">
                      <span>Kitchen Prep Time:</span>
                      <strong className="text-white">{storeSettings.prepTimeMinutes} Mins</strong>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Emergency Hotline:</span>
                      <strong className="text-[#E5A93C] font-mono">{storeSettings.contactHotline}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Dock */}
            <div className="bg-gradient-to-r from-[#0F1712] to-[#1a261d] border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3">
                <ChefHat className="w-8 h-8 text-[#E5A93C] shrink-0" />
                <div>
                  <h4 className="font-sans text-base sm:text-lg font-bold text-white tracking-wider">
                    Need to expedite kitchen tickets?
                  </h4>
                  <p className="text-xs text-white/60">
                    View active orders, mark tawa items ready, or communicate directly with travelers via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="px-5 py-2.5 rounded-full bg-[#E5A93C] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-xl"
                >
                  Go to Live Orders ({metrics.activeOrdersCount})
                </button>
                <button
                  onClick={() => setActiveTab('franchise')}
                  className="px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Franchise CRM ({metrics.newFranchiseLeadsCount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE KITCHEN & ORDERS */}
        {activeTab === 'orders' && (
          <div className="animate-fadeIn">
            <LiveOrdersTab
              orders={dashboardData?.orders || []}
              onUpdateStatus={handleUpdateOrderStatus}
              onRefresh={fetchDashboardData}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* TAB 3: FRANCHISE LEADS & CRM */}
        {activeTab === 'franchise' && (
          <div className="animate-fadeIn">
            <FranchiseLeadsTab
              inquiries={dashboardData?.franchiseInquiries || []}
              onUpdateLead={handleUpdateFranchiseLead}
              onRefresh={fetchDashboardData}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* TAB 4: MENU & 86 SYSTEM */}
        {activeTab === 'menu' && (
          <div className="animate-fadeIn">
            <MenuManagerTab
              unavailableItemIds={dashboardData?.unavailableItemIds || []}
              onToggleStock={handleToggleMenuStock}
              token={token}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* TAB 5: STATION OPERATIONS */}
        {activeTab === 'operations' && (
          <div className="animate-fadeIn">
            <OperationsTab
              settings={storeSettings}
              onUpdateSettings={handleUpdateSettings}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#1E3A5F] bg-[#0A1728] py-4 px-6 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <span>Indian Paratha Company &copy; {new Date().getFullYear()} • Station Operations</span>
        <div className="flex items-center gap-4 text-stone-400">
          <span>Logged in as: <strong className="text-white">{user.name}</strong></span>
          <span>•</span>
          <button onClick={onViewWebsite} className="hover:text-white underline">
            Open Customer Store
          </button>
        </div>
      </footer>
    </div>
  );
};
