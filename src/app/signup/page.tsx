
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, User, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
       <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-poppins">Create Your Account</CardTitle>
          <CardDescription>Join Mama Mboga and access fresh local produce.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Jane" icon={<User className="h-4 w-4 text-muted-foreground" />} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" icon={<User className="h-4 w-4 text-muted-foreground" />} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" icon={<Mail className="h-4 w-4 text-muted-foreground" />} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="0712 345 678" icon={<Phone className="h-4 w-4 text-muted-foreground" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a strong password" icon={<Lock className="h-4 w-4 text-muted-foreground" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm your password" icon={<Lock className="h-4 w-4 text-muted-foreground" />} />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">Create Account</Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
