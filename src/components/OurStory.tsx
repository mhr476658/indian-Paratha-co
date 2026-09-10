import React from 'react';
import { STORY_TIMELINE } from '../data/content';
import { Calendar, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { IPCLogo } from './IPCLogo';

export const OurStory: React.FC = () => {
  const getIcon = (phase: string) => {
    switch (phase) {
      case '2014':
        return <Calendar className="w-5 h-5" />;
      case 'GROWTH':
        return <Compass className="w-5 h-5" />;
      case 'INNOVATION':
        return <Sparkles className="w-5 h-5" />;
      case 'EXPANSION':
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle background radial light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#2E4434]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          <IPCLogo variant="light" size="lg" badgeOnly={true} className="mb-4 drop-shadow-xl" />

          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#E5A93C]">
              OUR STORY &amp; HERITAGE
            </span>
            <span className="w-6 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            THE SOUL OF IPC
          </h2>

          <p className="text-white/80 text-base sm:text-lg font-sans leading-relaxed">
            Founded in 2014 by <strong className="text-white font-semibold">Nirmal &amp; Gunjan Sandhu</strong>,
            IPC was created with a vision to bring healthy, premium-quality Indian food to travellers
            and urban consumers.
          </p>

          <p className="text-white/60 text-sm sm:text-base font-sans mt-3">
            The brand grew along <strong className="text-[#E5A93C]">NH7</strong> and became a beloved destination
            for travellers, families, bikers, corporates, and food lovers.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical Center Track on Desktop, Left Track on Mobile */}
          <div className="absolute top-2 bottom-2 left-6 sm:left-1/2 -ml-[1px] w-[2px] bg-gradient-to-b from-[#E5A93C] via-[#2E4434] to-[#E5A93C]/40" />

          <div className="space-y-10 sm:space-y-16">
            {STORY_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.yearOrPhase}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#080D0A] border-2 border-[#E5A93C] text-[#E5A93C] shadow-[0_0_15px_rgba(229,169,60,0.4)] z-20">
                    {getIcon(item.yearOrPhase)}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <div className="bg-[#0F1712]/95 backdrop-blur-xl border border-white/15 hover:border-[#E5A93C]/60 p-6 sm:p-7 rounded-3xl shadow-xl transition-all duration-300 group">
                      {/* Year / Phase Badge */}
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3 ${
                          item.yearOrPhase === '2014'
                            ? 'bg-white text-black'
                            : 'bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/30'
                        }`}
                      >
                        {item.yearOrPhase}
                      </div>

                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#E5A93C] transition-colors">
                        {item.title}
                      </h3>

                      <h4 className="text-xs uppercase font-mono tracking-widest text-white/50 mb-3">
                        {item.subtitle}
                      </h4>

                      <p className="text-white/70 text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/10 text-xs font-medium text-[#E5A93C] flex items-center gap-1.5 justify-start sm:justify-start">
                        <span>✦</span>
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
