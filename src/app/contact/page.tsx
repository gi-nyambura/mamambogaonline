
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import type React from "react";

export const dynamic = 'force-dynamic';

export default function ContactPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
    alert("Message sent (not really, this is a placeholder)!");
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center mb-8">
            <Mail className="w-10 h-10 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
                Contact Us
            </h1>
        </div>
        <Card className="shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-poppins">Get in Touch</CardTitle>
            <CardDescription>We'd love to hear from you! Fill out the form below.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Regarding..." required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </CardFooter>
          </form>
        </Card>
         <div className="mt-12 text-center">
            <h2 className="text-2xl font-poppins font-semibold mb-4">Our Contact Information</h2>
            <p className="text-muted-foreground">Mama Mboga Headquarters</p>
            <p className="text-muted-foreground">123 Agri-Lane, Nairobi, Kenya</p>
            <p className="text-muted-foreground">Phone: +254 700 000 000</p>
            <p className="text-muted-foreground">Email: support@mamamboga.co.ke</p>
        </div>
      </div>
    </AppShell>
  );
}
