/**
 * Indian Paratha Company - Premium Mobile-First Restaurant Website
 * "Chai, Paratha & More" - Authentic Indian Flavors & Highway Hospitality
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureDishes } from './components/SignatureDishes';

import { MadeFresh } from './components/MadeFresh';
import { RestaurantStory } from './components/RestaurantStory';
import { Products } from './components/Products';
import { FoodGallery } from './components/FoodGallery';
import { Franchise } from './components/Franchise';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ItemDetailModal } from './components/ItemDetailModal';
import { MoreHubModal, MoreTab } from './components/more/MoreHubModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortalModal } from './components/AdminPortalModal';
import { MenuItem } from './types';
import { X } from 'lucide-react';

export default function App() {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [moreDefaultTab, setMoreDefaultTab] = useState<MoreTab>('amenities');
  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);
  const [isMenuImageModalOpen, setIsMenuImageModalOpen] = useState(false);

  // Check URL pathname or query for admin route on mount and popstate
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path.includes('/admin') ||
        path.includes('/api/admin/login') ||
        search.includes('admin=true') ||
        search.includes('admin=1')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    return () => window.removeEventListener('popstate', checkAdminRoute);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    const path = window.location.pathname.toLowerCase();
    if (path.includes('admin')) {
      window.history.pushState(null, '', '/');
    }
  };

  // Smooth Scroll Helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen bg-[#080D0A] text-white font-sans antialiased selection:bg-[#E5A93C] selection:text-black relative overflow-x-hidden overflow-y-auto">

      {/* Top Fixed Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={0}
        onOpenMore={() => {
          setMoreDefaultTab('amenities');
          setIsMoreOpen(true);
        }}
      />

      {/* Main Restaurant Experience Flow */}
      <main id="main-content" className="relative z-10">
        {/* 1. Full-Screen Cinematic Hero with Restaurant Wooden Chalet Facade */}
        <Hero
          onExploreMenu={() => setIsMenuImageModalOpen(true)}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 4. Signature Food Grid (Parathzzaa®, Amritsari Makhan, Kulhad Chai, Dum Biryani) */}
        <SignatureDishes
          onAddToCart={() => {}}
          onSelectItemDetail={(item) => setSelectedItemDetail(item)}
          onViewFullMenu={() => setIsMenuImageModalOpen(true)}
        />

        {/* 6. Made Fresh Kitchen Craft & Purity Philosophy */}
        <MadeFresh onExploreMenu={() => setIsMenuImageModalOpen(true)} />

        {/* 9. The IPC Story & Highway Sanctuary Heritage */}
        <RestaurantStory onExploreMenu={() => setIsMenuImageModalOpen(true)} />

        {/* Highway Merchandise / Products */}
        <Products />

        {/* 10. Visual Masonry Photo Gallery (Dishes, Chalet, Kitchen, Patio) */}
        <FoodGallery />

        {/* 12. Location, Route & Interactive Google Maps */}
        <Location onOrderNow={() => setIsCartOpen(true)} />

        {/* 13. Franchise Investment & Opportunities */}
        <Franchise />

      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      {/* Admin Command Center Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />

      {/* Floating Highway WhatsApp Quick Desk with subtle ping pulse */}
      <FloatingWhatsApp />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMoreMenu={() => {
          setMoreDefaultTab('amenities');
          setIsMoreOpen(true);
        }}
      />

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <ItemDetailModal
          item={selectedItemDetail}
          onClose={() => setSelectedItemDetail(null)}
          onAddToCart={() => {}}
        />
      )}

      {/* Physical Menu Image Modal */}
      {isMenuImageModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black" 
          onClick={() => setIsMenuImageModalOpen(false)}
        >
          <div 
            className="relative w-full h-full bg-[#0F1712] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setIsMenuImageModalOpen(false)}
                className="w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors shadow-lg backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 w-full h-full p-4 sm:p-8 flex justify-center">
              <iframe 
                src="/menu.pdf#toolbar=0" 
                title="Indian Paratha Company Menu" 
                className="w-full max-w-6xl h-full rounded-xl shadow-2xl border-0 bg-white" 
              />
            </div>
          </div>
        </div>
      )}

      {/* More Highway Hub Modal (Amenities, Route ETA, Biker Meets, Hacks, Bulk Catering) */}
      <MoreHubModal
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        defaultTab={moreDefaultTab}
        onOpenOrder={() => setIsCartOpen(true)}
      />

    </div>
  );
}
