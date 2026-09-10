/**
 * Indian Paratha Company - Premium Mobile-First Restaurant Website
 * "Chai, Paratha & More" - Authentic Indian Flavors & Highway Hospitality
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureDishes } from './components/SignatureDishes';
import { TodaysSpecial } from './components/TodaysSpecial';
import { MadeFresh } from './components/MadeFresh';
import { RestaurantStory } from './components/RestaurantStory';
import { Products } from './components/Products';
import { FoodGallery } from './components/FoodGallery';
import { Franchise } from './components/Franchise';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MoreHubModal, MoreTab } from './components/more/MoreHubModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartItem, MenuItem } from './types';
import { CheckCircle, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'customer' | 'admin-login' | 'admin-dashboard'>('customer');
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('ipc_admin_token'));
  const [adminUser, setAdminUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('ipc_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [moreDefaultTab, setMoreDefaultTab] = useState<MoreTab>('amenities');
  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMenuImageModalOpen, setIsMenuImageModalOpen] = useState(false);

  // Cart total count
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Check URL hash on load and hash changes for deep linking to #admin or #admin-login
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#dashboard') {
        if (adminToken && adminUser) {
          setCurrentView('admin-dashboard');
        } else {
          setCurrentView('admin-login');
        }
      } else if (hash === '#admin-login' || hash === '#login') {
        setCurrentView('admin-login');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [adminToken, adminUser]);

  const handleOpenAdmin = () => {
    if (adminToken && adminUser) {
      setCurrentView('admin-dashboard');
      window.location.hash = '#admin';
    } else {
      setCurrentView('admin-login');
      window.location.hash = '#admin-login';
    }
  };

  const handleLoginSuccess = (token: string, user: any) => {
    setAdminToken(token);
    setAdminUser(user);
    setCurrentView('admin-dashboard');
    window.location.hash = '#admin';
  };

  const handleLogout = async () => {
    try {
      if (adminToken) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('ipc_admin_token');
    localStorage.removeItem('ipc_admin_user');
    setAdminToken(null);
    setAdminUser(null);
    setCurrentView('admin-login');
    window.location.hash = '#admin-login';
  };

  const handleViewCustomerSite = () => {
    setCurrentView('customer');
    if (window.location.hash.startsWith('#admin')) {
      window.location.hash = '#home';
    }
  };

  // Add Item to Cart
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    // Show brief toast notification
    setToastMessage(`Added "${item.name}" to your order`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Update Item Quantity in Cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.item.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
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

  // Render Admin Login View
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={handleViewCustomerSite}
      />
    );
  }

  // Render Admin Dashboard View
  if (currentView === 'admin-dashboard' && adminToken && adminUser) {
    return (
      <AdminDashboard
        token={adminToken}
        user={adminUser}
        onLogout={handleLogout}
        onViewWebsite={handleViewCustomerSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080D0A] text-white font-sans antialiased selection:bg-[#E5A93C] selection:text-black relative overflow-x-hidden overflow-y-auto">

      {/* Top Fixed Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onOpenAdmin={handleOpenAdmin}
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
          onAddToCart={handleAddToCart}
          onSelectItemDetail={(item) => setSelectedItemDetail(item)}
          onViewFullMenu={() => setIsMenuImageModalOpen(true)}
        />

        {/* 5. Today's Special Highway Feast Promotional Combo */}
        <TodaysSpecial
          onAddComboToCart={handleAddToCart}
          onOrderNow={() => setIsCartOpen(true)}
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
        <Footer onOpenAdmin={handleOpenAdmin} />
      </div>

      {/* Floating Highway WhatsApp Quick Desk with subtle ping pulse */}
      <FloatingWhatsApp />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenMoreMenu={() => {
          setMoreDefaultTab('amenities');
          setIsMoreOpen(true);
        }}
      />

      {/* Cart Drawer & Checkout with prefilled WhatsApp output */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <ItemDetailModal
          item={selectedItemDetail}
          onClose={() => setSelectedItemDetail(null)}
          onAddToCart={handleAddToCart}
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
            
            <div className="flex-1 overflow-auto custom-scrollbar flex justify-center py-4 sm:py-8">
              <div className="min-w-[800px] w-[95%] md:w-[85%] max-w-6xl h-full mx-auto flex justify-center items-start">
                <img 
                  src="/physical-menu.jpg" 
                  alt="Indian Paratha Company Menu" 
                  className="w-full h-auto object-contain rounded-xl shadow-2xl" 
                  style={{ imageRendering: 'high-quality' }}
                />
              </div>
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
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="cart-toast"
          className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1C130D] text-white px-5 py-3 rounded-full shadow-2xl border border-[#D4AF37]/60 flex items-center gap-2.5 animate-fadeIn text-xs sm:text-sm font-medium"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 font-bold text-[#D4AF37] underline uppercase tracking-wider text-xs cursor-pointer"
          >
            View Order
          </button>
        </div>
      )}
    </div>
  );
}
