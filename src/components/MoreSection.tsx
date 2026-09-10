import React from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Zap,
  Bike,
  Coffee,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { MoreTab } from './more/MoreHubModal';

interface MoreSectionProps {
  onOpenMoreTab: (tab: MoreTab) => void;
  onOrderNow: () => void;
}

export const MoreSection: React.FC<MoreSectionProps> = ({
  onOpenMoreTab,
  onOrderNow,
}) => {
  const googleMapsUrl = 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw';
  const phoneNumber = '+919880883061';
  const whatsappUrl =
    'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20am%20heading%20your%20way%20on%20the%20highway.';

  const amenities = [
    {
      icon: Zap,
      title: 'EV Fast Charging',
      desc: 'Rapid multi-vehicle charging stations for highway road-trippers.',
      tab: 'amenities' as MoreTab,
    },
    {
      icon: Bike,
      title: 'Biker Pitstop & Meets',
      desc: 'Rider staging grounds, helmet storage & weekend breakfast rallies.',
      tab: 'biker-rally' as MoreTab,
    },
    {
      icon: Navigation,
      title: 'Route & ETA Calculator',
      desc: 'Live highway mileage and travel time from Bengaluru airport & city.',
      tab: 'route-eta' as MoreTab,
    },
    {
      icon: Coffee,
      title: 'Bulk Highway Catering',
      desc: 'Hot tawa meal boxes for bus tours, corporate rallies & road trips.',
      tab: 'catering' as MoreTab,
    },
  ];

  return (
    <section
      id="more"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2E4434]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#E5A93C]">
              HIGHWAY HUB &amp; SERVICES
            </span>
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            More at <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">Indian Paratha Company</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Beyond handcrafted parathas — your premium highway pitstop equipped for travellers,
            bikers, road-trippers, and families.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onOpenMoreTab(item.tab)}
                className="group bg-[#0F1712]/95 rounded-3xl p-6 border border-white/15 hover:border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-[#E5A93C] group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-sans text-lg font-bold text-white mb-2 group-hover:text-[#E5A93C] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E5A93C] group-hover:text-white font-mono">
                  <span>Explore Details</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Destination & Location Showcase */}
        <div className="bg-[#0F1712]/95 rounded-3xl border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Destination Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden bg-[#142017]/40">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
                  alt="Indian Paratha Company highway conservatory"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A] via-[#080D0A]/85 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-[11px] font-mono font-bold uppercase tracking-wider mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Verified Destination</span>
                </div>

                <h3 className="font-sans text-2xl sm:text-4xl font-bold text-white mb-2">
                  Come Find Us on NH7
                </h3>

                <p className="text-[#E5A93C] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 font-mono">
                  Bengaluru — Hyderabad Highway Corridor
                </p>

                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg font-sans">
                  Nestled along NH7 near Devanahalli, our rustic botanical conservatory welcomes travellers,
                  cyclists, and long-drive enthusiasts with sizzling tawa parathas, authentic churned
                  butter, and steaming clay kulhad chai.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenMoreTab('route-eta')}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Calculate ETA</span>
                  </button>
                </div>
              </div>

              {/* Station Info Chips */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E5A93C]" />
                  <span>Open Daily: 7:00 AM – 11:30 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>FSSAI Certified Kitchen</span>
                </div>
              </div>
            </div>

            {/* Quick Contact & Highway Help Desk */}
            <div className="lg:col-span-5 bg-[#0F1712] p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="font-sans text-lg font-bold text-white mb-2">
                  Highway Help &amp; Advance Takeaways
                </h4>
                <p className="text-xs text-white/50 mb-6 font-sans">
                  Driving on the highway? Call ahead or message on WhatsApp to keep your hot meal
                  ready when you pull over.
                </p>

                <div className="space-y-3">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#E5A93C]" />
                      </div>
                      <div>
                        <span className="text-[11px] text-white/50 block uppercase font-medium font-mono">
                          Direct Line
                        </span>
                        <span className="text-sm font-bold text-white font-mono">{phoneNumber}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#E5A93C] group-hover:translate-x-1 transition-transform font-mono">
                      Call
                    </span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-600/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-emerald-300 block uppercase font-medium font-mono">
                          WhatsApp Desk
                        </span>
                        <span className="text-sm font-bold text-white">Live Highway Orders</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform font-mono">
                      Chat
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => onOpenMoreTab('amenities')}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Open Full Highway Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
