import React, { useState } from 'react';
import {
  Bike,
  Users,
  Coffee,
  Sparkles,
  Calendar,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Award,
} from 'lucide-react';

export const BikerRallyMeets: React.FC = () => {
  const [clubName, setClubName] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [paxCount, setPaxCount] = useState('10-20 Riders');
  const [captainPhone, setCaptainPhone] = useState('');
  const [registered, setRegistered] = useState(false);

  const perks = [
    {
      title: 'Reserved Tarmac Parking',
      desc: 'Dedicated front tarmac section reserved for your convoy of motorcycles or sports cars with parking marshal oversight.',
      icon: Bike,
    },
    {
      title: 'Tawa Priority & Hot Matka Chai',
      desc: 'Staggered hot tawa batches so all 15-50 riders eat fresh, steaming parathas simultaneously without waiting in separate queues.',
      icon: Coffee,
    },
    {
      title: 'Large Group Chai Flasks',
      desc: 'Insulated 5-litre and 10-litre IPC highway flasks with authentic terracotta kulhads ready upon engine shutoff.',
      icon: Users,
    },
    {
      title: 'Official Ride Photo Spot',
      desc: 'Iconic timber chalet backdrop with IPC crest shield for your official club group portraits and Instagram reels.',
      icon: Award,
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName || !captainPhone) return;

    // Direct to WhatsApp with pre-filled ride concierge details
    const text = `Hello Indian Paratha Company!%0A%0A*Group Ride / Rally Booking Request*%0A*Club Name:* ${encodeURIComponent(
      clubName
    )}%0A*Date of Ride:* ${encodeURIComponent(
      rideDate || 'Upcoming Weekend'
    )}%0A*Riders / Vehicles:* ${encodeURIComponent(
      paxCount
    )}%0A*Ride Captain Phone:* ${encodeURIComponent(
      captainPhone
    )}%0A%0APlease reserve parking bays and tawa slots. Thank you!`;

    window.open(`https://wa.me/919880883061?text=${text}`, '_blank');
    setRegistered(true);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1A0B0E] via-[#241116] to-[#162A45] border border-[#DE2428]/30 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#FFA0A3] text-xs font-bold uppercase tracking-widest mb-1.5">
            <Bike className="w-4 h-4" />
            <span>Bangalore’s Iconic Highway Ride Destination</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Biker Meets, Supercar Rallies & Cycling Pelotons
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl leading-relaxed">
            Since 2014, the NH7 Sunday morning ride to IPC has been an essential pilgrimage for
            thousands of motorcycle clubs, sports car enthusiasts, and endurance cyclists.
          </p>
        </div>
      </div>

      {/* Perks Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <div
              key={i}
              className="bg-[#0D1B2A] border border-[#1E3A5F]/70 rounded-2xl p-5 hover:border-[#D49B44]/40 transition-all shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D49B44]/15 border border-[#D49B44]/30 text-[#D49B44] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm mb-1">{perk.title}</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ride Registration Form */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-white">
              Notify Us of an Upcoming Group Ride
            </h4>
            <p className="text-xs text-stone-300">
              We will brief our highway kitchen and parking marshals in advance for your crew.
            </p>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#D49B44]/20 border border-[#D49B44]/30 text-[#D49B44] text-[11px] font-bold">
            Zero Reservation Fees
          </span>
        </div>

        {registered ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h5 className="font-serif font-bold text-white text-base">
              Ride Details Forwarded to Station Master!
            </h5>
            <p className="text-xs text-stone-300">
              Your WhatsApp concierge window opened. Our marshals have your arrival noted on the
              kitchen board.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Club / Group Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore Enfield Club, Apex Supercars"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Target Ride Date & Approx Arrival
                </label>
                <input
                  type="text"
                  placeholder="e.g. This Sunday, 7:30 AM"
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Estimated Group Size
                </label>
                <select
                  value={paxCount}
                  onChange={(e) => setPaxCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs focus:outline-none focus:border-[#D49B44]"
                >
                  <option value="5-10 Bikes / Cars">5-10 Bikes / Cars (Small Crew)</option>
                  <option value="10-20 Riders">10-20 Riders (Standard Club Ride)</option>
                  <option value="20-50 Riders">20-50 Riders (Major Chapter Rally)</option>
                  <option value="50+ Riders">50+ Mega Rally (Special Logistics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Ride Captain WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={captainPhone}
                  onChange={(e) => setCaptainPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#1E3A5F] text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#D49B44]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-[#D49B44]" />
                <span>Recommended morning arrival: 6:30 AM – 8:30 AM for best weather.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#9B1B1E] hover:bg-[#B22222] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Group Ride via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
