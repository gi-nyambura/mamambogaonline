
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, MapPin, CheckCircle, Search, ListFilter, User, Package, Hourglass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SellerDelivery {
  id: string;
  orderId: string;
  customerName: string;
  destination: string;
  status: 'Processing' | 'Out for Delivery' | 'Delivered - Awaiting Confirmation' | 'Completed' | 'Cancelled';
  estimatedDelivery: string;
  riderName?: string;
  items: { name: string; quantity: number }[];
  deliveryNotes?: string;
  confirmationImage?: string; // URL to a photo if delivery is confirmed with one
}

const mockDeliveries: SellerDelivery[] = [
  {
    id: 'del1',
    orderId: "ORD78901",
    customerName: "Alice Mwangi",
    destination: "Kilimani, Nairobi",
    status: "Out for Delivery",
    estimatedDelivery: "Today, 2:30 PM",
    riderName: "James K.",
    items: [{ name: "Fresh Tomatoes (2kg)", quantity: 1 }, { name: "Spinach Bunch (3)", quantity: 1 }],
  },
  {
    id: 'del2',
    orderId: "ORD78902",
    customerName: "Brian Omondi",
    destination: "Parklands, Nairobi",
    status: "Delivered - Awaiting Confirmation",
    estimatedDelivery: "Yesterday, 5:00 PM",
    riderName: "Sarah W.",
    items: [{ name: "Sweet Mangoes (Pack)", quantity: 2 }],
    deliveryNotes: "Leave at the gate with security if not home.",
  },
  {
    id: 'del3',
    orderId: "ORD78903",
    customerName: "Fatuma Ali",
    destination: "South C, Nairobi",
    status: "Completed",
    estimatedDelivery: "Oct 25, 11:00 AM",
    riderName: "David M.",
    items: [{ name: "Carrots (1kg)", quantity: 1 }, { name: "Onions (1kg)", quantity: 1 }],
    confirmationImage: "https://placehold.co/300x200.png?text=Proof+of+Delivery",
    dataAiHint: "delivery proof"
  },
  {
    id: 'del4',
    orderId: "ORD78904",
    customerName: "Peter Njoroge",
    destination: "Runda, Nairobi",
    status: "Processing",
    estimatedDelivery: "Tomorrow, 10:00 AM",
    items: [{ name: "Organic Kales (5 bunches)", quantity: 1 }],
  },
   {
    id: 'del5',
    orderId: "ORD78905",
    customerName: "Aisha Khan",
    destination: "Lavington, Nairobi",
    status: "Cancelled",
    estimatedDelivery: "N/A",
    riderName: "John B.",
    items: [{ name: "Ripe Bananas (Bunch)", quantity: 2 }],
  },
];

const statusColors: Record<SellerDelivery['status'], string> = {
  Processing: "bg-blue-100 text-blue-700 border-blue-300",
  'Out for Delivery': "bg-yellow-100 text-yellow-700 border-yellow-300",
  'Delivered - Awaiting Confirmation': "bg-purple-100 text-purple-700 border-purple-300",
  Completed: "bg-green-100 text-green-700 border-green-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
};


export default function SellerDeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDelivery, setSelectedDelivery] = useState<SellerDelivery | null>(mockDeliveries[0] || null);

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = 
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (delivery.riderName && delivery.riderName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground flex items-center">
              <Truck className="mr-3 h-8 w-8 text-primary" /> Manage & Track Deliveries
            </h1>
            <p className="text-muted-foreground mt-1">Oversee your ongoing and completed deliveries.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Deliveries List & Filters */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="font-poppins">All Deliveries</CardTitle>
                  <CardDescription>View and manage all your customer deliveries.</CardDescription>
                </div>
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search Order ID, Customer..." 
                      className="pl-8 h-9 w-full" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9 w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                      <SelectItem value="Delivered - Awaiting Confirmation">Awaiting Confirmation</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredDeliveries.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Rider</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeliveries.map((delivery) => (
                        <TableRow 
                          key={delivery.id} 
                          onClick={() => setSelectedDelivery(delivery)}
                          className={`cursor-pointer hover:bg-muted/50 ${selectedDelivery?.id === delivery.id ? 'bg-muted/50' : ''}`}
                        >
                          <TableCell className="font-medium text-primary hover:underline">
                            <Link href={`/seller/orders/${delivery.orderId}`}>{delivery.orderId}</Link>
                          </TableCell>
                          <TableCell>{delivery.customerName}</TableCell>
                          <TableCell>{delivery.destination}</TableCell>
                          <TableCell>{delivery.riderName || "N/A"}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={statusColors[delivery.status]}>
                              {delivery.status === "Out for Delivery" && <Truck className="h-3 w-3 mr-1.5"/>}
                              {delivery.status === "Processing" && <Hourglass className="h-3 w-3 mr-1.5"/>}
                              {delivery.status === "Delivered - Awaiting Confirmation" && <Package className="h-3 w-3 mr-1.5"/>}
                              {delivery.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1.5"/>}
                              {delivery.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedDelivery(delivery); /* Logic to focus map */ }}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <Package className="mx-auto h-12 w-12 mb-3" />
                    <p>No deliveries match your current filters.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Map Area */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-poppins">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Delivery Map Overview
                </CardTitle>
                <CardDescription>
                  {selectedDelivery ? `Tracking Order: ${selectedDelivery.orderId}` : "Select a delivery to view its route on the map."}
                </CardDescription>
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
          </div>

          {/* Right Side: Selected Delivery Details */}
          <div className="lg:col-span-1 sticky top-24">
            {selectedDelivery ? (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">Order {selectedDelivery.orderId}</CardTitle>
                  <CardDescription>To: {selectedDelivery.customerName} at {selectedDelivery.destination}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Status:</h4>
                    <Badge className={`${statusColors[selectedDelivery.status]} text-sm py-1 px-2.5`}>{selectedDelivery.status}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Rider:</h4>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.riderName || "Not assigned yet"}</p>
                  </div>
                   <div>
                    <h4 className="font-semibold mb-1">Estimated Delivery:</h4>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.estimatedDelivery}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Items:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedDelivery.items.map(item => <li key={item.name}>{item.name} (x{item.quantity})</li>)}
                    </ul>
                  </div>
                  {selectedDelivery.deliveryNotes && (
                    <div>
                      <h4 className="font-semibold mb-1">Delivery Notes:</h4>
                      <p className="text-sm text-muted-foreground italic">"{selectedDelivery.deliveryNotes}"</p>
                    </div>
                  )}
                   {selectedDelivery.confirmationImage && (
                    <div>
                        <h4 className="font-semibold mb-1">Proof of Delivery:</h4>
                        <Image 
                            src={selectedDelivery.confirmationImage} 
                            alt="Proof of Delivery" 
                            width={300} 
                            height={200} 
                            className="rounded-md border object-cover"
                            data-ai-hint={selectedDelivery.dataAiHint || "delivery proof"}
                        />
                    </div>
                  )}

                  {selectedDelivery.status === 'Out for Delivery' && (
                    <Button className="w-full mt-2">Send Update to Customer</Button>
                  )}
                  {selectedDelivery.status === 'Delivered - Awaiting Confirmation' && (
                    <Button className="w-full mt-2" variant="outline">Request Confirmation</Button>
                  )}
                  {selectedDelivery.status === 'Completed' && (
                     <div className="flex items-center gap-2 text-green-600 mt-2 p-2 bg-green-50 rounded-md border border-green-200">
                        <CheckCircle className="h-5 w-5"/>
                        <p className="text-sm font-medium">Delivery Confirmed & Completed!</p>
                     </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                    <Button variant="secondary" className="w-full" asChild>
                        <Link href={`/seller/orders/${selectedDelivery.orderId}`}>View Full Order Details</Link>
                    </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="shadow-xl">
                <CardContent className="text-center py-12 text-muted-foreground">
                   <Package className="mx-auto h-12 w-12 mb-3" />
                  <p>Select a delivery from the list to view its details and track its progress.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

// To enable dynamic rendering for this page as it relies on client side state
export const dynamic = 'force-dynamic';
