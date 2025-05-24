
"use client"; // Required for useState

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Mail, User, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";

export default function LoginPage() {
  const [loginAs, setLoginAs] = useState("buyer"); // Default to buyer

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-poppins">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue to Mama Mboga.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Login as:</Label>
            <RadioGroup
              defaultValue="buyer"
              value={loginAs}
              onValueChange={setLoginAs}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="buyer" id="buyer" className="peer sr-only" />
                <Label
                  htmlFor="buyer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary [&:has([data-state=checked])]:border-primary"
                >
                  <ShoppingBag className="mb-3 h-6 w-6" />
                  Buyer
                </Label>
              </div>
              <div>
                <RadioGroupItem value="seller" id="seller" className="peer sr-only" />
                <Label
                  htmlFor="seller"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary [&:has([data-state=checked])]:border-primary"
                >
                  <User className="mb-3 h-6 w-6" />
                  Seller
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4 text-muted-foreground" />} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref className="text-sm text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" icon={<Lock className="h-4 w-4 text-muted-foreground" />} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">Sign In as {loginAs === 'buyer' ? 'Buyer' : 'Seller'}</Button>
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
