'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { clientAuth } from '@/lib/firebase-client';

type League = {
  id: string;
  name: string;
  day: string;
  skill: string;
  status: 'open' | 'waitlist' | 'soon';
};

const LEAGUES: League[] = [
  { id: 'millennium-1st', name: 'Millennium 1st', day: 'Mon · 6:30 PM', skill: '4 person', status: 'open' },
  { id: 'ball-buster', name: 'Ball Buster', day: 'Mon · 7:00 PM', skill: 'Any mix', status: 'open' },
  { id: 'corps-of-eng', name: 'Corps of Engineering', day: 'Mon · 6:00 PM', skill: 'Any mix', status: 'open' },
  { id: 'tuesday-4-league', name: 'Tuesday 4 League', day: 'Tue · 9:30 AM', skill: 'Ladies', status: 'open' },
  { id: 'tuesday-mixed-4-some', name: 'Tuesday Mixed 4 Some', day: 'Tue · 6:30 PM', skill: 'Any mix', status: 'open' },
  { id: 'tuesday-nite-mixed', name: 'Tuesday Nite Mixed', day: 'Tue · 6:30 PM', skill: 'Any mix', status: 'open' },
  { id: 'lakeview-ladies', name: 'Lakeview Ladies', day: 'Wed · 9:30 AM', skill: 'Ladies', status: 'open' },
  { id: 'wednesday-mixed-classic', name: 'Wednesday Mixed Classic', day: 'Wed · 6:30 PM', skill: 'Any mix', status: 'open' },
  { id: 'millennium-mixed', name: 'Millennium Mixed', day: 'Wed · 6:30 PM', skill: 'Any mix', status: 'open' },
  { id: 'sr-league', name: 'Sr League', day: 'Thu · 11:00 AM', skill: 'Any mix', status: 'open' },
  { id: 'falcon-jet', name: 'Falcon Jet', day: 'Thu · 6:00 PM', skill: 'Any mix', status: 'open' },
  { id: 'roosevelt-mixed', name: 'Roosevelt Mixed', day: 'Thu · 6:30 PM', skill: 'Any mix', status: 'open' },
  { id: 'saturday-youth', name: 'Saturday Youth', day: 'Sat · 10:00 AM', skill: 'Youth', status: 'soon' },
  { id: 'sunday-night-mixed', name: 'Sunday Night Mixed', day: 'Sun · 6:30 PM', skill: '3 person (1 any sex)', status: 'open' },
];

const STATUS_LABEL: Record<string, string> = { open: 'Open', waitlist: 'Waitlist', soon: 'Starts Sep 12' };
const STATUS_CLASS: Record<string, string> = {
  open: 'league-status status-open',
  waitlist: 'league-status status-full',
  soon: 'league-status status-soon',
};

type RegModal = { league: League; name: string; email: string; phone: string };

export default function AccountLeaguesPage() {
  const { user } = useAuth();
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<RegModal | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) return;
    (async () => {
      const token = await clientAuth.currentUser?.getIdToken();
      const res = await fetch('/api/leagues/register', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const regs = await res.json();
        setRegistered(new Set(regs.map((r: { leagueId: string }) => r.leagueId)));
      }
    })();
  }, [user]);

  function openModal(league: League) {
    setModal({
      league,
      name: user?.displayName ?? '',
      email: user?.email ?? '',
      phone: '',
    });
    setError('');
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!modal) return;
    setSubmitting(true);
    setError('');
    try {
      const token = await clientAuth.currentUser?.getIdToken();
      const res = await fetch('/api/leagues/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leagueId: modal.league.id,
          leagueName: modal.league.name,
          name: modal.name,
          email: modal.email,
          phone: modal.phone,
        }),
      });
      if (res.status === 409) { setError('You are already registered for this league.'); return; }
      if (!res.ok) { setError('Registration failed. Try again.'); return; }
      setRegistered(prev => new Set([...prev, modal.league.id]));
      setSuccess(`You're registered for ${modal.league.name}!`);
      setModal(null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="hero hero-xs hero-contact">
        <div className="hero-content">
          <span className="hero-tag">My Account</span>
          <h1><span className="word">League</span> <span className="word">Registration</span></h1>
          <p className="lede">Sign up for a league and we&apos;ll confirm your spot within 24 hours.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          {success && (
            <div className="admin-alert" style={{ background: 'rgba(57,255,20,0.08)', borderColor: 'rgba(57,255,20,0.3)', color: 'var(--neon-green)', marginBottom: '1.5rem' }}>
              ✅ {success}
            </div>
          )}

          <div className="league-table" data-animate="">
            <div className="league-row header">
              <div>League</div>
              <div>Day &amp; Time</div>
              <div>Skill Level</div>
              <div>Status</div>
              <div></div>
            </div>
            {LEAGUES.map(league => (
              <div className="league-row" key={league.id}>
                <div className="league-name">{league.name}</div>
                <div className="league-day">{league.day}</div>
                <div>{league.skill}</div>
                <div>
                  {registered.has(league.id) ? (
                    <span className="admin-badge badge-registered">Registered</span>
                  ) : (
                    <span className={STATUS_CLASS[league.status]}>{STATUS_LABEL[league.status]}</span>
                  )}
                </div>
                <div>
                  {registered.has(league.id) ? (
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>✓ Joined</span>
                  ) : (
                    <button
                      className="btn-mini"
                      onClick={() => openModal(league)}
                    >
                      {league.status === 'waitlist' ? 'Waitlist' : 'Register'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/account" className="btn btn-ghost">← Back to Account</Link>
          </div>
        </div>
      </section>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-title">Register — {modal.league.name}</div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {modal.league.day} · {modal.league.skill}
            </p>
            <form onSubmit={handleRegister} className="admin-modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={modal.name}
                  onChange={e => setModal(m => m ? { ...m, name: e.target.value } : m)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={modal.email}
                  onChange={e => setModal(m => m ? { ...m, email: e.target.value } : m)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={modal.phone}
                  onChange={e => setModal(m => m ? { ...m, phone: e.target.value } : m)}
                  required
                  placeholder="(501) 555-0000"
                />
              </div>
              {error && <p className="admin-error">{error}</p>}
              <div className="admin-modal-actions">
                <button type="button" className="admin-btn-sm" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Registering…' : 'Confirm Registration →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
