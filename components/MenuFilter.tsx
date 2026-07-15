'use client';

import { useState } from 'react';
import type { MenuItem } from '@/lib/menu-data';
import OrderButton from '@/components/OrderButton';

type Category = 'all' | 'pizza' | 'apps' | 'salads' | 'mains' | 'basket' | 'drinks';

const tabs: { label: string; cat: Category }[] = [
  { label: 'Everything', cat: 'all' },
  { label: 'Appetizers', cat: 'apps' },
  { label: 'Salads', cat: 'salads' },
  { label: 'Entrees', cat: 'mains' },
  { label: 'Basket', cat: 'basket' },
  { label: 'Pizza', cat: 'pizza' },
  { label: 'Drinks', cat: 'drinks' },
];

export default function MenuFilter({ items }: { items: MenuItem[] }) {
  const [activeCat, setActiveCat] = useState<Category>('all');

  return (
    <>
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
        {items.map((item) => (
          <div
            key={item.name}
            className="menu-item"
            data-cat={item.cat}
            data-animate=""
            style={{ display: activeCat === 'all' || activeCat === item.cat ? '' : 'none' }}
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
    </>
  );
}
