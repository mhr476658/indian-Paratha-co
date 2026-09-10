import React, { useState } from 'react';
import {
  Package,
  Coffee,
  Users,
  Briefcase,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Truck,
} from 'lucide-react';

export const BulkHighwayCatering: React.FC = () => {
  const [packType, setPackType] = useState('Road Trip Bento Boxes (10-25 Pax)');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const packages = [
    {
      name: 'Highway Road Trip Bento Box',
      desc: 'Individual sealed travel bento with 1 Stuffed Paratha, Dal Makhani, Curd, Pickle, and Sweet Gulab Jamun.',
      serves: 'Min 8 Pax',
      badge: 'Popular for Car Caravans',
    },
    {
      name: 'Chai & Paratha Breakfast Flask Kit',
      desc: '5-litre thermal dispenser of IPC Special Adrak Chai + 20 assorted Parathas packed in hot kraft sleeves with 20 kulhads.',
      serves: 'Serves 15-20',
      badge: 'Rider & Cycling Favorite',
    },
    {
      name: 'Corporate Offsite & Bus Tour Feast',
      desc: 'Buffet setup with live portable tawas, assortment of Parathzzaas, Lassi earthen pots, and fresh roadside accompaniments.',
      serves: '25 - 150 Pax',
      badge: 'Team Outings & Retreats',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    const msg = `Hello Indian Paratha Company!%0A%0A*Bulk Highway Catering Inquiry*%0A*Name:* ${encodeURIComponent(
      contactName
    )}%0A*Phone:* ${encodeURIComponent(contactPhone)}%0A*Package Selected:* ${encodeURIComponent(
      packType
    )}%0A*Travel Date:* ${encodeURIComponent(
      travelDate || 'This Week'
    )}%0A%0APlease share bulk pricing and tawa slot availability.`;

    window.open(`https://wa.me/919880883061?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#112338] via-[#162A45] to-[#1E3A5F] border border-[#1E3A5F] rounded-3xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2 text-[#D49B44] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Truck className="w-4 h-4" />
          <span>Highway Tiffins & Group Feasts</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Bulk Travel Packs & Highway Catering
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
          Planning a weekend family caravan, corporate offsite to Nandi Hills, or a group cycling
          expedition? Order customized travel boxes and hot chai flasks packed for long-distance
          freshness.
        </p>
      </div>

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-[#0D1B2A] border border-[#1E3A5F]/80 rounded-2xl p-5 hover:border-[#D49B44]/50 transition-all flex flex-col justify-between shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D49B44]/15 text-[#D49B44] border border-[#D49B44]/30 inline-block mb-3">
                {pkg.badge}
              </span>
              <h4 className="font-serif font-bold text-white text-base mb-1.5">{pkg.name}</h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">{pkg.desc}</p>
            </div>
            <div className="pt-3 border-t border-[#1E3A5F]/70 flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-white">{pkg.serves}</span>
              <span className="text-[#D49B44] font-bold">Custom Packaging</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Form */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-white">
              Request a Bulk Highway Quote
            </h4>
            <p className="text-xs text-stone-300">
              Instant response from our Highway Station Master within 15 minutes.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h5 className="font-serif font-bold text-white text-base">Inquiry Dispatched!</h5>
            <p className="text-xs text-stone-300">
              Our catering coordinator has received your requirements and will finalize your travel
              packs.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Selected Travel Package
                </label>
                <select
                  value={packType}
                  onChange={(e) => setPackType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs focus:outline-none focus:border-[#D49B44]"
                >
                  <option value="Road Trip Bento Boxes (10-25 Pax)">
                    Road Trip Bento Boxes (10-25 Pax)
                  </option>
                  <option value="Chai & Paratha Breakfast Flask Kit (15-20 Pax)">
                    Chai & Paratha Breakfast Flask Kit (15-20 Pax)
                  </option>
                  <option value="Corporate Offsite & Bus Tour Feast (25+ Pax)">
                    Corporate Offsite & Bus Tour Feast (25+ Pax)
                  </option>
                  <option value="Custom Highway Caravan Order">
                    Custom Highway Caravan Order
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Target Date & Pickup Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saturday 8:00 AM"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Nair"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href="tel:+919880883061"
                className="text-xs text-stone-300 hover:text-[#D49B44] flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D49B44]" />
                <span>Prefer talking? Call Station Master: +91 98808 83061</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D49B44] hover:bg-[#E5AA53] text-[#0B192C] text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#0B192C]" />
                <span>Submit Bulk Request via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
