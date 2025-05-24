
import { mockProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductSearch } from "@/components/product/ProductSearch";
import { LiveOffersSection } from "@/components/product/LiveOffersSection";
import { RecommendedProduce } from "@/components/product/RecommendedProduce";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://placehold.co/1920x1080.png')",
            opacity: 0.15, 
          }}
          data-ai-hint="produce pattern" 
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" 
        ></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4">
            Freshness Delivered, Your Way.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover the best local produce from trusted sellers. Quality, convenience, and community, all in one place.
          </p>
          <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-semibold" asChild>
            <Link href="#product-grid">Shop Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSearch />
        </div>
      </section>

      {/* Recommended Produce Section (AI) */}
      <RecommendedProduce />

      {/* Main Content Area: Filters and Product Grid */}
      <div id="product-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <ProductFilters />
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold mb-6 font-poppins">All Products</h2>
            {mockProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p>No products found. Try adjusting your filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Live Offers Section */}
      <LiveOffersSection />
      
    </AppShell>
  );
}
