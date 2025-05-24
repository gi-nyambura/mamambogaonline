
"use client";

import { useEffect, useState } from 'react';
// import { recommendProduce, RecommendProduceInput, RecommendProduceOutput } from '@/ai/flows/recommend-produce';
import { mockProducts, Product } from "@/data/products"; // Using mock products for now
import { ProductCard } from "./ProductCard";
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function RecommendedProduce() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Placeholder for AI call
        // const input: RecommendProduceInput = {
        //   userId: "user123", // Replace with actual user ID
        //   location: "Nairobi", // Replace with actual location
        //   pastPurchases: ["Tomatoes", "Spinach"], // Replace with actual past purchases
        // };
        // const result = await recommendProduce(input);
        // For now, use mock data. Map AI result.recommendations (string[]) to Product[]
        // This mapping would require fetching product details based on recommended names.
        // Simulating this with a slice of mockProducts.
        setTimeout(() => {
            setRecommendations(mockProducts.slice(0, 4).sort(() => 0.5 - Math.random())); // Show 4 random products
            setLoading(false);
        }, 1500); // Simulate network delay
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setLoading(false);
        // Potentially set some error state to display to user
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6 md:mb-8">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-foreground">
              Just For You
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                 <Skeleton className="h-10 w-[100px] mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0 && !loading) {
    return null; // Or some "no recommendations" message
  }

  return (
    <section className="py-8 md:py-12 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6 md:mb-8">
          <Sparkles className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-foreground">
            Just For You
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
