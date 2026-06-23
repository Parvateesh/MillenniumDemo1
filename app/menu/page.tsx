'use client';

import { useState } from 'react';

type Category = 'all' | 'pizza' | 'apps' | 'mains' | 'drinks' | 'kitchen' | 'bar';

const kitchenCats = ['pizza', 'apps', 'mains'];

function isVisible(itemCat: string, activeCat: Category) {
  if (activeCat === 'all') return true;
  if (activeCat === 'kitchen') return kitchenCats.includes(itemCat);
  if (activeCat === 'bar') return itemCat === 'drinks';
  return activeCat === itemCat;
}

const menuItems = [
  { name: 'The Strike', price: '$16', desc: 'Pepperoni, Italian sausage, fresh mozzarella, San Marzano tomato. The classic.', cat: 'pizza' },
  { name: 'Spare Me', price: '$18', desc: 'Margherita: hand-stretched, fresh basil, EVOO, sea salt. Vegetarian.', cat: 'pizza' },
  { name: '300 Pie', price: '$22', desc: 'Loaded: pepperoni, sausage, peppers, mushrooms, olives, red onion. Bring friends.', cat: 'pizza' },
  { name: 'Loaded Tots', price: '$11', desc: 'Cheddar, bacon, scallions, sour cream, hot sauce on the side.', cat: 'apps' },
  { name: 'Wings', price: '$13', desc: '10 jumbo wings: buffalo, BBQ, garlic parm, lemon pepper, or naked. Ranch or blue.', cat: 'apps' },
  { name: 'Pretzel Sticks', price: '$9', desc: 'Soft pretzels, beer cheese, spicy mustard.', cat: 'apps' },
  { name: 'Mozz Sticks', price: '$8', desc: 'Six golden sticks, marinara. Crowd favorite.', cat: 'apps' },
  { name: 'Bowler Burger', price: '$13', desc: '8 oz Angus, American, lettuce, tomato, onion, pickle, brioche. Add bacon $2.', cat: 'mains' },
  { name: 'Chicken Tenders', price: '$11', desc: 'Hand-breaded, served with fries. Honey mustard, ranch, or BBQ.', cat: 'mains' },
  { name: 'Nachos Supreme', price: '$12', desc: 'House chips, queso, ground beef, jalapeños, salsa, sour cream.', cat: 'mains' },
  { name: 'Draft Beer', price: '$5–7', desc: 'Eight on tap. Local rotating: Lost Forty, Stone\'s Throw, Diamond Bear, plus the usual suspects.', cat: 'drinks' },
  { name: 'Frozen Margarita', price: '$9', desc: 'Lime, strawberry, or swirl. Pitchers $24.', cat: 'drinks' },
  { name: 'Strike Zone Old Fashioned', price: '$11', desc: 'Bourbon, demerara, orange peel, cherry. House signature.', cat: 'drinks' },
  { name: 'Soft Drinks', price: '$3', desc: 'Coke products, lemonade, sweet tea, free refills. Iced coffee available.', cat: 'drinks' },
];

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
      <section className="hero" style={{ minHeight: '40vh' }}>
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
            {menuItems.map((item) => (
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
