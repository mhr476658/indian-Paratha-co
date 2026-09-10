import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface MadeFreshProps {
  onExploreMenu?: () => void;
}

export const MadeFresh: React.FC<MadeFreshProps> = ({ onExploreMenu }) => {
  const pillars = [
    {
      number: '01',
      title: '100% Whole Wheat Dough',
      subtitle: 'Zero Maida • Stone Ground',
      description:
        'We knead 100% whole grain wheat flour with pure filtered water every two hours. Never bleached, never frozen, ensuring a wholesome, naturally digestible paratha crust.',
      icon: '🌾',
    },
    {
      number: '02',
      title: 'Cast-Iron Hearth Griddling',
      subtitle: 'Heavy Tawas • Golden Crust',
      description:
        'Each paratha is griddled fresh upon order on heavy seasoned cast-iron tawas. The steady radiant heat seals in the stuffing while creating that quintessential flaky crisp exterior.',
      icon: '🍳',
    },
    {
      number: '03',
      title: 'Farm Churned White Butter',
      subtitle: 'Desi Makhan • Pure Ghee',
      description:
        'Topped with a melting dollop of fresh cultured white butter sourced from local dairy farms. No preservatives, no yellow palm oils—just pure, aromatic traditional makhan.',
      icon: '🧈',
    },
    {
      number: '04',
      title: 'Heirloom 16-Spice Masala',
      subtitle: 'Stone Pounded • Small Batches',
      description:
        'Our proprietary garam masala combines whole star anise, black cardamom, mace, cinnamon, and roasted cumin roasted gently and stone-pounded weekly by our master chefs.',
      icon: '🌶️',
    },
  ];

  return (
    <section
      id="made-fresh"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Texture & Warm Glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#2E4434]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
              OUR KITCHEN PHILOSOPHY
            </span>
          </div>

          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
            MADE FRESH. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">SERVED HOT.</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            We believe roadside dining should never compromise on purity or culinary craftsmanship. From grain to griddle, every step celebrates wholesome Indian heritage.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-7 sm:p-8 rounded-3xl bg-[#0F1712]/95 border border-white/15 hover:border-[#E5A93C]/70 shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl">{pillar.icon}</span>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#E5A93C] bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="font-sans text-xl font-bold text-white mb-1 group-hover:text-[#E5A93C] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-[#E5A93C] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  {pillar.subtitle}
                </p>

                <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-white/80 group-hover:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                <span>100% Guaranteed Purity</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
