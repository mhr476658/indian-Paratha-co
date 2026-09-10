import React from 'react';
import {
  Sparkles,
  Coffee,
  Compass,
  Flame,
  Check,
  Lightbulb,
  ShieldAlert,
  ThumbsUp,
} from 'lucide-react';

export const HighwayTravelHacks: React.FC = () => {
  const pairings = [
    {
      dish: 'Aloo Cheese Parathzzaa®',
      chai: 'IPC Special Adrak Elaichi Chai',
      why: 'The spicy, melted mozzarella interior pairs impeccably with the strong ginger heat of clay-brewed tea.',
      tag: 'Legendary Must-Try',
    },
    {
      dish: 'Amritsari Gobhi Paratha',
      chai: 'Punjabi Masala Chai',
      why: 'Crushed roasted coriander and ajwain seeds in the stuffing complement the clove-cinnamon chai notes.',
      tag: 'Highway Classic',
    },
    {
      dish: 'Smoked Paneer Tikka Paratha',
      chai: 'Chilled Sweet Malai Lassi',
      why: 'The smoky tandoor spices are perfectly balanced by rich, creamy, saffron-flecked curd in an earthen pot.',
      tag: 'Summer Road Trip',
    },
    {
      dish: 'Royal Tawa Paratha Platter',
      chai: 'Traditional Cutting Chai',
      why: 'A hearty feast featuring twin parathas, dal makhani, boondi raita, and fiery Punjabi achaar.',
      tag: 'Family Feeder',
    },
  ];

  const hacks = [
    {
      title: 'The 15-Minute Highway Ping',
      desc: 'When you cross the Bangalore Airport flyover or Devanahalli toll, place your order on our WhatsApp line. Our tawa chefs put your parathas on the griddle immediately. You pull into the bay and hot food is handed straight over.',
    },
    {
      title: 'Steam-Vented Travel Packing',
      desc: 'Taking parathas to Nandi Hills or Lepakshi? Request our "Travel Pack" — we use breathable corrugated kraft sleeves with micro-vents so the golden butter crust doesn’t get soggy from trapped steam.',
    },
    {
      title: 'Sunrise Magic Window (6:15 AM - 7:30 AM)',
      desc: 'Early morning departures from Bangalore get you here just as the mist clears over the eucalyptus trees. The cool hill breeze combined with hot kulhad chai is the ultimate start to any road trip.',
    },
    {
      title: 'Scenic Nearby Detours',
      desc: 'IPC sits right at the gateway to Nandi Hills (20 mins), historical Devanahalli Fort (10 mins), and Bhoga Nandeeshwara Temple (18 mins). Plan your breakfast at IPC before exploring.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#112338] via-[#1A3352] to-[#0D1B2A] border border-[#1E3A5F] rounded-3xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2 text-[#D49B44] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Lightbulb className="w-4 h-4" />
          <span>Insider Knowledge</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Highway Travel Hacks & Secret Pairings
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
          Ten years of highway hospitality have taught us how to make road trips unforgettable.
          Here are the top diner secrets from regular commuters and food connoisseurs.
        </p>
      </div>

      {/* Secret Pairings */}
      <div className="space-y-3">
        <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Coffee className="w-4 h-4 text-[#D49B44]" />
          <span>Curated Chai & Dish Pairings</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pairings.map((p, i) => (
            <div
              key={i}
              className="bg-[#0D1B2A] border border-[#1E3A5F]/70 rounded-2xl p-4.5 hover:border-[#D49B44]/40 transition-all shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#9B1B1E]/30 text-[#FFA0A3] border border-[#DE2428]/30">
                  {p.tag}
                </span>
              </div>
              <h5 className="font-serif font-bold text-white text-base leading-tight">
                {p.dish}
              </h5>
              <div className="text-xs text-[#D49B44] font-semibold mt-0.5 mb-2 flex items-center gap-1">
                <span>+</span>
                <span>{p.chai}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">{p.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro-Tips Grid */}
      <div className="space-y-3">
        <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D49B44]" />
          <span>Pro Road-Tripper Tips</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hacks.map((hack, idx) => (
            <div
              key={idx}
              className="bg-[#112338]/80 border border-[#1E3A5F] rounded-2xl p-5 shadow-md flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-lg bg-[#D49B44]/20 border border-[#D49B44]/40 text-[#D49B44] flex items-center justify-center font-bold text-xs shrink-0">
                {idx + 1}
              </div>
              <div>
                <h5 className="font-serif font-bold text-white text-sm mb-1">{hack.title}</h5>
                <p className="text-xs text-stone-300 leading-relaxed">{hack.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
