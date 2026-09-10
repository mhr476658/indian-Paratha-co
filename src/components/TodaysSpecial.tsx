import React from 'react';
import { ShoppingBag, Sparkles, Clock, Flame, Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MenuItem } from '../types';

interface TodaysSpecialProps {
  onOrderSpecial: (item: MenuItem) => void;
  onViewMenu: () => void;
}

export const TodaysSpecial: React.FC<TodaysSpecialProps> = ({ onOrderSpecial, onViewMenu }) => {
  const specialItem: MenuItem = {
    id: 'special-highway-royal-feast',
    name: 'IPC Highway Royal Parathzzaa® Feast Combo',
    hindiName: 'शाही हाईवे परांठा-पिज़्ज़ा दावत',
    category: 'COMBOS',
    price: 499,
    description: 'Chef Nirmal Sandhu’s signature highway feast: 1 large IPC Supreme Paneer Tikka Parathzzaa® + 2 Clay Kulhad Ginger Cardamom Chais + 1 portion Sweet Amritsari Malai Rabdi Jamun with fresh mint dip.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1200&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 2,
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    pairing: 'Refreshing Mint Chutney & Spiced Onion Pickles',
  };

  return (
    <section
      id="todays-special"
      className="py-16 sm:py-24 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2E4434]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0F1712]/95 rounded-3xl border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Promotional Image */}
            <div className="lg:col-span-6 relative h-80 sm:h-96 lg:h-[500px] w-full overflow-hidden bg-black/60">
              <img
                src={specialItem.image}
                alt={specialItem.name}
                className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712] via-transparent to-black/50" />

              {/* Special Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>TODAY'S SIGNATURE SPECIAL</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/75 text-[#E5A93C] text-[11px] font-mono font-bold tracking-wider backdrop-blur-md border border-[#E5A93C]/40 w-fit">
                  Save ₹180 • Highway Bestseller
                </span>
              </div>

              {/* Price Callout */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 flex items-center justify-between z-10">
                <div>
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest block">Special Combo Deal</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-sans font-bold text-[#E5A93C]">₹{specialItem.price}</span>
                    <span className="text-sm text-white/50 line-through">₹680</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  27% OFF
                </span>
              </div>
            </div>

            {/* Right Details & Action */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-[#E5A93C]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E5A93C]">
                    LIMITED TIME CATERING COMBO
                  </span>
                </div>

                <h3 className="font-sans text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {specialItem.name}
                </h3>

                <p className="text-[#E5A93C] text-xs font-serif italic mb-4">
                  {specialItem.hindiName}
                </p>

                <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  {specialItem.description}
                </p>

                {/* Inclusions checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1x Large Paneer Tikata Parathzzaa®</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80">
                    <Check className="w-4 h-4 text-[#E5A93C] shrink-0" />
                    <span>2x Clay Kulhad Adrak Elaichi Chai</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>1x Amritsari Malai Rabdi Jamun</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Mint &amp; Pickled Onion Dips</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
