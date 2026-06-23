'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/parties', label: 'Parties' },
  { href: '/leagues', label: 'Leagues' },
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/bar', label: 'Bar' },
  { href: '/proshop', label: 'Pro Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [glowOn, setGlowOn] = useState(false);

  function openNav() {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    closeNav();
  }, [pathname]);

  useEffect(() => {
    if (glowOn) {
      document.body.classList.add('glow-mode');
      showToast("🪩 Glow Bowl Mode ON — It's Friday Night!");
    } else {
      document.body.classList.remove('glow-mode');
      if (glowOn === false && document.body.classList.contains('glow-mode') === false) {
        // Only show "lights back on" if we actually toggled off (not on first render)
      }
    }
  }, [glowOn]);

  function toggleGlow() {
    const next = !glowOn;
    setGlowOn(next);
    showToast(next ? "🪩 Glow Bowl Mode ON — It's Friday Night!" : '💡 Lights back on');
  }

  function showToast(msg: string) {
    let toast = document.querySelector('.glow-toast') as HTMLElement | null;
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'glow-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast!.classList.remove('show'), 2500);
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link className="logo" href="/">MILLENNIUM<br />BOWL</Link>
          <button
            className="mobile-toggle"
            id="mobileToggle"
            aria-label="Toggle menu"
            onClick={() => (menuOpen ? closeNav() : openNav())}
          >
            ☰
          </button>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="glow-toggle"
                id="glowToggle"
                title={glowOn ? 'Exit Glow Bowl Mode' : 'Glow Bowl Mode'}
                onClick={toggleGlow}
              >
                🪩
              </button>
            </li>
            <li>
              <Link className="nav-cta" href="/book">🎳 Book Now</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={`nav-overlay${menuOpen ? ' show' : ''}`}
        id="navOverlay"
        onClick={closeNav}
      />
    </>
  );
}
