import Link from 'next/link';

export const metadata = {
  title: 'Pro Shop — Millennium Bowl',
};

export default function ProShopPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Bowl 101 — Inside Millennium</span>
          <h1><span className="word">Real</span> <span className="word">Pro</span> <span className="word">Shop.</span></h1>
          <p className="lede">Most family fun centers don&apos;t have one. We do — and it&apos;s the only Ebonite Gold Exclusive pro shop in central Arkansas. Custom drilling, expert fitting, all the major brands.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="pro-shop-hero" data-animate="">
            <div className="gold-badge">★ Ebonite Gold Exclusive</div>
            <h2 className="section-title">Brian Kennedy <span className="accent">&amp; the Bowl 101 Team</span></h2>
            <p className="pro-shop-desc">5.0 stars on Google. Certified specialists for Columbia, Hammer, Track, Ebonite, and Turbo. Whether you&apos;re picking up your first ball or adjusting your arsenal for league night, this is where you go.</p>

            {/* Online store CTA */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(184,129,30,0.12), rgba(184,129,30,0.05))',
              border: '1px solid rgba(184,129,30,0.35)',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              margin: '2rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-bowlby, "Bowlby One", cursive)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                  Shop Online at Bowl101.net
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', margin: 0 }}>
                  Balls, bags, shoes, accessories — order online and pick up in-store at Millennium Bowl.
                </p>
              </div>
              <a
                href="/api/proshop/redirect"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                🛒 Visit Bowl101.net →
              </a>
            </div>

            <div className="pro-shop-actions">
              <a className="btn btn-primary" href="tel:5013532749">📞 Call Bowl 101</a>
              <Link className="btn btn-secondary" href="/contact">Schedule Fitting →</Link>
            </div>
            <div className="brands-grid">
              <div className="brand-tile">Ebonite</div><div className="brand-tile">Hammer</div><div className="brand-tile">Columbia</div><div className="brand-tile">Track</div>
              <div className="brand-tile">Turbo</div><div className="brand-tile">Storm</div><div className="brand-tile">Roto Grip</div><div className="brand-tile">Brunswick</div>
            </div>
          </div>
          <div className="experiences pro-shop-services">
            <div className="exp-card" data-animate=""><div className="exp-icon">🎳</div><h3>Custom Drilling</h3><p>Precision drilling tailored to your hand, span, and release. Standard 3-day turnaround.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">📏</div><h3>Expert Fitting</h3><p>Free fittings during open hours. We measure, you bowl, we adjust until it&apos;s perfect.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🛠️</div><h3>Resurfacing &amp; Repair</h3><p>Surface adjustments, plug-and-redrill, urethane repair. Keep your ball performing.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">👟</div><h3>Shoes &amp; Accessories</h3><p>Performance shoes, bags, towels, grips, tape, polish, cleaner. Everything you need.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
