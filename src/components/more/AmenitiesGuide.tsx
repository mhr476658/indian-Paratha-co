import React from 'react';
import {
  Zap,
  Sparkles,
  Wifi,
  Car,
  Heart,
  Baby,
  Coffee,
  Trees,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AmenitiesGuideProps {
  onOrderNow?: () => void;
}

export const AmenitiesGuide: React.FC<AmenitiesGuideProps> = ({ onOrderNow }) => {
  const amenities = [
    {
      icon: Zap,
      title: '50kW Fast EV Charging',
      tag: 'Eco Traveler',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description:
        'Dual-gun fast charging stations compatible with Tata, MG, Hyundai, and Ather. Top up your battery in 30 minutes while enjoying hot tawa parathas.',
    },
    {
      icon: Sparkles,
      title: 'Hygienic Highway Washrooms',
      tag: 'Sanitized Hourly',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      description:
        'Clean, touchless, and family-friendly rest facilities equipped with paper dispensers, baby changing counter, and disabled access.',
    },
    {
      icon: Car,
      title: 'Expansive Protected Parking',
      tag: '70+ Vehicles',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description:
        'Dedicated tarmac bays for SUVs, highway sedans, vintage cars, and reserved tarmac for motorcycling convoys with on-duty parking marshals.',
    },
    {
      icon: Wifi,
      title: 'High-Speed Highway Wi-Fi',
      tag: 'Free for Guests',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description:
        'Seamless 150 Mbps fiber connectivity across outdoor verandahs and indoor chalet dining so you can work-from-road or upload road trip reels.',
    },
    {
      icon: Heart,
      title: 'Pet-Friendly Verandah & Lawn',
      tag: 'Pets Welcome',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      description:
        'Shaded grass lawn with fresh water bowls for your furry road-trip companions. Outdoor bench seating under eucalyptus trees.',
    },
    {
      icon: Trees,
      title: 'Rustic Open-Air Timber Chalet',
      tag: 'Heritage Design',
      color: 'text-[#D49B44] bg-[#D49B44]/10 border-[#D49B44]/20',
      description:
        'Iconic wooden architecture crafted with reclaimed pine wood, stone tawa counters, and natural hill breeze from the surrounding countryside.',
    },
    {
      icon: Baby,
      title: 'Family & Toddler Amenities',
      tag: 'Child Friendly',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      description:
        'High chairs, non-spicy milk/buttermilk for toddlers, sanitized diaper changing stations, and wide stroller-friendly pathways.',
    },
    {
      icon: ShieldCheck,
      title: 'Contactless Car-Side Takeaway',
      tag: 'Express Pitstop',
      color: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
      description:
        'In a rush to reach Hyderabad or the airport? Pre-order on WhatsApp; our staff delivers sealed hot boxes directly to your car window.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#112338] to-[#1A3352] border border-[#1E3A5F] rounded-3xl p-6 sm:p-7 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#D49B44] text-xs font-bold uppercase tracking-widest mb-1.5">
              <Clock className="w-4 h-4" />
              <span>Open 24/7 on NH7 Corridor</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Highway Pitstop & Amenities
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              More than just legendary food — IPC is engineered as Bangalore's most comfortable,
              fully equipped highway sanctuary for travelers, riders, and families.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>All Facilities Open</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#0D1B2A] border border-[#1E3A5F]/70 hover:border-[#D49B44]/50 rounded-2xl p-5 transition-all shadow-md group hover:bg-[#112338]"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-serif font-bold text-white text-base truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#162A45] text-stone-300 border border-[#1E3A5F]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Express Banner */}
      <div className="bg-[#112338]/80 border border-[#D49B44]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#9B1B1E]/30 border border-[#DE2428]/40 text-[#FFA0A3] flex items-center justify-center shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-serif font-bold text-white text-sm">
              Pre-Order for Seamless Car-Side Delivery
            </h5>
            <p className="text-xs text-stone-300">
              Message us 15 minutes before your arrival on NH7 for zero wait time.
            </p>
          </div>
        </div>

        {onOrderNow && (
          <button
            onClick={onOrderNow}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#9B1B1E] hover:bg-[#B22222] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-md"
          >
            <span>Order Food Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
