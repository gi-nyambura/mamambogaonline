
"use client";

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/ThemeProvider'; // Corrected import path
import { AuthProvider } from './AuthProvider'; // Added AuthProvider

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mama-mboga-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider> {/* Added AuthProvider here */}
          {children}
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
