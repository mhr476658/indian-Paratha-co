import React, { useState } from 'react';
import {
  ArrowUpRight,
  UtensilsCrossed,
  Sparkles,
  Coffee,
  MessageCircle,
  Flame,
  ChevronRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

interface OrbitalFeature {
  id: 'enchanting' | 'unique' | 'rejuvenate';
  label: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
}

const ORBITAL_FEATURES: OrbitalFeature[] = [
  {
    id: 'enchanting',
    label: 'Enchanting',
    tagline: '100% Desi Ghee & Farm White Butter',
    title: 'Heritage Amritsari Parathas',
    description: 'Crisp whole-wheat flatbread griddled on cast-iron tawas, stuffed with spiced potatoes, paneer, and served with tangy Punjabi dahi.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1000&auto=format&fit=crop&q=85',
    badge: 'EST. 2014 NH7',
    badgeColor: 'bg-[#e41c24] text-white',
  },
  {
    id: 'unique',
    label: 'Unique',
    tagline: 'Patented Highway Innovation',
    title: 'Signature Parathzzaa®',
    description: 'The iconic fusion of layered flaky paratha base topped with rich makhani gravy, mozzarella, wood-smoked paneer tikka, and Italian herbs.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop&q=85',
    badge: 'IPC PATENTED',
    badgeColor: 'bg-[#2E4434] text-white border border-white/20',
  },
  {
    id: 'rejuvenate',
    label: 'Rejuvenate',
    tagline: 'Freshly Brewed Highway Tea',
    title: 'Special Kulhad Adrak Chai',
    description: 'Slow-simmered tea steeped with crushed fresh ginger, green cardamom, and lemongrass, served steaming hot in traditional earthen terracotta cups.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=85',
    badge: 'EARTHEN POT',
    badgeColor: 'bg-[#0b192c]/20 text-white',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  const [selectedFeature, setSelectedFeature] = useState<OrbitalFeature>(ORBITAL_FEATURES[1]);

  const whatsappUrl =
    'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20would%20like%20to%20order%20or%20inquire%20about%20the%20menu.';

  return (
    <section
      id="home"
      className="relative w-full min-h-[80svh] min-h-[500px] flex flex-col justify-between text-white overflow-hidden bg-transparent"
    >
      {/* ========================================================= */}
      {/* 1. BOTANICAL CONSERVATORY & GLASSHOUSE BACKGROUND         */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background Image Removed */}

        {/* Crisp Lighting & Focused Scrim Gradients for Maximum Image Clarity & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-transparent to-[#0b192c]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b192c]/90 via-[#0b192c]/50 to-transparent" />

        {/* Subtle Architectural Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#e41c24]/10 rounded-full blur-[140px]" />
      </div>

      {/* Spacer for Top Floating Navbar */}
      <div className="h-24 sm:h-28 w-full relative z-10" />

      {/* ========================================================= */}
      {/* 2. MAIN HERO CONTENT AREA                                */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between py-6 lg:py-10">

        {/* MIDDLE / MAIN ROW: SPLIT LAYOUT (HEADLINE LEFT, CIRCULAR LENS RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end my-auto pt-6 pb-4">
          {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
          <div className="lg:col-span-12 flex flex-col items-start text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b192c]/10 border border-white/20 backdrop-blur-xl mb-4 sm:mb-6 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#e41c24] animate-ping" />
              <span className="text-[11px] font-sans font-semibold tracking-wider text-white uppercase">
                NH7 DEVANAHALLI • 10 MIN TO BLR AIRPORT
              </span>
            </div>

            {/* Main Headline (MATCHING REFERENCE IMAGE TYPOGRAPHIC WEIGHT & SCALE) */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.04] mb-5 sm:mb-7 whitespace-nowrap">
              Savor Hot <span className="text-[#e41c24]">Handcrafted Parathas</span> &amp; Chai Today!
            </h1>

            {/* Sub-text */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl font-sans font-normal leading-relaxed mb-6 sm:mb-8 text-left">
              Authentic Indian flavors, 100% whole-wheat tawa parathas layered with pure desi ghee, our patented Parathzzaa®, and slow-brewed kulhad chai in a botanical conservatory atmosphere.
            </p>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="py-3.5 sm:py-4 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:text-[#e41c24] cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Menu</span>
                <ArrowUpRight className="w-4 h-4 font-bold" />
              </button>

              {/* WhatsApp Order CTA */}
              <a
                id="hero-whatsapp-order-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#0b192c]/10 hover:bg-[#0b192c]/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Quick WhatsApp</span>
              </a>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
