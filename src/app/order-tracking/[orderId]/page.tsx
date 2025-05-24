
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, Package, ThumbsUp, Truck, MapPin as MapPinIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - in a real app, this would be fetched based on orderId
const mockOrder = {
  id: "ORD12345XYZ",
  items: [
    { name: "Fresh Tomatoes (1kg)", quantity: 2, price: 120, imageUrl: "https://placehold.co/60x60.png", dataAiHint: "tomatoes" },
    { name: "Spinach Bunch", quantity: 1, price: 80, imageUrl: "https://placehold.co/60x60.png", dataAiHint: "spinach" },
  ],
  deliveryAddress: {
    fullName: "Jane Doe",
    address: "Apartment A2, Rose Garden",
    city: "Nairobi",
    estate: "Westlands",
  },
  status: "Out for Delivery",
  estimatedDelivery: "Today, 4:30 PM - 5:30 PM",
  sellerName: "Mama Agnes",
  currentLocation: { lat: -1.286389, lng: 36.817223 }, // Mock current location (Nairobi CBD)
  destinationLocation: { lat: -1.2833, lng: 36.8167 }, // Mock destination (slightly different)
};

const trackingSteps = [
  { name: "Order Confirmed", icon: CheckCircle, completed: true, date: "Oct 26, 10:00 AM" },
  { name: "Preparing Your Basket", icon: Package, completed: true, date: "Oct 26, 10:30 AM" },
  { name: "Out for Delivery", icon: Truck, completed: mockOrder.status === "Out for Delivery" || mockOrder.status === "Delivered", date: "Oct 26, 02:15 PM" },
  { name: "Delivered", icon: ThumbsUp, completed: mockOrder.status === "Delivered", date: mockOrder.status === "Delivered" ? "Oct 26, 04:45 PM" : "Pending" },
];

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  // In a real app, use params.orderId to fetch order details
  const order = { ...mockOrder, id: params.orderId };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
              Track Your Order
            </h1>
            <p className="text-muted-foreground">Order ID: <span className="font-semibold text-primary">{order.id}</span></p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/my-orders">Back to My Orders</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Map and Tracking Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-poppins"><MapPinIcon className="mr-2 h-6 w-6 text-primary" />Live Delivery Map</CardTitle>
                <CardDescription>Watch your fresh produce journey to you in real-time.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted aspect-video w-full rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground p-4 text-center">
                    Interactive Google Map will be displayed here. <br />
                    (Requires Google Maps API integration)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins">Farm to You Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => (
                    <div key={step.name} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted border-2 border-primary text-primary'}`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div className={`w-0.5 grow ${step.completed && trackingSteps[index+1].completed ? 'bg-primary' : 'bg-border'} my-1`}></div>
                        )}
                      </div>
                      <div>
                        <h4 className={`font-semibold font-poppins ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                        {/* Mock Sub-description */}
                        {step.name === "Out for Delivery" && !step.completed && <p className="text-xs text-amber-600 mt-1">Your rider, James, is on the way!</p>}
                        {step.name === "Order Confirmed" && <p className="text-xs text-muted-foreground mt-1">Seller {order.sellerName} has received your order.</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Order Summary */}
          <Card className="lg:col-span-1 shadow-xl p-0 sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins">Order Summary</CardTitle>
              <CardDescription>For order <span className="font-semibold text-primary">{order.id}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg mb-2">Items:</h3>
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {order.items.map((item, index) => (
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
              <div>
                <h3 className="font-semibold text-lg mb-2">Delivery Address:</h3>
                <p className="text-sm text-muted-foreground">{order.deliveryAddress.fullName}</p>
                <p className="text-sm text-muted-foreground">{order.deliveryAddress.address}</p>
                <p className="text-sm text-muted-foreground">{order.deliveryAddress.estate}, {order.deliveryAddress.city}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Status & ETA:</h3>
                <p className="text-sm">Status: <span className="font-medium text-primary">{order.status}</span></p>
                <p className="text-sm text-muted-foreground">Estimated Delivery: {order.estimatedDelivery}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t flex flex-col gap-2">
              <Button variant="outline" className="w-full">Contact Support</Button>
              {/* <Button className="w-full">View Invoice</Button> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

// To enable dynamic rendering for this page as it uses params
export const dynamic = 'force-dynamic';
