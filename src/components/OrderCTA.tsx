import React from 'react';
import { ShoppingBag, ArrowRight, UtensilsCrossed } from 'lucide-react';

interface OrderCTAProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export const OrderCTA: React.FC<OrderCTAProps> = ({ onOrderNow, onViewMenu }) => {
  return (
    <section id="order-cta" className="py-16 sm:py-24 bg-[#9B1B1E] text-white relative overflow-hidden">
      {/* Texture & decorative circles */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#D49B44] bg-black/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
          FAST & WHOLESOME
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-3 leading-tight">
          HUNGRY?
        </h2>

        <p className="font-serif text-lg sm:text-2xl text-[#FAF6F0] italic max-w-2xl mx-auto mb-8 font-normal">
          YOUR FAVOURITE IPC MEALS ARE JUST A CLICK AWAY.
        </p>

        <p className="text-stone-200 text-xs sm:text-sm max-w-lg mx-auto mb-8 font-sans leading-relaxed">
          Order for table service, fast takeaway on the highway, or pre-order ahead of your journey.
          Freshly prepared on hot tawas with 100% pure vegetarian ingredients.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="order-cta-order-now-btn"
            onClick={onOrderNow}
            className="w-full sm:w-auto px-8 py-4 bg-[#0B192C] hover:bg-[#162A45] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 border border-[#D49B44]/40"
          >
            <ShoppingBag className="w-4 h-4 text-[#D49B44]" />
            <span>ORDER NOW</span>
            <ArrowRight className="w-4 h-4 text-stone-300" />
          </button>

          <button
            id="order-cta-view-menu-btn"
            onClick={onViewMenu}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-black/20 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-full border border-white/40 hover:border-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>VIEW MENU</span>
          </button>
        </div>
      </div>
    </section>
  );
};
