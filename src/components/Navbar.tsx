import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ArrowUpRight, Search, Shield, Sparkles } from 'lucide-react';
import { IPCLogo } from './IPCLogo';
import { ThemePaletteSelector } from './ThemePaletteSelector';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenSearch?: () => void;
  onOpenOrderModal?: () => void;
  onOpenAdmin?: () => void;
  onOpenMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount,
  onOpenSearch = () => {},
  onOpenOrderModal = () => {},
  onOpenAdmin = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active tab detector
      const sections = ['home', 'parathzzaa', 'products', 'location', 'franchise'];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (section === 'home') setActiveTab('Home');
            else if (section === 'parathzzaa') setActiveTab('Parathzzaa®');
            else if (section === 'products') setActiveTab('Products');
            else if (section === 'location') setActiveTab('Location');
            else if (section === 'franchise') setActiveTab('Franchise');
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Parathzzaa®', href: '#signature-dishes' },
    { label: 'Products', href: '#products' },
    { label: 'Location', href: '#location' },
    { label: 'Franchise', href: '#franchise' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080D0A]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#080D0A]/90 via-[#080D0A]/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Left Brand Logo */}
          <a
            id="nav-logo-link"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'Home')}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Indian Paratha Company Home"
          >
            <IPCLogo variant="light" size="header" />
          </a>

          {/* 2. Center Floating Pill Navigation Bar (EXACT REPLICA FROM REFERENCE IMAGE) */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl space-x-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  id={`desktop-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`px-6 py-2.5 rounded-full text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Right Actions & Order Pill (MATCHING REFERENCE IMAGE "Booking ↗" BUTTON) */}
          <div className="flex items-center gap-3">

            {/* Cart Button */}
            <button
              id="desktop-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 text-white/90 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20 border border-white/15 cursor-pointer shadow-md"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E5A93C] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#080D0A]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg cursor-pointer"
              aria-label="Admin Access"
              title="Admin Access"
            >
              <Shield className="w-4 h-4" />
            </button>


            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#E5A93C] transition-colors rounded-full bg-white/10 border border-white/15"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#080D0A]/95 backdrop-blur-3xl lg:hidden flex flex-col justify-between p-6 animate-fadeIn pt-24">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <IPCLogo variant="light" size="header" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                className="text-lg font-semibold text-white/90 hover:text-[#E5A93C] py-2 px-4 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Order Online Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-full bg-white/5 text-white/70 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10"
            >
              <Shield className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Staff / Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
