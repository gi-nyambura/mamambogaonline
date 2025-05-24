
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mockProducts, Product } from "@/data/products";
import { CreditCard, MinusCircle, PlusCircle, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock cart items - in a real app, this would come from context or state
const cartItems = [
  { product: mockProducts[0], quantity: 2 },
  { product: mockProducts[1], quantity: 1 },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
const deliveryFee = 150; // Example delivery fee
const total = subtotal + deliveryFee;

export default function CartPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-6 md:mb-8">
          <ShoppingCart className="w-10 h-10 text-primary mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
            Your Basket
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold font-poppins mb-2">Your basket is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your basket yet.</p>
            <Button asChild size="lg">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-md">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-full sm:w-24 h-24"
                    data-ai-hint={item.product.dataAiHint}
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold font-poppins">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.seller}</p>
                    <p className="text-lg font-semibold text-primary mt-1">
                      KES {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MinusCircle className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Input type="number" value={item.quantity} readOnly className="w-12 h-8 text-center" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PlusCircle className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 h-8 w-8 ml-auto sm:ml-2">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="lg:col-span-1 shadow-xl p-0">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>KES {deliveryFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span className="text-primary">KES {total.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 border-t">
                 <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">
                        <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
