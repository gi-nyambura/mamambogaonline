
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
// import { auth } from "@/lib/firebase"; // Uncomment when implementing
// import { sendPasswordResetEmail } from "firebase/auth"; // Uncomment

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      // ** Firebase Implementation (Uncomment and configure Firebase) **
      // await sendPasswordResetEmail(auth, email);
      // setSuccessMessage("Password reset email sent! Please check your inbox (and spam folder).");
      
      // Placeholder for now
      console.log("Password reset requested for:", email);
      setTimeout(() => {
        setSuccessMessage("If an account exists for this email, a password reset link has been sent.");
        setIsLoading(false);
      }, 1500);

    } catch (firebaseError: any) {
      console.error("Password Reset Error:", firebaseError);
      // if (firebaseError.code === 'auth/user-not-found') {
      //   // It's often better not to reveal if an email exists for security reasons
      //   setSuccessMessage("If an account exists for this email, a password reset link has been sent.");
      // } else if (firebaseError.code === 'auth/invalid-email') {
      //    setError("The email address is not valid.");
      // }
      // else {
      //   setError("Failed to send password reset email. Please try again.");
      // }
      setError("Failed to send password reset email. Please try again later."); // Generic error for placeholder
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="shadow-xl w-full max-w-md">
          <CardHeader className="text-center">
            <KeyRound className="w-12 h-12 text-primary mx-auto mb-3" />
            <CardTitle className="font-poppins text-2xl">Forgot Your Password?</CardTitle>
            <CardDescription>No worries! Enter your email address below and we'll send you a link to reset it.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {successMessage && (
                <Alert variant="default" className="bg-green-100 border-green-300 text-green-700">
                  <AlertCircle className="h-4 w-4 text-green-700" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t pt-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <Button variant="link" asChild className="text-sm text-muted-foreground">
                <Link href="/login">Back to Login</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
