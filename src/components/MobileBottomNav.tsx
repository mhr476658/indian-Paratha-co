import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, MapPin, Camera } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection?: string;
  onOpenOrderModal?: () => void;
  onOpenMoreMenu?: () => void;
  cartCount: number;
  onOpenCart?: () => void;
  onOpenAdmin?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection = 'home',
  onOpenOrderModal,
  cartCount,
  onOpenCart,
}) => {
  const handleOrderClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else if (onOpenOrderModal) {
      onOpenOrderModal();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="mobile-fixed-bottom-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080D0A]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.9)]"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {/* HOME */}
        <button
          id="mob-bottom-home"
          onClick={() => scrollToSection('home')}
          className={`flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors cursor-pointer ${
            activeSection === 'home' ? 'text-[#E5A93C]' : 'text-white/60 hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">Home</span>
        </button>

        {/* MENU */}
        <button
          id="mob-bottom-menu"
          onClick={() => scrollToSection('menu')}
          className={`flex flex-col items-center justify-center w-full min-h-[44px] py-1 transition-colors cursor-pointer ${
            activeSection === 'menu' ? 'text-[#E5A93C]' : 'text-white/60 hover:text-white'
          }`}
          aria-label="View Menu"
        >
          <UtensilsCrossed className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">Menu</span>
        </button>

        {/* ORDER (Visually Prominent Floating Pill) */}
        <div className="flex flex-col items-center justify-center relative -top-3.5">
          <button
            id="mob-bottom-order-prominent"
            onClick={handleOrderClick}
            className="w-14 h-14 rounded-full bg-white text-black hover:bg-[#E5A93C] flex flex-col items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.7)] border-2 border-[#080D0A] active:scale-90 transition-transform cursor-pointer"
            aria-label={`Order food online (${cartCount} items)`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white/20 shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[8px] font-mono font-bold tracking-widest uppercase mt-0.5">ORDER</span>
          </button>
        </div>

        {/* GALLERY */}
        <button
          id="mob-bottom-gallery"
          onClick={() => scrollToSection('gallery')}
          className="flex flex-col items-center justify-center w-full min-h-[44px] py-1 text-white/60 hover:text-[#E5A93C] transition-colors cursor-pointer"
          aria-label="Food Gallery"
        >
          <Camera className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">Gallery</span>
        </button>

        {/* LOCATION */}
        <button
          id="mob-bottom-location"
          onClick={() => scrollToSection('location')}
          className="flex flex-col items-center justify-center w-full min-h-[44px] py-1 text-white/60 hover:text-[#E5A93C] transition-colors cursor-pointer"
          aria-label="Location and Directions"
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">Find Us</span>
        </button>
      </div>
    </nav>
  );
};
