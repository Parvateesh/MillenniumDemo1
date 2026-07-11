import Link from 'next/link';

export const metadata = { title: 'Events — Millennium Bowl' };

const events = [
  {
    month: 'JUL',
    day: '18',
    weekday: 'FRI',
    tag: 'Trivia Night',
    tagColor: 'cyan',
    title: 'Trivia & Bowl',
    desc: 'Six rounds of trivia — sports, music, pop culture — between frames. Teams of up to 6. Cash prizes for 1st and 2nd place. No reservation required.',
    time: '7 PM – 10 PM',
    detail: 'Lanes + Bar Open',
    href: '/book',
    cta: 'Grab a Lane →',
    featured: false,
  },
  {
    month: 'JUL',
    day: '25',
    weekday: 'SAT',
    tag: 'Tournament',
    tagColor: 'yellow',
    title: 'Summer Classic Finals',
    desc: 'The final two teams of the 2026 Summer Classic face off. 8-team bracket, $1,800 prize pool, single elimination. Come watch — spectators welcome.',
    time: '2 PM – 6 PM',
    detail: 'Free to watch · Lanes 1–8 reserved',
    href: '/leagues',
    cta: 'See the Bracket →',
    featured: true,
  },
  {
    month: 'AUG',
    day: '1',
    weekday: 'SAT',
    tag: 'Glow Bowl',
    tagColor: 'pink',
    title: 'End-of-Summer Cosmic Night',
    desc: 'UV blacklights, neon face paint station, fog machine, and a DJ from 9 PM. Our biggest Glow Bowl event of the year. Tickets sell fast.',
    time: '9 PM – 2 AM',
    detail: '21+ after midnight',
    href: '/book',
    cta: 'Book Lanes →',
    featured: false,
  },
  {
    month: 'AUG',
    day: '9',
    weekday: 'SAT',
    tag: 'Family',
    tagColor: 'cyan',
    title: 'Family Fun Day',
    desc: 'Kids 12 and under bowl free all day with a paying adult. Arcade tokens included with every lane booking. Face painting and a photo booth in the lobby.',
    time: '11 AM – 6 PM',
    detail: 'Kids 12 & under free with adult',
    href: '/book',
    cta: 'Reserve a Lane →',
    featured: false,
  },
  {
    month: 'SEP',
    day: '5',
    weekday: 'SAT',
    tag: 'Special Event',
    tagColor: 'yellow',
    title: 'Labor Day Lock-In',
    desc: 'All 32 lanes open from 10 PM to 4 AM. Flat rate: $12/person covers shoes and unlimited bowling. Bar open all night. 21+ only after 10 PM.',
    time: '10 PM – 4 AM',
    detail: '$12/person · All 32 lanes',
    href: '/book',
    cta: 'Get Tickets →',
    featured: false,
  },
  {
    month: 'DEC',
    day: '31',
    weekday: 'THU',
    tag: 'New Year\'s Eve',
    tagColor: 'pink',
    title: 'NYE Cosmic Bowl 2027',
    desc: 'Ring in 2027 on the lanes. Champagne toast at midnight, DJ, photo booth, and glow bowl all night. VIP tables available. This one books out by October.',
    time: '9 PM – 3 AM',
    detail: 'Tickets required · 21+',
    href: '/contact',
    cta: 'Inquire Now →',
    featured: false,
  },
];

const recurring = [
  { emoji: '🪩', day: 'Every Friday', time: '9 PM – 2 AM', title: 'Glow Bowl Night', desc: 'UV lights, neon, music up.' },
  { emoji: '🎳', day: 'Tue + Sun', time: 'All Day', title: '$2.99 Bowl Day', desc: 'Per game, per person. Walk-ins welcome.' },
  { emoji: '🏆', day: 'Mon – Thu', time: 'Various', title: 'League Nights', desc: '14 active leagues. New season starts Aug.' },
  { emoji: '👦', day: 'Every Saturday', time: '10 AM – 12 PM', title: 'Youth League', desc: 'Ages 6–17. Starts Sep 12.' },
  { emoji: '🧓', day: 'Thu Mornings', time: '11 AM – 1 PM', title: 'Senior Strikes', desc: '$5/game for 55+. Coffee on us.' },
  { emoji: '🎓', day: 'Wed Mornings', time: '9 AM – 11 AM', title: 'Homeschool PE', desc: 'Group rates. Reserve by Mon.' },
];

const tagStyles: Record<string, string> = {
  cyan:   'event-tag-cyan',
  yellow: 'event-tag-yellow',
  pink:   'event-tag-pink',
};

export default function EventsPage() {
  return (
    <>
      <section className="hero hero-md">
        <div className="hero-content">
          <span className="hero-tag">What&apos;s On</span>
          <h1>
            <span className="word">Events.</span>
            <span className="word">Every</span>
            <span className="word">Week.</span>
          </h1>
          <p className="lede">Glow Bowl Fridays, trivia nights, tournaments, family days, and the biggest New Year&apos;s Eve party in North Little Rock. There&apos;s always something going on at Millennium Bowl.</p>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="block">
        <div className="container">
          <div className="section-eyebrow">On the Calendar</div>
          <h2 className="section-title">Upcoming <span className="accent">Events</span></h2>
          <p className="section-lede">From casual trivia nights to full tournament finals — mark your calendar.</p>

          <div className="events-grid">
            {events.map((ev) => (
              <div
                key={`${ev.month}${ev.day}`}
                className={`ev-card${ev.featured ? ' ev-card--featured' : ''}`}
                data-animate=""
              >
                {ev.featured && <div className="ev-featured-ribbon">Featured</div>}
                <div className="ev-date">
                  <span className="ev-month">{ev.month}</span>
                  <span className="ev-day">{ev.day}</span>
                  <span className="ev-weekday">{ev.weekday}</span>
                </div>
                <div className="ev-body">
                  <span className={`ev-tag ${tagStyles[ev.tagColor]}`}>{ev.tag}</span>
                  <h3 className="ev-title">{ev.title}</h3>
                  <p className="ev-desc">{ev.desc}</p>
                  <div className="ev-meta">
                    <span className="ev-time">🕐 {ev.time}</span>
                    <span className="ev-detail">{ev.detail}</span>
                  </div>
                  <Link className={`btn ${ev.featured ? 'btn-primary' : 'btn-secondary'}`} href={ev.href}>
                    {ev.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recurring weekly events */}
      <section className="block" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-eyebrow">Every Single Week</div>
          <h2 className="section-title">Regular <span className="accent">Programming</span></h2>
          <p className="section-lede">No need to wait for a special event — something&apos;s always on.</p>
          <div className="recurring-grid">
            {recurring.map((r) => (
              <div key={r.title} className="recurring-card" data-animate="">
                <div className="recurring-emoji">{r.emoji}</div>
                <div className="recurring-body">
                  <div className="recurring-when">
                    <span className="recurring-day">{r.day}</span>
                    <span className="recurring-time">{r.time}</span>
                  </div>
                  <div className="recurring-title">{r.title}</div>
                  <div className="recurring-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="block events-notify-section">
        <div className="container">
          <div className="events-notify-inner">
            <div>
              <div className="section-eyebrow">Don&apos;t Miss Out</div>
              <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
                Stay in the <span className="accent">Loop</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', maxWidth: '420px' }}>
                New events, last-minute specials, and tournament announcements go to our contact list first.
                Drop your info and we&apos;ll keep you in the know.
              </p>
            </div>
            <div className="events-notify-actions">
              <Link className="btn btn-primary" href="/contact">
                Get Event Updates <span className="btn-arrow">→</span>
              </Link>
              <Link className="btn btn-ghost" href="/book">
                Book a Lane Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
