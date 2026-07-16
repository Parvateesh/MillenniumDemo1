import Link from 'next/link';

export const metadata = {
  title: 'Parties & Events — Millennium Bowl | North Little Rock, AR',
  description: 'Birthday parties and corporate events at Millennium Bowl. Packages from $179. 32 lanes, full catering, setup included — you just bring the people.',
};

export default function PartiesPage() {
  return (
    <>
      <section className="hero hero-md">
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
          <p className="section-lede">We have packages for every group size and budget. Email us for pricing, availability, and to hold your date.</p>

          <div className="event-types">
            <div className="event-card" data-animate="">
              <div className="event-card-bg">S</div>
              <span className="event-tag">Package 1</span>
              <h3>Spare Package</h3>
              <ul className="event-includes">
                <li>Lanes + bowling included</li>
                <li>Ideal for smaller groups</li>
                <li>Deposit required to reserve</li>
              </ul>
              <a className="btn btn-secondary" href="mailto:info@millenniumbowllr.com?subject=Birthday Party Inquiry — Spare Package">Email for Pricing →</a>
            </div>
            <div className="event-card featured" data-animate="">
              <div className="event-card-bg featured">S</div>
              <span className="event-tag featured">Package 2</span>
              <h3>Strike Package</h3>
              <ul className="event-includes">
                <li>Lanes + bowling included</li>
                <li>Great for larger groups</li>
                <li>Deposit required to reserve</li>
              </ul>
              <a className="btn btn-primary" href="mailto:info@millenniumbowllr.com?subject=Birthday Party Inquiry — Strike Package" data-confetti="">Email for Pricing →</a>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0 0', padding: '1.5rem', background: 'rgba(255,46,147,0.05)', border: '1px solid rgba(255,46,147,0.15)', borderRadius: '12px' }} data-animate="">
            <p style={{ color: 'var(--text-dim)', margin: '0 0 1rem', fontSize: '0.95rem' }}>
              Ready to book? Email us and we&apos;ll get back to you within 1 business day with pricing, availability, and everything you need to know.
            </p>
            <a className="btn btn-primary" href="mailto:info@millenniumbowllr.com?subject=Birthday Party Inquiry" data-confetti="">
              info@millenniumbowllr.com →
            </a>
            <p style={{ color: 'var(--text-dim)', margin: '1rem 0 0', fontSize: '0.85rem' }}>Or call us: (501) 791-9150</p>
          </div>

          <div className="corporate-section">
            <div className="section-eyebrow">For Your Office</div>
            <h2 className="section-title">Corporate <span className="accent">Events</span></h2>
            <p className="section-lede">Team-building, holiday parties, client outings, fundraisers. Ten people or two hundred — we&apos;ve done it. Email us for a custom quote.</p>
            <div className="event-types">
              <div className="event-card" data-animate="">
                <span className="event-tag">Half Buyout</span>
                <h3>Team Builder</h3>
                <ul className="event-includes">
                  <li>Up to 60 people</li>
                  <li>16 lanes for 2 hours</li>
                  <li>Shoes + house balls</li>
                  <li>Catered appetizer spread</li>
                  <li>Drink tickets included</li>
                </ul>
                <a className="btn btn-secondary" href="mailto:info@millenniumbowllr.com?subject=Corporate Event Inquiry — Team Builder">Email for Quote →</a>
              </div>
              <div className="event-card" data-animate="">
                <span className="event-tag">Full Buyout</span>
                <h3>Holiday Party</h3>
                <ul className="event-includes">
                  <li>Up to 120 people</li>
                  <li>All 32 lanes — exclusive use</li>
                  <li>3-hour event window</li>
                  <li>Full catering buffet</li>
                  <li>DJ + sound system included</li>
                </ul>
                <a className="btn btn-secondary" href="mailto:info@millenniumbowllr.com?subject=Corporate Event Inquiry — Holiday Party">Email for Quote →</a>
              </div>
              <div className="event-card" data-animate="">
                <span className="event-tag">Custom</span>
                <h3>Anything Else</h3>
                <ul className="event-includes">
                  <li>School field trips</li>
                  <li>Lock-ins (overnight)</li>
                  <li>Bachelor / bachelorette</li>
                  <li>Fundraisers + tournaments</li>
                  <li>Private gatherings</li>
                </ul>
                <a className="btn btn-secondary" href="mailto:info@millenniumbowllr.com?subject=Event Inquiry">Email Us →</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
