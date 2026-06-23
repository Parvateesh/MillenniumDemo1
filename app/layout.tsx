import type { Metadata } from 'next';
import './globals.css';
import DemoBanner from '@/components/DemoBanner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsProvider from '@/components/AnimationsProvider';

export const metadata: Metadata = {
  title: 'Millennium Bowl — Eat. Drink. Bowl. | North Little Rock, AR',
  description:
    "32 lanes of strikes, an arcade, F1 simulator, full bar, and the area's only Ebonite Gold Pro Shop. Birthday parties, corporate events, and league bowling in North Little Rock, AR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise" />
        <DemoBanner />
        <Nav />
        <main>{children}</main>
        <Footer />
        <AnimationsProvider />
      </body>
    </html>
  );
}
