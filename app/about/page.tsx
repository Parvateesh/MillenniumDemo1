export const metadata = {
  title: 'About — Millennium Bowl',
};

export default function AboutPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: '40vh' }}>
        <div className="hero-content">
          <span className="hero-tag">Our Story</span>
          <h1><span className="word">Since</span> <span className="word">2003.</span></h1>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual" data-animate="">🎳</div>
            <div data-animate="">
              <div className="section-eyebrow">22 Years Strong</div>
              <h2 className="section-title">Where Central <span className="accent">Arkansas Bowls</span></h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>Millennium Bowl opened off the Maumelle exit in 2003 with a simple idea: a real bowling center should be more than just lanes. It should be where your kid had their seventh birthday party, where your team built itself on Tuesday nights, and where your Friday started.</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.7' }}>22 years later, we&apos;re still here. 32 lanes. A full bar. The only Ebonite Gold pro shop in central Arkansas. An F1 simulator nobody else has. And more than 1,000 Google reviews from the families, teams, and weekend warriors who keep coming back.</p>
              <div className="about-stats">
                <div><div className="about-stat-num" data-count="2003">0</div><div className="about-stat-label">Year founded</div></div>
                <div><div className="about-stat-num" data-count="32">0</div><div className="about-stat-label">Lanes</div></div>
                <div><div className="about-stat-num" data-count="1076">0</div><div className="about-stat-label">Google reviews</div></div>
                <div><div className="about-stat-num">12 AM</div><div className="about-stat-label">Open late nightly</div></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '6rem' }}>
            <div className="section-eyebrow">What Makes Us Different</div>
            <h2 className="section-title">Not Just Another <span className="accent">Bowling Alley</span></h2>
            <div className="experiences" style={{ marginTop: '2rem' }}>
              <div className="exp-card" data-animate=""><div className="exp-icon">🏁</div><h3>F1 Simulator</h3><p>Full-motion Formula 1 simulator. The only one in central Arkansas. Try it after your game.</p></div>
              <div className="exp-card" data-animate=""><div className="exp-icon">🏆</div><h3>Real Pro Shop</h3><p>Bowl 101 — Ebonite Gold Exclusive. 5.0 Google rating. Custom drilling and pro-level service.</p></div>
              <div className="exp-card" data-animate=""><div className="exp-icon">🌃</div><h3>Open Late</h3><p>Until 12 AM most nights. 2 AM Fridays and Saturdays. Latest hours of any bowling center in the metro.</p></div>
              <div className="exp-card" data-animate=""><div className="exp-icon">💰</div><h3>Honest Prices</h3><p>$2.99 Tuesday and Sunday games. $24.99 weekday lanes. No hidden fees. No surge pricing.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
