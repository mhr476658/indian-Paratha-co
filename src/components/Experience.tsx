import React from 'react';
import { EXPERIENCE_CARDS } from '../data/content';
import { CheckCircle2, Zap, Navigation, Bike, Lightbulb, Truck, ArrowRight } from 'lucide-react';

interface ExperienceProps {
  onOpenMoreTab?: (tab: 'amenities' | 'route-eta' | 'biker-rally' | 'hacks' | 'catering') => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenMoreTab }) => {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#0B192C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D49B44]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D49B44]">
              HOSPITALITY ON THE ROAD
            </span>
            <span className="w-6 h-[2px] bg-[#D49B44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            MORE THAN A MEAL. <br />
            <span className="italic font-normal text-[#D49B44]">IT'S A DESTINATION.</span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Whether taking a breather on a 500-kilometre road trip or gathering for a Sunday family feast,
            every table at IPC is designed to welcome your journey.
          </p>
        </div>

        {/* 3 Visual Cards: Vertical on Mobile, 3-Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {EXPERIENCE_CARDS.map((card) => (
            <div
              key={card.title}
              id={`exp-card-${card.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="bg-[#112338] border border-[#1E3A5F] hover:border-[#D49B44]/70 rounded-3xl overflow-hidden flex flex-col shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112338] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 bg-[#9B1B1E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                  {card.title}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#D49B44] block mb-2">
                    {card.tagline}
                  </span>
                  
                  <h3 className="font-serif text-2xl font-black text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-stone-300 text-sm leading-relaxed font-sans mb-6">
                    "{card.description}"
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-4 border-t border-[#1E3A5F]/80 space-y-2">
                  {card.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B44] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "More at IPC" Interactive Highway Hub Strip */}
        {onOpenMoreTab && (
          <div className="mt-12 bg-gradient-to-r from-[#112338] via-[#162A45] to-[#112338] border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#D49B44] text-xs font-bold uppercase tracking-widest mb-1">
                  <span>Explore "More" at Indian Paratha Company</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Highway Amenities, Driving ETA & Club Perks
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                  Quick access to EV fast-charging, live highway travel time calculation, biker breakfast bookings, and secret highway dining hacks.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <button
                  onClick={() => onOpenMoreTab('amenities')}
                  className="p-3 rounded-2xl bg-[#0B192C] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-stone-200 hover:text-white transition-all flex flex-col items-center text-center gap-1.5 group"
                >
                  <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Amenities & EV</span>
                </button>

                <button
                  onClick={() => onOpenMoreTab('route-eta')}
                  className="p-3 rounded-2xl bg-[#0B192C] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-stone-200 hover:text-white transition-all flex flex-col items-center text-center gap-1.5 group"
                >
                  <Navigation className="w-5 h-5 text-[#D49B44] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Route & ETA</span>
                </button>

                <button
                  onClick={() => onOpenMoreTab('biker-rally')}
                  className="p-3 rounded-2xl bg-[#0B192C] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-stone-200 hover:text-white transition-all flex flex-col items-center text-center gap-1.5 group"
                >
                  <Bike className="w-5 h-5 text-[#FFA0A3] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Biker Meets</span>
                </button>

                <button
                  onClick={() => onOpenMoreTab('hacks')}
                  className="p-3 rounded-2xl bg-[#0B192C] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-stone-200 hover:text-white transition-all flex flex-col items-center text-center gap-1.5 group"
                >
                  <Lightbulb className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Travel Hacks</span>
                </button>

                <button
                  onClick={() => onOpenMoreTab('catering')}
                  className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#0B192C] hover:bg-[#1E3A5F] border border-[#1E3A5F] text-stone-200 hover:text-white transition-all flex flex-col items-center text-center gap-1.5 group"
                >
                  <Truck className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Bulk & Tiffins</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
