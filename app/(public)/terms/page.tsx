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

          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Effective: July 14, 2026 &nbsp;·&nbsp; Millennium Bowl, 7200 Counts Massie Rd, North Little Rock, AR 72113
          </p>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>1. <span className="accent">Use of Site</span></h2>
            <p>
              By accessing or using millenniumbowllr.com, you agree to these Terms of Service. If you do not agree, do not use this site. We reserve the right to update these terms at any time. We will notify registered users of material changes by email. Continued use of the site after changes are posted constitutes acceptance of the revised terms.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>2. <span className="accent">Age Requirement</span></h2>
            <p>
              You must be at least 13 years of age to create an account on this website. By creating an account, you represent and warrant that you are 13 or older.
            </p>
            <p>
              If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. Youth league registrations and party bookings for minors must be completed by a parent or legal guardian.
            </p>
            <p>
              Millennium Bowl does not knowingly allow children under 13 to create accounts. If we discover an account belongs to a child under 13, we will terminate it and delete associated data promptly.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>3. <span className="accent">Accounts</span></h2>
            <p>
              You must provide accurate, current, and complete information when creating an account. You are responsible for maintaining the confidentiality of your password and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account at <a href="mailto:info@millenniumbowllr.com" style={{ color: 'var(--neon-cyan)' }}>info@millenniumbowllr.com</a>.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that provide false information, violate these Terms, or engage in abusive or fraudulent activity.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>4. Bookings &amp; <span className="accent">Payments</span></h2>
            <p>
              Lane reservations and party packages are subject to availability. Pricing is subject to change without notice. The price confirmed at the time of booking is the price you will be charged.
            </p>
            <p><strong style={{ color: 'var(--text)' }}>Cancellations &amp; Refunds:</strong></p>
            <ul>
              <li>Cancellations made more than 48 hours before a booking will receive a full refund</li>
              <li>Cancellations made within 48 hours may be subject to a cancellation fee — details will be provided at time of booking</li>
              <li>Party package deposits are non-refundable unless cancelled more than 7 days in advance</li>
              <li>No-shows are non-refundable</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Millennium Bowl reserves the right to refuse service to anyone for any lawful reason.</p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>5. <span className="accent">Prohibited</span> Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use this site for any unlawful purpose or in violation of any applicable federal, state, or local law</li>
              <li>Attempt to gain unauthorized access to any part of the site, its servers, or any connected systems</li>
              <li>Submit false, misleading, or fraudulent information</li>
              <li>Interfere with or disrupt the site, servers, or networks connected to the site</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access or collect data from the site without our written permission</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>6. Intellectual <span className="accent">Property</span></h2>
            <p>
              All content on this website — including but not limited to text, graphics, logos, images, page layouts, and software — is the property of Millennium Bowl or its licensors and is protected by applicable copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from this site without our prior written permission. Personal, non-commercial use (e.g., printing a page for your own reference) is permitted.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>7. Limitation of <span className="accent">Liability</span></h2>
            <p>
              This site and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              To the fullest extent permitted by Arkansas law, Millennium Bowl is not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this website or our services. Our total liability to you for any claim arising out of or relating to these Terms or our services shall not exceed the amount you paid for the specific service in dispute.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>8. <span className="accent">Indemnification</span></h2>
            <p>
              You agree to defend, indemnify, and hold harmless Millennium Bowl, its owners, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the site, your violation of these Terms, or your violation of any rights of another person or entity.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>9. <span className="accent">Governing Law</span></h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Arkansas, without regard to its conflict of law provisions. Any dispute arising under or relating to these Terms shall be resolved exclusively in the state or federal courts located in Pulaski County, Arkansas, and you consent to the personal jurisdiction of those courts.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>10. <span className="accent">Severability</span></h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>11. Entire <span className="accent">Agreement</span></h2>
            <p>
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and Millennium Bowl regarding your use of this website and supersede all prior agreements, representations, or understandings between you and Millennium Bowl relating to this subject matter.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>12. <span className="accent">Contact</span></h2>
            <p>
              For questions about these Terms:<br /><br />
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
