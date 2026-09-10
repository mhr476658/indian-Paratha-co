import { StoryTimelineItem, WhyIPCItem, ExperienceCard, GalleryItem } from '../types';

export const BRAND_INFO = {
  name: 'Indian Paratha Company',
  shortName: 'IPC',
  tagline: 'Chai, Paratha & More',
  statement: 'Traditional Indian flavours, reimagined for the modern world.',
  foundedYear: '2014',
  founders: 'Nirmal & Gunjan Sandhu',
  highwayRoute: 'NH7, Highway Dining Destination',
  googleMapsUrl: 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw',
  orderingUrlFallback: 'https://maps.app.goo.gl/eGoErW1qTr9gxwAAA?g_st=aw',
};

export const STORY_TIMELINE: StoryTimelineItem[] = [
  {
    yearOrPhase: '2014',
    title: 'IPC Begins',
    subtitle: 'A Highway Revolution',
    description:
      'Founded in 2014 by Nirmal & Gunjan Sandhu with a vision to bring clean, healthy, premium-quality Indian food to travellers and urban consumers craving homestyle authenticity.',
    highlight: 'Founded by Nirmal & Gunjan Sandhu',
  },
  {
    yearOrPhase: 'GROWTH',
    title: 'Highway Dining Destination',
    subtitle: 'The Soul of NH7',
    description:
      'Along the iconic NH7 highway, IPC grew into a beloved oasis for road-trippers, weekend bikers, corporate travellers, and multigenerational families seeking warmth, pristine hygiene, and authentic flavours.',
    highlight: 'Destination for travellers, families & bikers',
  },
  {
    yearOrPhase: 'INNOVATION',
    title: 'Parathzzaa®',
    subtitle: 'A Trademark Culinary Breakthrough',
    description:
      'Pushing Indian culinary boundaries, IPC created Parathzzaa® — fusing the layered, rustic richness of authentic tawa parathas with the global celebratory joy of oven-baked pizza toppings.',
    highlight: 'Patented fusion where Paratha meets Pizza',
  },
  {
    yearOrPhase: 'EXPANSION',
    title: 'Growing Indian QSR Brand',
    subtitle: 'Taking Authentic Flavours Pan-India',
    description:
      'With highway chalets and urban cafe formats, IPC continues its journey to reimagine traditional Indian hospitality into a world-class quick-service restaurant experience.',
    highlight: 'Expanding across Highway Chalets & Urban Cafes',
  },
];

export const WHY_IPC_ITEMS: WhyIPCItem[] = [
  {
    number: '01',
    title: 'FRESH',
    tagline: 'Fresh Wholesome Meals',
    description: 'Every paratha is kneaded fresh, hand-stuffed, and griddled to order with wholesome farm ingredients and pure desi ghee.',
    iconName: 'Sparkles',
  },
  {
    number: '02',
    title: 'AUTHENTIC',
    tagline: 'Culinary Traditions',
    description: 'Time-tested recipes handed down through generations, celebrated with traditional spice roasts and honest cooking techniques.',
    iconName: 'ShieldCheck',
  },
  {
    number: '03',
    title: 'VEGETARIAN',
    tagline: 'Thoughtfully Vegetarian',
    description: '100% pure vegetarian kitchen crafted with meticulous attention to hygiene, wholesome nutrition, and rich culinary variety.',
    iconName: 'Leaf',
  },
  {
    number: '04',
    title: 'INNOVATIVE',
    tagline: 'Contemporary Ideas',
    description: 'From signature Parathzzaa® to modern QSR highway formats, we bridge timeless nostalgia with modern dining convenience.',
    iconName: 'Zap',
  },
  {
    number: '05',
    title: 'WELCOMING',
    tagline: 'For Every Journey',
    description: 'Designed as a warm sanctuary for families, bikers, road travellers, and food enthusiasts seeking genuine hospitality.',
    iconName: 'HeartHandshake',
  },
];

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    title: 'FAMILIES',
    tagline: 'Together Around The Table',
    description:
      'Good food, comfortable moments and memories around the table. Safe, clean spaces with a diverse vegetarian menu that delights kids, parents, and grandparents alike.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1000&auto=format&fit=crop&q=80',
    features: ['Generous sharing platters', 'Comfortable ambient seating', 'Pure vegetarian hygiene'],
  },
  {
    title: 'TRAVELLERS',
    tagline: 'Recharge On The Highway',
    description:
      'A welcoming stop to recharge, refresh and enjoy authentic Indian food. A vibrant sanctuary for highway riders, road-trippers, and weekend explorers on NH7.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80',
    features: ['Quick service & takeaway', 'Invigorating hot chai', 'Ample travel parking & fresh air'],
  },
  {
    title: 'FOOD LOVERS',
    tagline: 'Tradition Meets Innovation',
    description:
      'Discover traditional flavours with modern innovations. From butter-laden Amritsari parathas to our signature crispy cheesy Parathzzaa®.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    features: ['Signature Parathzzaa® creations', 'Authentic Kulhad chai blends', 'Seasonal specialities'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Golden Amritsari Paratha & Makhan',
    category: 'PARATHAS',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Flaky layers stuffed with spiced filling and topped with white butter',
  },
  {
    id: 'gal-2',
    title: 'Signature Paneer Tikka Parathzzaa®',
    category: 'PARATHZZAA',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Wood-fired visual of molten cheese over a crisp paratha crust',
  },
  {
    id: 'gal-3',
    title: 'Steaming Kullad Masala Chai',
    category: 'CHAI',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Infused with seven hill spices and poured into earthen clay cups',
  },
  {
    id: 'gal-4',
    title: 'Warm Highway Ambience',
    category: 'AMBIENCE',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Rustic wood, ambient warm lighting, and open travel atmosphere',
  },
  {
    id: 'gal-5',
    title: 'The Open Highway Journey',
    category: 'TRAVEL',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'The iconic pitstop along the scenic NH7 corridor',
  },
  {
    id: 'gal-6',
    title: 'Tandoori Sizzling Platter',
    category: 'FOOD',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Charcoal charred skewers of spiced paneer, capsicum, and corn',
  },
  {
    id: 'gal-7',
    title: 'Mushroom Corn Fusion Parathzzaa®',
    category: 'PARATHZZAA',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Fresh herbs, earthy mushrooms, and golden mozzarella stretch',
  },
  {
    id: 'gal-8',
    title: 'Patiala Lassi with Malai & Pistachio',
    category: 'FOOD',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1000&auto=format&fit=crop&q=80',
    subtitle: 'Thick churned yoghurt topped with saffron strands and dried nuts',
  },
];

export const CMS_PLACEHOLDER_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Travel Enthusiast & Biker',
    location: 'NH7 Roadtripper',
    text: 'A mandatory stop whenever we hit the Bangalore-Hyderabad highway. The hot Masala Chai in a kulhad combined with their piping hot Paneer Paratha is unbeatable.',
    tag: 'Highway Pitstop',
  },
  {
    id: 't-2',
    name: 'Family Diner',
    location: 'Weekend Visitor',
    text: 'The concept of Parathzzaa® is brilliant — our children love the pizza-style cheese while we appreciate the wholesome wheat paratha foundation. Pristine hygiene throughout.',
    tag: 'Family Dining',
  },
  {
    id: 't-3',
    name: 'Corporate Commuter',
    location: 'Airport Corridor',
    text: 'Modern, clean, and speedy service without compromising on authentic Punjabi tawa flavours. The Dal Makhani with lachha paratha is absolute comfort.',
    tag: 'Regular Patron',
  },
];
