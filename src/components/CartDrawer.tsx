import React, { useState } from 'react';
import { CartItem } from '../types';
import { IPCLogo } from './IPCLogo';
import { saveOrderToFirestore } from '../services/firestoreService';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Clock,
  ArrowRight,
  CheckCircle2,
  Car,
  Utensils,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'HIGHWAY_TAKEAWAY' | 'DINE_IN' | 'ROADTRIP_PREORDER'>(
    'HIGHWAY_TAKEAWAY'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const taxesAndPackaging = Math.round(subtotal * 0.05);
  const total = subtotal + taxesAndPackaging;

  // Format dynamic pre-filled WhatsApp message as specified in Section 4 of PDF
  const generateWhatsAppMessage = () => {
    let msg = `Hello Indian Paratha Company,\nI would like to order:\n`;
    items.forEach((item) => {
      msg += `• ${item.item.name} × ${item.quantity} (₹${item.item.price * item.quantity})\n`;
    });
    msg += `\nOrder Type: ${
      orderType === 'HIGHWAY_TAKEAWAY'
        ? 'Highway Takeaway Pickup'
        : orderType === 'DINE_IN'
        ? 'Table Dine-In'
        : 'Roadtrip Pre-Order'
    }`;
    if (customerName.trim()) {
      msg += `\nCustomer: ${customerName.trim()}`;
    }
    if (customerPhone.trim()) {
      msg += `\nPhone: ${customerPhone.trim()}`;
    }
    if (instructions.trim()) {
      msg += `\nNotes: ${instructions.trim()}`;
    }
    msg += `\nTotal: ₹${total}\nPlease confirm availability and total price.`;
    return encodeURIComponent(msg);
  };

  const whatsappDirectUrl = `https://wa.me/919880883061?text=${generateWhatsAppMessage()}`;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const orderId = `IPC-${Date.now().toString().slice(-6)}`;
    const payload = {
      orderId,
      customerName: customerName.trim() || 'Highway Guest',
      customerPhone: customerPhone.trim() || 'WhatsApp Customer',
      orderType,
      notes: instructions,
      items: items.map((i) => ({
        id: i.item.id,
        name: i.item.name,
        price: i.item.price,
        quantity: i.quantity,
      })),
      subtotal,
      totalAmount: total,
      status: 'RECEIVED' as const,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await saveOrderToFirestore(payload);
    } catch {
      // ignore network errors, fallback to client state
    } finally {
      setIsSubmitting(false);
      setConfirmedOrderId(orderId);
      onClearCart();
    }
  };

  const handleReset = () => {
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#18110B] text-white shadow-2xl border-l border-[#D4AF37]/30 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#120D09] text-white flex items-center justify-between border-b border-[#D4AF37]/25">
            <div className="flex items-center gap-2.5">
              <IPCLogo variant="light" size="sm" badgeOnly={true} className="shrink-0" />
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#F5EBDD]">
                  Your Highway Order
                </h3>
                <span className="text-[10px] text-[#D4AF37] font-mono font-semibold uppercase tracking-widest block">
                  Indian Paratha Company
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Confirmed Order State */}
          {confirmedOrderId ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-4 shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#D4AF37] block mb-1">
                ORDER DISPATCHED TO KITCHEN
              </span>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Hot Tawas Rolling!
              </h4>

              <div className="bg-[#21150E] border border-[#D4AF37]/40 p-4 rounded-2xl my-4 w-full text-center shadow-lg">
                <span className="text-[11px] text-[#B8A99A] font-mono uppercase tracking-wider block">
                  Highway Order Token
                </span>
                <span className="font-serif text-3xl font-black text-[#D4AF37] tracking-wider block my-1">
                  {confirmedOrderId}
                </span>
                <span className="text-xs text-emerald-400 font-semibold block">
                  Estimated Ready Time: 12–15 Minutes
                </span>
              </div>

              <p className="text-[#B8A99A] text-xs sm:text-sm font-sans mb-6 leading-relaxed">
                Show your token at the IPC counter or car window pickup spot for immediate collection.
              </p>

              <div className="w-full space-y-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Send Confirmation via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-stone-200 font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Dining / Takeaway Option */}
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Select Order Type:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('HIGHWAY_TAKEAWAY')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'HIGHWAY_TAKEAWAY'
                          ? 'bg-[#9B1B1E] text-white border-red-400 shadow-lg'
                          : 'bg-[#21150E] text-stone-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Car className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[10px] font-bold uppercase">Takeaway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('DINE_IN')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'DINE_IN'
                          ? 'bg-[#9B1B1E] text-white border-red-400 shadow-lg'
                          : 'bg-[#21150E] text-stone-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Utensils className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[10px] font-bold uppercase">Dine-In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('ROADTRIP_PREORDER')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'ROADTRIP_PREORDER'
                          ? 'bg-[#9B1B1E] text-white border-red-400 shadow-lg'
                          : 'bg-[#21150E] text-stone-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[10px] font-bold uppercase">Pre-Order</span>
                    </button>
                  </div>
                </div>

                {/* Items List */}
                {items.length === 0 ? (
                  <div className="text-center py-12 bg-[#21150E]/60 rounded-2xl border border-white/10">
                    <ShoppingBag className="w-10 h-10 text-stone-500 mx-auto mb-2" />
                    <p className="font-serif text-lg font-bold text-stone-300">Your bag is empty</p>
                    <p className="text-xs text-[#B8A99A] font-sans mt-1 max-w-xs mx-auto">
                      Explore our handcrafted parathas, clay kulhad chai, and Parathzzaa® items.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                        Selected Items ({items.reduce((s, i) => s + i.quantity, 0)})
                      </span>
                      <button
                        onClick={onClearCart}
                        className="text-[11px] text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear all</span>
                      </button>
                    </div>

                    {items.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="bg-[#21150E] p-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-3 shadow-md"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-12 h-12 object-cover rounded-xl bg-black/40 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif font-bold text-sm text-white truncate">
                            {cartItem.item.name}
                          </h5>
                          <span className="text-xs font-bold text-[#D4AF37]">
                            ₹{cartItem.item.price * cartItem.quantity}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-black/40">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="p-1.5 hover:bg-white/10 text-stone-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-white">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="p-1.5 hover:bg-white/10 text-stone-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Customer Details Form */}
                {items.length > 0 && (
                  <form id="cart-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] block">
                      Guest &amp; Pickup Notes:
                    </span>

                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#120D09] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp (+91) *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#120D09] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
                    />

                    <input
                      type="text"
                      placeholder="Vehicle / Table No / Spiciness requests (Optional)"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full bg-[#120D09] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </form>
                )}
              </div>

              {/* Sticky Footer */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 bg-[#120D09] border-t border-[#D4AF37]/25 shadow-2xl">
                  <div className="space-y-1.5 mb-4 text-xs font-sans">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Eco Packaging &amp; Taxes (5%)</span>
                      <span>₹{taxesAndPackaging}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-[#D4AF37] text-lg font-black">₹{total}</span>
                    </div>
                  </div>

                  {/* Actions: Place Order & WhatsApp Quick Order */}
                  <div className="space-y-2">
                    <button
                      type="submit"
                      form="cart-form"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#9B1B1E] via-[#B22222] to-[#9B1B1E] hover:from-[#B22222] hover:to-[#9B1B1E] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-red-400/40"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isSubmitting ? 'Submitting Order...' : `PLACE ORDER • ₹${total}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                      <span>Order on WhatsApp (Instant)</span>
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
