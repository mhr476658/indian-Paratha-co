import React from 'react';
import { UtensilsCrossed, ShoppingBag, Sparkles, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

interface QuickActionsProps {
  onExploreMenu: () => void;
  onOpenOrderModal: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onExploreMenu,
  onOpenOrderModal,
}) => {
  const actions = [
    {
      id: 'quick-menu',
      title: 'EXPLORE MENU',
      subtitle: 'Over 40+ handcrafted parathas, chai & kulhad specialties',
      icon: UtensilsCrossed,
      color: 'from-[#E5A93C]/15 to-transparent',
      borderColor: 'border-white/15 hover:border-[#E5A93C]',
      iconColor: 'text-[#E5A93C]',
      onClick: onExploreMenu,
      ctaText: 'Browse Menu',
    },
    {
      id: 'quick-order',
      title: 'ORDER ONLINE',
      subtitle: 'Highway takeaway & table dine-in with live order tracking',
      icon: ShoppingBag,
      color: 'from-[#2E4434]/40 to-transparent',
      borderColor: 'border-white/15 hover:border-emerald-400',
      iconColor: 'text-emerald-300',
      onClick: onOpenOrderModal,
      ctaText: 'Start Order',
      badge: 'Bestseller',
    },
    {
      id: 'quick-specials',
      title: "TODAY'S SPECIALS",
      subtitle: 'Chef-recommended combos & royal roadtrip thalis',
      icon: Sparkles,
      color: 'from-[#E5A93C]/15 to-transparent',
      borderColor: 'border-white/15 hover:border-[#E5A93C]',
      iconColor: 'text-[#E5A93C]',
      onClick: () => {
        const el = document.getElementById('todays-special');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      ctaText: 'View Specials',
    },
    {
      id: 'quick-find',
      title: 'FIND US ON NH7',
      subtitle: 'Scenic roadside stop near Devanahalli • Open 7 AM – 11:30 PM',
      icon: MapPin,
      color: 'from-white/5 to-transparent',
      borderColor: 'border-white/15 hover:border-white/40',
      iconColor: 'text-white',
      onClick: () => {
        const el = document.getElementById('location');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      ctaText: 'Get Route',
    },
  ];

  return (
    <section id="quick-actions" className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={action.id}
              onClick={action.onClick}
              className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-b ${action.color} bg-[#0F1712]/95 backdrop-blur-2xl border ${action.borderColor} shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-left group flex flex-col justify-between relative overflow-hidden cursor-pointer`}
            >
              {action.badge && (
                <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-wider shadow-md">
                  {action.badge}
                </span>
              )}

              <div>
                <div className={`p-3 rounded-xl bg-black/60 border border-white/10 w-fit mb-4 ${action.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-sans text-base sm:text-lg font-bold text-white tracking-wide mb-1.5 group-hover:text-[#E5A93C] transition-colors">
                  {action.title}
                </h3>

                <p className="text-white/70 text-xs leading-relaxed font-sans mb-4">
                  {action.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5A93C] group-hover:text-white transition-colors">
                <span>{action.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
