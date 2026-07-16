import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Millennium Bowl | North Little Rock, AR',
  description: 'Millennium Bowl has been North Little Rock\'s home for bowling since 2003. 32 lanes, full bar, F1 simulator, and the only Ebonite Gold pro shop in central Arkansas.',
};

export default function AboutPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Our Story</span>
          <h1><span className="word">Since</span> <span className="word">2003.</span></h1>
        </div>
      </section>

      {/* Story */}
      <section className="block">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual" data-animate="">🎳</div>
            <div data-animate="">
              <div className="section-eyebrow">23 Years Strong</div>
              <h2 className="section-title">Where Central <span className="accent">Arkansas Bowls</span></h2>
              <p className="about-text">Millennium Bowl opened off the Maumelle exit in 2003 with a simple idea: a real bowling center should be more than just lanes. It should be where your kid had their seventh birthday party, where your team built itself on Tuesday nights, and where your Friday started.</p>
              <p className="about-text">23 years later, we&apos;re still here. 32 lanes. A full bar. The only Ebonite Gold pro shop in central Arkansas. An F1 simulator nobody else has. And 1,076 Google reviews from the families, teams, and weekend warriors who keep coming back.</p>
              <div className="about-stats">
                <div><div className="about-stat-num">2003</div><div className="about-stat-label">Year founded</div></div>
                <div><div className="about-stat-num" data-count="32">0</div><div className="about-stat-label">Lanes</div></div>
                <div><div className="about-stat-num" data-count="1076">0</div><div className="about-stat-label">Google reviews</div></div>
                <div><div className="about-stat-num">2 AM</div><div className="about-stat-label">Fri &amp; Sat Late</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="events-notify-inner" data-animate="">
            <div>
              <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
                Come <span className="accent">Bowl With Us</span>
              </h3>
              <p style={{ color: 'var(--text-dim)', maxWidth: '480px', lineHeight: 1.6 }}>
                Off the Maumelle exit in North Little Rock. Open 7 days a week — walk-ins always welcome.
              </p>
            </div>
            <div className="events-notify-actions">
              <Link className="btn btn-primary" href="/contact">Get in Touch <span className="btn-arrow">→</span></Link>
              <a className="btn btn-ghost" href="https://maps.google.com/?q=7200+Counts+Massie+Rd,+North+Little+Rock,+AR+72113" target="_blank" rel="noopener noreferrer">Get Directions</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
