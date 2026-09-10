import React, { useState } from 'react';
import {
  Navigation,
  Compass,
  Car,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface RoutePoint {
  id: string;
  name: string;
  landmark: string;
  distanceKm: number;
  driveTimeMin: number;
  routeHighlight: string;
  recommendedPrepTime: number;
}

const ROUTE_POINTS: RoutePoint[] = [
  {
    id: 'airport',
    name: 'BLR Airport / Devanahalli Toll',
    landmark: 'Kempegowda Intl Airport Exit',
    distanceKm: 14,
    driveTimeMin: 15,
    routeHighlight: 'Smooth 6-lane elevated expressway with minimal morning congestion',
    recommendedPrepTime: 12,
  },
  {
    id: 'hebbal',
    name: 'Hebbal Flyover / Esteem Mall',
    landmark: 'Outer Ring Road (ORR) North',
    distanceKm: 38,
    driveTimeMin: 40,
    routeHighlight: 'Fast highway stretch post-Yelahanka bypass, clear highway cruise',
    recommendedPrepTime: 20,
  },
  {
    id: 'nandi-hills',
    name: 'Nandi Hills Foothills',
    landmark: 'Nandi Upachar Junction / Muddenahalli',
    distanceKm: 22,
    driveTimeMin: 25,
    routeHighlight: 'Scenic mountain foothills descent onto NH7 Hyderabad Corridor',
    recommendedPrepTime: 15,
  },
  {
    id: 'manyata',
    name: 'Manyata Tech Park / Nagawara',
    landmark: 'Thanisandra Main Road',
    distanceKm: 42,
    driveTimeMin: 45,
    routeHighlight: 'Via Bellary Road / Airport Express link',
    recommendedPrepTime: 22,
  },
  {
    id: 'mg-road',
    name: 'Central Bangalore (MG Road / Cubbon Park)',
    landmark: 'CBD & Raj Bhavan corridor',
    distanceKm: 46,
    driveTimeMin: 55,
    routeHighlight: 'Via Windsor Manor bridge through Bellary Road highway flyovers',
    recommendedPrepTime: 25,
  },
  {
    id: 'hyderabad-nh44',
    name: 'Chikkaballapur / Hyderabad Southbound',
    landmark: 'NH44 Interstate Highway',
    distanceKm: 18,
    driveTimeMin: 20,
    routeHighlight: 'Direct southward expressway cruise into Bangalore outskirts',
    recommendedPrepTime: 15,
  },
];

interface RouteEtaCalculatorProps {
  onOrderForArrival?: (route: RoutePoint) => void;
}

export const RouteEtaCalculator: React.FC<RouteEtaCalculatorProps> = ({ onOrderForArrival }) => {
  const [selectedPoint, setSelectedPoint] = useState<RoutePoint>(ROUTE_POINTS[0]);
  const [drivingSpeed, setDrivingSpeed] = useState<'cruising' | 'express' | 'weekend'>('cruising');

  const speedMultiplier = drivingSpeed === 'express' ? 0.85 : drivingSpeed === 'weekend' ? 1.2 : 1.0;
  const calculatedEta = Math.round(selectedPoint.driveTimeMin * speedMultiplier);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=Indian+Paratha+Company+NH7+Bangalore&travelmode=driving`;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#112338] to-[#1E3A5F] border border-[#1E3A5F] rounded-3xl p-6 sm:p-7 shadow-lg">
        <div className="flex items-center gap-2 text-[#D49B44] text-xs font-bold uppercase tracking-widest mb-1.5">
          <Navigation className="w-4 h-4" />
          <span>Highway Route & ETA Assist</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          How Far Are You From IPC?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
          Located right on the main NH7 (NH44) highway heading towards Hyderabad. Select your
          departure spot to check driving times, road status, and sync your fresh tawa meal!
        </p>
      </div>

      {/* Starting Location Picker */}
      <div className="bg-[#0D1B2A] border border-[#1E3A5F]/80 rounded-2xl p-5 shadow-md">
        <label className="text-xs font-bold uppercase tracking-wider text-[#D49B44] block mb-3 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>Select Your Starting Point:</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROUTE_POINTS.map((pt) => {
            const isSelected = selectedPoint.id === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => setSelectedPoint(pt)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#1E3A5F] border-[#D49B44] text-white shadow-md shadow-[#D49B44]/10'
                    : 'bg-[#112338]/60 border-[#1E3A5F]/70 text-stone-300 hover:bg-[#162A45] hover:border-stone-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white truncate">{pt.name}</span>
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#D49B44] text-[#0B192C]'
                        : 'bg-[#0B192C] text-stone-400 border border-[#1E3A5F]'
                    }`}
                  >
                    {pt.distanceKm} km
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 truncate">{pt.landmark}</p>
              </button>
            );
          })}
        </div>

        {/* Driving Pace selector */}
        <div className="mt-4 pt-4 border-t border-[#1E3A5F]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-300 font-medium">Driving Condition Pace:</span>
          <div className="flex items-center gap-1 bg-[#112338] p-1 rounded-xl border border-[#1E3A5F]">
            <button
              onClick={() => setDrivingSpeed('express')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                drivingSpeed === 'express'
                  ? 'bg-[#D49B44] text-[#0B192C]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Express (Early Morning)
            </button>
            <button
              onClick={() => setDrivingSpeed('cruising')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                drivingSpeed === 'cruising'
                  ? 'bg-[#D49B44] text-[#0B192C]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Normal Highway Cruise
            </button>
            <button
              onClick={() => setDrivingSpeed('weekend')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                drivingSpeed === 'weekend'
                  ? 'bg-[#D49B44] text-[#0B192C]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Weekend Traffic Rush
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Route Results Card */}
      <div className="bg-gradient-to-br from-[#162A45] via-[#112338] to-[#0D1B2A] border border-[#D49B44]/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49B44]/20 border border-[#D49B44]/40 text-[#D49B44] text-xs font-extrabold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Direct NH7 Route</span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              From {selectedPoint.name}
            </h4>

            <p className="text-xs text-stone-300 leading-relaxed">
              {selectedPoint.routeHighlight}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Toll plaza passes smoothly with FASTag; 6-lane paved highway.</span>
            </div>
          </div>

          {/* Big ETA Numbers */}
          <div className="flex items-center gap-4 bg-[#0B192C]/80 border border-[#1E3A5F] rounded-2xl p-4 sm:p-5 shrink-0 shadow-inner">
            <div className="text-center pr-4 border-r border-[#1E3A5F]">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Distance
              </span>
              <span className="font-serif text-3xl font-black text-white">
                {selectedPoint.distanceKm}
              </span>
              <span className="text-xs font-semibold text-stone-400 ml-0.5">km</span>
            </div>

            <div className="text-center pl-2">
              <span className="text-[10px] font-bold text-[#D49B44] uppercase tracking-wider block">
                Est. Drive Time
              </span>
              <span className="font-serif text-3xl font-black text-[#D49B44]">
                ~{calculatedEta}
              </span>
              <span className="text-xs font-semibold text-stone-400 ml-0.5">mins</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-[#1E3A5F]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#254977] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#305C91] transition-all"
          >
            <span>Open in Google Maps Navigation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {onOrderForArrival && (
            <button
              onClick={() => onOrderForArrival(selectedPoint)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9B1B1E] to-[#B22222] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#9B1B1E]/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
              <span>Pre-Order to Ready on Arrival ({calculatedEta}m)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
