
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackagePlus, Save } from "lucide-react";
import Link from "next/link";

const categories = ["Vegetables", "Fruits", "Leafy Greens", "Herbs", "Tubers", "Other"];
const freshnessOptions = ["Fresh", "1-day old", "2-days old", "3+ days old"];

export default function NewProductPage() {
  // In a real app, use react-hook-form and server actions
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("New Product Data:", data);
    // Simulate API call
    alert("Product submitted (check console for data)");
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <PackagePlus className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Add New Product
            </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="font-poppins">Product Details</CardTitle>
              <CardDescription>Fill in the information about your new product.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" name="productName" placeholder="e.g. Fresh Kales (Sukuma Wiki)" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
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
                <Textarea id="description" name="description" placeholder="Detailed description of your product..." rows={4} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (KES)</Label>
                <Input id="price" name="price" type="number" placeholder="e.g. 50" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Available Stock (Units/Kg/Bunches)</Label>
                <Input id="stock" name="stock" type="number" placeholder="e.g. 100" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="productImage">Product Image</Label>
                <Input id="productImage" name="productImage" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">Upload a clear image of your product.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freshness">Freshness</Label>
                 <Select name="freshness">
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
                <Input id="fertilizerUsed" name="fertilizerUsed" placeholder="e.g. DAP, Manure" />
              </div>
              
              <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                <Checkbox id="isOrganic" name="isOrganic" />
                <Label htmlFor="isOrganic" className="font-normal">This product is organic</Label>
              </div>

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-3">
                <Button variant="outline" type="button" asChild>
                    <Link href="/seller/products">Cancel</Link>
                </Button>
                <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Save Product
                </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}
