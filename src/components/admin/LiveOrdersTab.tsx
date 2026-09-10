import React, { useState } from 'react';
import {
  Clock,
  Search,
  CheckCircle2,
  ChefHat,
  Car,
  Utensils,
  Phone,
  MessageCircle,
  Filter,
  RefreshCw,
  ShoppingBag,
  IndianRupee,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  orderType: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  status: string;
}

interface LiveOrdersTabProps {
  orders: OrderRecord[];
  onUpdateStatus: (orderId: string, newStatus: string) => Promise<void>;
  onRefresh: () => void;
  isLoading: boolean;
}

export const LiveOrdersTab: React.FC<LiveOrdersTabProps> = ({
  orders,
  onUpdateStatus,
  onRefresh,
  isLoading,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const STATUS_OPTIONS = [
    'Preparing Fresh',
    'Ready for Pickup',
    'Completed',
    'Cancelled',
  ];

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const status = (order.status || '').toLowerCase();
    const filter = (filterStatus || 'ALL').toLowerCase();
    const q = (searchQuery || '').toLowerCase();
    const orderId = (order.orderId || (order as any).id || '').toLowerCase();
    const customerName = (order.customerName || (order as any).name || '').toLowerCase();
    const phone = (order.phone || (order as any).customerPhone || '');

    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'ACTIVE'
        ? order.status === 'Preparing Fresh' || order.status === 'Ready for Pickup'
        : status.includes(filter));

    const matchesSearch =
      orderId.includes(q) ||
      customerName.includes(q) ||
      phone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      await onUpdateStatus(orderId, status);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Preparing Fresh':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Ready for Pickup':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Completed':
        return 'bg-stone-500/20 text-stone-300 border-stone-500/40';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  const getOrderTypeIcon = (type?: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('takeaway') || t.includes('highway') || t.includes('road_trip') || t.includes('pickup')) {
      return <Car className="w-3.5 h-3.5 text-[#D49B44]" />;
    }
    return <Utensils className="w-3.5 h-3.5 text-stone-300" />;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#D49B44]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Orders' },
            { id: 'ACTIVE', label: '⚡ Active (Kitchen)' },
            { id: 'Preparing', label: 'Preparing' },
            { id: 'Ready', label: 'Ready' },
            { id: 'Completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                filterStatus === tab.id
                  ? 'bg-[#9B1B1E] text-white border-[#DE2428]'
                  : 'bg-[#0D1B2A] text-stone-300 hover:text-white border-[#1E3A5F]'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-[#0D1B2A] border border-[#1E3A5F] text-stone-300 hover:text-white hover:bg-white/5 transition-all ml-1 disabled:opacity-50"
            title="Refresh Orders"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#D49B44]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-12 text-center text-stone-400">
          <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white font-serif">No orders match your filter</h4>
          <p className="text-xs text-stone-400 mt-1">
            New orders from website highway travelers will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOrders.map((order) => {
            const isUpdating = updatingId === order.orderId;
            const timeAgo = Math.round(
              (Date.now() - new Date(order.timestamp).getTime()) / (1000 * 60)
            );

            return (
              <div
                key={order.orderId}
                className="bg-[#112338] border border-[#1E3A5F] hover:border-[#D49B44]/50 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Row: Order ID, Type, Time */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-white tracking-wider">
                        #{order.orderId}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#162942] border border-[#1E3A5F] text-stone-300">
                        {getOrderTypeIcon(order.orderType)}
                        <span>{order.orderType}</span>
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between text-xs text-stone-300 mb-3 pb-3 border-b border-[#1E3A5F]/60">
                    <div>
                      <strong className="text-white font-semibold text-sm block">
                        {order.customerName}
                      </strong>
                      <span className="text-stone-400 font-mono">{order.phone}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[11px]">
                        {timeAgo <= 1 ? 'Just now' : `${timeAgo} mins ago`}
                      </span>
                      <span className="text-white font-bold text-sm">
                        ₹{order.total}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-1.5 mb-4 bg-[#0D1B2A]/70 p-3 rounded-xl border border-[#1E3A5F]/40">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-stone-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#D49B44] w-4 text-center">
                            {item.quantity}x
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-stone-400 font-mono">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-2 border-t border-[#1E3A5F]/60 flex items-center justify-between gap-2">
                  {/* Quick Action Button */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {order.status === 'Preparing Fresh' && (
                      <button
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(order.orderId, 'Ready for Pickup')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'Ready for Pickup' && (
                      <button
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(order.orderId, 'Completed')}
                        className="px-3 py-1.5 rounded-lg bg-[#0B192C] hover:bg-[#162942] border border-[#1E3A5F] text-stone-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Complete Order</span>
                      </button>
                    )}

                    {order.status === 'Completed' && (
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Delivered / Picked Up</span>
                      </span>
                    )}

                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="text-xs bg-[#0D1B2A] border border-[#1E3A5F] rounded-lg px-2 py-1.5 text-stone-300 focus:outline-none focus:border-[#D49B44]"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* WhatsApp Customer Contact */}
                  <a
                    href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                      order.customerName
                    )},%20your%20Indian%20Paratha%20Company%20order%20%23${order.orderId}%20is%20${encodeURIComponent(
                      order.status
                    )}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Message on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
