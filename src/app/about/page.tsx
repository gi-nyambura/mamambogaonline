
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <Info className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                About Mama Mboga
            </h1>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-poppins">Our Story</CardTitle>
            <CardDescription>Learn more about our mission and values.</CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Welcome to Mama Mboga! We are dedicated to connecting local farmers directly with consumers,
              ensuring fresh produce reaches your table while supporting our agricultural community.
            </p>
            <h2 className="font-poppins">Our Mission</h2>
            <p>
              To empower small-scale farmers by providing a wider market reach and fair prices, and to offer
              consumers convenient access to fresh, high-quality, and locally sourced groceries.
            </p>
            <h2 className="font-poppins">Our Vision</h2>
            <p>
              To be the leading platform for agritech solutions in Kenya, fostering a sustainable food ecosystem
              that benefits both producers and consumers. We aim to reduce food wastage, shorten supply chains,
              and promote healthy eating habits.
            </p>
            <h2 className="font-poppins">Why Choose Us?</h2>
            <ul>
              <li><strong>Freshness Guaranteed:</strong> Directly from farm to you.</li>
              <li><strong>Support Local:</strong> Empower local farmers and communities.</li>
              <li><strong>Convenience:</strong> Easy browsing, ordering, and delivery.</li>
              <li><strong>Transparency:</strong> Know where your food comes from.</li>
            </ul>
            <p className="mt-6 text-center text-muted-foreground">
              Content for the About Us page will be fully developed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
