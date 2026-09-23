import React from 'react';

export const JoinSuccessStory: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[var(--color-beige)] text-[var(--color-navy)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Top: Circular Image Composition */}
        <div className="relative w-full max-w-3xl aspect-[16/9] mb-16 lg:mb-24 flex justify-center items-center">
           {/* Placeholder for 3 Parathzza Images */}
           <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-black/10 shadow-xl border border-[var(--color-navy)]/10 flex items-center justify-center font-bold text-[var(--color-navy)]/30 -rotate-12 z-10">Parathzza 1</div>
           <div className="absolute top-4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-black/10 shadow-xl border border-[var(--color-navy)]/10 flex items-center justify-center font-bold text-[var(--color-navy)]/30 rotate-12 z-20">Parathzza 2</div>
           <div className="absolute -bottom-8 right-1/3 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-black/10 shadow-2xl border border-[var(--color-navy)]/10 flex items-center justify-center font-bold text-[var(--color-navy)]/30 z-30">Parathzza 3</div>
        </div>

        {/* Bottom Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
          
          {/* Left: Heading */}
          <div className="flex flex-col relative justify-end">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--color-gold)] leading-[0.9] uppercase mb-2">
              JOIN THE<br />IPC SUCCESS<br />STORY
            </h2>
            <h2 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-none -mt-4 ml-4" style={{ transform: 'rotate(-2deg)' }}>
              Today!
            </h2>

            {/* Stamp */}
            <div className="absolute -bottom-10 right-0 lg:right-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-navy)] flex items-center justify-center bg-[var(--color-beige)] shadow-md z-20">
              <div className="w-[85%] h-[85%] rounded-full border border-[var(--color-navy)] border-dashed flex flex-col items-center justify-center p-1 text-center text-[var(--color-navy)]">
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Exclusive</span>
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Franchise</span>
                <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
              </div>
            </div>
          </div>

          {/* Right: Text & Contact */}
          <div className="flex flex-col justify-end pt-8 lg:pt-0">
            <p className="text-xs sm:text-sm font-medium text-[var(--color-navy)]/80 leading-relaxed mb-10 max-w-sm">
              Be part of a brand that blends India's rich food heritage with a modern, scalable business model. Contact us to explore franchise opportunities and serve success, one Paratha at a time!
            </p>

            <div className="space-y-2 text-xs sm:text-sm font-semibold text-[var(--color-navy)]/90">
              <p><span className="opacity-70">Email: </span><a href="mailto:info@franchise-ready.in" className="hover:text-[var(--color-gold)] transition-colors">info@franchise-ready.in</a></p>
              <p><span className="opacity-70">Phone: </span><a href="tel:+919920234431" className="hover:text-[var(--color-gold)] transition-colors">+91 9920234431</a></p>
              <p><span className="opacity-70">Website: </span><a href="https://www.franchiseready.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">www.franchiseready.in</a></p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
