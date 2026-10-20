export const metadata = {
  title: 'Bar — Millennium Bowl | North Little Rock, AR',
  description: 'Full bar at Millennium Bowl. Cold beer on tap, frozen margaritas, cocktails, and premium spirits. 21+ after 10 PM Fri &amp; Sat.',
};

import { barItems, drinkItems } from '@/lib/menu-data';
import BarFilter from '@/components/BarFilter';

export default function BarPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Full Bar</span>
          <h1><span className="word">Drink.</span> <span className="word">Cheers.</span> <span className="word">Bowl.</span></h1>
          <p className="lede">Cold beer on tap, frozen margaritas, house cocktails, and premium spirits. 21+ after 10 PM Fridays and Saturdays.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">What We Pour</div>
          <h2 className="section-title">The <span className="accent">Bar Menu</span></h2>
          <BarFilter items={[...barItems, ...drinkItems]} />
        </div>
      </section>
    </>
  );
}
