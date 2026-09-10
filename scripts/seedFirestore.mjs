import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function seed() {
  console.log('Seeding initial collections to Firestore database:', config.firestoreDatabaseId);

  // 1. settings/store
  await setDoc(doc(db, 'settings', 'store'), {
    isOpen: true,
    prepTimeMinutes: 20,
    specialNotice: 'NH7 Devanahalli Flagship Kitchen is open and serving fresh parathas.',
    highwayAlert: 'Smooth drive on NH7 Bangalore-Hyderabad Highway corridor.',
    unavailableItemIds: [],
    updatedAt: new Date().toISOString(),
  });
  console.log('✓ Created collection "settings" with document "store"');

  // 2. orders
  await setDoc(doc(db, 'orders', 'IPC-SAMPLE-01'), {
    orderId: 'IPC-SAMPLE-01',
    customerName: 'Highway Traveler',
    customerPhone: '+91 98808 83061',
    orderType: 'ROAD_TRIP_PICKUP',
    status: 'RECEIVED',
    items: [
      { id: 'aloo-paratha', name: 'Aloo Paratha', price: 160, quantity: 2 },
      { id: 'kulhad-chai', name: 'Special Kulhad Chai', price: 70, quantity: 2 },
    ],
    totalAmount: 460,
    notes: 'Extra homemade white butter & green chutney',
    vehicleNumber: 'KA-04-IPC-777',
    createdAt: new Date().toISOString(),
  });
  console.log('✓ Created collection "orders" with document "IPC-SAMPLE-01"');

  // 3. franchiseInquiries
  await setDoc(doc(db, 'franchiseInquiries', 'FRAN-DEMO-01'), {
    id: 'FRAN-DEMO-01',
    fullName: 'Vikram Mehta',
    name: 'Vikram Mehta',
    phone: '+91 98450 12345',
    email: 'vikram.mehta@example.com',
    city: 'Hyderabad Outer Ring Road',
    highwayStretch: 'NH44 / NH7 Corridor',
    model: 'HIGHWAY CHALET',
    investmentCapacity: '₹35 - ₹50 Lakhs',
    experience: '10+ years running highway retail and drive-thru F&B',
    status: 'NEW',
    createdAt: new Date().toISOString(),
  });
  console.log('✓ Created collection "franchiseInquiries" with document "FRAN-DEMO-01"');

  // 4. menuItems
  await setDoc(doc(db, 'menuItems', 'ipc-signature-parathzzaa'), {
    name: 'Smoked Paneer Tikka Parathzzaa',
    hindiName: 'पनीर टिक्का परांठ्ज़ा',
    category: 'PARATHZZAA',
    price: 340,
    description: '10-inch stone-baked flaky whole wheat paratha crust loaded with chargrilled tandoori paneer, mozzarella, Bell peppers & signature makhani drizzle.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    isNew: false,
    spiceLevel: 2,
    pairing: 'Kulhad Adrak Masala Chai',
    allergens: ['Gluten', 'Dairy'],
    createdAt: new Date().toISOString(),
  });
  console.log('✓ Created collection "menuItems" with document "ipc-signature-parathzzaa"');

  console.log('All collections initialized successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
