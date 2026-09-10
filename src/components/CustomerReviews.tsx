import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  verified: boolean;
}

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Vikramaditya Rao',
    role: 'Highway Commuter & Food Critic',
    city: 'Bengaluru',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'The Aloo Cheese Paratha with melting white butter is easily the best road-trip comfort food in South India. The parathas are piping hot, zero greasiness, and that smoky clay kulhad ginger chai is pure bliss. A mandatory stop every time I head to BLR airport or Hyderabad!',
    favoriteDish: 'Amritsari Aloo Cheese Paratha + Kulhad Chai',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Dr. Ananya Sen',
    role: 'Biker & Travel Enthusiast',
    city: 'Hyderabad',
    rating: 5,
    date: '1 month ago',
    comment:
      'The rustic conservatory glasshouse ambiance and outdoor courtyard are breathtaking, but the food is the real superstar. IPC’s Paneer Tikka Parathzzaa combines the crunch of a tandoori paratha with gooey mozzarella that blows commercial pizzas away. Highly recommended!',
    favoriteDish: 'Paneer Tikka Parathzzaa®',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Karthik & Sneha Iyer',
    role: 'Family Road Tripper',
    city: 'Chennai',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'Cleanest highway restaurant on NH7! The 100% whole wheat dough makes a noticeable difference—light on the stomach yet intensely flavorful. The kids loved the chocolate shakes and sweet lassi while we devoured the Dum Ki Gobi Parathzzaa.',
    favoriteDish: 'Dum Ki Gobi Parathzzaa + Patiala Lassi',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Rohan Deshmukh',
    role: 'Weekend Biker Group Lead',
    city: 'Bengaluru',
    rating: 5,
    date: 'Last weekend',
    comment:
      'Our Sunday morning breakfast ride to Nandi Hills always ends at IPC. 25 bikes, great parking, rapid kitchen turnover, and unmatched taste. The Smoked Soya Keema Paratha has that authentic dhaba soul with gourmet cleanliness.',
    favoriteDish: 'Smoked Soya Keema Paratha + Adrak Chai',
    verified: true,
  },
];

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const activeReview = REVIEWS_DATA[currentIndex];

  return (
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden border-t border-white/10"
    >
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#2E4434]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              GUEST STORIES &amp; EXPERIENCES
            </span>
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">Travellers</span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            From daily commuters to weekend road-trippers and highway food connoisseurs, hear what our guests cherish most about IPC.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-[#0F1712]/95 border border-white/15 shadow-2xl backdrop-blur-xl">
            {/* Top Row: Quote Icon & Stars */}
            <div className="flex items-center justify-between mb-8">
              <div className="p-3.5 rounded-2xl bg-white/10 text-[#E5A93C] border border-white/15">
                <Quote className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-1">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E5A93C] text-[#E5A93C]" />
                ))}
              </div>

              {activeReview.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Guest Review</span>
                </span>
              )}
            </div>

            {/* Quote Body */}
            <blockquote className="font-sans text-lg sm:text-2xl text-white/90 leading-relaxed mb-8">
              "{activeReview.comment}"
            </blockquote>

            {/* Author Details & Favorite Dish */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div>
                <h4 className="font-sans text-lg font-bold text-white mb-0.5">
                  {activeReview.name}
                </h4>
                <p className="text-xs text-white/50">
                  {activeReview.role} • {activeReview.city} • <span className="font-mono">{activeReview.date}</span>
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-full bg-black/60 border border-white/10 text-xs text-[#E5A93C]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">
                  Favorite Dish
                </span>
                <span className="font-semibold">{activeReview.favoriteDish}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/60">
              {currentIndex + 1} of {REVIEWS_DATA.length}
            </span>
            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
