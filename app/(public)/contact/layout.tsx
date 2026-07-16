import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Millennium Bowl | North Little Rock, AR',
  description: 'Get in touch with Millennium Bowl. Call (501) 791-9150, email info@millenniumbowllr.com, or send us a message. Open 7 days a week at 7200 Counts Massie Rd, NLR.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
