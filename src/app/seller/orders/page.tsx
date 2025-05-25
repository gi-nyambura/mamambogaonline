
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ListOrdered, Filter, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching for the logged-in seller
const mockSellerOrders = [
  { id: "ORD78901", customer: "Alice Mwangi", date: "2024-10-26", total: "KES 850", status: "Processing", statusVariant: "bg-blue-100 text-blue-700 border-blue-300", itemsCount: 3 },
  { id: "ORD78902", customer: "Brian Omondi", date: "2024-10-25", total: "KES 1,200", status: "Shipped", statusVariant: "bg-yellow-100 text-yellow-700 border-yellow-300", itemsCount: 1 },
  { id: "ORD78903", customer: "Fatuma Ali", date: "2024-10-24", total: "KES 600", status: "Delivered", statusVariant: "bg-green-100 text-green-700 border-green-300", itemsCount: 2 },
  { id: "ORD78904", customer: "Peter Njoroge", date: "2024-10-23", total: "KES 1,500", status: "Pending Payment", statusVariant: "bg-orange-100 text-orange-700 border-orange-300", itemsCount: 5 },
  { id: "ORD78905", customer: "Aisha Khan", date: "2024-10-22", total: "KES 300", status: "Cancelled", statusVariant: "bg-red-100 text-red-700 border-red-300", itemsCount: 1 },
];

export const dynamic = 'force-dynamic';

export default function SellerOrdersPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <ListOrdered className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Customer Orders
            </h1>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4"/> Filter Orders
          </Button>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-poppins">Incoming &amp; Past Orders</CardTitle>
            <CardDescription>Manage and track all orders for your products.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockSellerOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSellerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-primary hover:underline">
                         <Link href={`/seller/orders/${order.id}`}>{order.id}</Link>
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                       <TableCell className="text-center">{order.itemsCount}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={order.statusVariant}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="default" size="sm" asChild>
                          <Link href={`/seller/orders/${order.id}`}>View Order <ArrowRight className="ml-1 h-3 w-3"/></Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3"/>
                    <p className="mb-4">You haven't received any orders yet.</p>
                 </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
