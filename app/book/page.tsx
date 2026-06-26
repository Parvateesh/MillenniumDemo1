'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';

import ConfirmModal from '@/components/ConfirmModal';

export default function BookPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (dateRef.current) {
      const today = new Date().toISOString().split('T')[0];
      dateRef.current.min = today;
      dateRef.current.value = today;
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('[type="submit"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    confettiBurst(rect.left + rect.width / 2, rect.top, 50);
    setIsModalOpen(true);
    formRef.current?.reset();
    if (dateRef.current) {
      const today = new Date().toISOString().split('T')[0];
      dateRef.current.min = today;
      dateRef.current.value = today;
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
                <div className="form-group"><label>Time</label><input type="time" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Number of Lanes</label>
                  <select><option>1 lane (up to 6 people)</option><option>2 lanes (up to 12 people)</option><option>3 lanes (up to 18 people)</option><option>4+ lanes — talk to us about events</option></select>
                </div>
                <div className="form-group"><label>Total Bowlers</label><input type="number" min="1" max="50" required /></div>
              </div>
              <div className="form-group">
                <label>Booking Type</label>
                <select><option>Casual / Walk-in style</option><option>Birthday party (8+ kids)</option><option>Corporate event</option><option>League play</option><option>Glow Bowl</option></select>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" required /></div>
                <div className="form-group"><label>Phone</label><input type="tel" required /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" required /></div>
              <div className="form-group"><label>Anything Special? (Optional)</label><textarea placeholder="Birthday cake, food order, accessibility needs..."></textarea></div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                data-confetti=""
              >
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
        message="We've received your lane request. Our team will text you to confirm your booking within 30 minutes during business hours."
      />
    </>
  );
}
