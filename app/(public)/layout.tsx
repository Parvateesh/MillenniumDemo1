import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsProvider from '@/components/AnimationsProvider';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <AnimationsProvider />
    </>
  );
}
