import Link from 'next/link';

export const metadata = {
  title: 'Parties & Events — Millennium Bowl',
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
          <p className="section-lede">Two packages to choose from. $25 deposit required to hold your date. Extra guests welcome — just $11.99 or $13.99 per additional person.</p>
          <div className="event-types">
            <div className="event-card" data-animate="">
              <div className="event-card-bg">S</div>
              <span className="event-tag">Package 1</span>
              <h3>Spare Package</h3>
              <div className="event-price">$240</div>
              <ul className="event-includes"><li>Lanes + bowling included</li><li>Extra person: $11.99 each</li><li>$25 deposit to reserve</li></ul>
              <Link className="btn btn-secondary" href="/contact">Reserve →</Link>
            </div>
            <div className="event-card featured" data-animate="">
              <div className="event-card-bg featured">S</div>
              <span className="event-tag featured">Package 2</span>
              <h3>Strike Package</h3>
              <div className="event-price">$280</div>
              <ul className="event-includes"><li>Lanes + bowling included</li><li>Extra person: $13.99 each</li><li>$25 deposit to reserve</li></ul>
              <Link className="btn btn-primary" href="/contact" data-confetti="">Reserve →</Link>
            </div>
          </div>

          <div className="corporate-section">
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
