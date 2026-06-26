import Link from 'next/link';

export const metadata = {
  title: 'Leagues — Millennium Bowl',
};

export default function LeaguesPage() {
  return (
    <>
      <section className="hero hero-md">
        <div className="hero-content">
          <span className="hero-tag">Leagues + Tournaments</span>
          <h1><span className="word">Roll</span> <span className="word">With</span> <span className="word">Us.</span></h1>
          <p className="lede">Whether you&apos;ve never bowled a real game or you&apos;re carrying a 200 average, we&apos;ve got a league for you. Friendly competition, prize pools, and a community that&apos;s been bowling together for 22 years.</p>
        </div>
      </section>
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">Current Leagues</div>
          <h2 className="section-title">2026 Spring <span className="accent">Schedule</span></h2>
          <p className="section-lede">Sign up at the front desk or online. Most leagues run 16 weeks with weekly play. League members get pro shop discounts and the back lanes during prime time.</p>
          <div className="league-table" data-animate="">
            <div className="league-row header"><div>League</div><div>Day &amp; Time</div><div>Skill Level</div><div>Status</div><div></div></div>
            <div className="league-row"><div className="league-name">Monday Mixed</div><div className="league-day">Mon · 7:00 PM</div><div>All levels</div><div><span className="league-status status-open">Open</span></div><div><Link className="btn-mini" href="/book">Join</Link></div></div>
            <div className="league-row"><div className="league-name">Tuesday Senior Strikes</div><div className="league-day">Tue · 10:00 AM</div><div>55+</div><div><span className="league-status status-open">Open</span></div><div><Link className="btn-mini" href="/book">Join</Link></div></div>
            <div className="league-row"><div className="league-name">Wednesday Classic</div><div className="league-day">Wed · 7:00 PM</div><div>Sanctioned</div><div><span className="league-status status-soon">Starts 5/14</span></div><div><Link className="btn-mini" href="/book">Join</Link></div></div>
            <div className="league-row"><div className="league-name">Thursday Ladies</div><div className="league-day">Thu · 6:30 PM</div><div>All levels</div><div><span className="league-status status-full">Waitlist</span></div><div><Link className="btn-mini" href="/book">Waitlist</Link></div></div>
            <div className="league-row"><div className="league-name">Saturday Youth (8–17)</div><div className="league-day">Sat · 10:00 AM</div><div>Youth</div><div><span className="league-status status-open">Open</span></div><div><Link className="btn-mini" href="/book">Join</Link></div></div>
            <div className="league-row"><div className="league-name">Sunday Scotch Doubles</div><div className="league-day">Sun · 6:00 PM</div><div>Couples / Pairs</div><div><span className="league-status status-open">Open</span></div><div><Link className="btn-mini" href="/book">Join</Link></div></div>
          </div>
          <div className="league-cta">
            <p>Want to start your own league? Got a question about an existing one?</p>
            <Link className="btn btn-primary" href="/contact">Talk to League Coordinator →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
