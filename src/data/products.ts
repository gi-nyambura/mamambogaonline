
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  dataAiHint: string;
  seller: string;
  location: string;
  distance?: string;
  freshness: 'Fresh' | '1-day old' | '2-days old' | '3+ days old';
  isOrganic: boolean;
  stock: number;
  description: string;
  rating?: number;
  reviews?: number;
  fertilizerUsed?: string;
  fertilizerLastUsedDate?: string;
  fertilizerApplicationMethod?: string;
  fertilizerBatchNumber?: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes (1kg)',
    price: 120,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1683354918366-ad5c9aacbf40?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'fresh tomatoes',
    seller: 'Mama Agnes',
    location: 'Westlands, Nairobi',
    distance: '1.5km away',
    freshness: 'Fresh',
    isOrganic: true,
    fertilizerUsed: 'Organic Compost',
    fertilizerLastUsedDate: '2024-05-15',
    fertilizerApplicationMethod: 'Soil incorporation',
    fertilizerBatchNumber: 'OC-BATCH-001A',
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
    imageUrl: 'https://images.unsplash.com/photo-1598278242809-6c21ee17aef1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'spinach leaves',
    seller: 'John K.',
    location: 'Kasarani, Nairobi',
    distance: '3km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'CAN (Calcium Ammonium Nitrate)',
    fertilizerLastUsedDate: '2024-06-01',
    fertilizerApplicationMethod: 'Top dressing',
    fertilizerBatchNumber: 'CAN-BATCH-072X',
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
    imageUrl: 'https://images.unsplash.com/photo-1669207334420-66d0e3450283?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'ripe mangoes',
    seller: 'Beatrice W.',
    location: 'Karen, Nairobi',
    distance: '5km away',
    freshness: 'Fresh',
    isOrganic: true,
    fertilizerUsed: 'Natural Manure',
    fertilizerLastUsedDate: '2024-04-20',
    fertilizerApplicationMethod: 'Basal application',
    fertilizerBatchNumber: 'MANURE-BATCH-K03',
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
    imageUrl: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'fresh carrots',
    seller: 'Mama Agnes',
    location: 'Westlands, Nairobi',
    distance: '1.5km away',
    freshness: '1-day old',
    isOrganic: true,
    fertilizerUsed: 'Vermicompost',
    fertilizerLastUsedDate: '2024-05-25',
    fertilizerApplicationMethod: 'Soil amendment',
    fertilizerBatchNumber: 'VC-BATCH-005B',
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
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'ripe bananas',
    seller: 'David M.',
    location: 'Ngong Road, Nairobi',
    distance: '2.2km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'NPK 17-17-17',
    fertilizerLastUsedDate: '2024-06-05',
    fertilizerApplicationMethod: 'Foliar spray',
    fertilizerBatchNumber: 'NPK-BATCH-N22C',
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
    imageUrl: 'https://images.unsplash.com/photo-1681758442447-f36ed14c0a8a?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'fresh onions',
    seller: 'Farmer Joseph',
    location: 'Limuru, Kiambu',
    distance: '15km away',
    freshness: 'Fresh',
    isOrganic: false,
    fertilizerUsed: 'DAP (Diammonium Phosphate)',
    fertilizerLastUsedDate: '2024-05-10',
    fertilizerApplicationMethod: 'Banding',
    fertilizerBatchNumber: 'DAP-BATCH-L01F',
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
    imageUrl: 'https://images.unsplash.com/photo-1639194335563-d56b83f0060c?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'farm eggs',
    seller: 'Esther K.',
    location: 'Ruiru, Kiambu',
    distance: '12km away',
    freshness: 'Fresh',
    isOrganic: false, // Typically 'organic' for eggs refers to feed and living conditions
    fertilizerUsed: 'N/A',
    fertilizerLastUsedDate: 'N/A',
    fertilizerApplicationMethod: 'N/A',
    fertilizerBatchNumber: 'N/A',
    stock: 70,
    description: 'Farm fresh eggs, collected daily. Rich in protein.',
    rating: 4.7,
    reviews: 90,
  },
  {
    id: '8',
    name: 'Whole Milk (1 Litre)',
    price: 100,
    category: 'Dairy & Eggs',
    imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    dataAiHint: 'milk bottle',
    seller: 'Green Pastures Dairy',
    location: 'Naivasha, Nakuru',
    distance: '45km away',
    freshness: 'Fresh',
    isOrganic: true, // Assuming 'organic' refers to how cows are raised/fed
    fertilizerUsed: 'Grazed on organic pasture',
    fertilizerLastUsedDate: 'N/A', // Less relevant for dairy
    fertilizerApplicationMethod: 'N/A',
    fertilizerBatchNumber: 'N/A',
    stock: 120,
    description: 'Fresh pasteurized whole milk from grass-fed cows.',
    rating: 4.9,
    reviews: 180,
  }
];

    