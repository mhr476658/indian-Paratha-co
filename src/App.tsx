/**
 * Indian Paratha Company - Premium Mobile-First Restaurant Website
 * "Chai, Paratha & More" - Authentic Indian Flavors & Highway Hospitality
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SoulOfIPC } from './components/SoulOfIPC';
import { Visionaries } from './components/Visionaries';
import { FutureWeServe } from './components/FutureWeServe';
import { TraditionInnovation } from './components/TraditionInnovation';
import { Parathzzaa } from './components/Parathzzaa';
import { FranchiseInfo } from './components/FranchiseInfo';
import { FranchiseModels } from './components/FranchiseModels';
import { JoinSuccessStory } from './components/JoinSuccessStory';

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

  return (
    <div className="min-h-screen bg-[var(--color-navy)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--color-gold)] selection:text-[var(--color-navy)] relative overflow-x-hidden overflow-y-auto">

      {/* Top Fixed Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={0}
        onOpenMore={() => {
          setMoreDefaultTab('amenities');
          setIsMoreOpen(true);
        }}
      />

      {/* Main Restaurant Experience Flow - Redesigned based on Manifesto */}
      <main id="main-content" className="relative z-10">
        
        {/* 1. Cover Page */}
        <Hero />

        {/* 2. The Soul of IPC */}
        <SoulOfIPC />

        {/* 3. Meet the Visionaries */}
        <Visionaries />

        {/* 4. The Future We Serve */}
        <FutureWeServe />

        {/* 5. Tradition & Innovation */}
        <TraditionInnovation />

        {/* 6. Introducing Parathzzaa */}
        <Parathzzaa />

        {/* 7. Franchise Info (Own a Slice & Why Franchise) */}
        <FranchiseInfo />

        {/* 8. Franchise Models */}
        <FranchiseModels />

        {/* 9. Join The Success Story */}
        <JoinSuccessStory />

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

      {/* Floating Highway WhatsApp Quick Desk */}
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
            className="relative w-full h-full bg-[#0b192c] flex flex-col" 
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
                className="w-full max-w-6xl h-full rounded-xl shadow-2xl border-0 bg-[#0b192c]" 
              />
            </div>
          </div>
        </div>
      )}

      {/* More Highway Hub Modal */}
      <MoreHubModal
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        defaultTab={moreDefaultTab}
        onOpenOrder={() => setIsCartOpen(true)}
      />

    </div>
  );
}
