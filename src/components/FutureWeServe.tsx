import React from 'react';

export const FutureWeServe: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[var(--color-beige)] text-[var(--color-navy)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Heading */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-[0.9] uppercase mb-2">
              THE<br />FUTURE WE
            </h2>
            <h2 className="font-script text-6xl sm:text-7xl lg:text-9xl text-[var(--color-gold)] leading-none -ml-4" style={{ transform: 'rotate(-2deg)' }}>
              Serve
            </h2>
          </div>

          {/* Middle: Image Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-4 mt-8 lg:mt-24">
               {/* Bottom-left image slot */}
               <div className="w-full aspect-[4/3] bg-cover bg-center rounded shadow-md" style={{ backgroundImage: 'url("/paratha-platter-lassi.png")' }} />
             </div>
             
             <div className="flex flex-col gap-4">
               {/* Top-right image slot 1 */}
               <div className="w-full aspect-square bg-cover bg-center rounded shadow-md" style={{ backgroundImage: 'url("/aloo-cheese-paratha.png")' }} />
               {/* Top-right image slot 2 (Coffee) */}
               <div className="w-full aspect-[4/3] bg-black/10 bg-center bg-cover rounded shadow-md flex items-center justify-center text-xs font-bold text-black/30">
                  Coffee Image
               </div>
               {/* Bottom-right image slot (Chai) */}
               <div className="w-full aspect-square bg-cover bg-center rounded shadow-md" style={{ backgroundImage: 'url("/ipc-tea-blend.png")' }} />
             </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:col-span-3 flex flex-col justify-end lg:pb-12 relative">
             <div className="space-y-6 text-xs sm:text-sm font-medium text-[var(--color-navy)]/80">
               <p>
                 A brand born in India, inspired by its land. Carrying its richness to every hand. A fusion of flavors, both new and old. A story of warmth, of heart, of soul.
               </p>
               <p>
                 For those who dream, who dare, who create. This is your moment—don't hesitate. A franchise, a family, a journey untold. A recipe for success, both bold and gold.
               </p>
               <p>
                 No frozen past, no artificial hues. Just fresh ingredients and mindful views. No aerated fizz, no shortcuts to taste. Just real food, crafted with grace.
               </p>
             </div>

             {/* Exclusive Franchise Partner Stamp */}
             <div className="mt-8 w-24 h-24 rounded-full border-2 border-[var(--color-navy)] flex items-center justify-center bg-[var(--color-beige)] shadow-md">
               <div className="w-[85%] h-[85%] rounded-full border border-[var(--color-navy)] border-dashed flex flex-col items-center justify-center p-1 text-center text-[var(--color-navy)]">
                 <span className="text-[8px] font-bold tracking-widest uppercase">Exclusive</span>
                 <span className="text-[8px] font-bold tracking-widest uppercase">Franchise</span>
                 <span className="text-[9px] font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
               </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};
