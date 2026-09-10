import React from 'react';
import { WHY_IPC_ITEMS } from '../data/content';
import { Sparkles, ShieldCheck, Leaf, Zap, HeartHandshake } from 'lucide-react';

export const WhyIPC: React.FC = () => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#9B1B1E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#9B1B1E]" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-[#2D7A4D]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#D49B44]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-[#9B1B1E]" />;
    }
  };

  return (
    <section id="why-ipc" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#0B192C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#9B1B1E]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9B1B1E]">
                THE IPC PROMISE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight">
              WHY IPC?
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mt-3 md:mt-0 font-sans">
            Crafted for highway journeys and urban cravings with unwavering devotion to quality.
          </p>
        </div>

        {/* Mobile: Horizontal Swipeable Slider | Desktop: Responsive 5-column or 3+2 Grid */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {WHY_IPC_ITEMS.map((card) => (
            <div
              key={card.number}
              className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 snap-center bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Number & Icon header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl font-black text-[#9B1B1E]/40 group-hover:text-[#9B1B1E] transition-colors">
                    {card.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderIcon(card.iconName)}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight mb-1">
                  {card.title}
                </h3>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9B1B1E] mb-3">
                  {card.tagline}
                </h4>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed font-sans">
                  "{card.description}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-stone-400 group-hover:text-[#0B192C] transition-colors">
                <span>IPC STANDARD</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="lg:hidden text-center text-xs text-stone-400 mt-2 font-sans flex items-center justify-center gap-1.5">
          <span>Swipe horizontally to explore more</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
};
