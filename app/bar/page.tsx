export const metadata = { title: 'Bar — Millennium Bowl' };

import { drinkItems } from '@/lib/menu-data';

export default function BarPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Full Bar</span>
          <h1><span className="word">Drink.</span> <span className="word">Cheers.</span> <span className="word">Bowl.</span></h1>
          <p className="lede">Cold beer on tap, frozen margaritas, house cocktails, and premium spirits. Happy hour weeknights. 21+ after 10 PM Fridays and Saturdays.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">What We Pour</div>
          <h2 className="section-title">The <span className="accent">Bar Menu</span></h2>
          <div className="menu-grid">
            {drinkItems.map((item) => (
              <div key={item.name} className="menu-item" data-animate="">
                <div className="menu-item-head">
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
