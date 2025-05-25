
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Archive, Home, ShoppingCart, UserCircle2, MapPin, LogOut, Settings, Heart, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockRecentOrders = [
  { id: "ORD12345", date: "2024-10-25", total: "KES 1,500", status: "Delivered", statusVariant: "bg-green-100 text-green-700 border-green-300" },
  { id: "ORD67890", date: "2024-10-28", total: "KES 750", status: "Out for Delivery", statusVariant: "bg-yellow-100 text-yellow-700 border-yellow-300"},
  { id: "ORD11223", date: "2024-10-29", total: "KES 2,100", status: "Processing", statusVariant: "bg-blue-100 text-blue-700 border-blue-300"},
];

const quickActions = [
    { label: "Continue Shopping", href: "/", icon: ShoppingCart, variant: "default" as const },
    { label: "View Special Offers", href: "/offers", icon: Heart, variant: "outline" as const },
    { label: "Manage Addresses", href: "/profile/addresses", icon: MapPin, variant: "outline" as const }, // Placeholder
    { label: "Account Settings", href: "/profile/settings", icon: Settings, variant: "outline" as const }, // Placeholder
];


export default function BuyerDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const getInitials = () => {
    if (user?.firstName && user?.lastName) return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Card className="mb-8 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="h-20 w-20 text-3xl border-2 border-primary shadow-md">
                    <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || "User"} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold font-poppins text-foreground">
                        Welcome back, {user?.firstName || user?.displayName || "Valued Customer"}!
                    </h1>
                    <p className="text-muted-foreground">Manage your orders, profile, and more.</p>
                </div>
                <Button onClick={handleLogout} variant="outline" className="ml-auto mt-4 sm:mt-0 self-center sm:self-start">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><Archive className="mr-2 h-5 w-5 text-primary"/>Your Recent Orders</CardTitle>
              <CardDescription>Track your latest purchases and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockRecentOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
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
                           <Link href={`/order-tracking/${order.id}`}>{order.id}</Link>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={order.statusVariant}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm" asChild>
                            <Link href={`/order-tracking/${order.id}`}>Track Order</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                 <div className="text-center py-10 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3"/>
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Button asChild><Link href="/">Start Shopping</Link></Button>
                 </div>
              )}
            </CardContent>
             <CardFooter className="border-t pt-6 flex justify-start">
                <Button variant="outline" asChild>
                    <Link href="/my-orders">View All Orders</Link> 
                </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins flex items-center"><Home className="mr-2 h-5 w-5 text-primary"/>Quick Actions</CardTitle>
                    <CardDescription>Navigate easily to common sections.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {quickActions.map(action => (
                         <Button key={action.href} variant={action.variant} className="w-full justify-start text-left h-auto py-3" asChild>
                            <Link href={action.href} className="flex items-center">
                                <action.icon className="mr-3 h-5 w-5 text-primary/80" />
                                <span className="font-medium">{action.label}</span>
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
            
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-4">No new notifications.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
