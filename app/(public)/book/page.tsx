'use client';

import { useState, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';

type Status = 'idle' | 'sending' | 'done' | 'duplicate' | 'error';

export default function BookPage() {
  const [status, setStatus] = useState<Status>('idle');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
        }),
      });
      const data = await res.json();
      if (data.duplicate) { setStatus('duplicate'); return; }
      if (data.ok) {
        setStatus('done');
        if (btnRef.current) {
          const r = btnRef.current.getBoundingClientRect();
          confettiBurst(r.left + r.width / 2, r.top, 60);
        }
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="hero hero-sm">
        <div className="hero-content">
          <span className="hero-tag">🎳 Online Lane Booking — Coming Soon</span>
          <h1>
            <span className="word">Lane</span>{' '}
            <span className="word">1</span>{' '}
            <span className="word">Is</span>{' '}
            <span className="word">Waiting.</span>
          </h1>
          <p className="lede">
            We&apos;re building real-time lane booking — live availability,
            instant confirmation, pay online. Be first in line when it launches.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="container">

          {/* What's coming */}
          <div className="booking-preview" data-animate="">
            <div className="booking-preview-label">What online booking will include</div>
            <div className="booking-preview-features">
              <div className="booking-feature">
                <span className="booking-feature-icon">🎯</span>
                <span>See live lane availability in real time</span>
              </div>
              <div className="booking-feature">
                <span className="booking-feature-icon">⚡</span>
                <span>Instant confirmation — no waiting</span>
              </div>
              <div className="booking-feature">
                <span className="booking-feature-icon">💳</span>
                <span>Pay online and skip the front desk</span>
              </div>
              <div className="booking-feature">
                <span className="booking-feature-icon">📱</span>
                <span>Manage, reschedule, or cancel from your account</span>
              </div>
            </div>
          </div>

          {/* Waitlist form — centered */}
          <div className="booking-waitlist-wrap" data-animate="">
            <div className="booking-card booking-card-waitlist">
              <div className="booking-card-tag">Launching Soon</div>
              <div className="booking-card-icon">🎳</div>
              <h2 className="booking-card-title">Join the Lane List</h2>
              <p className="booking-card-sub">
                Be the first to book online the day we launch —
                we&apos;ll email you the moment it&apos;s live.
              </p>

              {status === 'done' ? (
                <div className="booking-waitlist-success">
                  <div className="booking-waitlist-success-icon">🎉</div>
                  <div className="booking-waitlist-success-title">You&apos;re on the list!</div>
                  <p>We&apos;ll email you as soon as online booking goes live. See you on the lanes.</p>
                </div>
              ) : status === 'duplicate' ? (
                <div className="booking-waitlist-success">
                  <div className="booking-waitlist-success-icon">✅</div>
                  <div className="booking-waitlist-success-title">Already got you!</div>
                  <p>You&apos;re already on the list. We&apos;ll be in touch soon.</p>
                </div>
              ) : status === 'error' ? (
                <div className="booking-waitlist-success">
                  <div className="booking-waitlist-success-icon">⚠️</div>
                  <div className="booking-waitlist-success-title">Something went wrong</div>
                  <p>Please try again or call us at <strong>(501) 791-9150</strong>.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-ghost" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="booking-waitlist-form">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" ref={nameRef} placeholder="Jane" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" ref={emailRef} placeholder="jane@email.com" required />
                  </div>
                  <button
                    ref={btnRef}
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Saving...' : 'Notify Me When It\'s Live →'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
