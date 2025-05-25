
"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Mail, User, ShoppingBag, AlertCircle, Loader2, ShieldCheck } from "lucide-react"; // Added ShieldCheck
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/providers/AuthProvider";

// IMPORTANT: Replace this with your actual Firebase Admin User ID
const ADMIN_UID_PLACEHOLDER = "REPLACE_WITH_YOUR_ADMIN_UID";

type LoginRole = 'buyer' | 'seller' | 'admin';

export default function LoginPage() {
  const [loginAs, setLoginAs] = useState<LoginRole>("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user: authUser, loadingAuthState } = useAuth(); 

  useEffect(() => {
    if (!loadingAuthState && authUser) {
      if (authUser.role === 'admin') {
        router.push('/seller/dashboard'); // Or a dedicated admin dashboard
      } else if (authUser.role === 'seller') {
        router.push('/seller/dashboard');
      } else if (authUser.role === 'buyer') {
        router.push('/buyer-dashboard');
      } else {
         router.push('/'); 
      }
    }
  }, [authUser, loadingAuthState, router]);


  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);

    if (loginAs === 'admin' && ADMIN_UID_PLACEHOLDER === "REPLACE_WITH_YOUR_ADMIN_UID") {
      setError("Admin UID has not been configured. Please update the placeholder in the code with your Firebase Admin User ID.");
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (loginAs === 'admin') {
          if (userData.role === 'admin' && firebaseUser.uid === ADMIN_UID_PLACEHOLDER) {
            console.log("Admin login successful for:", firebaseUser.email);
            router.push('/seller/dashboard'); // Or future /admin/dashboard
          } else {
            setError("Access denied. Not an authorized admin account.");
            await auth.signOut();
          }
        } else if (userData.role === loginAs) {
          console.log("Login successful for:", firebaseUser.email, "as", userData.role);
          switch (userData.role) {
            case 'buyer':
              router.push('/buyer-dashboard');
              break;
            case 'seller':
              router.push('/seller/dashboard');
              break;
            default:
              setError("Unknown role. Please contact support.");
              await auth.signOut();
          }
        } else {
          setError(`This account is registered as a ${userData.role}. Please select the correct login type or use the appropriate account.`);
          await auth.signOut(); 
        }
      } else {
        // This case might occur if a user exists in Firebase Auth but not in Firestore users collection
        setError("User data not found in database. Please contact support.");
        await auth.signOut();
      }
    } catch (firebaseError: any) {
      console.error("Firebase Login Error:", firebaseError);
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError("Too many login attempts. Please try again later.");
      } else if (firebaseError.code === 'auth/invalid-api-key') {
        setError("Firebase API Key is invalid. Please check your configuration.");
      }
      else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingAuthState || (!loadingAuthState && authUser)) { 
     return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your experience...</p>
      </div>
    );
  }

  const getLoginButtonText = () => {
    switch(loginAs) {
      case 'buyer': return 'Sign In as Buyer';
      case 'seller': return 'Sign In as Seller';
      case 'admin': return 'Sign In as Admin';
      default: return 'Sign In';
    }
  };


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
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-3">
            <Label className="text-base font-medium">Login as:</Label>
            <RadioGroup
              value={loginAs}
              onValueChange={(value) => setLoginAs(value as LoginRole)}
              className="grid grid-cols-3 gap-4" // Changed to grid-cols-3
              disabled={isLoading}
            >
              <div>
                <RadioGroupItem value="buyer" id="buyer" className="peer sr-only" />
                <Label
                  htmlFor="buyer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all text-sm"
                >
                  <ShoppingBag className="mb-2 h-5 w-5" /> {/* Adjusted icon size and margin */}
                  Buyer
                </Label>
              </div>
              <div>
                <RadioGroupItem value="seller" id="seller" className="peer sr-only" />
                <Label
                  htmlFor="seller"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all text-sm"
                >
                  <User className="mb-2 h-5 w-5" /> {/* Adjusted icon size and margin */}
                  Seller
                </Label>
              </div>
              <div>
                <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                <Label
                  htmlFor="admin"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all text-sm"
                >
                  <ShieldCheck className="mb-2 h-5 w-5" /> {/* Adjusted icon size and margin */}
                  Admin
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref className="text-sm text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : getLoginButtonText()}
          </Button>
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
