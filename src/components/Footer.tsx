import React from 'react';
import { IPCLogo } from './IPCLogo';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ExternalLink, ArrowUp, Shield, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin = () => {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Franchise', href: '#franchise' },
    { label: 'Location', href: '#location' },
    { label: 'More', href: '#more' },
  ];

  return (
    <footer className="bg-[#080D0A] text-white/70 border-t border-white/10 pt-12 pb-16 lg:pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <IPCLogo variant="light" size="md" />
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6 font-sans">
              "Traditional Indian flavours, reimagined for the modern world." Authentic tawa
              parathas, aromatic cutting chai, and patented Parathzzaa® along India’s scenic highways.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/indianparathacompany?stkn=cDhoY3V4cWJiNGNu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/share/1BkF6H7jeR/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://youtube.com/@indianparathacompany6661?si=gIL1jMVrxGIStcip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-white font-bold tracking-wider text-base uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[#E5A93C] text-xs transition-transform group-hover:translate-x-1">
                      ✦
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact & Location */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-white font-bold tracking-wider text-base uppercase mb-4">
              Verified Highway Presence
            </h4>

            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Indian Paratha Company</span>
                  <a
                    href="https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E5A93C] hover:underline flex items-center gap-1 mt-0.5 font-mono"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E5A93C] shrink-0" />
                <a href="tel:+919880883061" className="hover:text-white transition-colors font-mono">
                  +91 98808 83061
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp: 98808 83061</span>
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E5A93C] shrink-0" />
                <a href="mailto:info@franchise-ready.in" className="hover:text-white transition-colors">
                  info@franchise-ready.in
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-[#0F1712] border border-white/10 text-xs text-white/70">
              <span className="text-[#E5A93C] font-semibold block mb-0.5 font-mono">Pure Vegetarian Hygiene</span>
              All meals prepared in dedicated 100% vegetarian tawa kitchens.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Indian Paratha Company. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#E5A93C] transition-colors flex items-center gap-1.5 text-white/70 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Station Admin Portal</span>
            </button>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#E5A93C] flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
