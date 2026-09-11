import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export const RestaurantStory: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src="/restaurant-story.png"
                alt="Indian Paratha Company rustic chalet facade and kitchen"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center filter brightness-[0.85] contrast-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-transparent to-black/40" />

              {/* Floating Award Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#E5A93C] text-black shrink-0 font-bold">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-sans text-base sm:text-lg font-bold text-white">
                      Karnataka Highway Culinary Icon
                    </h4>
                    <p className="text-xs text-white/70">
                      Celebrating 10+ years of whole-wheat parathas, artisanal tea, and Parathzzaa® innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Small Inset Card */}
            <div className="hidden sm:block absolute -top-6 -right-6 p-4 rounded-2xl bg-[#0F1712] border border-white/20 shadow-2xl backdrop-blur-md max-w-[200px] text-center">
              <span className="text-2xl font-sans font-black text-[#E5A93C] block">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/80 font-bold block">
                Pure Vegetarian Food Heritage
              </span>
            </div>
          </div>

          {/* Right Editorial Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
                OUR FOOD HERITAGE &amp; ORIGINS
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              A Highway Sanctuary for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F5E6CC] to-[#E5A93C]">True Food Lovers</span>
            </h2>

            <p className="text-white/90 text-sm sm:text-base font-sans leading-relaxed mb-5">
              Founded in 2014 along the scenic Bengaluru–Hyderabad highway corridor, Indian Paratha Company was born out of a simple, uncompromising vision: to create an unpretentious culinary destination where travelers could pause their journey and relish authentic, soulful Indian food crafted without shortcuts.
            </p>

            <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mb-6">
              We replaced industrial refried oils and refined maida with stone-ground 100% whole wheat flour, cold-pressed oils, and fresh cultured white butter. Our kitchens are open hearths where guests can witness every paratha rolled, stuffed, and roasted to golden perfection.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-2xl bg-[#0F1712] border border-white/10 flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Frozen Ingredients</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0F1712] border border-white/10 flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authentic Clay Kulhad Brewing</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0F1712] border border-white/10 flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pioneers of Parathzzaa®</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0F1712] border border-white/10 flex items-center gap-2.5 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fresh White Farm Butter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
