
import { AppShell } from "@/components/layout/AppShell";
import { mockProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Zap } from "lucide-react";

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export default function OffersPage() {
  const offerProducts = mockProducts.filter(p => p.originalPrice);

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-6 md:mb-8">
          <Zap className="w-10 h-10 text-accent mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
            Today's Hottest Deals
          </h1>
        </div>
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold font-poppins mb-2">No Special Offers Today</h2>
            <p className="text-muted-foreground">Check back soon for exciting deals on fresh produce!</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
