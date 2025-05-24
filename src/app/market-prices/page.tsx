
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketPrice {
  crop: string;
  county: string;
  currentPrice: number;
  previousPrice: number;
  changePercentage: number;
}

const mockMarketPrices: MarketPrice[] = [
  { crop: 'Maize', county: 'Uasin Gishu', currentPrice: 3500, previousPrice: 3400, changePercentage: 2.94 },
  { crop: 'Beans', county: 'Nakuru', currentPrice: 7200, previousPrice: 7500, changePercentage: -4.00 },
  { crop: 'Potatoes', county: 'Nyandarua', currentPrice: 2800, previousPrice: 2800, changePercentage: 0.00 },
  { crop: 'Tomatoes', county: 'Kirinyaga', currentPrice: 45, previousPrice: 40, changePercentage: 12.50 }, // per kg
  { crop: 'Cabbages', county: 'Meru', currentPrice: 30, previousPrice: 35, changePercentage: -14.29 }, // per head
];

export default function MarketPricesPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-poppins">Market Price Insights</CardTitle>
            <CardDescription>
              Stay updated with the latest crop prices across different counties. Prices are per 90kg bag unless stated otherwise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead className="text-right">Current Price (KES)</TableHead>
                  <TableHead className="text-right">Previous Price (KES)</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMarketPrices.map((price) => (
                  <TableRow key={`${price.crop}-${price.county}`}>
                    <TableCell className="font-medium">{price.crop}</TableCell>
                    <TableCell>{price.county}</TableCell>
                    <TableCell className="text-right">{price.currentPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{price.previousPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={price.changePercentage > 0 ? 'default' : price.changePercentage < 0 ? 'destructive' : 'secondary'}
                        className={price.changePercentage > 0 ? 'bg-green-100 text-green-700 border-green-300' : price.changePercentage < 0 ? 'bg-red-100 text-red-700 border-red-300' : ''}
                      >
                        {price.changePercentage > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : price.changePercentage < 0 ? <TrendingDown className="h-4 w-4 mr-1" /> : <Minus className="h-4 w-4 mr-1" />}
                        {price.changePercentage.toFixed(2)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
