import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu — Millennium Bowl',
  description: 'Kitchen food and bar drinks at Millennium Bowl. Pizza, wings, burgers, cocktails, draft beer and more. Order online for pickup.',
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
