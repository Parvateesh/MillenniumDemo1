'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const firstName = user?.displayName?.split(' ')[0] ?? 'Bowler';

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <>
      <section className="hero hero-xs hero-contact">
        <div className="hero-content">
          <span className="hero-tag">My Account</span>
          <h1><span className="word">Hey,</span> <span className="word">{firstName}!</span></h1>
          <p className="lede account-hero-name">{user?.email}</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="account-grid">
            <Link href="/account/reservations" className="account-card">
              <div className="account-card-icon">📅</div>
              <div className="account-card-title">My Reservations</div>
              <div className="account-card-desc">View upcoming and past lane bookings.</div>
            </Link>
            <Link href="/account/leagues" className="account-card">
              <div className="account-card-icon">🏆</div>
              <div className="account-card-title">League Registration</div>
              <div className="account-card-desc">Sign up for leagues and track your registrations.</div>
            </Link>
          </div>

          <button onClick={handleLogout} className="btn btn-ghost">
            Sign Out →
          </button>
        </div>
      </section>
    </>
  );
}
