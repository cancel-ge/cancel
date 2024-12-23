import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { EntriesProvider } from '@/lib/entries-context';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Cancel.ge - Highlighting Support for Georgia\'s EU Membership Aspirations',
  description: 'A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia\'s EU membership aspirations.',
  openGraph: {
    title: 'Cancel.ge - Highlighting Support for Georgia\'s EU Membership Aspirations',
    description: 'A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia\'s EU membership aspirations.',
    url: 'https://cancel.ge',
    siteName: 'Cancel.ge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancel.ge - Highlighting Support for Georgia\'s EU Membership Aspirations',
    description: 'A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia\'s EU membership aspirations.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={robotoMono.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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