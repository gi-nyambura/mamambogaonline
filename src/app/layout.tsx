
import type { Metadata } from 'next';
import { inter, poppins } from '@/lib/fonts';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mama Mboga - Fresh Produce Delivered',
  description: 'Discover fresh, local produce from nearby sellers with Mama Mboga.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          poppins.variable
        )}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
