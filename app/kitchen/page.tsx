'use client';

import { useState } from 'react';
import { foodItems } from '@/lib/menu-data';

type FoodCat = 'all' | 'pizza' | 'apps' | 'salads' | 'mains' | 'basket';

const tabs: { label: string; cat: FoodCat }[] = [
  { label: 'Everything', cat: 'all' },
  { label: 'Appetizers', cat: 'apps' },
  { label: 'Salads', cat: 'salads' },
  { label: 'Entrees', cat: 'mains' },
  { label: 'Basket', cat: 'basket' },
  { label: 'Pizza', cat: 'pizza' },
];

export default function KitchenPage() {
  const [activeCat, setActiveCat] = useState<FoodCat>('all');

  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Fresh Kitchen</span>
          <h1><span className="word">Bowl</span> <span className="word">Food.</span> <span className="word">Done Right.</span></h1>
          <p className="lede">Pizza that&apos;s been called &quot;more delicious than expected from a non-pizza place.&quot; Wings, burgers, nachos, and fries that make you forget you came here to bowl.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="menu-categories">
            {tabs.map(({ label, cat }) => (
              <button
                key={cat}
                className={`menu-tab${activeCat === cat ? ' active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {foodItems.map((item) => (
              <div
                key={item.name}
                className={`menu-item ${activeCat === 'all' || activeCat === item.cat ? 'visible' : 'hidden'}`}
                data-cat={item.cat}
                data-animate=""
              >
                <div className="menu-item-head">
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="order-cta-banner" data-animate="">
            <div className="order-cta-left">
              <div className="order-cta-icon">🍕</div>
              <div>
                <div className="order-cta-title">Ready to order?</div>
                <div className="order-cta-sub">Order online and pick up at the counter — no waiting in line.</div>
              </div>
            </div>
            <a href="https://millenniumbowl.square.site" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Order Now →</a>
          </div>
        </div>
      </section>
    </>
  );
}
