
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { ShoppingCart, Star, Leaf, Truck, Sprout, Info } from "lucide-react"; // Removed Hash and Tag
import Image from "next/image";
import Link from "next/link";

// Helper function to format dates (optional, but good for display)
const formatDate = (dateString: string | undefined) => {
  if (!dateString || dateString === 'N/A') return "N/A";
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
};

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold font-poppins mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Image Gallery (Simplified) */}
          <Card className="shadow-xl overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={product.dataAiHint}
                priority // Prioritize loading for LCP
              />
            </div>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <span>Sold by: <Link href="#" className="text-primary hover:underline">{product.seller}</Link></span>
                  <span>|</span>
                  <span>Category: <Link href="#" className="text-primary hover:underline">{product.category}</Link></span>
                </div>
                 {product.rating && (
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(Math.floor(product.rating))].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                        {product.rating % 1 !== 0 && <Star key="half" className="h-5 w-5 text-yellow-400 fill-yellow-200" />}
                        {[...Array(5 - Math.ceil(product.rating))].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50 fill-muted-foreground/20" />)}
                        <span className="ml-1 text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary mb-4">
                  KES {product.price.toLocaleString()}
                  {product.originalPrice && (
                    <span className="ml-2 text-base text-muted-foreground line-through">
                      KES {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button size="lg" className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  {product.stock > 0 ? `${product.stock} units available` : "Out of Stock"}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins text-xl flex items-center"><Info className="mr-2 h-5 w-5 text-primary"/>Product Provenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center"><Leaf className="mr-2 h-4 w-4"/>Organic:</span>
                        <Badge variant={product.isOrganic ? "default" : "secondary"} className={product.isOrganic ? "bg-green-100 text-green-700 border-green-300" : ""}>
                            {product.isOrganic ? "Yes" : "No"}
                        </Badge>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center"><Truck className="mr-2 h-4 w-4"/>Freshness:</span>
                        <span>{product.freshness}</span>
                    </div>
                    {(product.fertilizerUsed && product.fertilizerUsed !== 'N/A') && (
                        <div className="pt-3 mt-3 border-t">
                             <h4 className="font-medium text-muted-foreground mb-2 flex items-center"><Sprout className="mr-2 h-5 w-5 text-primary"/>Fertilizer Information:</h4>
                             <p><strong>Type:</strong> {product.fertilizerUsed}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

    