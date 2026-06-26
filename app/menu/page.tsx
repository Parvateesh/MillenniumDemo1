'use client';

import { useState } from 'react';
import { allMenuItems, foodItems } from '@/lib/menu-data';

type Category = 'all' | 'pizza' | 'apps' | 'mains' | 'drinks' | 'kitchen' | 'bar';

const kitchenCats = ['pizza', 'apps', 'mains'];

function isVisible(itemCat: string, activeCat: Category) {
  if (activeCat === 'all') return true;
  if (activeCat === 'kitchen') return kitchenCats.includes(itemCat);
  if (activeCat === 'bar') return itemCat === 'drinks';
  return activeCat === itemCat;
}

const tabs: { label: string; cat: Category }[] = [
  { label: 'Everything', cat: 'all' },
  { label: 'Kitchen', cat: 'kitchen' },
  { label: 'Bar', cat: 'bar' },
  { label: 'Pizza', cat: 'pizza' },
  { label: 'Appetizers', cat: 'apps' },
  { label: 'Mains', cat: 'mains' },
  { label: 'Drinks', cat: 'drinks' },
];

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<Category>('all');

  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Eat. Drink.</span>
          <h1><span className="word">Bowl</span> <span className="word">Food.</span> <span className="word">Done Right.</span></h1>
          <p className="lede">Pizza that&apos;s been called &quot;more delicious than expected from a non-pizza place.&quot; Cold beer. Frozen margaritas. Wings, burgers, and fries that make you forget you came here to bowl.</p>
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
        </div>
      </section>
    </>
  );
}
