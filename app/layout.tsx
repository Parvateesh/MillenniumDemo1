import type { Metadata } from 'next';
import { Bowlby_One, Space_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsProvider from '@/components/AnimationsProvider';
import { AuthProvider } from '@/lib/auth-context';

const bowlby = Bowlby_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bowlby',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://millenniumbowllr.com'),
  title: 'Millennium Bowl — Eat. Drink. Bowl. | North Little Rock, AR',
  description:
    "32 lanes of strikes, an arcade, F1 simulator, full bar, and the area's only Ebonite Gold Pro Shop. Birthday parties, corporate events, and league bowling in North Little Rock, AR.",
  openGraph: {
    title: 'Millennium Bowl — Eat. Drink. Bowl.',
    description: "North Little Rock's home for strikes, parties, and Friday nights. 32 lanes · Full bar · F1 simulator · Ebonite Gold Pro Shop.",
    url: 'https://millenniumbowllr.com',
    siteName: 'Millennium Bowl',
    images: [{ url: '/logo.png', width: 190, height: 56, alt: 'Millennium Bowl logo' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Millennium Bowl — Eat. Drink. Bowl.',
    description: "North Little Rock's home for strikes, parties, and Friday nights.",
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bowlby.variable} ${spaceMono.variable} ${inter.variable}`}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HVS4SJPDDJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HVS4SJPDDJ');
        `}</Script>
      </head>
      <body>
        <AuthProvider>
          <div className="noise" />
          <Nav />
          <main>{children}</main>
          <Footer />
          <AnimationsProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
