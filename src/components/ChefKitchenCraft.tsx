import React, { useState } from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';

export const ChefKitchenCraft: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const craftMoments = [
    {
      id: 'tawa-paratha',
      title: 'The Cast-Iron Tawa Sizzle',
      subtitle: 'Hand-Stretched & Heavy Griddled',
      description:
        'Watch our master ustaads hand-roll stone-ground whole wheat dough with precision, stuffing it with mountain potatoes or malai paneer before searing on 200°C cast-iron tawas.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=85',
      tag: 'Live Station Craft',
    },
    {
      id: 'kulhad-chai',
      title: 'Hand-Pounded Kulhad Chai',
      subtitle: 'Slow Boiled in Earthen Vessels',
      description:
        'Fresh ginger roots and green cardamom pods are bruised in stone mortars and infused into brisk mountain tea leaves, aerated from high vessels into porous clay cups.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=85',
      tag: 'Chai Sommelier Ritual',
    },
    {
      id: 'parathzzaa-craft',
      title: 'The Original Parathzzaa® Bake',
      subtitle: 'Wood-Fired Crust Innovation',
      description:
        'Combining rustic Punjabi dhaba heritage with Italian artisanal baking: our flaky multi-layered parathas are loaded with mozzarella, charred tikka toppings, and baked till bubbling.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=85',
      tag: 'Proprietary Innovation',
    },
    {
      id: 'dum-biryani',
      title: 'Clay Handi Sealed Dum',
      subtitle: 'Slow Steamed Royal Basmati',
      description:
        'Fragrant saffron basmati rice layered with garden herbs, caramelized shallots, and rich desi ghee, slow-steamed under natural whole-wheat dough seals.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&auto=format&fit=crop&q=85',
      tag: 'Slow Food Heritage',
    },
  ];

  return (
    <section
      id="chef-craft"
      className="py-20 sm:py-28 bg-[#0B0D13] text-white relative overflow-hidden border-t border-[#E6CA85]/20"
    >
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#E6CA85]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E6CA85] flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-[#E6CA85]" />
              MASTER CULINARY ARTISANS
            </span>
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
            Live Kitchen &amp; <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F3E5AB] to-[#E6CA85]">Chef Craft</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Take a sensory journey behind our open hearth stations where traditional Punjabi techniques meet modern culinary standards on the highway.
          </p>
        </div>

        {/* Feature showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Active Moment Visual Stage */}
          <div className="lg:col-span-7 relative h-80 sm:h-[450px] rounded-3xl overflow-hidden border border-[#E6CA85]/35 shadow-2xl bg-black/60 group">
            <img
              src={craftMoments[activeStoryIndex].image}
              alt={craftMoments[activeStoryIndex].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/30 to-transparent" />

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#E6CA85] text-xs font-mono font-bold uppercase tracking-wider border border-[#E6CA85]/40 shadow-lg">
                {craftMoments[activeStoryIndex].tag}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-[#E6CA85] text-xs font-mono uppercase tracking-widest mb-1">
                {craftMoments[activeStoryIndex].subtitle}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {craftMoments[activeStoryIndex].title}
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm max-w-xl line-clamp-2">
                {craftMoments[activeStoryIndex].description}
              </p>
            </div>
          </div>

          {/* Interactive Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {craftMoments.map((moment, idx) => {
              const isActive = activeStoryIndex === idx;
              return (
                <button
                  key={moment.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border flex items-start justify-between gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#161B26] to-[#1A2030] border-[#E6CA85] shadow-xl scale-[1.02]'
                      : 'bg-[#121620]/80 hover:bg-[#161B26] border-white/10 hover:border-white/25 text-slate-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isActive ? 'text-[#E6CA85]' : 'text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400">
                        {moment.tag}
                      </span>
                    </div>

                    <h4
                      className={`font-serif text-base sm:text-lg font-bold ${
                        isActive ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {moment.title}
                    </h4>

                    {isActive && (
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {moment.description}
                      </p>
                    )}
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform mt-2 ${
                      isActive ? 'text-[#E6CA85] translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
