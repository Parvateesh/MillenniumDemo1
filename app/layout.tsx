import type { Metadata } from 'next';
import { Bowlby_One, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

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
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Millennium Bowl — Eat. Drink. Bowl.' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millennium Bowl — Eat. Drink. Bowl.',
    description: "North Little Rock's home for strikes, parties, and Friday nights.",
    images: ['/og'],
  },
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'BowlingAlley',
  name: 'Millennium Bowl',
  url: 'https://millenniumbowllr.com',
  logo: 'https://millenniumbowllr.com/logo.webp',
  image: 'https://millenniumbowllr.com/og',
  description:
    "32 lanes of strikes, an arcade, F1 simulator, full bar, and the area's only Ebonite Gold Pro Shop. Birthday parties, corporate events, and league bowling in North Little Rock, AR.",
  telephone: '+15017919150',
  email: 'info@millenniumbowllr.com',
  foundingDate: '2003',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7200 Counts Massie Rd',
    addressLocality: 'North Little Rock',
    addressRegion: 'AR',
    postalCode: '72113',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.7954,
    longitude: -92.2718,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '09:00', closes: '02:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '00:00' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.2',
    reviewCount: '1076',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: '32 Bowling Lanes', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Full Bar', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Arcade', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'F1 Simulator', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Pro Shop', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Party Rooms', value: true },
  ],
  sameAs: [
    'https://millenniumbowl.square.site',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bowlby.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HVS4SJPDDJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HVS4SJPDDJ');
        `}</Script>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
