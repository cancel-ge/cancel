import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'
import { ThemeProvider } from '@/components/theme-provider';
import { EntriesProvider } from '@/lib/entries-context';
import { Toaster } from '@/components/ui/toaster';
import { isProduction } from '@/lib/utils';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Cancel.ge - Supporting Georgia's EU Membership Aspirations",
  description: "A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia's EU membership aspirations.",
  openGraph: {
    countryName: "Georgia",
    title: "Cancel.ge - Supporting Georgia's EU Membership Aspirations",
    description: "A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia's EU membership aspirations.",
    url: 'https://cancel.ge',
    siteName: 'Cancel.ge',
    locale: "en_US",
    type: 'website',
    images: [
      {
        url: 'https://cancel.ge/og-image.png',
        width: 1300,
        height: 731,
        alt: "Cancel.ge - Supporting Georgia's EU Membership Aspirations",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cancel.ge - Supporting Georgia's EU Membership Aspirations",
    description: "A platform promoting transparency by documenting companies, public figures, and entities regarding their alignment with Georgia's EU membership aspirations.",
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
      <meta name="google-site-verification" content="CxtofIL_MbN9qAx7zFyiqwL29_wmkjlG49JeAjmcXo8" />
      {isProduction() && <GoogleTagManager gtmId="G-9GDBGB7NBW" />}
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