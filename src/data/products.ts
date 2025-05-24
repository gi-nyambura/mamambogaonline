
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
  freshness: 'Fresh' | '1-day old' | '2-days old';
  fertilizerUsed?: string;
  isOrganic: boolean;
  stock: number;
  description: string;
  rating?: number;
  reviews?: number;
  dataAiHint: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
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
    stock: 100,
    description: 'Freshly harvested red onions, essential for Kenyan cuisine.',
    rating: 4.4,
    reviews: 110,
  },
];
