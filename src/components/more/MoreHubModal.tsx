import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Navigation,
  Bike,
  Lightbulb,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Shield,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { IPCLogo } from '../IPCLogo';
import { AmenitiesGuide } from './AmenitiesGuide';
import { RouteEtaCalculator } from './RouteEtaCalculator';
import { BikerRallyMeets } from './BikerRallyMeets';
import { HighwayTravelHacks } from './HighwayTravelHacks';
import { BulkHighwayCatering } from './BulkHighwayCatering';

export type MoreTab = 'amenities' | 'route-eta' | 'biker-rally' | 'hacks' | 'catering';

interface MoreHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: MoreTab;
  onOpenOrder?: () => void;
}

export const MoreHubModal: React.FC<MoreHubModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'amenities',
  onOpenOrder,
}) => {
  const [activeTab, setActiveTab] = useState<MoreTab>(defaultTab);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs: { id: MoreTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'amenities', label: 'Amenities & EV', icon: Zap },
    { id: 'route-eta', label: 'Route & ETA', icon: Navigation },
    { id: 'biker-rally', label: 'Biker & Car Meets', icon: Bike },
    { id: 'hacks', label: 'Travel Hacks', icon: Lightbulb },
    { id: 'catering', label: 'Bulk & Catering', icon: Truck },
  ];

  return (
    <div
      id="more-hub-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="more-hub-title"
    >
      <div
        className="bg-[#07111E] border border-[#1E3A5F] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#1E3A5F] bg-[#0B192C] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <IPCLogo variant="light" size="compact" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D49B44]">
                  Highway Hospitality Hub
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 id="more-hub-title" className="font-serif text-lg sm:text-xl font-bold text-white">
                Discover More at IPC
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#112338] hover:bg-[#1E3A5F] text-stone-300 hover:text-white flex items-center justify-center border border-[#1E3A5F] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-[#091524] border-b border-[#1E3A5F] px-4 py-2.5 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#D49B44] text-[#0B192C] shadow-md shadow-[#D49B44]/20'
                      : 'bg-[#112338]/60 text-stone-300 hover:bg-[#162A45] hover:text-white border border-[#1E3A5F]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#0B192C]' : 'text-[#D49B44]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 text-stone-200">
          {activeTab === 'amenities' && (
            <AmenitiesGuide
              onOrderNow={() => {
                onClose();
                onOpenOrder?.();
              }}
            />
          )}

          {activeTab === 'route-eta' && (
            <RouteEtaCalculator
              onOrderForArrival={(route) => {
                onClose();
                onOpenOrder?.();
              }}
            />
          )}

          {activeTab === 'biker-rally' && <BikerRallyMeets />}

          {activeTab === 'hacks' && <HighwayTravelHacks />}

          {activeTab === 'catering' && <BulkHighwayCatering />}
        </div>

        {/* Persistent Bottom Quick-Action Footer */}
        <div className="px-5 py-3.5 sm:px-6 bg-[#0B192C] border-t border-[#1E3A5F] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+919880883061"
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#D49B44] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D49B44]" />
              <span className="font-semibold">+91 98808 83061</span>
            </a>

            <a
              href="https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-stone-300 hover:text-[#D49B44] transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>NH7 Highway Corridor</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20have%20an%20inquiry%20regarding%20highway%20station%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Highway Desk</span>
            </a>

            {onOpenOrder && (
              <button
                onClick={() => {
                  onClose();
                  onOpenOrder();
                }}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#9B1B1E] hover:bg-[#B22222] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>Order Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
