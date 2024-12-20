import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { EntriesProvider } from '@/lib/entries-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cancel.ge - Exposing Those Silent on Georgian EU Aspirations',
  description: 'Archive of companies and public figures not actively supporting Georgian EU membership aspirations.',
  openGraph: {
    title: 'Cancel.ge - Exposing Those Silent on Georgian EU Aspirations',
    description: 'Archive of companies and public figures not actively supporting Georgian EU membership aspirations.',
    url: 'https://cancel.ge',
    siteName: 'Cancel.ge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancel.ge - Exposing Those Silent on Georgian EU Aspirations',
    description: 'Archive of companies and public figures not actively supporting Georgian EU membership aspirations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
      </body>
    </html>
  );
}