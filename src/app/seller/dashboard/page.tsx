
import { AppShell } from "@/components/layout/AppShell"; // Assuming a main AppShell, seller might need a different one
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Eye, ShoppingBag, BarChart3 } from "lucide-react";

// Placeholder for seller-specific layout/sidebar
// import { SellerSidebar } from "@/components/seller/SellerSidebar";

export default function SellerDashboardPage() {
  const metrics = [
    { title: "Total Sales", value: "KES 12,500", icon: DollarSign, trend: "+5.2%" },
    { title: "Total Orders", value: "150", icon: ShoppingBag, trend: "+10" },
    { title: "Product Views", value: "2,800", icon: Eye, trend: "+25%" },
    { title: "Conversion Rate", value: "5.3%", icon: BarChart3, trend: "-0.5%" },
  ];

  return (
    <AppShell> {/* Replace with SellerAppShell if available */}
      {/* <SellerSidebar /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-8">
          Seller Dashboard
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  {metric.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins">Recent Orders</CardTitle>
                    <CardDescription>A list of your most recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for recent orders table/list */}
                    <p className="text-muted-foreground">Recent orders will appear here.</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-poppins">Top Performing Products</CardTitle>
                    <CardDescription>Your best-selling items.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for top products list */}
                    <p className="text-muted-foreground">Top products will appear here.</p>
                </CardContent>
            </Card>
        </div>
        {/* Add more dashboard components like charts for sales trends, product performance details etc. */}
      </div>
    </AppShell>
  );
}
