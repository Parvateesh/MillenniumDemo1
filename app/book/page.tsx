'use client';

import { useState, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';

type Status = 'idle' | 'sending' | 'done' | 'duplicate';

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
      setStatus('idle');
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
            instant confirmation, pay online. Launching within the month.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="container">

          {/* What's coming preview */}
          <div className="booking-preview" data-animate="">
            <div className="booking-preview-label">What you&apos;ll be able to do</div>
            <div className="booking-preview-features">
              <div className="booking-feature">
                <span className="booking-feature-icon">🎯</span>
                <span>See live lane availability in real time</span>
              </div>
              <div className="booking-feature">
                <span className="booking-feature-icon">⚡</span>
                <span>Instant booking confirmation — no waiting</span>
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

          {/* Two paths */}
          <div className="booking-split" data-animate="">

            {/* Path 1 — call now */}
            <div className="booking-card booking-card-call">
              <div className="booking-card-tag">Available Right Now</div>
              <div className="booking-card-icon">📞</div>
              <h2 className="booking-card-title">Book by Phone</h2>
              <p className="booking-card-sub">
                Call us and we&apos;ll lock in your lanes in under 2 minutes.
                Our staff is ready Mon–Sun during business hours.
              </p>
              <a href="tel:5017919150" className="btn btn-primary booking-phone-btn">
                (501) 791-9150
              </a>
              <a href="mailto:info@millenniumbowllr.com" className="booking-email-link">
                Or email us →
              </a>
              <div className="booking-hours">
                <div><span>Mon–Thu</span><span>9 AM – 12 AM</span></div>
                <div><span>Fri – Sat</span><span>9 AM – 2 AM</span></div>
                <div><span>Sun</span><span>10 AM – 12 AM</span></div>
              </div>
            </div>

            {/* Path 2 — waitlist */}
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
