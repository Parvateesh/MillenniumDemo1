import type { Metadata } from 'next';
import '@/css/auth.css';

export const metadata: Metadata = {
  title: 'Sign In — Millennium Bowl',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
