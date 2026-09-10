export type MenuCategoryId =
  | 'APPETIZERS'
  | 'PARATHAS'
  | 'ROLLS'
  | 'COMBOS'
  | 'SIDES'
  | 'RICE'
  | 'PARATHZZAA'
  | "Q' PARATHA"
  | 'HOT BLENDS'
  | 'COLD BLENDS'
  | 'LASSI'
  | 'MILKSHAKES'
  | 'ICE CREAM'
  | 'DESSERTS';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: MenuCategoryId;
  price: number;
  description: string;
  image: string;
  isVegetarian: boolean;
  isSignature?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  spiceLevel?: 1 | 2 | 3;
  allergens?: string[];
  pairing?: string;
}

export interface ParathzzaaItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string[];
  toppingHighlight: string;
  isSpicy?: boolean;
}

export interface StoryTimelineItem {
  yearOrPhase: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export interface WhyIPCItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface ChaiItem {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: string;
  image: string;
  brewingTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'FOOD' | 'CHAI' | 'PARATHAS' | 'PARATHZZAA' | 'AMBIENCE' | 'TRAVEL';
  image: string;
  subtitle: string;
}

export interface ExperienceCard {
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export interface FranchiseModel {
  id: string;
  title: string;
  badge: string;
  sqft: string;
  setupCost: string;
  franchiseFee: string;
  averageRoi: string;
  description: string;
  idealFor: string;
  features: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: string;
}

export interface OrderPayload {
  customerName: string;
  phone: string;
  orderType: 'dine-in' | 'takeaway' | 'highway-pickup';
  vehicleNumber?: string;
  notes?: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  gst: number;
  grandTotal: number;
}
