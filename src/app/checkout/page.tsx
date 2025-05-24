
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mockProducts } from "@/data/products"; // For summary
import { CreditCard, Home, Phone, User, MapPin, Edit2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock cart summary for display
const cartSummary = {
  items: [
    { name: mockProducts[0].name, quantity: 2, price: mockProducts[0].price, imageUrl: mockProducts[0].imageUrl, dataAiHint: mockProducts[0].dataAiHint },
    { name: mockProducts[1].name, quantity: 1, price: mockProducts[1].price, imageUrl: mockProducts[1].imageUrl, dataAiHint: mockProducts[1].dataAiHint },
  ],
  subtotal: mockProducts[0].price * 2 + mockProducts[1].price,
  deliveryFee: 150,
  total: mockProducts[0].price * 2 + mockProducts[1].price + 150,
};


export default function CheckoutPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-poppins"><MapPin className="mr-2 h-6 w-6 text-primary" />Delivery Address</CardTitle>
                <CardDescription>Where should we deliver your fresh produce?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="e.g. Jane Doe" icon={<User className="h-4 w-4 text-muted-foreground" />} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="e.g. 0712 345 678" icon={<Phone className="h-4 w-4 text-muted-foreground" />} />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="e.g. Apartment A2, Rose Garden" icon={<Home className="h-4 w-4 text-muted-foreground" />} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City / Town</Label>
                  <Input id="city" placeholder="e.g. Nairobi" />
                </div>
                 <div className="space-y-1">
                  <Label htmlFor="estate">Estate / Area</Label>
                  <Input id="estate" placeholder="e.g. Westlands" />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                  <Textarea id="deliveryInstructions" placeholder="e.g. Call upon arrival, leave at the gate with security." />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-poppins"><CreditCard className="mr-2 h-6 w-6 text-primary" />Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="mpesa" className="space-y-4">
                  <Label htmlFor="mpesa" className="flex items-center p-4 border rounded-md cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:ring-2 has-[input:checked]:ring-primary">
                    <RadioGroupItem value="mpesa" id="mpesa" className="mr-3" />
                    <Image src="https://placehold.co/100x40.png?text=M-PESA" alt="M-Pesa" width={100} height={40} data-ai-hint="mpesa logo" />
                    <span className="ml-auto font-medium">M-Pesa</span>
                  </Label>
                  <Label htmlFor="flutterwave" className="flex items-center p-4 border rounded-md cursor-pointer hover:border-primary has-[input:checked]:border-primary has-[input:checked]:ring-2 has-[input:checked]:ring-primary">
                    <RadioGroupItem value="flutterwave" id="flutterwave" className="mr-3" />
                     <Image src="https://placehold.co/120x40.png?text=Flutterwave" alt="Flutterwave" width={120} height={40} data-ai-hint="flutterwave logo"/>
                    <span className="ml-auto font-medium">Card / Other</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Order Summary */}
          <Card className="lg:col-span-1 shadow-xl p-0 sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins flex items-center"><Truck className="mr-2 h-6 w-6 text-primary"/>Order Summary</CardTitle>
              <Button variant="outline" size="sm" className="absolute top-4 right-4" asChild>
                <Link href="/cart"><Edit2 className="mr-1 h-3 w-3"/> Edit Basket</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {cartSummary.items.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded object-cover" data-ai-hint={item.dataAiHint} />
                      <div>
                        <span>{item.name}</span>
                        <span className="text-muted-foreground"> (x{item.quantity})</span>
                      </div>
                    </div>
                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>KES {cartSummary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>KES {cartSummary.deliveryFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="text-primary">KES {cartSummary.total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t">
              <Button size="lg" className="w-full">
                Place Order (Pay KES {cartSummary.total.toLocaleString()})
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
