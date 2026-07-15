'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
interface NavUser {
  displayName?: string | null;
  email?: string | null;
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/parties', label: 'Parties' },
  { href: '/leagues', label: 'Leagues' },
  { href: '/proshop', label: 'Pro Shop' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav({ user = null }: { user?: NavUser | null }) {
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
          <Link className="logo" href="/"><Image src="/logo.webp" alt="Millennium Bowl" width={160} height={48} sizes="160px" priority /></Link>
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
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <div className="glow-switch-container">
                <button
                  className={`glow-switch${glowOn ? ' active' : ''}`}
                  id="glowToggle"
                  title={glowOn ? 'Exit Glow Bowl Mode' : 'Glow Bowl Mode'}
                  onClick={toggleGlow}
                  role="switch"
                  aria-checked={glowOn}
                >
                  <span className="glow-switch-text left">ON</span>
                  <span className="glow-switch-text right">GLOW</span>
                  <span className="glow-switch-handle">
                    <svg className="ball-svg" viewBox="0 0 100 100">
                      <defs>
                        <radialGradient id="sphereOff" cx="35%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#ffbdf5" />
                          <stop offset="35%" stopColor="#e11d48" />
                          <stop offset="70%" stopColor="#4c0519" />
                          <stop offset="100%" stopColor="#120005" />
                        </radialGradient>
                        <radialGradient id="sphereOn" cx="35%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#b6f9ff" />
                          <stop offset="35%" stopColor="#0891b2" />
                          <stop offset="70%" stopColor="#164e63" />
                          <stop offset="100%" stopColor="#021c24" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="46" fill={glowOn ? 'url(#sphereOn)' : 'url(#sphereOff)'} />
                      <ellipse cx="34" cy="28" rx="12" ry="6" fill="rgba(255, 255, 255, 0.4)" transform="rotate(-20 34 28)" />
                      <g className="finger-holes">
                        <circle cx="44" cy="42" r="5" fill="#130721" />
                        <circle cx="56" cy="42" r="5" fill="#130721" />
                        <circle cx="50" cy="58" r="6" fill="#130721" />
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </li>
            <li>
              {user ? (
                <Link
                  href="/account"
                  className="nav-account"
                  title={user.email ?? 'My Account'}
                >
                  {user.displayName ? user.displayName.split(' ')[0] : '👤 Account'}
                </Link>
              ) : (
                <Link href="/login" className="nav-signin">Sign In</Link>
              )}
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
