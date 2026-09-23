import React from 'react';

export const Visionaries: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[var(--color-beige)] text-[var(--color-navy)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Text Content */}
        <div className="flex flex-col">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--color-gold)] leading-[0.9] uppercase mb-2">
            MEET THE<br />VISIONARIES
          </h2>
          <h2 className="font-script text-5xl sm:text-6xl lg:text-7xl text-[var(--color-gold)] leading-none mb-4" style={{ transform: 'rotate(-2deg)' }}>
            Behind
          </h2>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--color-gold)] leading-none uppercase mb-10">
            IPC
          </h2>

          <h3 className="font-sans font-bold text-xl sm:text-2xl mb-4 text-[var(--color-navy)]">
            Nirmal & Gunjan Sandhu
          </h3>
          
          <div className="space-y-6 text-sm sm:text-base text-[var(--color-navy)]/80 font-medium text-justify">
            <p>
              are passionate food entrepreneurs who set out to bring healthy, premium-quality Indian food to travelers and urban consumers alike. Their commitment to fresh, preservative-free, and high-quality meals has made IPC a household name.
            </p>
            <p>
              Their next generation, Sumreen & Naman, bring global expertise in patisserie & hotel management, further strengthening IPC's commitment to innovation and excellence.
            </p>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:ml-auto">
          {/* Placeholder for Founders Image */}
          <div className="w-full h-full bg-black/10 rounded-lg overflow-hidden shadow-2xl relative">
             {/* Replace with actual image later */}
             <div className="absolute inset-0 flex items-center justify-center text-[var(--color-navy)]/50 font-sans font-bold">
               Founders Image
             </div>
          </div>
          
          {/* Exclusive Franchise Partner Stamp Overlay */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border-2 border-[var(--color-navy)] flex items-center justify-center bg-[var(--color-beige)] rotate-12 shadow-lg">
             <div className="w-[90%] h-[90%] rounded-full border border-[var(--color-navy)] border-dashed flex flex-col items-center justify-center p-2 text-center text-[var(--color-navy)]">
               <span className="text-[10px] font-bold tracking-widest uppercase">Exclusive</span>
               <span className="text-[10px] font-bold tracking-widest uppercase">Franchise</span>
               <span className="text-xs font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
