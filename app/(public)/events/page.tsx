import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events — Millennium Bowl | North Little Rock, AR',
  description: 'Glow Bowl nights, $2.99 game days, league nights, and private events at Millennium Bowl in North Little Rock. Something happening every night of the week.',
};

export default function EventsPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Something Every Night</span>
          <h1>
            <span className="word">Bowl.</span>{' '}
            <span className="word">Glow.</span>{' '}
            <span className="word">Win.</span>
          </h1>
          <p className="lede">
            From $2.99 game days to Glow Bowl Fridays to league nights — there&apos;s always something going on at Millennium Bowl.
          </p>
        </div>
      </section>

      {/* Recurring Weekly Events */}
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">Every Week</div>
          <h2 className="section-title">Weekly <span className="accent">Happenings</span></h2>
          <p className="section-lede">These run every week, no ticket required. Just show up.</p>

          <div className="recurring-grid" data-animate="">
            <div className="recurring-card">
              <span className="recurring-emoji">🪩</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">Fri &amp; Sat</span>
                  <span className="recurring-time">After 9 PM</span>
                </div>
                <div className="recurring-title">Glow Bowl Night</div>
                <p className="recurring-desc">Black lights, neon pins, and music turned up. Walk-ins welcome — lanes fill fast on weekends so call ahead.</p>
              </div>
            </div>

            <div className="recurring-card">
              <span className="recurring-emoji">💰</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">Tue &amp; Sun</span>
                  <span className="recurring-time">All Day</span>
                </div>
                <div className="recurring-title">$2.99 Game Day</div>
                <p className="recurring-desc">Just $2.99 per game — no coupon needed, no limit. Our best deal of the week, every week.</p>
              </div>
            </div>

            <div className="recurring-card">
              <span className="recurring-emoji">🎳</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">Mon – Sun</span>
                  <span className="recurring-time">Various Times</span>
                </div>
                <div className="recurring-title">League Nights</div>
                <p className="recurring-desc">14 active leagues running this season across all skill levels — from ladies daytime to competitive mixed nights.</p>
              </div>
            </div>

            <div className="recurring-card">
              <span className="recurring-emoji">🍻</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">Mon – Fri</span>
                  <span className="recurring-time">Until 7 PM</span>
                </div>
                <div className="recurring-title">Happy Hour</div>
                <p className="recurring-desc">Discounted drinks at the bar on weeknights. Bowl a game, grab a beer — that&apos;s a Tuesday.</p>
              </div>
            </div>

            <div className="recurring-card">
              <span className="recurring-emoji">🕹️</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">Every Day</span>
                  <span className="recurring-time">All Hours</span>
                </div>
                <div className="recurring-title">Arcade &amp; F1 Simulator</div>
                <p className="recurring-desc">Open whenever we are. Pool, shuffleboard, skee-ball, and the only Formula 1 racing simulator in central Arkansas.</p>
              </div>
            </div>

            <div className="recurring-card">
              <span className="recurring-emoji">🎂</span>
              <div>
                <div className="recurring-when">
                  <span className="recurring-day">By Appointment</span>
                </div>
                <div className="recurring-title">Birthday Parties</div>
                <p className="recurring-desc">Packages starting at $179 with lanes, food, and setup included. Book any day of the week.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Events CTA */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-eyebrow">Special Events</div>
          <h2 className="section-title">Tournaments &amp; <span className="accent">More</span></h2>
          <p className="section-lede">We run tournaments, charity nights, and holiday specials throughout the year. The best way to stay in the loop is to follow us on Facebook or give us a call.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              className="btn btn-primary"
              href="https://www.facebook.com/share/1FysjXKbLz/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Facebook <span className="btn-arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="tel:5017919150">(501) 791-9150</a>
          </div>
        </div>
      </section>

      {/* Plan a Party CTA */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="events-notify-inner" data-animate="">
            <div>
              <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
                Planning a <span className="accent">Private Event?</span>
              </h3>
              <p style={{ color: 'var(--text-dim)', maxWidth: '480px', lineHeight: 1.6 }}>
                Birthday parties, corporate outings, school groups, team nights — we handle lanes, food, and setup. Just tell us the headcount.
              </p>
            </div>
            <div className="events-notify-actions">
              <Link className="btn btn-primary" href="/parties">See Party Packages <span className="btn-arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/contact">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
