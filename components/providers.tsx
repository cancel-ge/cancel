"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from '@/components/theme-provider';
import { EntriesProvider } from '@/lib/entries-context';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <EntriesProvider>
          {children}
          <Toaster />
        </EntriesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}