import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Award,
  PenLine,
  Sparkles,
  Bike,
  Car,
  Users,
  Plane,
  X,
  Send,
} from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  badge: string;
  rating: number;
  timeAgo: string;
  tripType: 'biker' | 'roadtrip' | 'family' | 'airport' | 'all';
  tripLabel: string;
  icon: 'bike' | 'car' | 'users' | 'plane';
  content: string;
  recommendedDishes: string[];
  helpfulCount: number;
  isVerified: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Arjun Nair',
    badge: 'Local Guide • Level 7',
    rating: 5,
    timeAgo: '2 days ago',
    tripType: 'airport',
    tripLabel: 'Airport Commuter',
    icon: 'plane',
    content:
      'Unbeatable breakfast on the highway! Stopped on the way to Kempegowda Airport (BLR). The Smoked Paneer Tikka Parathzzaa® had the perfect flaky crust and was bursting with rich makhani drizzle. The Kulhad Adrak Chai was piping hot and aromatic. Huge parking area and courteous staff.',
    recommendedDishes: ['Smoked Paneer Tikka Parathzzaa®', 'Special Kulhad Adrak Chai'],
    helpfulCount: 38,
    isVerified: true,
  },
  {
    id: 'rev-2',
    author: 'Vikram "Rider" Kulkarni',
    badge: 'Bangalore Throttle Club',
    rating: 5,
    timeAgo: '5 days ago',
    tripType: 'biker',
    tripLabel: 'Sunday Biker Pitstop',
    icon: 'bike',
    content:
      'Our Sunday 6 AM biker group ride to Devanahalli always terminates at Indian Paratha Company. That first steaming sip of Ginger Masala Chai with a crisp, loaded Parathzzaa sitting in the open highway breeze is pure bliss. Plenty of dedicated space to park 25+ bikes safely.',
    recommendedDishes: ['Aloo Cheese Parathzzaa®', 'Adrak Masala Kulhad Chai'],
    helpfulCount: 64,
    isVerified: true,
  },
  {
    id: 'rev-3',
    author: 'Meenakshi & Sundaram',
    badge: 'Verified NH7 Traveler',
    rating: 5,
    timeAgo: '1 week ago',
    tripType: 'family',
    tripLabel: 'Family Road Trip',
    icon: 'users',
    content:
      'A highway culinary institution! We have been stopping at IPC every time we drive towards Hyderabad or Nandi Hills since 2016. Fresh homemade white butter, piping hot Aloo Methi parathas with rich tangy curd, and exceptionally clean restrooms which is so hard to find on highway routes.',
    recommendedDishes: ['Signature Amritsari Aloo Paratha', 'Malai Lassi in Clay Pot'],
    helpfulCount: 52,
    isVerified: true,
  },
  {
    id: 'rev-4',
    author: 'Sunita & Rahul Kapoor',
    badge: 'Highway Commuter',
    rating: 5,
    timeAgo: '2 weeks ago',
    tripType: 'roadtrip',
    tripLabel: 'NH7 Weekend Drive',
    icon: 'car',
    content:
      'Traveled with my elderly parents and kids. The wooden chalet architecture gives a lovely hill-station resort feel right off NH7. The food is non-greasy, made on order with whole wheat flour, and served smoking hot. Do not miss the Kesari Rabri Gulab Jamun!',
    recommendedDishes: ['Royal Tawa Paratha Platter', 'Kesari Rabri Gulab Jamun'],
    helpfulCount: 29,
    isVerified: true,
  },
  {
    id: 'rev-5',
    author: 'Deepak Shenoy',
    badge: 'Frequent Commuter',
    rating: 5,
    timeAgo: '3 weeks ago',
    tripType: 'roadtrip',
    tripLabel: 'Business Road Traveler',
    icon: 'car',
    content:
      'Quickest takeaway order handoff on this stretch. Used the QR code / WhatsApp order service 20 minutes before arriving and picked up hot packaged parathas right at the counter without wasting a second.',
    recommendedDishes: ['Mooli Methi Paratha', 'Sweet Lassi'],
    helpfulCount: 18,
    isVerified: true,
  },
];

export const MapReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'biker' | 'roadtrip' | 'family' | 'airport'>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, boolean>>({});
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isSubmittedToast, setIsSubmittedToast] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [tripType, setTripType] = useState<'biker' | 'roadtrip' | 'family' | 'airport'>('roadtrip');
  const [reviewContent, setReviewContent] = useState('');
  const [dishRecommendation, setDishRecommendation] = useState('');

  const googleMapsUrl = 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw';

  const handleHelpfulClick = (id: string) => {
    if (helpfulLikes[id]) return;
    setHelpfulLikes((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      badge: 'Highway Guest',
      rating: userRating,
      timeAgo: 'Just now',
      tripType: tripType,
      tripLabel:
        tripType === 'biker'
          ? 'Biker / Rider'
          : tripType === 'airport'
          ? 'Airport Commuter'
          : tripType === 'family'
          ? 'Family Dining'
          : 'Road Tripper',
      icon: tripType === 'biker' ? 'bike' : tripType === 'airport' ? 'plane' : tripType === 'family' ? 'users' : 'car',
      content: reviewContent.trim(),
      recommendedDishes: dishRecommendation ? [dishRecommendation.trim()] : [],
      helpfulCount: 1,
      isVerified: true,
    };

    setReviews([newReview, ...reviews]);
    setIsWriteReviewOpen(false);
    setAuthorName('');
    setReviewContent('');
    setDishRecommendation('');
    setIsSubmittedToast(true);
    setTimeout(() => setIsSubmittedToast(false), 5000);
  };

  const filteredReviews =
    selectedFilter === 'all'
      ? reviews
      : reviews.filter((r) => r.tripType === selectedFilter);

  const getTripIcon = (icon: string) => {
    switch (icon) {
      case 'bike':
        return <Bike className="w-3.5 h-3.5" />;
      case 'plane':
        return <Plane className="w-3.5 h-3.5" />;
      case 'users':
        return <Users className="w-3.5 h-3.5" />;
      default:
        return <Car className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-[#0B0D13] text-white border-t border-[#E6CA85]/20">
      {/* Toast Notification */}
      {isSubmittedToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Thank you! Your review has been submitted to the Highway Community board.</span>
        </div>
      )}

      {/* Main Review & Rating Header Panel */}
      <div className="p-6 sm:p-10 bg-[#0F1712]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Left: Rating Hero Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black/60 text-white flex flex-col items-center justify-center shadow-lg border border-white/20 shrink-0">
              <span className="font-sans text-3xl sm:text-4xl font-bold text-[#E5A93C] leading-none">4.4</span>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < 4 ? 'fill-[#E5A93C] text-[#E5A93C]' : 'fill-[#E5A93C]/40 text-[#E5A93C]'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/50 font-mono mt-1">OUT OF 5</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider font-mono">
                  <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Ranked #1 Highway Pitstop</span>
                </span>
                <span className="text-xs text-white/40 hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  94% Travelers Recommend
                </span>
              </div>

              <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
                Guest Reviews &amp; Highway Ratings
              </h3>

              <p className="text-white/70 text-xs sm:text-sm font-sans mt-1">
                Based on <strong className="text-white">18,500+ verified ratings</strong> on Google Maps across 10+ years on NH7 Bangalore Highway.
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              id="write-review-btn"
              onClick={() => setIsWriteReviewOpen(true)}
              className="flex-1 sm:flex-initial py-3 px-5 rounded-full bg-white hover:bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Review</span>
            </button>

            <a
              id="view-google-reviews-btn"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/60" />
            </a>
          </div>
        </div>

        {/* Rating Breakdown Bar & Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-2">
          {/* Detailed Star Distribution */}
          <div className="md:col-span-6 lg:col-span-5 space-y-2 text-xs font-sans text-white/70">
            {[
              { stars: '5 Stars', percent: 78, count: '14.4k' },
              { stars: '4 Stars', percent: 16, count: '3.0k' },
              { stars: '3 Stars', percent: 4, count: '740' },
              { stars: '2 Stars', percent: 1, count: '180' },
              { stars: '1 Star', percent: 1, count: '180' },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="w-14 text-white/80 font-semibold">{bar.stars}</span>
                <div className="flex-1 h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5A93C] to-[#2E4434] rounded-full"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-white/50">{bar.count}</span>
              </div>
            ))}
          </div>

          {/* Traveler Highlights Badges */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-[#E5A93C] mb-3">
              What Highway Guests Love Most
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                '🔥 Fresh Cast-Iron Parathas',
                '☕ Kulhad Adrak Chai',
                '🍕 Patented Parathzzaa®',
                '🚗 Huge Parking Space',
                '🏍️ Biker Friendly Courtyard',
                '🧼 Clean Highway Restrooms',
                '✈️ 10 min to BLR Airport',
                '🌿 100% Pure Veg Kitchen',
              ].map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/80 font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="px-6 sm:px-10 py-4 bg-[#080D0A] border-y border-white/10 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50 mr-1 hidden sm:inline font-mono">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Reviews', count: reviews.length },
            { id: 'biker', label: 'Bikers & Riders', icon: Bike },
            { id: 'airport', label: 'Airport Travelers', icon: Plane },
            { id: 'family', label: 'Family Dining', icon: Users },
            { id: 'roadtrip', label: 'Road Trippers', icon: Car },
          ].map((f) => (
            <button
              key={f.id}
              id={`filter-rev-${f.id}`}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {f.icon && <f.icon className="w-3.5 h-3.5" />}
              <span>{f.label}</span>
              {f.count && <span className="opacity-70 font-mono text-[11px]">({f.count})</span>}
            </button>
          ))}
        </div>

        <div className="text-xs text-white/50 font-sans hidden md:block whitespace-nowrap">
          Showing <strong className="text-white">{filteredReviews.length}</strong> community stories
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="p-6 sm:p-10 bg-[#0F1712]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((rev) => {
            const hasLiked = helpfulLikes[rev.id];

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-[#080D0A]/90 rounded-3xl border border-white/15 p-5 sm:p-6 shadow-xl hover:border-[#E5A93C]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Author & Rating */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-white">{rev.author}</h4>
                        {rev.isVerified && (
                          <span title="Verified Highway Visitor">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans block">{rev.badge}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md border border-[#E6CA85]/30 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#E6CA85] text-[#E6CA85]" />
                      <span className="text-xs font-bold text-white">{rev.rating}.0</span>
                    </div>
                  </div>

                  {/* Trip Type & Time Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E6CA85] bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                      {getTripIcon(rev.icon)}
                      <span>{rev.tripLabel}</span>
                    </span>
                    <span className="text-[11px] text-slate-500">•</span>
                    <span className="text-[11px] text-slate-400 font-mono">{rev.timeAgo}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                    "{rev.content}"
                  </p>

                  {/* Recommended Dishes Tags */}
                  {rev.recommendedDishes && rev.recommendedDishes.length > 0 && (
                    <div className="mb-4 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E6CA85] block mb-1.5">
                        Recommended Picks:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rev.recommendedDishes.map((dish, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-[#E6CA85] bg-black/50 px-2 py-0.5 rounded-md border border-[#E6CA85]/30"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Helpful Button footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <button
                    id={`helpful-btn-${rev.id}`}
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      hasLiked
                        ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40'
                        : 'hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>

                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    NH7 Devanahalli
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with direct Google Maps link */}
        <div className="mt-10 p-6 rounded-2xl bg-[#161B26] text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-[#E6CA85]/30 shadow-2xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#E6CA85]/15 border border-[#E6CA85]/30 flex items-center justify-center shrink-0 text-[#E6CA85]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                Have you stopped by our NH7 Flagship Pitstop?
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm font-sans mt-0.5">
                Share your highway story and help fellow road-trippers discover fresh kulhad chai and hot parathas.
              </p>
            </div>
          </div>

          <a
            id="google-maps-leave-review-cta"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#E6CA85] to-[#D4AF37] text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Review on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121620] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E6CA85]/40 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#E6CA85] block mb-1">
                COMMUNITY FEEDBACK
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Rate Your Highway Pitstop
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Tell us about your experience at Indian Paratha Company on NH7.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
              {/* Star Rating selector */}
              <div>
                <label className="block font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Your Overall Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1.5 focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= userRating
                            ? 'fill-[#E6CA85] text-[#E6CA85]'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-[#E6CA85] text-sm ml-2">
                    {userRating === 5
                      ? '5.0 - Outstanding!'
                      : userRating === 4
                      ? '4.0 - Very Good'
                      : userRating === 3
                      ? '3.0 - Average'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              {/* Your Name */}
              <div>
                <label className="block font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Your Name / Rider Handle *
                </label>
                <input
                  id="rev-author-name"
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Vikramaditya or Biker Club Leader"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-[#E6CA85] text-white text-xs outline-none"
                />
              </div>

              {/* Trip Type */}
              <div>
                <label className="block font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Trip Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'roadtrip', label: 'Road Tripper', icon: Car },
                    { id: 'biker', label: 'Biker / Rider', icon: Bike },
                    { id: 'family', label: 'Family Dining', icon: Users },
                    { id: 'airport', label: 'Airport Commuter', icon: Plane },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTripType(t.id as any)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                        tripType === t.id
                          ? 'border-[#E6CA85] bg-black/60 text-[#E6CA85] font-bold'
                          : 'border-white/10 hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <t.icon className="w-4 h-4 shrink-0" />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div>
                <label className="block font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Your Review / Experience *
                </label>
                <textarea
                  id="rev-content"
                  required
                  rows={3}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="How were the parathas, chai, service, or atmosphere?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-[#E6CA85] text-white text-xs outline-none resize-none"
                />
              </div>

              {/* Recommended Dish */}
              <div>
                <label className="block font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                  Favorite Dish You Recommend (Optional)
                </label>
                <input
                  id="rev-dish"
                  type="text"
                  value={dishRecommendation}
                  onChange={(e) => setDishRecommendation(e.target.value)}
                  placeholder="e.g. Aloo Cheese Parathzzaa® or Special Kulhad Chai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-[#E6CA85] text-white text-xs outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-white/15 text-slate-400 hover:text-white font-bold uppercase tracking-wider text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  id="submit-review-form-btn"
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#C9184A] to-[#A4161A] text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-md active:scale-95 cursor-pointer border border-red-400/30"
                >
                  <Send className="w-3.5 h-3.5 text-[#E6CA85]" />
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
