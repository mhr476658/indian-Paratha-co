import React from 'react';
import { ShoppingBag, MessageCircle, MapPin, ArrowRight, Sparkles, Flame, Clock } from 'lucide-react';

interface FinalOrderCTAProps {
  onOrderNow: () => void;
  onExploreMenu?: () => void;
}

export const FinalOrderCTA: React.FC<FinalOrderCTAProps> = ({ onOrderNow }) => {
  const whatsappOrderUrl =
    'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20am%20heading%20your%20way%20on%20NH7%20and%20would%20like%20to%20place%20an%20order.';

  return (
    <section
      id="final-order-cta"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#080D0A] via-[#0F1712] to-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Texture & Warm Ambient Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5A93C]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#2E4434]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
            YOUR HIGHWAY FEAST AWAITS
          </span>
        </div>

        {/* Title */}
        <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
          HUNGRY ON <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">THE ROAD?</span>
        </h2>

        <p className="font-sans text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto mb-6">
          Fresh, hot, stone-ground parathas are just one tap away.
        </p>

        <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto mb-10 font-sans leading-relaxed">
          Order for swift highway takeaway pickup, reserve your table feast, or send your pre-order straight to our WhatsApp kitchen dispatch desk.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Order Online Button */}
          <button
            id="final-cta-order-now-btn"
            onClick={onOrderNow}
            className="w-full sm:w-auto flex-1 py-4 px-8 bg-white hover:bg-[#E5A93C] text-black text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>ORDER ONLINE NOW</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          {/* WhatsApp Direct Order Button */}
          <a
            id="final-cta-whatsapp-btn"
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 py-4 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-white/20"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>WHATSAPP ORDER</span>
          </a>
        </div>

        {/* Quick Highway Info Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-mono">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            NH7 Bellary Road, Devanahalli
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
            Open 7:00 AM – 11:30 PM Daily
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#E5A93C]" />
            100% Pure Vegetarian
          </span>
        </div>
      </div>
    </section>
  );
};
