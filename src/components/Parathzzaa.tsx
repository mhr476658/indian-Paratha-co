import React from 'react';

export const Parathzzaa: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[var(--color-beige)] text-[var(--color-navy)] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Top Heading */}
        <div className="text-center w-full mb-12 lg:mb-16">
          <div className="flex flex-col items-center justify-center relative">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-[9rem] text-[var(--color-gold)] leading-[0.85] uppercase tracking-tight relative z-10 w-full text-center">
              INTRODUCING<br />
              PARATHZZAA
            </h2>
            
            {/* Stamp Positioned Overlapping Heading */}
            <div className="absolute top-0 lg:top-auto lg:-top-10 right-4 lg:right-32 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-[var(--color-navy)] flex items-center justify-center bg-[var(--color-beige)] shadow-md z-20">
              <div className="w-[85%] h-[85%] rounded-full border border-[var(--color-navy)] border-dashed flex flex-col items-center justify-center p-1 text-center text-[var(--color-navy)]">
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Exclusive</span>
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Franchise</span>
                <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          
          {/* Left/Bottom: Illustration/Image */}
          <div className="lg:col-span-8 relative flex justify-center lg:justify-start items-end lg:-ml-12 lg:-mb-32">
             <div className="w-full max-w-2xl aspect-[4/3] bg-black/10 rounded-full flex items-center justify-center font-bold text-[var(--color-navy)]/30 border border-[var(--color-navy)]/20 shadow-2xl relative z-10">
               {/* Replace with Giant Parathzza Illustration */}
               Giant Parathzza Illustration
             </div>
          </div>

          {/* Right: Text Description */}
          <div className="lg:col-span-4 flex flex-col justify-center pb-12 lg:pb-0 z-20">
            <h3 className="font-display text-4xl sm:text-5xl text-[var(--color-gold)] leading-none uppercase mb-2">
              A GAME-CHANGER<br />IN THE QSR <span className="font-script lowercase text-5xl sm:text-6xl inline-block ml-2" style={{ transform: 'rotate(-2deg)' }}>Industry</span>
            </h3>
            
            <div className="mt-8 space-y-6 text-sm text-[var(--color-navy)]/80 font-medium leading-relaxed">
              <p>
                Indian Paratha Company didn't just modernize highway dining-it invented a whole new category. Parathzzaa®, a patented fusion of traditional Indian Paratha and globally loved Pizza, has taken the QSR industry by storm.
              </p>
              
              <div>
                <p className="mb-4">This unique, homegrown concept offers:</p>
                <ul className="space-y-4">
                  <li className="flex flex-col border-b border-[var(--border-subtle)] pb-2">
                    <span className="font-bold text-[var(--color-navy)]">A one-of-a-kind product with mass appeal</span>
                  </li>
                  <li className="flex flex-col border-b border-[var(--border-subtle)] pb-2">
                    <span className="font-bold text-[var(--color-navy)]">A quick-serve model that ensures fast, fresh meals</span>
                  </li>
                  <li className="flex flex-col border-b border-[var(--border-subtle)] pb-2">
                    <span className="font-bold text-[var(--color-navy)]">Regional flavors with an international touch</span>
                  </li>
                </ul>
              </div>

              <p>
                By becoming an IPC franchise partner, you get to capitalize on this exclusive, high-demand innovation while leveraging a well-established brand with a loyal customer base.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
