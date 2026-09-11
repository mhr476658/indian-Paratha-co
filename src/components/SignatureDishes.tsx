import React from 'react';
import { ShoppingBag, Star, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { MenuItem } from '../types';

interface SignatureDishesProps {
  onAddToCart: (item: MenuItem) => void;
  onSelectItemDetail: (item: MenuItem) => void;
  onViewFullMenu: () => void;
}

export const SIGNATURE_DISHES: (MenuItem & { chefNote?: string; rating: number; reviewCount: number })[] = [
  {
    id: 'pz-paneer-tikka',
    name: 'IPC Paneer Tikka Parathzzaa®',
    hindiName: 'पनीर टिक्का परांठा-पिज़्ज़ा',
    category: 'PARATHZZAA',
    price: 350,
    description: 'Our award-winning innovation: A flaky golden whole-wheat paratha crust laden with clay-tandoor charred paneer tikka, crunchy bell peppers, Italian oregano, and stringy molten mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 2,
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Kulhad Masala Chai & Mint Chutney',
    chefNote: 'Pioneered by IPC in 2014 — the ultimate crossover of Punjabi parathas and artisan pizza.',
    rating: 4.9,
    reviewCount: 3840,
  },
  {
    id: 'paratha-aloo-cheese',
    name: 'Amritsari Aloo Cheese Paratha',
    hindiName: 'अमृतसरी आलू चीज़ परांठा',
    category: 'PARATHAS',
    price: 240,
    description: '100% whole wheat stone-ground dough stuffed generously with spiced mashed mountain potatoes, cumin, fresh green chilies, and melted cheddar cheese, served with homemade white butter.',
    image: '/aloo-cheese-paratha.png',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 2,
    allergens: ['Dairy', 'Gluten'],
    pairing: 'Sweet Patiala Lassi & Spiced Curd',
    chefNote: 'Griddled on smoking-hot cast-iron tawas until crusty golden brown with farm butter.',
    rating: 4.95,
    reviewCount: 4210,
  },
  {
    id: 'chai-kulhad-adrak',
    name: 'Clay Kulhad Ginger Cardamom Chai',
    hindiName: 'कुल्हड़ अदरक इलायची चाय',
    category: 'HOT BLENDS',
    price: 80,
    description: 'Slow-brewed Assam CTC black tea infused with hand-pounded fresh ginger, green cardamom pods, and organic whole milk, served piping hot in earthen terracotta clay cups.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 1,
    allergens: ['Dairy'],
    pairing: 'Hot Samosas or Aloo Paratha',
    chefNote: 'The earthen aroma of the clay kulhad elevates every fragrant sip on the highway.',
    rating: 4.98,
    reviewCount: 6150,
  },
  {
    id: 'biryani-awadhi-dum',
    name: 'Veg Dum Biryani',
    hindiName: 'शाही अवधी वेज दम बिरयानी',
    category: 'RICE',
    price: 320,
    description: 'Fragrant aged long-grain basmati rice layered with garden vegetables, saffron milk, caramelized brown onions (birista), and rose water, slow-cooked under sealed clay dum.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: false,
    spiceLevel: 2,
    allergens: ['Dairy', 'Nuts'],
    pairing: 'Burani Garlic Raita & Mirchi Salan',
    chefNote: 'Sealed with dough and slow-steamed for 45 minutes to lock in every royal aroma.',
    rating: 4.88,
    reviewCount: 2190,
  },
  {
    id: 'paratha-smoked-soya',
    name: 'Smoked Soya Keema Paratha',
    hindiName: 'धुआंधार सोया कीमा परांठा',
    category: 'PARATHAS',
    price: 260,
    description: 'High-protein soya granule mince cooked with dhungar coal-smoking technique, spiced with roasted whole coriander and Kashmiri chili, wrapped in crisp whole wheat layers.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=900&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 3,
    allergens: ['Soy', 'Gluten', 'Dairy'],
    pairing: 'Tadka Dahi & Lemon Pickle',
    chefNote: 'Infused with natural hickory charcoal smoke for a bold dhaba highway flavour.',
    rating: 4.85,
    reviewCount: 1950,
  },
  {
    id: 'shake-royal-kesar-pista',
    name: 'Royal Kesar Pista Badam Shake',
    hindiName: 'शाही केसर पिस्ता बादाम शेक',
    category: 'MILKSHAKES',
    price: 190,
    description: 'Chilled rich dairy shake infused with authentic Kashmiri saffron strands, crushed Iranian pistachios, and slivered California almonds, garnished with silver vark.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&auto=format&fit=crop&q=85',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    allergens: ['Dairy', 'Nuts'],
    pairing: 'Spicy Parathas & Highway Roadtrip',
    chefNote: 'Sweetened gently with natural raw jaggery syrup and steeped saffron milk.',
    rating: 4.92,
    reviewCount: 2830,
  },
];

export const SignatureDishes: React.FC<SignatureDishesProps> = ({
  onAddToCart,
  onSelectItemDetail,
  onViewFullMenu,
}) => {
  return (
    <section
      id="signature-dishes"
      className="py-20 sm:py-28 bg-[#080D0A] text-white relative overflow-hidden"
    >
      {/* Background Ambience & Warm Amber Flares */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#2E4434]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#E5A93C]">
                HANDCRAFTED CULINARY ICONS
              </span>
            </div>

            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">Highway Dishes</span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base font-sans mt-3 leading-relaxed">
              Every dish is freshly prepared on live cast-iron griddles using 100% whole wheat, pure desi ghee, and stone-ground secret spices.
            </p>
          </div>

          <button
            id="view-all-signatures-btn"
            onClick={onViewFullMenu}
            className="px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#E5A93C] flex items-center justify-center gap-2 w-fit cursor-pointer shadow-lg hover:scale-105"
          >
            <span>Explore Full 40+ Menu</span>
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
        </div>

        {/* Signature Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="rounded-3xl bg-[#0F1712]/95 border border-white/15 hover:border-[#E5A93C]/70 shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group backdrop-blur-xl"
            >
              {/* Image & Badges Container */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/40">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712] via-transparent to-black/50" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5">
                    {/* Pure Veg Badge */}
                    <span className="p-1 rounded-md bg-white/95 border border-emerald-600 flex items-center justify-center shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#E5A93C] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#E5A93C]/40">
                      {dish.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
                    <span>{dish.rating}</span>
                    <span className="text-[10px] text-white/50">({dish.reviewCount})</span>
                  </div>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-sans font-bold text-[#E5A93C] drop-shadow-md">
                      ₹{dish.price}
                    </span>
                    <span className="text-[11px] font-mono text-white/80 bg-black/70 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                      Live Griddled
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {dish.name}
                  </h3>

                  {dish.hindiName && (
                    <p className="text-[#E5A93C] text-xs font-serif italic mb-3 opacity-90">
                      {dish.hindiName}
                    </p>
                  )}

                  <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mb-4 line-clamp-3">
                    {dish.description}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
