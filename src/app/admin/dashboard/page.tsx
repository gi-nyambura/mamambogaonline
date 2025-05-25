
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Store, ShoppingCartIcon, DollarSign, UserPlus, Settings, ListChecks, ShieldAlert, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const adminMetrics = [
  { title: "Total Users", value: "1,250", icon: Users, trend: "+50 this week" },
  { title: "Total Sellers", value: "150", icon: Store, trend: "+5 new applications" },
  { title: "Total Orders (Month)", value: "2,300", icon: ShoppingCartIcon, trend: "+12% vs last month" },
  { title: "Total Revenue (Month)", value: "KES 1.2M", icon: DollarSign, trend: "+8% vs last month" },
];

const mockRecentUsers = [
  { id: "usr123", name: "John Doe", email: "john@example.com", role: "buyer", date: "2024-10-28" },
  { id: "usr456", name: "Jane Smith (Mama J)", email: "jane.seller@example.com", role: "seller", date: "2024-10-27" },
  { id: "usr789", name: "Peter Pan", email: "peter@example.com", role: "buyer", date: "2024-10-27" },
];

const mockPendingSellers = [
  { id: "sel001", name: "Green Grocers Ltd", contact: "info@greengrocers.com", county: "Nairobi", dateApplied: "2024-10-26" },
  { id: "sel002", name: "FarmFresh Organics", contact: "sales@farmfresh.co.ke", county: "Kiambu", dateApplied: "2024-10-25" },
];

const adminQuickActions = [
    { label: "Manage Users", href: "/admin/users", icon: Users },
    { label: "Manage Sellers", href: "/admin/sellers", icon: Store },
    { label: "View All Orders", href: "/admin/orders", icon: ShoppingCartIcon },
    { label: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Content Management", href: "/admin/content", icon: ListChecks }, // Placeholder
    { label: "System Settings", href: "/admin/settings", icon: Settings },
];

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

export default function AdminDashboardPage() {
  const { user, isAdmin, loadingAuthState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuthState && !isAdmin) {
      // If not loading and not an admin, redirect away
      // (e.g., to login or a 'not authorized' page)
      router.push('/login'); 
    }
  }, [user, isAdmin, loadingAuthState, router]);

  if (loadingAuthState || !isAdmin) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading or unauthorized...</p> {/* Improve this loading/auth state */}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground flex items-center">
                <ShieldAlert className="mr-3 h-8 w-8 text-primary" /> Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Oversee and manage the Mama Mboga platform.</p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminMetrics.map((metric) => (
            <Card key={metric.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Recent User Registrations */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><UserPlus className="mr-2 h-5 w-5 text-primary"/>Recent User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {mockRecentUsers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Date Joined</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell><Badge variant={u.role === 'seller' ? "secondary" : "outline"}>{u.role}</Badge></TableCell>
                        <TableCell>{u.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-4">No new user registrations.</p>}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins flex items-center"><Settings className="mr-2 h-5 w-5 text-primary"/>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {adminQuickActions.map(action => (
                         <Button key={action.href} variant="outline" className="w-full justify-start text-left h-auto py-3" asChild>
                            <Link href={action.href} className="flex items-center">
                                <action.icon className="mr-3 h-5 w-5 text-primary/80" />
                                <span className="font-medium">{action.label}</span>
                            </Link>
                        </Button>
                    ))}
                </CardContent>
            </Card>
          </div>

          {/* Pending Seller Approvals */}
          <Card className="lg:col-span-2 shadow-lg mt-6 lg:mt-0">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary"/>Pending Seller Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              {mockPendingSellers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seller Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>County</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingSellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell className="font-medium">{seller.name}</TableCell>
                        <TableCell>{seller.contact}</TableCell>
                        <TableCell>{seller.county}</TableCell>
                        <TableCell>{seller.dateApplied}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button variant="default" size="sm">Approve</Button>
                           <Button variant="destructive" size="sm">Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : <p className="text-muted-foreground text-center py-4">No pending seller approvals.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
