
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-foreground/60">
              Fresh produce from local sellers, delivered to your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold font-poppins text-foreground/80 tracking-wider uppercase">Quick Links</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-foreground/60 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/60 hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-foreground/60 hover:text-primary">FAQ</Link></li>
              <li><Link href="/terms" className="text-sm text-foreground/60 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold font-poppins text-foreground/80 tracking-wider uppercase">Connect</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-primary">Facebook</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-primary">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-primary">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-xs text-foreground/60">
            &copy; {new Date().getFullYear()} Mama Mboga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
