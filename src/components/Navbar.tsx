import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ArrowUpRight, Search, Shield, Sparkles } from 'lucide-react';
import { IPCLogo } from './IPCLogo';
import { ThemePaletteSelector } from './ThemePaletteSelector';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenSearch?: () => void;
  onOpenOrderModal?: () => void;
  onOpenMore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount,
  onOpenSearch = () => { },
  onOpenOrderModal = () => { },
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active tab detector
      const sections = ['home', 'products', 'location', 'franchise'];
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[var(--color-navy)] border-b border-white/10 ${
          isScrolled ? 'py-3 shadow-sm backdrop-blur-2xl bg-[var(--color-navy)]/95' : 'py-4 sm:py-5'
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
          <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm space-x-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  id={`desktop-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`px-6 py-2.5 rounded-full text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer ${isActive
                      ? 'bg-[var(--color-gold)] text-[var(--color-navy)] shadow-md scale-100'
                      : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Right Actions & Order Pill (MATCHING REFERENCE IMAGE "Booking ↗" BUTTON) */}
          <div className="flex items-center gap-3">





            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-primary)] hover:text-[var(--color-gold)] transition-colors rounded-full bg-white/5 hover:bg-white/10"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--color-navy-dark)]/95 backdrop-blur-3xl lg:hidden flex flex-col justify-between p-6 animate-fadeIn pt-24">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <IPCLogo variant="light" size="header" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-[var(--text-primary)] hover:bg-white/20 transition-colors"
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
                className="text-lg font-semibold text-[var(--text-primary)]/90 hover:text-[var(--color-gold)] py-2 px-4 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between"
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
              className="w-full py-3.5 rounded-full bg-[var(--color-gold)] text-[var(--color-navy)] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:opacity-90 transition-opacity"
            >
              <span>Order Online Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}
    </>
  );
};
