import type { Metadata } from 'next';
import '@/css/auth.css';

export const metadata: Metadata = {
  title: 'Create Account — Millennium Bowl',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
