
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, User, MapPin, Phone, Edit, Printer, FileText, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - in a real app, this would be fetched based on orderId
const mockOrder = {
  id: "ORD78901",
  customerName: "Alice Mwangi",
  customerEmail: "alice@example.com",
  customerPhone: "0712 345 678",
  date: "2024-10-26",
  items: [
    { name: "Fresh Tomatoes (1kg)", quantity: 2, price: 120, imageUrl: "https://placehold.co/60x60.png", dataAiHint:"tomatoes" },
    { name: "Spinach Bunch", quantity: 1, price: 80, imageUrl: "https://placehold.co/60x60.png", dataAiHint:"spinach" },
    { name: "Carrots (500g)", quantity: 1, price: 50, imageUrl: "https://placehold.co/60x60.png", dataAiHint:"carrots" },
  ],
  subtotal: (120 * 2) + 80 + 50,
  deliveryFee: 150,
  total: (120 * 2) + 80 + 50 + 150,
  deliveryAddress: {
    fullName: "Alice Mwangi",
    address: "Apartment B3, Green Valley Estate",
    city: "Nairobi",
    estate: "Kilimani",
    deliveryInstructions: "Call upon arrival. Leave at the reception if I'm not available.",
  },
  status: "Processing", // 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'
  paymentMethod: "M-Pesa",
  paymentStatus: "Paid",
};

const statusColors: Record<string, string> = {
  Processing: "bg-blue-100 text-blue-700 border-blue-300",
  Shipped: "bg-purple-100 text-purple-700 border-purple-300",
  'Out for Delivery': "bg-yellow-100 text-yellow-700 border-yellow-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
  'Pending Payment': "bg-orange-100 text-orange-700 border-orange-300",
};


export default function SellerOrderDetailPage({ params }: { params: { orderId: string } }) {
  // In a real app, use params.orderId to fetch order details for this seller
  const order = { ...mockOrder, id: params.orderId }; // Use actual fetched data

  // Placeholder for status update logic
  const handleUpdateStatus = (newStatus: string) => {
    alert(`Order status updated to: ${newStatus} (not really)`);
    // In real app: call API to update order status
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
              Order Details
            </h1>
            <p className="text-muted-foreground">Order ID: <span className="font-semibold text-primary">{order.id}</span></p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/seller/orders">Back to All Orders</Link>
            </Button>
             <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print Invoice</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Order Items & Status */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><Package className="mr-2 h-6 w-6 text-primary"/>Items in this Order</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md object-cover border" data-ai-hint={item.dataAiHint}/>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 p-6 border-t">
                 <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal:</span> <span>KES {order.subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Delivery Fee:</span> <span>KES {order.deliveryFee.toLocaleString()}</span></div>
                    <Separator/>
                    <div className="flex justify-between font-bold text-lg"><span>Total Amount:</span> <span className="text-primary">KES {order.total.toLocaleString()}</span></div>
                 </div>
              </CardFooter>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins flex items-center"><Truck className="mr-2 h-6 w-6 text-primary"/>Order Status &amp; Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="text-xs text-muted-foreground">Current Status</Label>
                        <Badge className={`${statusColors[order.status] || 'bg-gray-100 text-gray-700 border-gray-300'} text-base py-1.5 px-3 block w-fit`}>
                            {order.status}
                        </Badge>
                    </div>
                     <div>
                        <Label htmlFor="updateStatus" className="text-xs text-muted-foreground">Update Order Status</Label>
                        <div className="flex gap-2 mt-1">
                            <select 
                                id="updateStatus" 
                                defaultValue={order.status}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
                                onChange={(e) => handleUpdateStatus(e.target.value)}
                            >
                                <option value="Processing">Processing</option>
                                <option value="Pending Payment">Pending Payment</option>
                                <option value="Shipped">Shipped / Ready for Pickup</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            {/* <Button onClick={() => handleUpdateStatus("value_from_select")}>Update Status</Button> */}
                        </div>
                    </div>
                    {order.status === "Delivered" && (
                        <div className="flex items-center gap-2 text-green-600 mt-2 p-3 bg-green-50 rounded-md border border-green-200">
                            <CheckCircle className="h-5 w-5"/>
                            <p className="text-sm font-medium">This order is marked as delivered. Awaiting final buyer confirmation if applicable.</p>
                        </div>
                    )}
                </CardContent>
                 <CardFooter className="border-t pt-6">
                    <Button variant="outline" asChild>
                        <Link href={`/seller/deliveries?orderId=${order.id}`}>Track Delivery</Link>
                    </Button>
                 </CardFooter>
            </Card>
          </div>

          {/* Right Side: Customer & Delivery Details */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><User className="mr-2 h-5 w-5 text-primary"/>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Name:</strong> {order.customerName}</p>
                <p className="flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/> {order.customerEmail}</p>
                <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/> {order.customerPhone}</p>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary"/>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Address:</strong> {order.deliveryAddress.address}</p>
                <p><strong>Area/Estate:</strong> {order.deliveryAddress.estate}, {order.deliveryAddress.city}</p>
                {order.deliveryAddress.deliveryInstructions && (
                    <div>
                        <p><strong>Instructions:</strong></p>
                        <p className="italic text-muted-foreground">"{order.deliveryAddress.deliveryInstructions}"</p>
                    </div>
                )}
                <Separator className="my-3"/>
                 <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                 <p><strong>Payment Status:</strong> <Badge variant={order.paymentStatus === "Paid" ? "default" : "destructive"} className={order.paymentStatus === "Paid" ? statusColors.Delivered : statusColors.Cancelled}>{order.paymentStatus}</Badge></p>
              </CardContent>
            </Card>
            
             <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="font-poppins flex items-center"><FileText className="mr-2 h-5 w-5 text-primary"/>Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No internal notes for this order yet.</p>
                    {/* Placeholder for adding notes */}
                    <Button variant="outline" size="sm" className="mt-3 w-full">Add Note</Button>
                </CardContent>
             </Card>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

export const dynamic = 'force-dynamic';
