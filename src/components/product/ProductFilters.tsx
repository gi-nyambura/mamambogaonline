
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter, ListFilter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const categories = ["All", "Vegetables", "Fruits", "Leafy Greens", "Herbs"];
const freshnessOptions = ["All", "Fresh", "1-day old", "2-days old"];
const sortOptions = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "freshness", label: "Freshness" },
  { value: "distance", label: "Distance" },
];

export function ProductFilters() {

  const filtersContent = (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['category', 'price', 'freshness']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-poppins">Category</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`cat-${category.toLowerCase()}`} />
                <Label htmlFor={`cat-${category.toLowerCase()}`} className="font-normal">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-poppins">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <Slider
              defaultValue={[50, 500]}
              max={1000}
              step={10}
              aria-label="Price range slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>KES 50</span>
              <span>KES 1000</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="freshness">
          <AccordionTrigger className="text-base font-poppins">Freshness</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {freshnessOptions.map((freshness) => (
              <div key={freshness} className="flex items-center space-x-2">
                <Checkbox id={`fresh-${freshness.toLowerCase().replace(' ', '-')}`} />
                <Label htmlFor={`fresh-${freshness.toLowerCase().replace(' ', '-')}`} className="font-normal">{freshness}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="organic">
          <AccordionTrigger className="text-base font-poppins">Organic</AccordionTrigger>
          <AccordionContent className="pt-2">
             <div className="flex items-center space-x-2">
                <Checkbox id="organic-filter" />
                <Label htmlFor="organic-filter" className="font-normal">Only Organic Products</Label>
              </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <div>
        <Label htmlFor="sort-by" className="text-base font-poppins block mb-2">Sort By</Label>
        <Select defaultValue="freshness">
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <Filter className="mr-2 h-4 w-4" /> Apply Filters
      </Button>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block lg:col-span-1 p-4 border rounded-lg shadow-sm bg-card">
        <h3 className="text-xl font-semibold mb-4 font-poppins">Filters</h3>
        {filtersContent}
      </div>
      {/* Mobile Filters Button - positioned above chatbot */}
      <div className="lg:hidden fixed bottom-24 right-6 z-50"> {/* 6rem = 96px from bottom */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-xl">
              <ListFilter className="mr-2 h-5 w-5" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] p-4 overflow-y-auto">
             <h3 className="text-xl font-semibold mb-4 font-poppins">Filters</h3>
            {filtersContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
