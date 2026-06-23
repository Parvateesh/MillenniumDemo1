import Link from 'next/link';

export const metadata = {
  title: 'Parties & Events — Millennium Bowl',
};

export default function PartiesPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <span className="hero-tag">Birthday + Corporate Events</span>
          <h1><span className="word">Throw</span> <span className="word">It</span> <span className="word">Here.</span></h1>
          <p className="lede">From 6-year-old birthday parties to 60-person corporate buyouts, our event team handles the food, the lanes, the setup, and the cleanup. You just bring the people.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">Pick Your Package</div>
          <h2 className="section-title">Birthday <span className="accent">Packages</span></h2>
          <p className="section-lede">Three tiers, all with bowling, shoes, food, and a dedicated party host. Add-ons: glow bowl, F1 simulator, arcade cards, custom cake.</p>
          <div className="event-types">
            <div className="event-card" data-animate="">
              <div className="event-card-bg">B</div>
              <span className="event-tag">Bronze</span>
              <h3>Strike Package</h3>
              <div className="event-price">$179 / 8 kids</div>
              <ul className="event-includes"><li>2 lanes for 90 minutes</li><li>Shoe rental for everyone</li><li>1 large pizza + drinks</li><li>Reserved party table</li><li>Dedicated party host</li></ul>
              <Link className="btn btn-secondary" href="/book">Reserve →</Link>
            </div>
            <div className="event-card" data-animate="" style={{ borderColor: 'var(--neon-pink)', boxShadow: '0 0 30px rgba(255,46,147,0.2)' }}>
              <div className="event-card-bg" style={{ color: 'var(--neon-pink)' }}>S</div>
              <span className="event-tag" style={{ color: 'var(--neon-pink)', borderColor: 'var(--neon-pink)' }}>Silver — Most Popular</span>
              <h3>Spare Package</h3>
              <div className="event-price">$249 / 12 kids</div>
              <ul className="event-includes"><li>3 lanes for 2 hours</li><li>Shoe rental for everyone</li><li>2 large pizzas + unlimited drinks</li><li>Arcade game card ($5/kid)</li><li>Reserved party room</li><li>Goodie bags</li></ul>
              <Link className="btn btn-primary" href="/book" data-confetti="">Reserve →</Link>
            </div>
            <div className="event-card" data-animate="">
              <div className="event-card-bg">G</div>
              <span className="event-tag">Gold</span>
              <h3>Turkey Package</h3>
              <div className="event-price">$399 / 16 kids</div>
              <ul className="event-includes"><li>4 lanes for 2.5 hours</li><li>Shoe rental for everyone</li><li>3 large pizzas + unlimited drinks</li><li>Arcade card ($10/kid) + F1 sim slot</li><li>Private party room</li><li>Custom birthday cake included</li><li>Goodie bags + party favors</li></ul>
              <Link className="btn btn-secondary" href="/book">Reserve →</Link>
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <div className="section-eyebrow">For Your Office</div>
            <h2 className="section-title">Corporate <span className="accent">Events</span></h2>
            <p className="section-lede">Team-building, holiday parties, client outings, fundraisers. Ten people or two hundred — we&apos;ve done it.</p>
            <div className="event-types">
              <div className="event-card" data-animate="">
                <span className="event-tag">Half Buyout</span><h3>Team Builder</h3>
                <div className="event-price">$799 / up to 60 people</div>
                <ul className="event-includes"><li>16 lanes for 2 hours</li><li>Shoes + house balls</li><li>Catered appetizer spread</li><li>Drink tickets included</li><li>Reserved AV setup</li></ul>
                <Link className="btn btn-secondary" href="/contact">Get Quote →</Link>
              </div>
              <div className="event-card" data-animate="">
                <span className="event-tag">Full Buyout</span><h3>Holiday Party</h3>
                <div className="event-price">$1,499 / up to 120 people</div>
                <ul className="event-includes"><li>All 32 lanes — exclusive use</li><li>3-hour event window</li><li>Full catering buffet</li><li>Open bar add-on available</li><li>DJ + sound system included</li></ul>
                <Link className="btn btn-secondary" href="/contact">Get Quote →</Link>
              </div>
              <div className="event-card" data-animate="">
                <span className="event-tag">Custom</span><h3>Anything Else</h3>
                <div className="event-price">Tell us what you need</div>
                <ul className="event-includes"><li>School field trips</li><li>Lock-ins (overnight)</li><li>Bachelor / bachelorette</li><li>Fundraisers + tournaments</li><li>Private gatherings</li></ul>
                <Link className="btn btn-secondary" href="/contact">Talk To Us →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
