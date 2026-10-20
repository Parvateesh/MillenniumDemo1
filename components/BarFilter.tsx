'use client';

import { useState } from 'react';
import type { MenuItem } from '@/lib/menu-data';

type Category = 'all' | 'draft' | 'bottles' | 'buckets' | 'wine' | 'coolers' | 'liquor' | 'drinks';

const tabs: { label: string; cat: Category }[] = [
  { label: 'Everything', cat: 'all' },
  { label: 'Draft', cat: 'draft' },
  { label: 'Bottles & Cans', cat: 'bottles' },
  { label: 'Buckets', cat: 'buckets' },
  { label: 'Wine', cat: 'wine' },
  { label: 'Coolers & Seltzers', cat: 'coolers' },
  { label: 'Liquor', cat: 'liquor' },
  { label: 'Soft Drinks', cat: 'drinks' },
];

export default function BarFilter({ items }: { items: MenuItem[] }) {
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

      <div className="menu-grid">
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
    </>
  );
}
