
"use client";

import { mockProducts, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Zap } from "lucide-react";

export function LiveOffersSection() {
  const offerProducts = mockProducts.filter(p => p.originalPrice).slice(0, 4); // Show up to 4 offer products

  if (offerProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6 md:mb-8">
          <Zap className="w-8 h-8 text-accent mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-foreground">
            Live Offers
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
