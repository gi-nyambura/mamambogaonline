
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, UserCircle, Search, Menu, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/market-prices', label: 'Market Prices' },
  { href: '/offers', label: 'Offers' },
  // Conditional "Sell" link based on role can be added here or managed via AuthProvider
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loadingAuthState } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after logout
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle error (e.g., show a toast notification)
    }
  };
  
  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  }

  const dynamicNavLinks = [...navLinks];
  if (user?.role === 'seller') {
    dynamicNavLinks.push({ href: '/seller/dashboard', label: 'My Dashboard' });
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {dynamicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden sm:flex relative">
            <Input type="search" placeholder="Search produce..." className="pr-10 h-9" />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 text-muted-foreground">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {mounted && <ThemeToggle />}

          {loadingAuthState ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
                    <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.displayName || "User Profile"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user.role === 'seller' ? "/seller/dashboard" : "/profile"}> {/* Adjust link as needed */}
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{user.role === 'seller' ? "Dashboard" : "Profile"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <div className="hidden md:block">
               <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
               </Button>
            </div>
          )}


          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-0">
              <SheetHeader className="p-6 pb-2 border-b">
                 <Logo /> 
                 <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 p-6 pt-4">
                <div className="relative">
                  <Input type="search" placeholder="Search produce..." className="pr-10 h-9" />
                   <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {dynamicNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                    {loadingAuthState ? (
                       <Button variant="outline" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Loading...</Button>
                    ) : user ? (
                      <>
                        <Button variant="outline" asChild onClick={() => { router.push(user.role === 'seller' ? "/seller/dashboard" : "/profile"); setMobileMenuOpen(false); }}>
                           <Link href={user.role === 'seller' ? "/seller/dashboard" : "/profile"}>{user.firstName || "My Account"}</Link>
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" asChild>
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                        </Button>
                         <Button variant="default" asChild>
                            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                        </Button>
                      </>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
