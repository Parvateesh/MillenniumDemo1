import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Millennium Bowl',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Legal</span>
          <h1><span className="word">Privacy</span> <span className="word">Policy</span></h1>
        </div>
      </section>

      <section className="block">
        <div className="container" style={{ maxWidth: '760px' }}>

          <div style={{
            background: 'rgba(255, 230, 0, 0.08)',
            border: '1px solid var(--neon-yellow)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <p style={{ margin: 0, color: 'var(--neon-yellow)', fontFamily: 'var(--font-space-mono), monospace', fontSize: '0.82rem', letterSpacing: '0.04em' }}>
              DRAFT — pending legal review. This document is not yet in effect.
            </p>
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Last updated: [Date TBD] &nbsp;·&nbsp; Millennium Bowl, 7200 Counts Massie Rd, North Little Rock, AR 72113
          </p>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>1. What We <span className="accent">Collect</span></h2>
            <p>When you create an account, book a lane, join a league, or contact us, we may collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Phone number (if provided)</li>
              <li>Booking and reservation details</li>
              <li>Marketing consent preferences and timestamps</li>
              <li>Usage data (pages visited, browser type, device type)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>2. How We <span className="accent">Use It</span></h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process bookings, reservations, and league sign-ups</li>
              <li>Send booking confirmations and reminders</li>
              <li>Send marketing emails and texts if you opted in (you can opt out at any time)</li>
              <li>Improve the website and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>3. <span className="accent">Sharing</span> Your Information</h2>
            <p>We do not sell your personal information. We may share it with:</p>
            <ul>
              <li>Service providers (e.g., Firebase for data storage, Resend for email delivery) strictly to operate the site</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>4. <span className="accent">Cookies</span></h2>
            <p>
              This site uses essential cookies for authentication and session management. We do not use third-party advertising cookies. You can disable cookies in your browser settings, though some features may not work correctly.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>5. Your <span className="accent">Rights</span></h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>.</p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>6. <span className="accent">Contact</span></h2>
            <p>
              Millennium Bowl<br />
              7200 Counts Massie Rd, North Little Rock, AR 72113<br />
              <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a><br />
              (501) 791-9150
            </p>
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
            Also see our <Link href="/terms" style={{ color: 'var(--neon-cyan)' }}>Terms of Service</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
