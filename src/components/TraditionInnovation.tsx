import React from 'react';

export const TraditionInnovation: React.FC = () => {
  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Content (Beige Background) */}
      <div className="bg-[var(--color-beige)] text-[var(--color-navy)] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 md:py-24 relative">
        
        <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl text-[var(--color-gold)] leading-[0.9] uppercase mb-4">
          A BRAND<br />ROOTED<br />IN TRADITION,<br />DRIVEN BY
        </h2>
        <h2 className="font-script text-6xl sm:text-7xl lg:text-9xl text-[var(--color-gold)] leading-none -ml-4 mb-16" style={{ transform: 'rotate(-2deg)' }}>
          Innovation
        </h2>

        {/* Placeholder for Parathzza Boxes Image */}
        <div className="relative w-full max-w-sm mx-auto mb-12">
           <div className="w-full aspect-video bg-black/5 rounded-lg flex items-center justify-center text-[var(--color-navy)]/30 font-bold border border-[var(--color-navy)]/10 shadow-lg -rotate-3">
             Parathzza Boxes Image
           </div>
           
           {/* Exclusive Franchise Partner Stamp */}
           <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full border-2 border-[var(--color-navy)] flex items-center justify-center bg-[var(--color-beige)] shadow-md">
             <div className="w-[85%] h-[85%] rounded-full border border-[var(--color-navy)] border-dashed flex flex-col items-center justify-center p-1 text-center text-[var(--color-navy)]">
               <span className="text-[9px] font-bold tracking-widest uppercase">Exclusive</span>
               <span className="text-[9px] font-bold tracking-widest uppercase">Franchise</span>
               <span className="text-[10px] font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
             </div>
           </div>
        </div>
      </div>

      {/* Right Image Background with Overlay Text */}
      <div className="relative w-full h-full min-h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url("/outdoor-patio-real.png")' }}>
         <div className="absolute inset-0 bg-[var(--color-navy)]/40 md:bg-[var(--color-navy)]/60 bg-gradient-to-t from-[var(--color-navy)]/80 to-transparent"></div>
         
         <div className="relative z-10 h-full flex flex-col justify-start p-8 sm:p-16 lg:p-20 text-white/90 text-sm sm:text-base leading-relaxed space-y-6 max-w-lg">
           <p className="font-semibold text-white">
             Bringing Healthy, Authentic Indian Flavors to the Modern World
           </p>
           <p>
             The Indian food industry is booming, yet quality dining options on highways remain scarce. Roadside eateries often lack hygiene, reliability, and nutritious food choices. This is where IPC changed the game.
           </p>
           <p>
             In 2014, Nirmal & Gunjan Sandhu, a visionary couple passionate about healthy and flavorful food, created Indian Paratha Company—a premium, modern QSR concept inspired by India's culinary heritage yet designed for today's fast-paced lifestyle.
           </p>
           <p>
             Located along NH7 (Bangalore-Hyderabad Highway) IPC quickly became a must-visit food destination, attracting travelers, families, bikers, corporates, and even supercar owners. With its freshly prepared, wholesome vegetarian, Jain, and vegan offerings, IPC offers an authentic Indian dining experience in a contemporary European-style setting.
           </p>
         </div>
      </div>

    </section>
  );
};
