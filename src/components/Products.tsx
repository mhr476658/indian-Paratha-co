import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { adminStore } from '../lib/adminStore';

export const Products: React.FC = () => {
  const handleProductOrder = () => {
    adminStore.submitOrder({
      customerName: 'Highway Product Customer',
      phone: '+91 98808 83061',
      orderType: 'Takeaway',
      items: [
        {
          id: 'prod-tea-blend',
          name: 'IPC Premium Tea Blend (100% Upper Assam Granules)',
          price: 299,
          quantity: 1,
        },
      ],
      total: 299,
      notes: 'Highway Merchandise Order: IPC Premium Tea Blend via WhatsApp',
    }).catch((err) => console.error('Failed to log product order:', err));
  };

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#080D0A] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
              HIGHWAY MERCHANDISE
            </span>
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl font-bold text-white tracking-wider mb-4">
            OUR <span className="text-[#E5A93C]">PRODUCTS</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Take the authentic highway experience home with our signature blends and handcrafted specialties.
          </p>
        </div>

        <div className="bg-[#0F1712] rounded-3xl border border-white/10 overflow-hidden max-w-sm mx-auto shadow-2xl flex flex-col items-center">
          <div className="w-full aspect-[4/5] bg-black/40 relative overflow-hidden flex items-center justify-center p-6">
            <img 
              src="/ipc-tea-blend.png" 
              alt="IPC Premium Tea Blend" 
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8 w-full text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold font-sans text-white mb-2">IPC Premium Tea Blend</h3>
            <p className="text-[#E5A93C] text-sm font-mono tracking-widest uppercase mb-4">100% Upper Assam Granules</p>
            <p className="text-white/70 text-sm mb-6">
              Strong, rich, and refreshing. The perfect blend for a perfect cup, bringing the tradition of our highway kulhad chai straight to your kitchen.
            </p>
            <a 
              href={`https://wa.me/919880883061?text=${encodeURIComponent("Hello Indian Paratha Company,\nI would like to order:\n• IPC Premium Tea Blend\nPlease confirm availability and delivery details.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleProductOrder}
              className="w-full py-3.5 bg-white hover:bg-[#E5A93C] text-black font-bold uppercase tracking-wider text-xs rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
