
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Map, BarChartHorizontalBig, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
// import { getDeliveryRecommendations, GetDeliveryRecommendationsInput, GetDeliveryRecommendationsOutput } from "@/ai/flows/seller-delivery-recommendations"; // Uncomment when implementing
import { Skeleton } from "@/components/ui/skeleton";


const counties = ["Nairobi", "Kiambu", "Machakos", "Kajiado", "Murang'a", "Nakuru", "Uasin Gishu", "Mombasa"];

// Simulate GetDeliveryRecommendationsOutput for UI development
type GetDeliveryRecommendationsOutput = {
  recommendedLocations: string[];
  reasoning: string;
}

export default function SellerRecommendationsPage() {
  const [sellerMetrics, setSellerMetrics] = useState("");
  const [marketTrends, setMarketTrends] = useState("");
  const [selectedCounty, setSelectedCounty] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<GetDeliveryRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCounty || !sellerMetrics || !marketTrends) {
      setError("Please fill in all fields and select a county.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setRecommendations(null);

    try {
      // const input: GetDeliveryRecommendationsInput = {
      //   sellerMetrics,
      //   marketTrends,
      //   county: selectedCounty,
      // };
      // const result = await getDeliveryRecommendations(input);
      // setRecommendations(result);

      // Simulate AI call
      setTimeout(() => {
        const mockResult: GetDeliveryRecommendationsOutput = {
          recommendedLocations: selectedCounty === "Nairobi" ? ["Kibera", "Eastleigh", "Kawangware"] : ["Thika Town", "Ruiru", "Juja"],
          reasoning: `Based on high population density and growing demand for fresh vegetables in ${selectedCounty}, these locations show significant potential. Seller metrics indicate strong performance in similar urban areas, and market trends point to a preference for organic produce in these zones.`,
        };
        setRecommendations(mockResult);
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      console.error("Error getting recommendations:", err);
      setError("Failed to fetch recommendations. Please try again.");
      setIsLoading(false);
    }
  };
  
  // Placeholder for fetching initial seller metrics and market trends
  useEffect(() => {
    setSellerMetrics("Example: High sales of kales and tomatoes, 5000+ product views last month. Average order value KES 800.");
    setMarketTrends("Example: Increased demand for organic produce. Price of onions trending upwards. Popularity of leafy greens rising.");
  }, []);


  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <Lightbulb className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Delivery Hotspot Recommendations
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><BarChartHorizontalBig className="mr-2 h-6 w-6 text-primary"/>Input Data</CardTitle>
                <CardDescription>Provide your seller metrics and current market trends to get tailored delivery recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sellerMetrics">Your Seller Metrics</Label>
                  <Textarea
                    id="sellerMetrics"
                    value={sellerMetrics}
                    onChange={(e) => setSellerMetrics(e.target.value)}
                    placeholder="e.g., Product performance, views, sales data, popular items..."
                    rows={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="marketTrends">Current Market Trends</Label>
                  <Textarea
                    id="marketTrends"
                    value={marketTrends}
                    onChange={(e) => setMarketTrends(e.target.value)}
                    placeholder="e.g., Demand for specific crops, price fluctuations, consumer preferences..."
                    rows={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="county">Target County</Label>
                  <Select onValueChange={setSelectedCounty} value={selectedCounty} required>
                    <SelectTrigger id="county">
                      <SelectValue placeholder="Select a county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map(county => <SelectItem key={county} value={county}>{county}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                  Get Recommendations
                </Button>
              </CardFooter>
            </Card>
          </form>

          <div className="lg:col-span-1 sticky top-24">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center"><Map className="mr-2 h-6 w-6 text-primary"/>Recommended Delivery Areas</CardTitle>
                <CardDescription>AI-powered suggestions for where to focus your delivery efforts in {selectedCounty || "the selected county"}.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[200px]">
                {isLoading && (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                )}
                {!isLoading && recommendations && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Hotspot Locations:</h4>
                      {recommendations.recommendedLocations.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {recommendations.recommendedLocations.map(loc => <li key={loc}>{loc}</li>)}
                        </ul>
                      ) : <p className="text-sm text-muted-foreground">No specific hotspots identified with current data.</p> }
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Reasoning:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{recommendations.reasoning}</p>
                    </div>
                  </div>
                )}
                {!isLoading && !recommendations && !error && (
                  <p className="text-sm text-muted-foreground">Enter your data and click "Get Recommendations" to see suggestions here.</p>
                )}
                 {!isLoading && !recommendations && error && (
                  <p className="text-sm text-destructive">Could not load recommendations. Please try again.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

// To enable dynamic rendering for this page as it relies on client side state for inputs
export const dynamic = 'force-dynamic';
