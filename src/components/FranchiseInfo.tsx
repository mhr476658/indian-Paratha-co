import React from 'react';

export const FranchiseInfo: React.FC = () => {
  return (
    <div id="franchise" className="w-full bg-[var(--color-navy)] text-[var(--text-primary)] font-sans">
      
      {/* Section 1: Own a Slice of Success */}
      <section className="w-full py-20 lg:py-32 overflow-hidden border-b border-[var(--color-gold)]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Heading */}
          <div className="flex flex-col">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-[0.85] uppercase mb-2">
              OWN A<br />SLICE OF<br />SUCCESS<br />WITH INDIAN<br />PARATHA
            </h2>
            <h2 className="font-script text-6xl sm:text-7xl lg:text-9xl text-[var(--color-gold)] leading-none -mt-4 mb-12" style={{ transform: 'rotate(-2deg)' }}>
              Company
            </h2>

            {/* Stamp */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-white/20 flex items-center justify-center bg-[var(--color-navy)] shadow-md">
              <div className="w-[85%] h-[85%] rounded-full border border-white/20 border-dashed flex flex-col items-center justify-center p-1 text-center text-white/80">
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Exclusive</span>
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Franchise</span>
                <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-start space-y-8">
            <div className="text-sm sm:text-base text-[var(--text-primary)]/90 font-medium">
              <p className="mb-4">
                Franchise Now & Join India's Fastest-Growing QSR Revolution!
              </p>
              <p>
                Looking to invest in a proven, high-demand food business? The Indian Paratha Company (IPC) offers an exciting franchise opportunity with a high-ROI model, innovative menu, and strong customer loyalty. With a decade of success in redefining Indian highway dining, IPC is now expanding across India—and you can be part of this journey!
              </p>
            </div>

            {/* Placeholder for Parathzza Top View Image */}
            <div className="w-full aspect-square bg-cover bg-center rounded shadow-2xl my-6" style={{ backgroundImage: 'url("/aloo-cheese-paratha.png")' }}></div>

            <ul className="space-y-4 text-xs sm:text-sm font-semibold tracking-wide text-[var(--text-primary)]/80">
              <li className="border-b border-white/10 pb-3">Fast-growing QSR brand with a unique product offering</li>
              <li className="border-b border-white/10 pb-3">Multiple franchise models: Highway Chalet & Urban Cafe</li>
              <li className="border-b border-white/10 pb-3">Comprehensive training, marketing, and operational support</li>
              <li className="border-b border-white/10 pb-3">Sustainable, hygienic, and health-conscious food culture</li>
            </ul>
          </div>

        </div>
      </section>


      {/* Section 2: Why Franchise With IPC? */}
      <section className="w-full py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Heading and Image */}
          <div className="lg:col-span-7 flex flex-col items-start relative">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--text-primary)] leading-[0.85] uppercase mb-2">
              WHY
            </h2>
            <h2 className="font-script text-6xl sm:text-7xl lg:text-9xl text-[var(--color-gold)] leading-none -mt-4 mb-2" style={{ transform: 'rotate(-2deg)' }}>
              Franchise
            </h2>
            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--text-primary)] leading-[0.85] uppercase mb-12">
              WITH<br />IPC?
            </h2>

            {/* Stamp */}
            <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-white/20 flex items-center justify-center bg-[var(--color-navy)] shadow-md z-20">
              <div className="w-[85%] h-[85%] rounded-full border border-white/20 border-dashed flex flex-col items-center justify-center p-1 text-center text-white/80">
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Exclusive</span>
                <span className="text-[8px] lg:text-[10px] font-bold tracking-widest uppercase">Franchise</span>
                <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase text-[#e41c24]">Partner</span>
              </div>
            </div>

            {/* Placeholder for Paratha Platter Image */}
            <div className="w-full max-w-lg aspect-square lg:-mt-32 lg:ml-auto relative z-10">
               <img src="/paratha-platter-lassi.png" alt="Paratha Platter" className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </div>

          {/* Right: Bullet Points */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-12 space-y-10">
            
            <h3 className="font-display text-4xl sm:text-5xl text-[var(--color-gold)] leading-none uppercase mb-2">
              PROVEN BUSINESS.<br />STRONG RETURNS.<br />COMPLETE SUPPORT.
            </h3>

            <p className="text-sm font-medium text-[var(--text-primary)]/80 leading-relaxed">
              IPC offers a fully structured, highly profitable franchise model that ensures seamless setup, operations, and growth.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="font-display text-2xl text-[var(--color-gold-light)] mb-1 uppercase tracking-wide">PROVEN CONCEPT</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">A fan-favorite brand with a strong legacy</p>
              </div>
              
              <div>
                <h4 className="font-display text-2xl text-[var(--color-gold-light)] mb-1 uppercase tracking-wide">MULTIPLE FRANCHISE MODELS</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">Choose between a full-scale highway chalet or a compact urban cafe</p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-[var(--color-gold-light)] mb-1 uppercase tracking-wide">COMPREHENSIVE TRAINING & SUPPORT</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">From operations to marketing & sourcing</p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-[var(--color-gold-light)] mb-1 uppercase tracking-wide">SUSTAINABLE & ETHICAL FOOD PRACTICES</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">No artificial additives, no deep-freezing, only fresh & healthy meals</p>
              </div>

              <div>
                <h4 className="font-display text-2xl text-[var(--color-gold-light)] mb-1 uppercase tracking-wide">GLOBALLY RECOGNIZED YET DEEPLY INDIAN</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">A brand rooted in India's food culture, now expanding nationwide</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
