import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isPinging, setIsPinging] = useState(false);
  const phoneNumber = '98808 83061';
  const whatsappUrl =
    'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20would%20like%20to%20place%20an%20order%20or%20make%20an%20inquiry.';

  const handleButtonClick = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Mini Tooltip with New WhatsApp Number */}
      {showTooltip && (
        <div className="bg-[#0B192C] text-white border border-[#25D366]/40 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-fadeIn backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <div>
            <p className="font-semibold text-stone-200">WhatsApp Desk</p>
            <p className="font-mono text-[#25D366] text-[11px] font-bold">+91 {phoneNumber}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="p-1 text-stone-400 hover:text-white rounded-md transition-colors ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleButtonClick}
        aria-label={`Chat with Indian Paratha Company on WhatsApp at ${phoneNumber}`}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20 relative cursor-pointer"
      >
        {/* Subtle Ping Wave on Click */}
        {isPinging && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping pointer-events-none" />
        )}

        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white z-10" />
      </a>
    </div>
  );
};

