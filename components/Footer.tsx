  import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><Image src="/logo.png" alt="Millennium Bowl" width={190} height={56} sizes="190px" /></div>
          <p className="footer-tagline">North Little Rock&apos;s home for strikes, parties, and Friday nights since 2003.</p>
          <div className="socials">
            <a href="https://www.facebook.com/share/1FysjXKbLz/?mibextid=wwXIfr" className="social-link" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/millenniumbowllr" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tiktok.com/@millenniumbowllr" className="social-link" title="TikTok" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
            </a>
            <a href="https://youtube.com/@millenniumbowllr" className="social-link" title="YouTube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/menu">Menu &amp; Order</Link></li>
            <li><Link href="/proshop">Pro Shop</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Plan</h4>
          <ul>
            <li><Link href="/parties">Birthday Parties</Link></li>
            <li><Link href="/parties">Corporate Events</Link></li>
            <li><Link href="/leagues">Leagues</Link></li>
            <li><Link href="/book">Book a Lane</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><Link href="/contact">Contact</Link></li>
            <li><a href="tel:5017919150">(501) 791-9150</a></li>
            <li><a href="mailto:info@millenniumbowllr.com">Email</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=7200+Counts+Massie+Rd+North+Little+Rock+AR+72113" target="_blank" rel="noopener noreferrer">Directions</a></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Millennium Bowl · 7200 Counts Massie Rd, NLR AR 72113</div>
        <div>Built with 🎳</div>
      </div>
    </footer>
  );
}
