'use client';

import { useState } from 'react';
import { foodItems, type MenuItem } from '@/lib/menu-data';
import { KITCHEN_TEXT, ORDER_URL } from '@/lib/millie/facts';

type Cat = 'pizza' | 'apps' | 'mains' | 'basket' | 'salads';
const CATS: { id: Cat; label: string; icon: string }[] = [
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'apps', label: 'Appetizers', icon: '🍟' },
  { id: 'basket', label: 'Baskets', icon: '🧺' },
  { id: 'mains', label: 'Entrees', icon: '🍤' },
  { id: 'salads', label: 'Salads', icon: '🥗' },
];

function Thumb({ item }: { item: MenuItem }) {
  if (item.image) {
    // Real photo, when one has been added to lib/menu-data.ts
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="millie-thumb" src={item.image} alt={item.name} loading="lazy" width={56} height={56} />;
  }
  const icon = CATS.find((c) => c.id === item.cat)?.icon ?? '🍽️';
  return <span className="millie-thumb millie-thumb-icon" aria-hidden="true">{icon}</span>;
}

// Food menu with categories and search, using the same data as the Menu page.
export default function MenuBrowser() {
  const [cat, setCat] = useState<Cat>('pizza');
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const items = term
    ? foodItems.filter((i) => `${i.name} ${i.desc}`.toLowerCase().includes(term))
    : foodItems.filter((i) => i.cat === cat);

  return (
    <div className="millie-card millie-menu">
      <div className="millie-card-title">🍕 Kitchen menu</div>
      <input className="millie-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search wings, nachos, fish…" aria-label="Search the menu" />
      {!term && (
        <div className="millie-seg millie-tabs" role="tablist" aria-label="Menu categories">
          {CATS.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={c.id === cat} className={c.id === cat ? 'is-on' : ''} onClick={() => setCat(c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      )}
      <ul className="millie-menu-list">
        {items.map((i) => (
          <li key={i.name} className="millie-menu-item">
            <Thumb item={i} />
            <div className="millie-menu-text">
              <div className="millie-menu-top"><span>{i.name}</span><strong>{i.price}</strong></div>
              <p>{i.desc}</p>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="millie-fine">No dishes match “{q}”. Try another word.</li>}
      </ul>
      <p className="millie-fine">Kitchen open {KITCHEN_TEXT}. Prices before tax and may change.</p>
      <div className="millie-chips">
        <a className="millie-chip millie-chip-pink" href={ORDER_URL} target="_blank" rel="noopener noreferrer">🛒 Order online</a>
        <a className="millie-chip" href="/menu">Full menu page</a>
        <a className="millie-chip" href="/bar">Bar menu (21+)</a>
      </div>
    </div>
  );
}
