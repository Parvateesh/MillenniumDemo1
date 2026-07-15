'use client';

import { useState } from 'react';
import { allMenuItems } from '@/lib/menu-data';
import OrderButton from '@/components/OrderButton';

type Category = 'all' | 'pizza' | 'apps' | 'salads' | 'mains' | 'basket' | 'drinks';

function isVisible(itemCat: string, activeCat: Category) {
  if (activeCat === 'all') return true;
  return activeCat === itemCat;
}

const tabs: { label: string; cat: Category }[] = [
  { label: 'Everything', cat: 'all' },
  { label: 'Appetizers', cat: 'apps' },
  { label: 'Salads', cat: 'salads' },
  { label: 'Entrees', cat: 'mains' },
  { label: 'Basket', cat: 'basket' },
  { label: 'Pizza', cat: 'pizza' },
  { label: 'Drinks', cat: 'drinks' },
];

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<Category>('all');

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

          <div className="menu-grid" id="menuGrid">
            {allMenuItems.map((item) => (
              <div
                key={item.name}
                className="menu-item"
                data-cat={item.cat}
                data-animate=""
                style={{ display: isVisible(item.cat, activeCat) ? '' : 'none' }}
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
              <div className="order-cta-icon">🛒</div>
              <div>
                <div className="order-cta-title">Ready to order?</div>
                <div className="order-cta-sub">
                  Order online and pick up at the counter — skip the line.
                </div>
              </div>
            </div>
            <OrderButton />
          </div>
        </div>
      </section>
    </>
  );
}
