
"use client"; // Added "use client" as it might have client-side interactions in future (e.g. delete confirmation)

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockProducts, type Product } from "@/data/products";
import { Edit, PlusCircle, Trash2, Eye, ShoppingBag } from "lucide-react"; // Added ShoppingBag
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export default function SellerProductsPage() {
  // Filter mock products to simulate seller's products
  const sellerProducts = mockProducts.filter(p => p.seller === "Mama Agnes" || p.seller === "John K.").slice(0,5);

  return (
    <AppShell> {/* Replace with SellerAppShell if available */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
            Manage Your Products
          </h1>
          <Button asChild>
            <Link href="/seller/products/new">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-poppins">Your Product Listings</CardTitle>
            <CardDescription>View, edit, or remove your products.</CardDescription>
          </CardHeader>
          <CardContent>
            {sellerProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price (KES)</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellerProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                          data-ai-hint={product.dataAiHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.price.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{product.stock}</TableCell>
                      <TableCell className="text-center">
                         <Badge variant={product.stock > 0 ? "default" : "destructive"} className={product.stock > 10 ? "bg-green-100 text-green-700 border-green-300" : product.stock > 0 ? "bg-yellow-100 text-yellow-700 border-yellow-300" : ""}>
                            {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" asChild title="View">
                          <Link href={`/products/${product.id}`}><Eye className="h-4 w-4 text-muted-foreground" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="Edit">
                          <Link href={`/seller/products/edit/${product.id}`}><Edit className="h-4 w-4 text-muted-foreground" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete" className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold font-poppins mb-2">No Products Yet</h2>
                <p className="text-muted-foreground mb-6">Start by adding your first product to reach customers.</p>
                <Button asChild>
                  <Link href="/seller/products/new">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
