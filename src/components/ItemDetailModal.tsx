import React, { useState } from 'react';
import { MenuItem } from '../types';
import { adminStore } from '../lib/adminStore';
import { X, Plus, Minus, Sparkles, Flame, Check, MessageCircle, ShoppingBag } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item);
    }
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Indian Paratha Company,\nI would like to order:\n• ${item.name} × ${quantity} (₹${item.price * quantity})\nPlease confirm availability and prep time.`
  );
  const whatsappUrl = `https://wa.me/919880883061?text=${whatsappMsg}`;

  return (
    <div
      id="item-detail-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#1C130D] text-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D4AF37]/40 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Food Visual */}
        <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C130D] via-transparent to-black/40" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>100% Pure Veg</span>
            </div>

            {item.isSignature && (
              <div className="bg-[#9B1B1E] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow flex items-center gap-1 border border-red-400/30">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>IPC Signature</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#D4AF37] block">
                {item.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {item.name}
              </h3>
            </div>
            <span className="font-serif text-3xl font-black text-[#D4AF37]">
              ₹{item.price}
            </span>
          </div>
        </div>

        {/* Details & Description */}
        <div className="p-6 sm:p-7 space-y-4">
          <p className="text-[#B8A99A] text-xs sm:text-sm leading-relaxed font-sans">
            {item.description}
          </p>

          {item.pairing && (
            <div className="p-3.5 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-xs text-[#F5EBDD] flex items-center gap-2">
              <span className="font-mono text-[#D4AF37] font-bold uppercase tracking-wider">Chef's Pairing:</span>
              <span>{item.pairing}</span>
            </div>
          )}

          {/* Spice Level & Allergens */}
          <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/10">
            <span className="text-[11px] font-mono text-stone-400">Fresh Cast-Iron Tawa Prep</span>
            {item.spiceLevel && (
              <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
                <Flame className="w-3.5 h-3.5 text-[#A4492D]" />
                <span>Spice Level {item.spiceLevel} of 3</span>
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
              Quantity:
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif text-lg font-bold text-white px-2">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dual Action CTAs: Add To Order & WhatsApp Direct */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#9B1B1E] via-[#B22222] to-[#9B1B1E] hover:from-[#B22222] hover:to-[#9B1B1E] text-white border border-red-400/40'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO ORDER</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>ADD TO ORDER • ₹{item.price * quantity}</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                adminStore.submitOrder({
                  customerName: 'Highway Food Lover',
                  phone: '+91 98808 83061',
                  orderType: 'Takeaway',
                  items: [
                    {
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: quantity,
                    },
                  ],
                  total: item.price * quantity,
                  notes: `Direct Order via WhatsApp: ${item.name} x${quantity}`,
                }).catch((err) => console.error(err));
              }}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Order this on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
