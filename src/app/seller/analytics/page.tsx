
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChartIcon, Package, Eye, TrendingUp, ArrowRight, Lightbulb } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend } from 'recharts';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ChartConfig } from "@/components/ui/chart";

// Mock data for charts and tables
const salesData = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 5000, profit: 3800 },
  { month: "Apr", sales: 4500, profit: 2900 },
  { month: "May", sales: 6000, profit: 4800 },
  { month: "Jun", sales: 5500, profit: 3500 },
];

const viewsData = [
  { day: "Mon", views: 120 }, { day: "Tue", views: 200 },
  { day: "Wed", views: 150 }, { day: "Thu", views: 280 },
  { day: "Fri", views: 220 }, { day: "Sat", views: 350 },
  { day: "Sun", views: 300 },
];

const topProducts = [
  { id: "1", name: "Fresh Tomatoes", category: "Vegetables", salesUnits: 120, revenue: 14400, views: 500, conversion: "15%" },
  { id: "3", name: "Sweet Mangoes (Pack)", category: "Fruits", salesUnits: 90, revenue: 22500, views: 450, conversion: "12%" },
  { id: "2", name: "Spinach Bunch", category: "Leafy Greens", salesUnits: 75, revenue: 6000, views: 300, conversion: "10%" },
  { id: "4", name: "Carrots (1kg)", category: "Vegetables", salesUnits: 150, revenue: 15000, views: 600, conversion: "18%" },
];

const salesChartConfig = {
  sales: { label: "Sales (KES)", color: "hsl(var(--chart-1))" },
  profit: { label: "Profit (KES)", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const viewsChartConfig = {
  views: { label: "Product Views", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function SellerAnalyticsPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <BarChart className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
              Produce Performance
            </h1>
          </div>
          {/* Placeholder for date range picker or other global filters */}
          {/* <Button variant="outline">Last 30 Days <ChevronDown className="ml-2 h-4 w-4" /></Button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Overview */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><LineChartIcon className="mr-2 h-6 w-6 text-primary"/>Sales Overview</CardTitle>
              <CardDescription>Your total sales and profit over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <RechartsTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" nameKey="name" labelKey="month" />}
                  />
                  <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-sales)" }} activeDot={{r:6}} name="Sales (KES)" />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-profit)" }} activeDot={{r:6}} name="Profit (KES)" />
                  <RechartsLegend content={<ChartLegendContent />} />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Views */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center"><Eye className="mr-2 h-6 w-6 text-primary"/>Product Views</CardTitle>
              <CardDescription>Daily views for your products over the last week.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={viewsChartConfig} className="h-[300px] w-full">
                <RechartsBarChart data={viewsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                  <RechartsTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" nameKey="name" />}
                  />
                  <Bar dataKey="views" fill="var(--color-views)" radius={[4, 4, 0, 0]} name="Product Views"/>
                   <RechartsLegend content={<ChartLegendContent />} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Products */}
        <Card className="shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center"><Package className="mr-2 h-6 w-6 text-primary"/>Top Performing Products</CardTitle>
            <CardDescription>Your best-selling and most viewed items. Click to see more details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Sales (Units)</TableHead>
                  <TableHead className="text-right">Revenue (KES)</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                  <TableHead className="text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => alert('Navigate to product details for ' + product.name )}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.salesUnits.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{product.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{product.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                        <Badge variant={parseFloat(product.conversion) > 10 ? "default" : "secondary"}
                               className={parseFloat(product.conversion) > 12 ? "bg-green-100 text-green-700 border-green-300" : parseFloat(product.conversion) > 8 ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-red-100 text-red-700 border-red-300"}>
                            {product.conversion}
                        </Badge>
                    </TableCell>
                     <TableCell className="text-center">
                      {parseFloat(product.conversion) > 12 ? 
                        <TrendingUp className="h-5 w-5 text-green-500 mx-auto" /> : 
                        <TrendingDown className="h-5 w-5 text-red-500 mx-auto" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                    <Link href="/seller/products">View All Products <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Placeholder for AI Driven Insights */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-poppins flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary"/>Market Demand Insights (AI Powered)</CardTitle>
                <CardDescription>Discover untapped opportunities and demand trends for your produce categories based on market data.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-4">
                    <li><span className="font-semibold text-foreground">High demand for "Organic Spinach"</span> noted in Kilimani area. Consider increasing stock or local delivery focus.</li>
                    <li>Trending search: <span className="font-semibold text-foreground">"Fresh Berry Mix"</span> - explore adding a mixed berry product.</li>
                    <li><span className="font-semibold text-foreground">"Avocado"</span> prices are expected to rise next month. Adjust your pricing strategy accordingly.</li>
                </ul>
                <Button disabled>
                    <Lightbulb className="mr-2 h-4 w-4"/> Get More Insights (Coming Soon)
                </Button>
            </CardContent>
        </Card>

      </div>
    </AppShell>
  );
}

