import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Millennium Bowl',
};

export default function TermsPage() {
  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">Legal</span>
          <h1><span className="word">Terms of</span> <span className="word">Service</span></h1>
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
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>1. <span className="accent">Use of Site</span></h2>
            <p>
              By accessing or using millenniumbowllr.com, you agree to these Terms of Service. If you do not agree, do not use this site. We reserve the right to update these terms at any time; continued use after changes constitutes acceptance.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>2. <span className="accent">Accounts</span></h2>
            <p>
              You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your password and for all activity under your account. Notify us immediately of any unauthorized use at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>3. Bookings &amp; <span className="accent">Payments</span></h2>
            <p>
              Lane reservations and party packages are subject to availability. Pricing is subject to change. Cancellation and refund policies will be communicated at the time of booking. Millennium Bowl reserves the right to refuse service.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>4. <span className="accent">Prohibited</span> Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use this site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the site or its systems</li>
              <li>Submit false or misleading information</li>
              <li>Interfere with or disrupt the site or servers</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>5. Limitation of <span className="accent">Liability</span></h2>
            <p>
              This site and its content are provided "as is" without warranties of any kind. Millennium Bowl is not liable for any indirect, incidental, or consequential damages arising from your use of the site. Our total liability shall not exceed the amount you paid for the specific service in dispute.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>6. <span className="accent">Governing Law</span></h2>
            <p>
              These terms are governed by the laws of the State of Arkansas. Any disputes shall be resolved in the courts of Pulaski County, Arkansas.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>7. <span className="accent">Contact</span></h2>
            <p>
              Millennium Bowl<br />
              7200 Counts Massie Rd, North Little Rock, AR 72113<br />
              <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a><br />
              (501) 791-9150
            </p>
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
            Also see our <Link href="/privacy" style={{ color: 'var(--neon-cyan)' }}>Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
