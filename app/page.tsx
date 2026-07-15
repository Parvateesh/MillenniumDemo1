import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="floating-pins">
          <div className="pin" title="Click me!" role="button" tabIndex={0}>🎳</div>
          <div className="pin" title="Click me!" role="button" tabIndex={0}>🎳</div>
          <div className="pin" title="Click me!" role="button" tabIndex={0}>🎳</div>
        </div>
        <div className="hero-content">
          <span className="hero-tag">Open Fri &amp; Sat Until 2 AM</span>
          <h1>
            <span className="word">Eat.</span>
            <span className="word">Drink.</span>
            <span className="word">Bowl.</span>
            <span className="word">Repeat.</span>
          </h1>
          <p className="lede">32 lanes. A full bar. Arcade games. F1 simulator. The only Ebonite Gold pro shop in central Arkansas. North Little Rock&apos;s home for Friday nights, kids&apos; birthdays, and corporate parties since 2003.</p>
          <div className="hero-deal-badge">
            <span className="hero-deal-dot" />
            <span>$2.99 per game every Tuesday &amp; Sunday — all day, walk-ins welcome</span>
            <span className="hero-deal-price">$2.99</span>
          </div>
          <div className="hero-ctas">
            <Link className="btn btn-primary" href="/book">Book a Lane <span className="btn-arrow">→</span></Link>
            <Link className="btn btn-secondary" href="/menu">View Menu <span className="btn-arrow">→</span></Link>
            <Link className="btn btn-ghost" href="/parties">Plan a Party</Link>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-num" data-count="32">0</div><div className="hero-stat-label">Lanes</div></div>
            <div><div className="hero-stat-num" data-count="22">0</div><div className="hero-stat-label">Years Strong</div></div>
            <div><div className="hero-stat-num" data-count="4.2" data-suffix="★">0</div><div className="hero-stat-label">1,076 Reviews</div></div>
            <div><div className="hero-stat-num">2 AM</div><div className="hero-stat-label">Fri/Sat Late</div></div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-inner">
          {[0, 1].map((i) => (
            <span key={i}>
              <b>Shuffle Board</b><span className="marquee-sep">◆</span>
              <b>Foosball</b><span className="marquee-sep">◆</span>
              <b>Air Hockey</b><span className="marquee-sep">◆</span>
              <b>Pool</b><span className="marquee-sep">◆</span>
              <b>Fresh Kitchen</b><span className="marquee-sep">◆</span>
              <b>Bar</b><span className="marquee-sep">◆</span>
              <b>32 Lanes</b><span className="marquee-sep">◆</span>
              <b>Arcade</b><span className="marquee-sep">◆</span>
            </span>
          ))}
        </div>
      </div>

      <section className="block">
        <div className="container">
          <div className="section-eyebrow">What&apos;s Inside</div>
          <h2 className="section-title">More Than Just <span className="accent">Bowling</span></h2>
          <p className="section-lede">Five reasons this is the best entertainment center in central Arkansas — and why people drive in from Little Rock, Maumelle, Sherwood, and Cabot every weekend.</p>
          <div className="experiences">
            <div className="exp-card" data-animate=""><div className="exp-icon">🎳</div><h3>32 Pro Lanes</h3><p>State-of-the-art automatic scoring, glow lighting, kid bumpers, league-grade equipment. Casual or competitive — pick your vibe.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🍻</div><h3>Full Bar</h3><p>Cold beer on tap, handcrafted cocktails, premium spirits. Happy hour weeknights. 21+ after 10 PM Fridays and Saturdays.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🕹️</div><h3>Arcade &amp; F1 Sim</h3><p>Pool tables, shuffleboard, skee-ball, classic and modern arcade games. Plus a full Formula 1 racing simulator nobody else in the metro has.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🎉</div><h3>Private Parties</h3><p>Birthday packages from $179. Corporate buyouts. School field trips. Lock-ins. We handle setup, food, and the fun — you just show up.</p></div>
            <div className="exp-card" data-animate=""><div className="exp-icon">🏆</div><h3>Bowl 101 Pro Shop</h3><p>The only Ebonite Gold Exclusive pro shop in central Arkansas. Custom drilling, expert fitting, all major brands. Ranked 5.0 on Google.</p></div>
          </div>
        </div>
      </section>

      <section className="block pricing-section">
        <div className="container">
          <div className="section-eyebrow">Honest Pricing</div>
          <h2 className="section-title">Roll For As Little As <span className="accent">$2.99</span></h2>
          <p className="section-lede">No hidden fees. No surge pricing. What you see is what you pay.</p>
          <div className="pricing-grid">
            <div className="price-card featured" data-animate="">
              <div className="price-day">Tuesday + Sunday</div>
              <div className="price-amount">$2.99</div>
              <div className="price-unit">per game / per person — all day</div>
              <ul className="price-features"><li>All skill levels welcome</li><li>Shoe rental: $4.50</li><li>No reservation needed</li><li>Walk-in priority</li></ul>
            </div>
<div className="price-card" data-animate="">
              <div className="price-day">Lane Rental</div>
              <div className="price-amount">$33<span className="price-sub">.99</span></div>
              <div className="price-unit">per lane / per hour</div>
              <ul className="price-features"><li>Up to 6 bowlers per lane</li><li>Shoe rental: $4.50</li><li>Party bookings available</li><li>Open late Fri &amp; Sat to 2 AM</li></ul>
            </div>
          </div>
          <div className="pricing-perks" data-animate="">
            <div className="pricing-perk"><span>🎳</span> All skill levels welcome — beginner to pro</div>
            <div className="pricing-perk"><span>🍕</span> Snack bar with pizza, drinks, and more</div>
            <div className="pricing-perk"><span>🎉</span> Party bookings for birthdays &amp; events</div>
            <div className="pricing-perk"><span>👟</span> Shoe rental $4.50</div>
          </div>
        </div>
      </section>


      <section className="reviews-strip">
        <div className="container">
          <div className="section-eyebrow">Loved By Locals</div>
          <h2 className="section-title">1,076 Google <span className="accent">Reviews</span></h2>
          <div className="google-badge"><span className="stars">★★★★½</span><span>4.2 / 5 on Google · 22 years in NLR</span></div>
          <div className="reviews-grid">
            <div className="review-card" data-animate=""><div className="review-stars">★★★★★</div><p className="review-text">&quot;Such a fun time for our 4 yr old&apos;s birthday. Bowling, pizza, ice cream… what more could you want! The arcade is also a big hit, naturally. Would recommend.&quot;</p><div className="review-author">— Birthday Party Family</div></div>
            <div className="review-card" data-animate=""><div className="review-stars">★★★★★</div><p className="review-text">&quot;The staff is warm and welcoming. The pizza was really quite delicious. Steven at the concessions bar goes the extra mile to be helpful. Definitely will return.&quot;</p><div className="review-author">— Returning Regular</div></div>
            <div className="review-card" data-animate=""><div className="review-stars">★★★★★</div><p className="review-text">&quot;Great place for our school&apos;s field trip. Kids had a blast! The team made setup easy and everyone was on a lane and bowling within minutes.&quot;</p><div className="review-author">— Sherwood Elementary Teacher</div></div>
          </div>
        </div>
      </section>
    </>
  );
}
