import type { Metadata } from 'next';
import { allMenuItems } from '@/lib/menu-data';
import MenuFilter from '@/components/MenuFilter';
import OrderButton from '@/components/OrderButton';

export const metadata: Metadata = {
  title: 'Menu — Millennium Bowl | North Little Rock, AR',
  description: 'Pizza, wings, burgers, salads, and cold drinks at Millennium Bowl. Order online for pickup at the counter.',
};

export default function MenuPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Kitchen · Bar · Order Online</span>
          <h1>
            <span className="word">Eat.</span>{' '}
            <span className="word">Drink.</span>{' '}
            <span className="word">Bowl.</span>
          </h1>
          <p className="lede">
            Pizza called &quot;more delicious than expected.&quot; Wings. Cold beer on tap.
            Frozen margaritas. Everything you need for a great night.
          </p>
          <div className="hero-ctas">
            <OrderButton className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <MenuFilter items={allMenuItems} />
        </div>
      </section>
    </>
  );
}
