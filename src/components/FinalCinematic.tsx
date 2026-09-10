import React from 'react';
import { ShoppingBag, Navigation, UtensilsCrossed } from 'lucide-react';

interface FinalCinematicProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const FinalCinematic: React.FC<FinalCinematicProps> = ({
  onExploreMenu,
  onOrderNow,
}) => {
  const googleMapsUrl = 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw';

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B192C] text-white">
      {/* Background Image with Cinematic Subtle Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1920&auto=format&fit=crop&q=85"
          alt="Clay cup of steaming Indian tea alongside authentic crisp golden parathas"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_16s_ease-in-out_infinite]"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-[#0B192C]/80" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0]/10 border border-[#D49B44]/40 backdrop-blur-md mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D49B44]">
            TRADITION REIMAGINED
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-3xl mb-4">
          COME HUNGRY. <br />
          <span className="italic font-normal text-[#D49B44]">LEAVE WITH A STORY.</span>
        </h2>

        <p className="font-serif text-lg sm:text-2xl text-stone-200 tracking-widest uppercase mb-10 font-medium">
          Chai, Paratha & More
        </p>

        {/* 3 Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <button
            id="final-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full border border-stone-300 hover:border-[#D49B44] transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#D49B44]" />
            <span>EXPLORE MENU</span>
          </button>

          <a
            id="final-get-directions-btn"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0B192C] hover:bg-[#162A45] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full border border-[#D49B44]/50 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-[#D49B44]" />
            <span>GET DIRECTIONS</span>
          </a>

          <button
            id="final-order-now-btn"
            onClick={onOrderNow}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#9B1B1E] hover:bg-[#B22222] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 border border-[#B22222]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ORDER NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
