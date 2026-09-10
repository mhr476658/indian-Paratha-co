import React, { useState } from 'react';
import { PARATHZZAA_ITEMS } from '../data/menu';
import { ParathzzaaItem, MenuItem } from '../types';
import { Plus, Check, Flame, Pizza, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react';

interface ParathzzaaProps {
  onAddToCart: (item: MenuItem) => void;
  onExploreFullMenu: () => void;
}

export const Parathzzaa: React.FC<ParathzzaaProps> = ({ onAddToCart, onExploreFullMenu }) => {
  const [selectedItem, setSelectedItem] = useState<ParathzzaaItem>(PARATHZZAA_ITEMS[0]);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (pz: ParathzzaaItem) => {
    // Map to MenuItem
    const menuItem: MenuItem = {
      id: pz.id,
      name: pz.name,
      category: 'PARATHZZAA',
      price: pz.price,
      description: pz.description,
      image: pz.image,
      isVegetarian: true,
      isSignature: true,
    };
    onAddToCart(menuItem);

    setAddedIds((prev) => ({ ...prev, [pz.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [pz.id]: false }));
    }, 1500);
  };

  return (
    <section
      id="parathzzaa"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Dramatic ambient glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#2E4434]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 mb-3 shadow-xl backdrop-blur-md">
            <Pizza className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
              TRADEMARK CULINARY BREAKTHROUGH
            </span>
          </div>

          <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3">
            PARATHZZAA®
          </h2>

          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#E5A93C] mb-4 font-mono">
            WHERE PARATHA MEETS PIZZA.
          </h3>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            IPC's signature fusion concept combines traditional Indian Paratha with the globally loved
            experience of Pizza. A crisp hand-rolled whole wheat crust, rich house tomato makhani reduction,
            and bubbling molten 100% mozzarella cheese.
          </p>
        </div>

        {/* Featured Interactive Showcase */}
        <div className="bg-[#0F1712]/95 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Big Product Visual */}
            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  Original Recipe
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-[#E5A93C] font-semibold tracking-wider uppercase block font-mono">
                      Whole Wheat Crust
                    </span>
                    <span className="font-sans text-2xl font-bold text-white">
                      {selectedItem.name}
                    </span>
                  </div>
                  <span className="font-sans text-3xl font-bold text-[#E5A93C]">
                    ₹{selectedItem.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Details & Add CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#E5A93C] uppercase font-mono">
                  ACTIVE SELECTION
                </span>
              </div>

              <h4 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-2">
                {selectedItem.name}
              </h4>

              <p className="text-[#E5A93C] text-xs uppercase tracking-widest font-semibold mb-4 font-mono">
                {selectedItem.toppingHighlight}
              </p>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans mb-6">
                {selectedItem.description}
              </p>

              {/* Ingredients Chips */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2 font-mono">
                  Key Ingredients &amp; Craft:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 bg-black/40 text-white/90 rounded-full border border-white/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order / Add to Cart Action */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  id={`parathzzaa-add-${selectedItem.id}`}
                  onClick={() => handleAdd(selectedItem)}
                  className="flex-1 py-4 px-6 bg-white hover:bg-[#E5A93C] text-black font-bold text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all duration-200 shadow-xl flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  {addedIds[selectedItem.id] ? (
                    <>
                      <Check className="w-5 h-5 text-black" />
                      <span>Added to Order</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add {selectedItem.name} • ₹{selectedItem.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Flavours Showcase Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white/60 font-mono">
              ALL 9 CHEF CREATIONS (TAP TO PREVIEW)
            </h4>
            <span className="text-xs text-[#E5A93C] hidden sm:block font-mono">Scroll to explore flavors</span>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-9 gap-3 overflow-x-auto no-scrollbar pb-4 snap-x">
            {PARATHZZAA_ITEMS.map((pz) => {
              const isSelected = selectedItem.id === pz.id;
              return (
                <button
                  key={pz.id}
                  id={`select-pz-${pz.id}`}
                  onClick={() => setSelectedItem(pz)}
                  className={`min-w-[150px] sm:min-w-0 p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between shrink-0 snap-start cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 border-white ring-2 ring-white/50 shadow-xl scale-105'
                      : 'bg-[#0F1712] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-2 bg-black">
                    <img
                      src={pz.image}
                      alt={pz.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-sans font-bold text-xs text-white truncate">
                    {pz.name.replace(' Parathzzaa', '')}
                  </div>
                  <div className="text-xs font-semibold text-[#E5A93C] mt-1 flex items-center justify-between">
                    <span>₹{pz.price}</span>
                    {pz.isSpicy && <Flame className="w-3 h-3 text-[#E5A93C] inline" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Menu CTA */}
        <div className="text-center pt-4">
          <button
            id="view-all-parathzzaa-btn"
            onClick={onExploreFullMenu}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white hover:text-[#E5A93C] text-xs font-bold uppercase tracking-[0.2em] rounded-full border border-white/20 hover:border-[#E5A93C] transition-all duration-300 cursor-pointer"
          >
            <span>VIEW ALL PARATHZZAA IN FULL MENU</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
