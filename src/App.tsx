/**
 * Indian Paratha Company - Premium Mobile-First Restaurant Website
 * "Chai, Paratha & More" - Authentic Indian Flavors & Highway Hospitality
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickActions } from './components/QuickActions';
import { SpiceCanvas3D } from './components/SpiceCanvas3D';
import { SignatureDishes } from './components/SignatureDishes';
import { TodaysSpecial } from './components/TodaysSpecial';
import { MadeFresh } from './components/MadeFresh';
import { ChefKitchenCraft } from './components/ChefKitchenCraft';
import { MenuExperience } from './components/MenuExperience';
import { RestaurantStory } from './components/RestaurantStory';
import { FoodGallery } from './components/FoodGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { Franchise } from './components/Franchise';
import { Location } from './components/Location';
import { MoreSection } from './components/MoreSection';
import { FinalOrderCTA } from './components/FinalOrderCTA';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MotionBackground } from './components/MotionBackground';
import { MoreHubModal, MoreTab } from './components/more/MoreHubModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartItem, MenuItem } from './types';
import { CheckCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-black flex justify-center w-full">
        <div className="w-full max-w-[480px] bg-[#080D0A] text-white font-sans antialiased selection:bg-[#E5A93C] selection:text-black relative overflow-x-hidden overflow-y-auto shadow-2xl border-x border-white/5 min-h-screen">
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onBackToSite={handleViewCustomerSite}
          />
        </div>
      </div>
    );
  }

  // Render Admin Dashboard View
  if (currentView === 'admin-dashboard' && adminToken && adminUser) {
    return (
      <div className="min-h-screen bg-black flex justify-center w-full">
        <div className="w-full max-w-[480px] bg-[#080D0A] text-white font-sans antialiased selection:bg-[#E5A93C] selection:text-black relative overflow-x-hidden overflow-y-auto shadow-2xl border-x border-white/5 min-h-screen">
          <AdminDashboard
            token={adminToken}
            user={adminUser}
            onLogout={handleLogout}
            onViewWebsite={handleViewCustomerSite}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D0A] text-white font-sans antialiased selection:bg-[#E5A93C] selection:text-black relative overflow-x-hidden overflow-y-auto">
      {/* Ambient 3D / 4D Motion Background */}
      <MotionBackground />

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
          onExploreMenu={() => scrollToSection('menu')}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 2. Quick Highway Action Grid */}
        <QuickActions
          onExploreMenu={() => scrollToSection('menu')}
          onOpenOrderModal={() => setIsCartOpen(true)}
        />

        {/* 3. Interactive 3D WebGL Spice & Clay Kulhad Chai Canvas */}
        <SpiceCanvas3D onExploreMenu={() => scrollToSection('menu')} />

        {/* 4. Signature Food Grid (Parathzzaa®, Amritsari Makhan, Kulhad Chai, Dum Biryani) */}
        <SignatureDishes
          onAddToCart={handleAddToCart}
          onSelectItemDetail={(item) => setSelectedItemDetail(item)}
          onViewAllMenu={() => scrollToSection('menu')}
        />

        {/* 5. Today's Special Highway Feast Promotional Combo */}
        <TodaysSpecial
          onAddComboToCart={handleAddToCart}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 6. Made Fresh Kitchen Craft & Purity Philosophy */}
        <MadeFresh onExploreMenu={() => scrollToSection('menu')} />

        {/* 7. Interactive Chef Kitchen Craft Technique Cards */}
        <ChefKitchenCraft />

        {/* 8. Full Handcrafted Digital Menu & Ordering System */}
        <MenuExperience
          onAddToCart={handleAddToCart}
          onSelectItemDetail={(item) => setSelectedItemDetail(item)}
        />

        {/* 9. The IPC Story & Highway Sanctuary Heritage */}
        <RestaurantStory onExploreMenu={() => scrollToSection('menu')} />

        {/* 10. Visual Masonry Photo Gallery (Dishes, Chalet, Kitchen, Patio) */}
        <FoodGallery />

        {/* 11. High-Trust Customer Testimonials & Reviews */}
        <CustomerReviews onOrderNow={() => setIsCartOpen(true)} />

        {/* 12. Location, Route & Interactive Google Maps */}
        <Location onOrderNow={() => setIsCartOpen(true)} />

        {/* 13. Franchise Investment & Opportunities */}
        <Franchise />

        {/* 14. Highway Pitstop Amenities, Biker Hub & Hacks */}
        <MoreSection
          onOpenMoreTab={(tab) => {
            setMoreDefaultTab(tab);
            setIsMoreOpen(true);
          }}
          onOrderNow={() => setIsCartOpen(true)}
        />

        {/* 15. Closing Final Order CTA */}
        <FinalOrderCTA
          onOrderNow={() => setIsCartOpen(true)}
          onViewMenu={() => scrollToSection('menu')}
        />
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

      {/* Rich Item Details Modal with Spice and Quantity Selector */}
      <ItemDetailModal
        item={selectedItemDetail}
        onClose={() => setSelectedItemDetail(null)}
        onAddToCart={handleAddToCart}
      />

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
