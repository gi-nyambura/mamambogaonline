
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { mockProducts, Product } from "@/data/products"; // For prefilling

const categories = ["Vegetables", "Fruits", "Leafy Greens", "Herbs", "Tubers", "Other"];
const freshnessOptions = ["Fresh", "1-day old", "2-days old", "3+ days old"];

// This is a server component, so params are passed directly.
export default function EditProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  // In a real app, fetch product data by ID
  const productToEdit = mockProducts.find(p => p.id === productId);

  if (!productToEdit) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">The product you are trying to edit does not exist.</p>
          <Button asChild className="mt-4"><Link href="/seller/products">Back to Products</Link></Button>
        </div>
      </AppShell>
    );
  }
  
  // In a real app, use react-hook-form and server actions
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Updated Product Data (ID: " + productId + "):", data);
    // Simulate API call
    alert("Product updated (check console for data)");
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <Edit3 className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Edit Product
            </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-poppins">Update Product Details</CardTitle>
              <CardDescription>Modify the information for: <span className="font-semibold text-primary">{productToEdit.name}</span></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" name="productName" defaultValue={productToEdit.name} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={productToEdit.category} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={productToEdit.description} rows={4} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (KES)</Label>
                <Input id="price" name="price" type="number" defaultValue={productToEdit.price} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Available Stock (Units/Kg/Bunches)</Label>
                <Input id="stock" name="stock" type="number" defaultValue={productToEdit.stock} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productImage">Product Image</Label>
                <Input id="productImage" name="productImage" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">Current image: <Link href={productToEdit.imageUrl} target="_blank" className="text-primary hover:underline">view</Link>. Upload a new one to replace.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freshness">Freshness</Label>
                 <Select name="freshness" defaultValue={productToEdit.freshness}>
                  <SelectTrigger id="freshness">
                    <SelectValue placeholder="Select freshness" />
                  </SelectTrigger>
                  <SelectContent>
                    {freshnessOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizerUsed">Fertilizer Used (Optional)</Label>
                <Input id="fertilizerUsed" name="fertilizerUsed" defaultValue={productToEdit.fertilizerUsed || ''} />
              </div>
              
              <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                <Checkbox id="isOrganic" name="isOrganic" defaultChecked={productToEdit.isOrganic} />
                <Label htmlFor="isOrganic" className="font-normal">This product is organic</Label>
              </div>

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
                <Button variant="destructive" type="button" className="bg-red-600 hover:bg-red-700 text-white">
                     <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" type="button" asChild>
                        <Link href="/seller/products">Cancel</Link>
                    </Button>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}

// To enable dynamic rendering for this page as it uses params
export const dynamic = 'force-dynamic';
