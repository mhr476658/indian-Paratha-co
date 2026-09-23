import React from 'react';

export const FranchiseModels: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-[var(--color-beige)] text-[var(--color-navy)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Heading */}
        <div className="mb-16">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--color-gold)] leading-[0.9] uppercase mb-2">
            TWO FRANCHISE<br />MODELS TO<br />SUIT YOUR<br />BUSINESS
          </h2>
          <h2 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-none -mt-2" style={{ transform: 'rotate(-2deg)' }}>
            Goals
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative">
          
          {/* Left: Chalet Model (shifted down slightly for visual rhythm) */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-8">
            <h3 className="font-display text-3xl text-[var(--color-gold)] mb-6 tracking-wider">CHALET MODEL</h3>
            <ul className="space-y-4 text-xs sm:text-sm font-semibold tracking-wide text-[var(--color-navy)] border-t border-[var(--color-gold)]/30 pt-4">
              <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                <span className="opacity-80">(Minimum area required)</span>
                <span>3000 - 5000 sqft</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                <span className="opacity-80">Setup Cost:</span>
                <span>Starting at ₹ 75,00,000</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                <span className="opacity-80">Franchise Fee:</span>
                <span>₹ 10,00,000 + GST</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                <span className="opacity-80">Average ROI:</span>
                <span>24 - 30 months</span>
              </li>
            </ul>
          </div>

          {/* Middle: Cafe Model + Image (stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-12">
             <div className="flex flex-col">
               <h3 className="font-display text-3xl text-[var(--color-gold)] mb-6 tracking-wider">CAFE MODEL</h3>
               <ul className="space-y-4 text-xs sm:text-sm font-semibold tracking-wide text-[var(--color-navy)] border-t border-[var(--color-gold)]/30 pt-4">
                 <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                   <span className="opacity-80">(Minimum area required)</span>
                   <span>1200 sqft</span>
                 </li>
                 <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                   <span className="opacity-80">Setup Cost:</span>
                   <span>Starting at ₹ 50,00,000</span>
                 </li>
                 <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                   <span className="opacity-80">Franchise Fee:</span>
                   <span>₹ 8,00,000 + GST</span>
                 </li>
                 <li className="flex justify-between border-b border-[var(--color-gold)]/20 pb-3">
                   <span className="opacity-80">Average ROI:</span>
                   <span>18 - 24 months</span>
                 </li>
               </ul>
             </div>

             {/* Placeholder for Cafe Interior Image */}
             <div className="w-full aspect-[4/3] bg-black/10 rounded-lg shadow-lg flex items-center justify-center font-bold text-[var(--color-navy)]/30 border border-[var(--color-navy)]/10">
                Cafe Interior Image
             </div>
          </div>

          {/* Right: What's Included */}
          <div className="lg:col-span-3 flex flex-col justify-start pt-12 lg:pt-32 lg:pl-8">
            <h3 className="font-display text-3xl text-[var(--color-gold)] mb-8 tracking-wider">WHAT'S<br/>INCLUDED?</h3>
            <ul className="space-y-6 text-xs sm:text-sm font-semibold text-[var(--color-navy)]/80">
              <li className="border-b border-[var(--color-gold)]/20 pb-4">End-to-end restaurant setup & branding</li>
              <li className="border-b border-[var(--color-gold)]/20 pb-4">Comprehensive staff training</li>
              <li className="border-b border-[var(--color-gold)]/20 pb-4">Marketing, advertising & customer engagement support</li>
              <li className="border-b border-[var(--color-gold)]/20 pb-4">Operational manuals & SOPs for seamless management</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
