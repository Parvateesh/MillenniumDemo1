  import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand"><Image src="/logo.png" alt="Millennium Bowl" width={190} height={56} /></div>
          <p className="footer-tagline">North Little Rock&apos;s home for strikes, parties, and Friday nights since 2003.</p>
          <div className="socials">
            <a href="https://facebook.com/millenniumbowllr" className="social-link" title="Facebook" target="_blank" rel="noopener">f</a>
            <a href="https://instagram.com/millenniumbowllr" className="social-link" title="Instagram" target="_blank" rel="noopener">📷</a>
            <a href="https://tiktok.com/@millenniumbowllr" className="social-link" title="TikTok" target="_blank" rel="noopener">♪</a>
            <a href="https://youtube.com/@millenniumbowllr" className="social-link" title="YouTube" target="_blank" rel="noopener">▶</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/kitchen">Kitchen</Link></li>
            <li><Link href="/bar">Bar</Link></li>
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
            <li><a href="https://goo.gl/maps/e2pMZnEL93wHGSD88" target="_blank" rel="noopener">Directions</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Millennium Bowl · 7200 Counts Massie Rd, NLR AR 72113</div>
        <div>Built with 🎳</div>
      </div>
    </footer>
  );
}
