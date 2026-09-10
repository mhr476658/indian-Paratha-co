import React, { useState } from 'react';
import { CHAI_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Coffee, Plus, Check, Flame, Sparkles, ArrowUpRight } from 'lucide-react';

interface ChaiExperienceProps {
  onAddToCart: (item: MenuItem) => void;
  onExploreChaiCategory: () => void;
}

export const ChaiExperience: React.FC<ChaiExperienceProps> = ({
  onAddToCart,
  onExploreChaiCategory,
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddChai = (chai: typeof CHAI_ITEMS[0]) => {
    const item: MenuItem = {
      id: chai.id,
      name: chai.name,
      category: 'HOT BLENDS',
      price: chai.price,
      description: chai.description,
      image: chai.image,
      isVegetarian: true,
      isSignature: true,
    };
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [chai.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [chai.id]: false }));
    }, 1200);
  };

  return (
    <section id="chai" className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10">
      {/* Warm amber glow background */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#2E4434]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#E5A93C]">
              THE RITUAL OF TAPRI &amp; KULHAD
            </span>
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            EVERY GREAT CONVERSATION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">
              STARTS WITH CHAI.
            </span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Slow simmered in brass vessels with whole botanical spices, crushed hill ginger,
            and farm-fresh dairy milk. Poured piping hot into porous terracotta kulhads.
          </p>
        </div>

        {/* Featured Chai Hero Visual with Animated Steam */}
        <div className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0F1712]/95 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Image with Rising Steam Effect */}
            <div className="md:col-span-6 relative aspect-square sm:aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=80"
                alt="Clay kulhad with piping hot steaming aromatic masala chai"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Dynamic Animated Steam Whiffs */}
              <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                <div className="w-4 h-24 bg-white/20 blur-md rounded-full animate-steam-1 -ml-6 -mt-16" />
                <div className="w-5 h-28 bg-white/25 blur-lg rounded-full animate-steam-2 mt-[-60px]" />
                <div className="w-3 h-20 bg-white/15 blur-sm rounded-full animate-steam-3 ml-8 -mt-20" />
              </div>

              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-[#E5A93C] font-mono">
                Freshly Brewed Every 20 Mins
              </div>
            </div>

            {/* Editorial Tea Story */}
            <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#E5A93C]" />
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#E5A93C]">
                  7 SECRET HIGHWAY SPICES
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-3">
                IPC Signature Masala Chai
              </h3>

              <p className="text-white/70 text-sm leading-relaxed font-sans mb-5">
                Our bespoke blend incorporates green cardamom from Idukki, organic ginger from Wayanad,
                cinnamon quills, and black pepper roasted gently to create the definitive
                highway road-trip companion.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="font-sans text-3xl font-bold text-[#E5A93C]">₹80</span>
                <button
                  id="chai-hero-add-btn"
                  onClick={() => handleAddChai(CHAI_ITEMS[1])}
                  className="px-6 py-2.5 bg-white hover:bg-[#E5A93C] text-black text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Order Masala Chai
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Chai Varieties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {CHAI_ITEMS.map((chai) => {
            const isAdded = addedIds[chai.id];

            return (
              <div
                key={chai.id}
                id={`chai-card-${chai.id}`}
                className="bg-[#0F1712]/95 border border-white/15 hover:border-[#E5A93C]/60 p-5 rounded-3xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 backdrop-blur-xl shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-sans text-lg font-bold text-white group-hover:text-[#E5A93C] transition-colors">
                        {chai.name}
                      </h4>
                      <span className="text-[11px] text-white/50 font-mono block mt-0.5">
                        {chai.brewingTime}
                      </span>
                    </div>
                    <span className="font-sans text-xl font-bold text-[#E5A93C]">
                      ₹{chai.price}
                    </span>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                    {chai.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
                    Served in Earthen Kulhad
                  </span>

                  <button
                    id={`btn-add-chai-${chai.id}`}
                    onClick={() => handleAddChai(chai)}
                    className={`min-h-[34px] px-3.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-[#E5A93C] text-black shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add • ₹{chai.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            id="explore-chai-cta-btn"
            onClick={onExploreChaiCategory}
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white hover:text-[#E5A93C] text-xs font-bold uppercase tracking-[0.25em] rounded-full border border-white/20 hover:border-[#E5A93C] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>EXPLORE CHAI &amp; BEVERAGES</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
