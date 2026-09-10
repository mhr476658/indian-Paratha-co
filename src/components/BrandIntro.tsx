import React from 'react';
import { Award, Clock, HeartHandshake } from 'lucide-react';
import { IPCLogo } from './IPCLogo';

export const BrandIntro: React.FC = () => {
  return (
    <section id="brand-intro" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#0B192C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Mobile: Image First | Desktop: Split Screen Column 1 */}
          <div className="order-1 lg:order-1 lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/60 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=80"
                alt="Handcrafted Indian paratha hot on the tawa served with rich accompaniments"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Badge overlay with Official Emblem */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-[#0B192C]/90 text-white backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#D49B44]/30 shadow-xl flex items-center gap-3">
                <IPCLogo variant="light" size="sm" badgeOnly={true} className="shrink-0 drop-shadow-md" />
                <div>
                  <p className="text-xs font-serif text-[#D49B44] tracking-widest uppercase font-bold">
                    Since 2014 • NH7
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide mt-0.5 text-stone-200">
                    Hand-rolled Dough • Fresh Makhan
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative background accent block */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-[#9B1B1E]/10 rounded-2xl -z-10" />
          </div>

          {/* Mobile: Text Second | Desktop: Split Screen Column 2 */}
          <div className="order-2 lg:order-2 lg:col-span-6 flex flex-col justify-center">
            {/* Label with Emblem */}
            <div className="flex items-center gap-2.5 mb-3">
              <IPCLogo variant="dark" size="sm" badgeOnly={true} className="shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9B1B1E]">
                THE IPC EXPERIENCE
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B192C] leading-tight mb-6">
              A JOURNEY OF FLAVOUR. <br />
              <span className="italic font-normal text-[#9B1B1E]">A PROMISE OF QUALITY.</span>
            </h2>

            {/* Copy */}
            <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
              <p>
                From the heart of India, IPC brings together the warmth of traditional Indian food
                and the energy of modern dining.
              </p>
              <p>
                Every paratha, every cup of chai and every plate is prepared to create a feeling — not
                just a meal.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 pt-6 border-t border-stone-300">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-[#0B192C] text-[#D49B44] flex items-center justify-center mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-sm sm:text-base text-[#0B192C]">
                  Pure Desi Ghee
                </span>
                <span className="text-[11px] text-stone-500 font-sans hidden sm:block">
                  Wholesome natural ingredients
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-[#9B1B1E] text-white flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-sm sm:text-base text-[#0B192C]">
                  Kneaded Fresh
                </span>
                <span className="text-[11px] text-stone-500 font-sans hidden sm:block">
                  Rolled right to order
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-[#0B192C] text-[#D49B44] flex items-center justify-center mb-2">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-sm sm:text-base text-[#0B192C]">
                  Highway Soul
                </span>
                <span className="text-[11px] text-stone-500 font-sans hidden sm:block">
                  Loved by millions
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
