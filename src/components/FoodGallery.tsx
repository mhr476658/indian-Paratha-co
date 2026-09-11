import React, { useState } from 'react';
import { Camera, X, ZoomIn, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'food' | 'restaurant' | 'kitchen' | 'patio';
  categoryLabel: string;
  image: string;
  caption: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Smoking Hot Paneer Tikka Parathzzaa®',
    category: 'food',
    categoryLabel: 'Signature Food',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=85',
    caption: 'Freshly baked whole-wheat parathzzaa with bubbling mozzarella and tandoori paneer tikka.',
  },
  {
    id: 'gal-2',
    title: 'The Rustic Highway Chalet Facade',
    category: 'restaurant',
    categoryLabel: 'Restaurant Atmosphere',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
    caption: 'Our iconic cedar wood highway chalet on NH7, welcoming travelers day and night.',
  },
  {
    id: 'gal-3',
    title: 'Live Tawa Paratha Griddling',
    category: 'kitchen',
    categoryLabel: 'Chef & Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=85',
    caption: 'Master ustaad rolling whole wheat parathas over blazing cast-iron hearths.',
  },
  {
    id: 'gal-4',
    title: 'Steaming Clay Kulhad Masala Chai',
    category: 'food',
    categoryLabel: 'Signature Food',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=85',
    caption: 'Hand-pounded ginger, green cardamom, and Assam tea aerated into fresh terracotta kulhads.',
  },
  {
    id: 'gal-5',
    title: 'Outdoor Garden & Biker Patio Courtyard',
    category: 'patio',
    categoryLabel: 'Outdoor Patio',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=85',
    caption: 'Spacious open-air patio seating surrounded by rustic stone and Devanahalli greenery.',
  },
  {
    id: 'gal-6',
    title: 'Grilled Paneer Tikka With Mint Chutney',
    category: 'food',
    categoryLabel: 'Signature Food',
    image: '/paneer-tikka-chutney.png',
    caption: 'Soft, flavorful grilled paneer tikka served with a cooling mint chutney and a refreshing beverage.',
  },
  {
    id: 'gal-7',
    title: 'Sealed Clay Dum Biryani Handi',
    category: 'kitchen',
    categoryLabel: 'Chef & Kitchen',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=85',
    caption: 'Fragrant Awadhi saffron basmati rice unsealed after 45 minutes of slow dum steaming.',
  },
  {
    id: 'gal-8',
    title: 'Veg Manchurian with Strawberry Milkshake',
    category: 'food',
    categoryLabel: 'Signature Food',
    image: '/veg-manchurian-milkshake.png',
    caption: 'Delicious Veg Manchurian served with a refreshing Strawberry Milkshake.',
  },
];

export const FoodGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'food' | 'restaurant' | 'kitchen' | 'patio'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = selectedFilter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-[#0B0D13] text-white relative overflow-hidden border-t border-[#E6CA85]/20"
    >
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#E6CA85]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E6CA85] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              VISUAL REPOSITORY
            </span>
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
            Culinary &amp; <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F3E5AB] to-[#E6CA85]">Atmosphere Gallery</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            From smoking tawas to the rustic chalet patio, explore moments of authentic Indian food and welcoming highway hospitality.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: 'all', label: 'All Photographs' },
            { id: 'food', label: 'Signature Dishes' },
            { id: 'restaurant', label: 'Restaurant & Chalet' },
            { id: 'kitchen', label: 'Chef & Kitchen' },
            { id: 'patio', label: 'Outdoor Patio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-[#F3E5AB] via-[#E6CA85] to-[#D4AF37] text-black shadow-lg scale-105 font-black'
                  : 'bg-[#121620] text-slate-300 hover:text-white border border-white/10 hover:border-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 hover:border-[#D4AF37] shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
              </div>

              {/* Hover Dark Vignette & Information */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/60 text-[#D4AF37] border border-white/20">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block mb-1">
                    {photo.categoryLabel}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white leading-snug">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Left */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigation Right */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image & Description */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center">
              <img
                src={filteredPhotos[lightboxIndex].image}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain mb-4 border border-white/20"
              />

              <div className="text-stone-200 max-w-xl">
                <span className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest font-bold block mb-1">
                  {filteredPhotos[lightboxIndex].categoryLabel} ({lightboxIndex + 1} of {filteredPhotos.length})
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
