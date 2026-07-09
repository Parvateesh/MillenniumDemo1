import type { Metadata } from 'next';
import { Bowlby_One, Space_Mono, Inter } from 'next/font/google';
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
  title: 'Millennium Bowl — Eat. Drink. Bowl. | North Little Rock, AR',
  description:
    "32 lanes of strikes, an arcade, F1 simulator, full bar, and the area's only Ebonite Gold Pro Shop. Birthday parties, corporate events, and league bowling in North Little Rock, AR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bowlby.variable} ${spaceMono.variable} ${inter.variable}`}>
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
