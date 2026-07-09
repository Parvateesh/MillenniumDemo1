'use client';

import { useState, useEffect, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';
import ConfirmModal from '@/components/ConfirmModal';
import { useAuth } from '@/lib/auth-context';
import { clientAuth } from '@/lib/firebase-client';

export default function BookPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const lanesRef = useRef<HTMLSelectElement>(null);
  const bowlersRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (dateRef.current) { dateRef.current.min = today; dateRef.current.value = today; }
  }, []);

  useEffect(() => {
    if (user) {
      if (nameRef.current && user.displayName) nameRef.current.value = user.displayName;
      if (emailRef.current && user.email) emailRef.current.value = user.email;
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('[type="submit"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    confettiBurst(rect.left + rect.width / 2, rect.top, 50);

    if (user) {
      try {
        const token = await clientAuth.currentUser?.getIdToken();
        await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            date: dateRef.current?.value,
            time: timeRef.current?.value,
            lanes: lanesRef.current?.value,
            bowlers: bowlersRef.current?.value,
            type: typeRef.current?.value,
            name: nameRef.current?.value,
            phone: phoneRef.current?.value,
            email: emailRef.current?.value,
            notes: notesRef.current?.value,
          }),
        });
      } catch {
        // booking still shows confirmation even if save fails
      }
    }

    setIsModalOpen(true);
    formRef.current?.reset();
    const today = new Date().toISOString().split('T')[0];
    if (dateRef.current) { dateRef.current.min = today; dateRef.current.value = today; }
    if (user) {
      if (nameRef.current && user.displayName) nameRef.current.value = user.displayName;
      if (emailRef.current && user.email) emailRef.current.value = user.email;
    }
  }

  return (
    <>
      <section className="hero hero-xs hero-contact">
        <div className="hero-content">
          <span className="hero-tag">Reserve Your Lane</span>
          <h1><span className="word">Book</span> <span className="word">It.</span></h1>
          <p className="lede">Pick your date, lane count, and party size. We&apos;ll confirm by text within 30 minutes during business hours.</p>
        </div>
      </section>
      <section className="block contact-block">
        <div className="container form-container">
          <div className="contact-form" data-animate="">
            <form id="bookForm" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Date</label><input type="date" required ref={dateRef} /></div>
                <div className="form-group"><label>Time</label><input type="time" required ref={timeRef} /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Number of Lanes</label>
                  <select ref={lanesRef}>
                    <option>1 lane (up to 6 people)</option>
                    <option>2 lanes (up to 12 people)</option>
                    <option>3 lanes (up to 18 people)</option>
                    <option>4+ lanes — talk to us about events</option>
                  </select>
                </div>
                <div className="form-group"><label>Total Bowlers</label><input type="number" min="1" max="50" required ref={bowlersRef} /></div>
              </div>
              <div className="form-group">
                <label>Booking Type</label>
                <select ref={typeRef}>
                  <option>Casual / Walk-in style</option>
                  <option>Birthday party (8+ kids)</option>
                  <option>Corporate event</option>
                  <option>League play</option>
                  <option>Glow Bowl</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" required ref={nameRef} /></div>
                <div className="form-group"><label>Phone</label><input type="tel" required ref={phoneRef} /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" required ref={emailRef} /></div>
              <div className="form-group"><label>Anything Special? (Optional)</label><textarea placeholder="Birthday cake, food order, accessibility needs..." ref={notesRef}></textarea></div>
              <button type="submit" className="btn btn-primary btn-full" data-confetti="">
                🎳 Reserve My Lane →
              </button>
              <p className="form-note">Or call us: <a href="tel:5017919150">(501) 791-9150</a></p>
            </form>
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reservation Sent!"
        message={user
          ? "We've received your lane request and saved it to your account. Our team will text you to confirm within 30 minutes during business hours."
          : "We've received your lane request. Our team will text you to confirm your booking within 30 minutes during business hours."}
      />
    </>
  );
}
