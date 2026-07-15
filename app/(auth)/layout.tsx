import { AuthProvider } from '@/lib/auth-context';
import NavWithAuth from '@/components/NavWithAuth';
import Footer from '@/components/Footer';
import AnimationsProvider from '@/components/AnimationsProvider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavWithAuth />
      <main>{children}</main>
      <Footer />
      <AnimationsProvider />
    </AuthProvider>
  );
}
