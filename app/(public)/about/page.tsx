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
              <div className="section-eyebrow">22 Years Strong</div>
              <h2 className="section-title">Where Central <span className="accent">Arkansas Bowls</span></h2>
              <p className="about-text">Millennium Bowl opened off the Maumelle exit in 2003 with a simple idea: a real bowling center should be more than just lanes. It should be where your kid had their seventh birthday party, where your team built itself on Tuesday nights, and where your Friday started.</p>
              <p className="about-text">22 years later, we&apos;re still here. 32 lanes. A full bar. The only Ebonite Gold pro shop in central Arkansas. An F1 simulator nobody else has. And more than 1,000 Google reviews from the families, teams, and weekend warriors who keep coming back.</p>
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

      {/* Hours + Contact */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-eyebrow">Visit Us</div>
          <h2 className="section-title">Find Us in <span className="accent">North Little Rock</span></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item" data-animate="">
                <span className="contact-icon">📍</span>
                <div>
                  <div className="contact-label">Address</div>
                  <div className="contact-value">
                    <a href="https://maps.google.com/?q=7200+Counts+Massie+Rd,+North+Little+Rock,+AR+72113" target="_blank" rel="noopener noreferrer">
                      7200 Counts Massie Rd<br />North Little Rock, AR 72113
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-item" data-animate="">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value"><a href="tel:5017919150">(501) 791-9150</a></div>
                </div>
              </div>
              <div className="contact-item" data-animate="">
                <span className="contact-icon">✉️</span>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value"><a href="mailto:info@millenniumbowllr.com">info@millenniumbowllr.com</a></div>
                </div>
              </div>
              <div className="contact-item" data-animate="">
                <span className="contact-icon">🏆</span>
                <div>
                  <div className="contact-label">Pro Shop — Bowl 101</div>
                  <div className="contact-value"><a href="tel:5013532749">(501) 353-2749</a></div>
                </div>
              </div>
            </div>

            <div data-animate="">
              <ul className="hours-list">
                <li><span className="day">Mon – Thu</span><span>9 AM – 12 AM</span></li>
                <li><span className="day">Friday</span><span>9 AM – 2 AM</span></li>
                <li><span className="day">Saturday</span><span>9 AM – 2 AM</span></li>
                <li><span className="day">Sunday</span><span>10 AM – 12 AM</span></li>
              </ul>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href="tel:5017919150">Call Us <span className="btn-arrow">→</span></a>
                <Link className="btn btn-ghost" href="/contact">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
