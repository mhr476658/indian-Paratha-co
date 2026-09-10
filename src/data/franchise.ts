import { FranchiseModel } from '../types';

export const FRANCHISE_MODELS: FranchiseModel[] = [
  {
    id: 'highway-chalet',
    title: 'HIGHWAY CHALET',
    badge: 'Iconic Destination Format',
    sqft: '3,000 – 5,000 sq ft',
    setupCost: 'Starting at ₹75,00,000',
    franchiseFee: '₹10,00,000 + GST',
    averageRoi: '24 – 30 months',
    description:
      'Our flagship architectural experience designed for major expressways, tourist arteries, and bypass corridors with drive-through capability, sprawling verandahs, and ample parking.',
    idealFor: 'National Highway corridors, tourist expressways, bypass interchanges',
    features: [
      'Expansive dining seating & open-air garden verandah',
      'Dedicated drive-in takeaway counter & rapid takeaway zone',
      'High vehicle transit footfall & weekend tourist spikes',
      'Flagship architectural brand presence with signature lighting',
    ],
  },
  {
    id: 'urban-cafe',
    title: 'URBAN CAFE',
    badge: 'High-Density Metro Format',
    sqft: 'Minimum 1,200 sq ft',
    setupCost: 'Starting at ₹50,00,000',
    franchiseFee: '₹8,00,000 + GST',
    averageRoi: '18 – 24 months',
    description:
      'High-velocity modern quick-service café tailored for prime tech parks, high-street shopping avenues, and upscale residential suburban clusters.',
    idealFor: 'IT Tech Parks, High-Street Retail, Metro transit hubs',
    features: [
      'Optimized footprint for rapid order dispatch & counter service',
      'Significant delivery and takeaway sales channel contribution',
      'Fast table turnover for lunch corporate crowds and evening snackers',
      'Lower operational overhead with standardized cloud kitchen support',
    ],
  },
];

export const FRANCHISE_SUPPORT_LIST = [
  'Restaurant setup & branding',
  'Staff training & culinary audits',
  'Marketing & digital brand campaigns',
  'Customer engagement programs',
  'Comprehensive operational manuals',
  'Standard Operating Procedures (SOPs)',
  'Centralized supply chain & sourcing support',
];

export const FRANCHISE_CONTACT = {
  email: 'info@franchise-ready.in',
  phone: '+91 98808 83061',
  phoneClean: '+919880883061',
  whatsappUrl: 'https://wa.me/919880883061?text=Hello%20Indian%20Paratha%20Company!%20I%20am%20interested%20in%20a%20franchise%20partnership.',
  website: 'www.franchiseready.in',
  websiteUrl: 'https://www.franchiseready.in',
};
