import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Kitchen — Millennium Bowl' };

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
