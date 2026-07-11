import Link from 'next/link';
import { foodItems } from '@/lib/menu-data';
import OrderButton from '@/components/OrderButton';

export const metadata = { title: 'Order Food Online — Millennium Bowl' };

const categories = [
  { key: 'pizza', label: '🍕 Pizza', emoji: '🍕' },
  { key: 'apps',  label: '🍗 Starters', emoji: '🍗' },
  { key: 'mains', label: '🍔 Mains', emoji: '🍔' },
];

export default function OrderPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Order Online · Pickup at Counter</span>
          <h1>
            <span className="word">Fresh</span>{' '}
            <span className="word">Kitchen.</span>{' '}
            <span className="word">Order</span>{' '}
            <span className="word">Now.</span>
          </h1>
          <p className="lede">
            Browse the menu below, then tap <strong style={{ color: 'var(--neon-pink)' }}>Place Order</strong> to check out
            securely on our Square store.
          </p>
          <div className="hero-ctas">
            <OrderButton className="btn btn-primary" />
            <Link href="/kitchen" className="btn btn-secondary">See Full Kitchen Menu</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          {categories.map(({ key, label }) => {
            const items = foodItems.filter(i => i.cat === key);
            return (
              <div key={key} className="order-cat-section">
                <h2 className="order-cat-title">{label}</h2>
                <div className="order-item-grid">
                  {items.map(item => (
                    <div key={item.name} className="order-item-card" data-animate="">
                      <div className="order-item-top">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-price">{item.price}</div>
                      </div>
                      <p className="order-item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="order-checkout-bar" data-animate="">
            <div className="order-checkout-text">
              <div className="order-checkout-title">Ready to order?</div>
              <div className="order-checkout-sub">
                Click below to open our Square store — add items, choose pickup time, and pay securely.
              </div>
            </div>
            <OrderButton />
          </div>

          <p className="order-powered-note">
            🔒 Payments processed securely by{' '}
            <a href="https://squareup.com" target="_blank" rel="noopener noreferrer">Square</a>
            {' '}· Orders ready for pickup at the counter
          </p>
        </div>
      </section>
    </>
  );
}
