import Link from 'next/link';
import StrikeEngine from '@/components/StrikeEngine';

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
          <h2 className="section-title">2025/2026 Winter <span className="accent">Season</span></h2>
          <p className="section-lede">Sign up at the front desk or call <a href="tel:5017919150">(501) 791-9150</a>. League members get pro shop discounts and priority lane access during prime time.</p>
          <div className="league-table" data-animate="">
            <div className="league-row header">
              <div>League</div>
              <div>Day &amp; Start Time</div>
              <div>Team Type</div>
              <div>Starts</div>
              <div></div>
            </div>

            {/* Monday */}
            <div className="league-row">
              <div className="league-name">Millennium 1st</div>
              <div className="league-day">Mon · 6:30 PM</div>
              <div>4 person</div>
              <div><span className="league-status status-open">Aug 3</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Ball Buster</div>
              <div className="league-day">Mon · 7:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 10</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Corps of Engineering</div>
              <div className="league-day">Mon · 6:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 7</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>

            {/* Tuesday */}
            <div className="league-row">
              <div className="league-name">Tuesday 4 League</div>
              <div className="league-day">Tue · 9:30 AM</div>
              <div>Ladies</div>
              <div><span className="league-status status-open">Aug 11</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Tuesday Mixed 4 Some</div>
              <div className="league-day">Tue · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 4</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Tuesday Nite Mixed</div>
              <div className="league-day">Tue · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 4</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>

            {/* Wednesday */}
            <div className="league-row">
              <div className="league-name">Lakeview Ladies</div>
              <div className="league-day">Wed · 9:30 AM</div>
              <div>Ladies</div>
              <div><span className="league-status status-open">Aug 12</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Wednesday Mixed Classic</div>
              <div className="league-day">Wed · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 5</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Millennium Mixed</div>
              <div className="league-day">Wed · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 12</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>

            {/* Thursday */}
            <div className="league-row">
              <div className="league-name">Sr League</div>
              <div className="league-day">Thu · 11:00 AM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 14</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Falcon Jet</div>
              <div className="league-day">Thu · 6:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 7</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
            <div className="league-row">
              <div className="league-name">Roosevelt Mixed</div>
              <div className="league-day">Thu · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 6</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>

            {/* Saturday */}
            <div className="league-row">
              <div className="league-name">Saturday Youth</div>
              <div className="league-day">Sat · 10:00 AM</div>
              <div>Youth</div>
              <div><span className="league-status status-soon">Sep 12</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>

            {/* Sunday */}
            <div className="league-row">
              <div className="league-name">Sunday Night Mixed</div>
              <div className="league-day">Sun · 6:30 PM</div>
              <div>3 person (1 any sex)</div>
              <div><span className="league-status status-open">Aug 16</span></div>
              <div><Link className="btn-mini" href="/account/leagues">Join</Link></div>
            </div>
          </div>
          <div className="league-cta">
            <p>Want to start your own league or have questions about an existing one?</p>
            <Link className="btn btn-primary" href="/contact">Talk to League Coordinator →</Link>
            <StrikeEngine />
          </div>
        </div>
      </section>
    </>
  );
}
