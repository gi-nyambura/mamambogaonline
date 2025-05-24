
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, UserCircle, Search, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/market-prices', label: 'Market Prices' },
  { href: '/offers', label: 'Offers' },
  { href: '/seller/dashboard', label: 'Sell' }, // Example link to seller section
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
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

        <div className="flex items-center space-x-4">
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

          <div className="hidden md:block">
             <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
             </Button>
          </div>


          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <Logo />
                <div className="relative">
                  <Input type="search" placeholder="Search produce..." className="pr-10 h-9" />
                   <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
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
                <div className="flex flex-col space-y-2">
                    <Button variant="outline" asChild>
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    </Button>
                     <Button variant="default" asChild>
                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
