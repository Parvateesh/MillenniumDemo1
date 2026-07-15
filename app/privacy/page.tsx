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
            <p style={{ marginTop: '0.75rem' }}>We collect only the information necessary to operate our services. We do not collect sensitive personal information such as Social Security numbers, financial account numbers, or government-issued ID numbers through this website.</p>
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
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>3. SMS &amp; Email <span className="accent">Marketing</span></h2>
            <p>
              If you opted in to marketing communications at sign-up, we may contact you by email or text message with deals, events, and offers from Millennium Bowl. Message and data rates may apply.
            </p>
            <p>
              <strong style={{ color: 'var(--text)' }}>To opt out of text messages:</strong> Reply <strong style={{ color: 'var(--neon-cyan)' }}>STOP</strong> to any marketing text at any time. You will receive one confirmation message and no further texts.
            </p>
            <p>
              <strong style={{ color: 'var(--text)' }}>To opt out of emails:</strong> Click "Unsubscribe" at the bottom of any marketing email, or contact us at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>.
            </p>
            <p>
              We obtain express written consent before sending marketing texts, in compliance with the Telephone Consumer Protection Act (TCPA). Opting out of marketing messages will not affect transactional messages such as booking confirmations.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>4. <span className="accent">Sharing</span> Your Information</h2>
            <p>We do not sell your personal information. We may share it with:</p>
            <ul>
              <li><strong style={{ color: 'var(--text)' }}>Service providers</strong> — Firebase (data storage) and Resend (email delivery), solely to operate this website. These providers are contractually prohibited from using your data for any other purpose.</li>
              <li><strong style={{ color: 'var(--text)' }}>Law enforcement</strong> — when required by applicable law, court order, or government authority.</li>
              <li><strong style={{ color: 'var(--text)' }}>Business transfers</strong> — if Millennium Bowl is sold or merged, your data may be transferred as part of that transaction. We will notify you before your data becomes subject to a different privacy policy.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>5. <span className="accent">Data Security</span></h2>
            <p>
              We use industry-standard security measures to protect your personal information, including encryption at rest and in transit via Google Firebase. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
            </p>
            <p>
              Access to personal data is limited to personnel and service providers who need it to operate our services.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>6. <span className="accent">Data Retention</span></h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide services. If you request deletion of your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law (e.g., transaction records for tax purposes, which may be retained for up to 7 years).
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>7. <span className="accent">Cookies</span></h2>
            <p>
              This site uses essential cookies for authentication and session management. We do not use third-party advertising cookies. You can disable cookies in your browser settings, though some features (such as staying logged in) may not work correctly.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>8. Children&apos;s Privacy <span className="accent">(COPPA)</span></h2>
            <p>
              This website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. Our online accounts are intended for use by individuals aged 13 and older.
            </p>
            <p>
              While Millennium Bowl offers youth bowling programs (including the Saturday Youth League), registration for those programs must be completed in person by a parent or legal guardian. If we become aware that we have inadvertently collected personal information from a child under 13 online, we will delete that information promptly.
            </p>
            <p>
              If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>9. Your <span className="accent">Rights</span></h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong style={{ color: 'var(--text)' }}>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong style={{ color: 'var(--text)' }}>Correction</strong> — request that we correct inaccurate or incomplete data</li>
              <li><strong style={{ color: 'var(--text)' }}>Deletion</strong> — request that we delete your personal data, subject to legal retention obligations</li>
              <li><strong style={{ color: 'var(--text)' }}>Opt-out of marketing</strong> — at any time, at no cost</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>
              To exercise any of these rights, contact us at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>. We will respond within 30 days.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>10. Arkansas <span className="accent">Data Privacy Act</span></h2>
            <p>
              Millennium Bowl operates in compliance with the Arkansas Data Privacy Act (Act 690 of 2023), effective July 1, 2024, to the extent it applies to our business operations.
            </p>
            <p>
              <strong style={{ color: 'var(--text)' }}>Data Breach Notification:</strong> In the event of a security breach involving your personal information, we will notify affected individuals in accordance with the Arkansas Personal Information Protection Act (Ark. Code Ann. § 4-110-105), which requires notification within 45 days of discovering the breach. Notification will be sent to the email address on file for your account.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>11. <span className="accent">Contact</span></h2>
            <p>
              For privacy-related questions, requests, or concerns:<br /><br />
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
