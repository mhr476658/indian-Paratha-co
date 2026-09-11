import React from 'react';
import { MapPin, Navigation, Phone, ShoppingBag, ExternalLink, MessageCircle, Clock, ShieldCheck, Car, Compass, ArrowUpRight } from 'lucide-react';

interface LocationProps {
  onOrderNow: () => void;
}

export const Location: React.FC<LocationProps> = ({ onOrderNow }) => {
  const googleMapsUrl = 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw';
  const phoneNumber = '+919880883061';
  const whatsappUrl =
    'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20am%20heading%20your%20way%20on%20NH7.';

  return (
    <section
      id="location"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      <div id="visit-us" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C]">
              ICONIC HIGHWAY SANCTUARY
            </span>
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white [word-spacing:0.25em] tracking-wider mb-3">
            COME FIND US <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">ON NH7</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            The celebrated pitstop for highway travelers, bikers, airport commuters, and culinary enthusiasts on Bengaluru-Bellary Road.
          </p>
        </div>

        {/* Location Showcase Card */}
        <div className="bg-[#0F1712]/95 rounded-3xl border border-white/15 shadow-2xl overflow-hidden max-w-5xl mx-auto backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Highway Route & Destination Summary */}
            <div className="lg:col-span-7 bg-[#142017]/50 p-8 sm:p-12 text-white relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-mono font-bold uppercase tracking-wider mb-6 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>NH7 Highway Landmark</span>
                </div>

                <h3 className="font-sans text-2xl sm:text-4xl font-bold text-white mb-2">
                  Indian Paratha Company
                </h3>

                <p className="text-[#E5A93C] text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase mb-4">
                  Devanahalli, Bengaluru Highway
                </p>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  Set against scenic stone outcrops along the Bengaluru–Hyderabad corridor. Pull over for smoking hot cast-iron parathas, farm white butter, and aromatic clay kulhad tea.
                </p>

                {/* Landmarks list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-white/80">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10">
                    <Compass className="w-4 h-4 text-[#E5A93C] shrink-0" />
                    <span>10 km from BLR Airport</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10">
                    <Car className="w-4 h-4 text-[#E5A93C] shrink-0" />
                    <span>Dedicated Highway Parking</span>
                  </div>
                </div>
              </div>

              {/* Highway Route Badge & Timings */}
              <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-4 h-4 text-[#E5A93C]" />
                  <span>Open Daily: 7:00 AM – 11:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Pure Vegetarian</span>
                </div>
              </div>
            </div>

            {/* Address Details & Interactive Navigation Actions */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#0F1712]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
                  ADDRESS &amp; CONTACT
                </span>

                <h4 className="font-sans text-xl font-bold text-white mb-3">
                  Plan Your Highway Stop
                </h4>

                <div className="bg-black/50 p-4 rounded-2xl border border-white/10 shadow-sm mb-6 text-xs text-white/70 leading-relaxed space-y-1 font-sans">
                  <p className="font-bold text-white">Indian Paratha Company (IPC)</p>
                  <p>NH7 (Bellary Road), Near Jain Temple,</p>
                  <p>Guttahalli, Devanahalli Taluk,</p>
                  <p className="text-[#E5A93C] font-mono">Bengaluru, Karnataka 562110</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* GET DIRECTIONS ON GOOGLE MAPS */}
                <a
                  id="loc-get-directions-btn"
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* CALL NOW & WHATSAPP US */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    id="loc-call-now-btn"
                    href={`tel:${phoneNumber}`}
                    className="py-3 px-3 bg-white/10 hover:bg-white/15 text-white border border-white/15 font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                    <span>Call Ahead</span>
                  </a>

                  <a
                    id="loc-whatsapp-btn"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366] shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>


              </div>
            </div>
          </div>

          {/* Embedded Google Maps View for Fast Navigation */}
          <div className="w-full h-64 sm:h-72 border-t border-white/10 bg-black relative overflow-hidden">
            <iframe
              title="Indian Paratha Company NH7 Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.3323086478627!2d77.7126284758778!3d13.267156987076413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1fa8e9c1d0f5%3A0xb308a0d9229f3d53!2sIndian%20Paratha%20Company!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
