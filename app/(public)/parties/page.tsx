import Link from 'next/link';

export const metadata = {
  title: 'Parties & Events — Millennium Bowl | North Little Rock, AR',
  description: 'Birthday parties and corporate events at Millennium Bowl. Packages from $179. 32 lanes, full catering, setup included — you just bring the people.',
  alternates: { canonical: '/parties' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a birthday party cost at Millennium Bowl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer two birthday packages — the Spare Package and the Strike Package — to fit different group sizes and budgets. Email info@millenniumbowllr.com or call (501) 791-9150 for current pricing and availability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a birthday party at Millennium Bowl?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email info@millenniumbowllr.com or call (501) 791-9150. We respond within 1 business day with pricing, availability, and everything you need to know. A deposit is required to hold your date.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book a party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend booking at least 2–3 weeks in advance, especially for weekend dates. Friday and Saturday evenings fill up quickly — contact us as early as possible to secure your preferred time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I bring my own cake or outside food to the party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Outside cakes are welcome for birthday parties. Additional food and beverages are handled by our kitchen and bar. Contact us for details on what is included in each package.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you host corporate events and team-building activities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer a half-buyout for up to 60 people (16 lanes) and a full-buyout for up to 120 people (all 32 lanes) for corporate events, holiday parties, and team-building outings. Email info@millenniumbowllr.com for a custom quote.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of events does Millennium Bowl host?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We host birthday parties for all ages, corporate team-building events, holiday parties, school field trips, lock-ins, bachelor and bachelorette parties, fundraisers, and bowling tournaments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a deposit required to reserve a party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a deposit is required to hold your date. Contact us at info@millenniumbowllr.com or call (501) 791-9150 for deposit amounts and payment details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Millennium Bowl located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Millennium Bowl is located at 7200 Counts Massie Rd, North Little Rock, AR 72113. We are open Monday–Thursday 9 AM–12 AM, Friday–Saturday 9 AM–2 AM, and Sunday 10 AM–12 AM.',
      },
    },
  ],
};

export default function PartiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
