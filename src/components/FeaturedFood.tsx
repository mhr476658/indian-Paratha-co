import React, { useState } from 'react';
import { FEATURED_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Plus, Check, Star, Heart } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

interface FeaturedFoodProps {
  onAddToCart: (item: MenuItem) => void;
  onSelectItemDetail?: (item: MenuItem) => void;
}

export const FeaturedFood: React.FC<FeaturedFoodProps> = ({
  onAddToCart,
  onSelectItemDetail,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="featured" className="py-16 sm:py-24 bg-[#0B192C] text-[#FAF6F0] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B1B1E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#D49B44]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D49B44]">
                MOST LOVED
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              FAVOURITES FROM IPC
            </h2>
          </div>
          <p className="text-stone-400 text-sm sm:text-base max-w-sm mt-2 sm:mt-0 font-sans">
            The culinary icons that have made IPC a household name along NH7 and across India.
          </p>
        </div>

        {/* Swipe Carousel on Mobile / 3-Column Responsive Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {FEATURED_ITEMS.map((item) => {
            const isAdded = addedIds[item.id];

            return (
              <Card3DTilt
                key={item.id}
                maxTilt={9}
                glare={true}
                glareOpacity={0.2}
                className="min-w-[85vw] sm:min-w-0 snap-center h-full"
              >
                <div
                  id={`featured-card-${item.id}`}
                  onClick={() => onSelectItemDetail?.(item)}
                  className="h-full bg-[#102237] rounded-2xl border border-[#1E3A5F] hover:border-[#D4AF77]/60 p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Photo with Badge */}
                    <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-4 bg-black/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 bg-[#0B192C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#D4AF77]/30 backdrop-blur-sm">
                        {item.category}
                      </div>

                      <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] text-[#D4AF77] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF77]" />
                        <span>Guest Favourite</span>
                      </div>
                    </div>

                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF77] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-2xl font-black text-[#D4AF77] shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm font-sans line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Add Button */}
                  <div className="pt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between mt-auto">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                      Pure Vegetarian
                    </span>

                    <button
                      id={`btn-featured-add-${item.id}`}
                      onClick={(e) => handleAdd(item, e)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-1.5 shadow-md active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#9B1B1E] hover:bg-[#B22222] text-white border border-[#B22222]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center text-xs text-stone-400 mt-2 flex items-center justify-center gap-1">
          <span>Swipe to explore more favorites</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
};
