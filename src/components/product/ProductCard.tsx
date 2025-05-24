
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Zap, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Placeholder for actual add to cart logic
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your basket.`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Link
          href={`/products/${product.id}`}
          className="block w-full aspect-[4/3] relative overflow-hidden rounded-t-lg"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={product.dataAiHint}
          />
        </Link>
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2 text-xs z-10">
            <Zap className="w-3 h-3 mr-1" />
            {(
              ((product.originalPrice - product.price) / product.originalPrice) *
              100
            ).toFixed(0)}
            % OFF
          </Badge>
        )}
        {product.isOrganic && (
           <Badge variant="secondary" className="absolute top-2 left-2 text-xs z-10 bg-green-100 text-green-700 border-green-300">
            <Leaf className="w-3 h-3 mr-1" /> Organic
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold font-poppins hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{product.seller} - {product.location} {product.distance ? `(${product.distance})` : ''}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Freshness: <span className="font-medium text-foreground">{product.freshness}</span></p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t">
        <div>
          <p className="text-xl font-bold text-primary">KES {product.price.toLocaleString()}</p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              KES {product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
        <Button size="sm" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
