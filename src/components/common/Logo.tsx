
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
      <Leaf className="h-8 w-8" />
      <span className="text-2xl font-bold font-poppins">Mama Mboga</span>
    </Link>
  );
}
