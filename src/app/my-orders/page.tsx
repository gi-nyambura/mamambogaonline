
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Archive, Filter, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const mockAllOrders = [
  { id: "ORD12345", date: "2024-10-25", total: "KES 1,500", status: "Delivered", statusVariant: "bg-green-100 text-green-700 border-green-300" },
  { id: "ORD67890", date: "2024-10-28", total: "KES 750", status: "Out for Delivery", statusVariant: "bg-yellow-100 text-yellow-700 border-yellow-300"},
  { id: "ORD11223", date: "2024-10-29", total: "KES 2,100", status: "Processing", statusVariant: "bg-blue-100 text-blue-700 border-blue-300"},
  { id: "ORD44556", date: "2024-09-15", total: "KES 900", status: "Delivered", statusVariant: "bg-green-100 text-green-700 border-green-300" },
  { id: "ORD77889", date: "2024-08-01", total: "KES 3,500", status: "Cancelled", statusVariant: "bg-red-100 text-red-700 border-red-300" },
];

export const dynamic = 'force-dynamic';

export default function MyOrdersPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Archive className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Your Orders
            </h1>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4"/> Filter Orders
          </Button>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-poppins">Order History</CardTitle>
            <CardDescription>View all your past and current orders.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockAllOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAllOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-primary hover:underline">
                         <Link href={`/order-tracking/${order.id}`}>{order.id}</Link>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={order.statusVariant}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="default" size="sm" asChild>
                          <Link href={`/order-tracking/${order.id}`}>Track Order</Link>
                        </Button>
                         <Button variant="outline" size="sm">View Details</Button> {/* Placeholder */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3"/>
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Button asChild><Link href="/">Start Shopping</Link></Button>
                 </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
