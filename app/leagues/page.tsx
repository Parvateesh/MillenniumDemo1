import Link from 'next/link';
import StrikeEngine from '@/components/StrikeEngine';
import LeagueLeaderboard from '@/components/LeagueLeaderboard';
import TournamentBracket from '@/components/TournamentBracket';
import LeagueSignupForm from '@/components/LeagueSignupForm';

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

      {/* League Schedule */}
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">Current Leagues</div>
          <h2 className="section-title">2026/2027 Winter <span className="accent">Season</span></h2>
          <p className="section-lede">Sign up at the front desk or use the form below. League members get pro shop discounts and priority lane access during prime time.</p>
          <div className="league-table" data-animate="">
            <div className="league-row header">
              <div>League</div>
              <div>Day &amp; Start Time</div>
              <div>Team Type</div>
              <div>Starts</div>
              <div></div>
            </div>
            <div className="league-row">
              <div className="league-name">Millennium 1st</div>
              <div className="league-day">Mon · 6:30 PM</div>
              <div>4 person</div>
              <div><span className="league-status status-open">Aug 3</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Ball Buster</div>
              <div className="league-day">Mon · 7:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 10</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Corps of Engineering</div>
              <div className="league-day">Mon · 6:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 7</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Tuesday 4 League</div>
              <div className="league-day">Tue · 9:30 AM</div>
              <div>Ladies</div>
              <div><span className="league-status status-open">Aug 11</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Tuesday Mixed 4 Some</div>
              <div className="league-day">Tue · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 4</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Tuesday Nite Mixed</div>
              <div className="league-day">Tue · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 4</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Lakeview Ladies</div>
              <div className="league-day">Wed · 9:30 AM</div>
              <div>Ladies</div>
              <div><span className="league-status status-open">Aug 12</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Wednesday Mixed Classic</div>
              <div className="league-day">Wed · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 5</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Millennium Mixed</div>
              <div className="league-day">Wed · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 12</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Sr League</div>
              <div className="league-day">Thu · 11:00 AM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 14</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Falcon Jet</div>
              <div className="league-day">Thu · 6:00 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 7</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Roosevelt Mixed</div>
              <div className="league-day">Thu · 6:30 PM</div>
              <div>Any mix</div>
              <div><span className="league-status status-open">Aug 6</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Saturday Youth</div>
              <div className="league-day">Sat · 10:00 AM</div>
              <div>Youth</div>
              <div><span className="league-status status-soon">Sep 12</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
            <div className="league-row">
              <div className="league-name">Sunday Night Mixed</div>
              <div className="league-day">Sun · 6:30 PM</div>
              <div>3 person (1 any sex)</div>
              <div><span className="league-status status-open">Aug 16</span></div>
              <div><a className="btn-mini" href="#join">Join</a></div>
            </div>
          </div>

          <StrikeEngine />
        </div>
      </section>

      {/* Live Leaderboard */}
      <section className="block" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-eyebrow">Season Standings</div>
          <h2 className="section-title">Who&apos;s <span className="accent">On Top</span></h2>
          <p className="section-lede">Live standings updated every week after league play. See your team climb the board.</p>
          <LeagueLeaderboard />
        </div>
      </section>

      {/* Tournament Bracket */}
      <section className="block" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-eyebrow">Summer Tournament 2026</div>
          <h2 className="section-title">The <span className="accent">Bracket</span></h2>
          <p className="section-lede">Single elimination. 8 teams. $1,800 prize pool. One champion.</p>
          <TournamentBracket />
        </div>
      </section>

      {/* Join a League form */}
      <section className="block" id="join" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-eyebrow">Get in the Game</div>
          <h2 className="section-title">Join a <span className="accent">League</span></h2>
          <p className="section-lede">Fill out the form and our league coordinator will reach out within 2 business days to confirm your spot and night.</p>

          <div className="league-join-grid">
            {/* Perks */}
            <div className="league-perks">
              <h3 className="league-perks-title">Why bowl in a league?</h3>
              <div className="league-perk"><span className="league-perk-icon">🎳</span><div><strong>Priority lane access</strong><p>League bowlers get first pick during prime time hours.</p></div></div>
              <div className="league-perk"><span className="league-perk-icon">🏆</span><div><strong>Season prize pools</strong><p>Cash payouts at the end of each season for top teams.</p></div></div>
              <div className="league-perk"><span className="league-perk-icon">🛒</span><div><strong>Pro shop discount</strong><p>10% off everything at Bowl 101 for active league members.</p></div></div>
              <div className="league-perk"><span className="league-perk-icon">📈</span><div><strong>Track your average</strong><p>Your handicap is tracked and updated every week.</p></div></div>
              <div className="league-perk"><span className="league-perk-icon">🤝</span><div><strong>Community</strong><p>Same lanes, same faces, 22+ years of Friday night legends.</p></div></div>
            </div>

            {/* Form */}
            <div className="league-form-wrap">
              <LeagueSignupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
