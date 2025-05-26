
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  seller: string;
  location: string; // e.g., "Nairobi", "Kiambu"
  distance?: string; // e.g., "2km away"
  freshness: 'Fresh' | '1-day old' | '2-days old' | '3+ days old'; // Added '3+ days old'
  isOrganic: boolean;
  stock: number;
  description: string;
  rating?: number;
  reviews?: number;
  dataAiHint: string;
  fertilizerUsed?: string;
  fertilizerLastUsedDate?: string; // Consider ISO string or Date object
  fertilizerApplicationMethod?: string;
  fertilizerBatchNumber?: string; // New field
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes (1kg)',
    price: 120,
    category: 'Vegetables',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'fresh tomatoes',
    seller: 'Mama Agnes',
    location: 'Westlands, Nairobi',
    distance: '1.5km away',
    freshness: 'Fresh',
    isOrganic: true,
    fertilizerUsed: 'Organic Compost',
    fertilizerLastUsedDate: '2024-07-15',
    fertilizerApplicationMethod: 'Soil drench',
    fertilizerBatchNumber: 'OC-2024-001',
    stock: 50,
    description: 'Juicy and ripe tomatoes, organically grown. Perfect for salads and cooking.',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Spinach Bunch',
    price: 80,
    originalPrice: 100,
    category: 'Leafy Greens',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'spinach leaves',
    seller: 'John K.',
    location: 'Kasarani, Nairobi',
    distance: '3km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'CAN (Calcium Ammonium Nitrate)',
    fertilizerLastUsedDate: '2024-07-20',
    fertilizerApplicationMethod: 'Top dressing',
    fertilizerBatchNumber: 'CAN-2024-B72',
    stock: 30,
    description: 'A healthy bunch of fresh spinach, great for stews and smoothies.',
    rating: 4.2,
    reviews: 85,
  },
  {
    id: '3',
    name: 'Sweet Mangoes (Pack of 3)',
    price: 250,
    category: 'Fruits',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ripe mangoes',
    seller: 'Beatrice W.',
    location: 'Karen, Nairobi',
    distance: '5km away',
    freshness: 'Fresh',
    isOrganic: true,
    fertilizerUsed: 'Natural Manure',
    fertilizerLastUsedDate: '2024-06-01',
    fertilizerApplicationMethod: 'Basal application',
    fertilizerBatchNumber: 'NM-KRN-2024-03',
    stock: 20,
    description: 'Sweet and juicy Apple mangoes, directly from the farm.',
    rating: 4.8,
    reviews: 200,
  },
  {
    id: '4',
    name: 'Carrots (1kg)',
    price: 100,
    category: 'Vegetables',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'fresh carrots',
    seller: 'Mama Agnes',
    location: 'Westlands, Nairobi',
    distance: '1.5km away',
    freshness: '1-day old',
    isOrganic: true,
    fertilizerUsed: 'Vermicompost',
    fertilizerLastUsedDate: '2024-07-10',
    fertilizerApplicationMethod: 'Side dressing',
    fertilizerBatchNumber: 'VC-WL-2024-A05',
    stock: 40,
    description: 'Crunchy and sweet carrots, rich in vitamins.',
    rating: 4.3,
    reviews: 95,
  },
   {
    id: '5',
    name: 'Ripe Bananas (Bunch)',
    price: 150,
    category: 'Fruits',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ripe bananas',
    seller: 'David M.',
    location: 'Ngong Road, Nairobi',
    distance: '2.2km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'NPK 17-17-17',
    fertilizerLastUsedDate: '2024-07-05',
    fertilizerApplicationMethod: 'Fertigation',
    fertilizerBatchNumber: 'NPK-DRM-2024-011',
    stock: 60,
    description: 'Naturally ripened bananas, perfect for a quick snack or breakfast.',
    rating: 4.6,
    reviews: 150,
  },
  {
    id: '6',
    name: 'Onions (1kg)',
    price: 90,
    originalPrice: 110,
    category: 'Vegetables',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'fresh onions',
    seller: 'Farmer Joseph',
    location: 'Limuru, Kiambu',
    distance: '15km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'DAP (Diammonium Phosphate)',
    fertilizerLastUsedDate: '2024-06-25',
    fertilizerApplicationMethod: 'Planting time application',
    fertilizerBatchNumber: 'DAP-LMU-2024-P02',
    stock: 100,
    description: 'Freshly harvested red onions, essential for Kenyan cuisine.',
    rating: 4.4,
    reviews: 110,
  },
  {
    id: '7',
    name: 'Fresh Farm Eggs (Dozen)',
    price: 280,
    category: 'Dairy & Eggs',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'farm eggs',
    seller: 'Esther K.',
    location: 'Ruiru, Kiambu',
    distance: '12km away',
    freshness: 'Fresh',
    isOrganic: false, // Assuming not specified for these animal products for now
    stock: 70,
    description: 'Farm fresh eggs, collected daily. Rich in protein.',
    // No fertilizer info for animal products
    rating: 4.7,
    reviews: 90,
  },
  {
    id: '8',
    name: 'Whole Milk (1 Litre)',
    price: 100,
    category: 'Dairy & Eggs',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'milk bottle',
    seller: 'Green Pastures Dairy',
    location: 'Naivasha, Nakuru',
    distance: '45km away',
    freshness: 'Fresh',
    isOrganic: true,
    fertilizerUsed: 'Grazed on organic pasture', // More of a feed note
    fertilizerLastUsedDate: 'N/A',
    fertilizerApplicationMethod: 'N/A',
    fertilizerBatchNumber: 'N/A',
    stock: 120,
    description: 'Fresh pasteurized whole milk from grass-fed cows.',
    rating: 4.9,
    reviews: 180,
  }
];
