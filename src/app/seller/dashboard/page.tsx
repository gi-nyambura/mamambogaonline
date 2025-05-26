
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Eye, ShoppingBag, ListOrdered, Star, PlusCircle, Settings, TrendingUp, Truck, Archive as PackageIcon, Lightbulb } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const metrics = [
  { title: "Total Sales (Month)", value: "KES 12,500", icon: DollarSign, trend: "+5.2%", color: "text-green-500" },
  { title: "Total Orders (Month)", value: "150", icon: ShoppingBag, trend: "+10", color: "text-blue-500" },
  { title: "Product Views (Week)", value: "2,800", icon: Eye, trend: "+25%", color: "text-indigo-500" },
  { title: "Avg. Rating", value: "4.7", icon: Star, trend: "+0.1", color: "text-yellow-500" },
];

const mockRecentOrders = [
  { id: "ORD78901", customer: "Alice Mwangi", date: "2024-10-26", total: "KES 850", status: "Processing", statusVariant: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "ORD78902", customer: "Brian Omondi", date: "2024-10-25", total: "KES 1,200", status: "Shipped", statusVariant: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { id: "ORD78903", customer: "Fatuma Ali", date: "2024-10-24", total: "KES 600", status: "Delivered", statusVariant: "bg-green-100 text-green-700 border-green-300" },
];

const mockTopProducts = [
  { id: "prod1", name: "Fresh Tomatoes (1kg)", imageUrl: "https://images.unsplash.com/photo-1561136594-7247da069df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", dataAiHint: "fresh tomatoes", category: "Vegetables", unitsSold: 120, revenue: "KES 14,400" },
  { id: "prod2", name: "Sweet Mangoes (Pack)", imageUrl: "https://images.unsplash.com/photo-1591073137219-0f135c8c63e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", dataAiHint: "ripe mangoes", category: "Fruits", unitsSold: 90, revenue: "KES 22,500" },
  { id: "prod3", name: "Spinach Bunch", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f67fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80", dataAiHint: "spinach leaves", category: "Leafy Greens", unitsSold: 75, revenue: "KES 6,000" },
];

const quickActions = [
    { label: "Add New Product", href: "/seller/products/new", icon: PlusCircle },
    { label: "Manage Deliveries", href: "/seller/deliveries", icon: Truck },
    { label: "View Analytics", href: "/seller/analytics", icon: TrendingUp },
    { label: "Market Insights", href: "/seller/recommendations", icon: Lightbulb },
    { label: "Account Settings", href: "/seller/settings", icon: Settings },
];

export const dynamic = 'force-dynamic';

export default function SellerDashboardPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
            Seller Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.color || 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><ListOrdered className="mr-2 h-5 w-5 text-primary"/>Recent Orders</CardTitle>
              <CardDescription>A list of your most recent customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockRecentOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-primary hover:underline">
                            <Link href={`/seller/orders/${order.id}`}>{order.id}</Link>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={order.statusVariant}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/seller/orders/${order.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-4">No recent orders yet.</p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 shadow-lg">
             <CardHeader>
                <CardTitle className="font-poppins flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-primary"/>Quick Actions</CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                {quickActions.map(action => (
                    <Button key={action.href} variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                        <Link href={action.href} className="flex items-center">
                            <action.icon className="mr-3 h-5 w-5 text-primary/80" />
                            <div>
                                <span className="font-medium">{action.label}</span>
                            </div>
                        </Link>
                    </Button>
                ))}
             </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center"><PackageIcon className="mr-2 h-5 w-5 text-primary"/>Top Performing Products</CardTitle>
            <CardDescription>Your best-selling items this month.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockTopProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTopProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={product.dataAiHint} />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.unitsSold}</TableCell>
                      <TableCell className="text-right">{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <p className="text-muted-foreground text-center py-4">No product performance data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
