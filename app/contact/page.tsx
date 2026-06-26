'use client';

import { useState, FormEvent, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';
import ConfirmModal from '@/components/ConfirmModal';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('[type="submit"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    confettiBurst(rect.left + rect.width / 2, rect.top, 50);
    setIsModalOpen(true);
    formRef.current?.reset();
  }

  return (
    <>
      <section className="hero hero-xs hero-contact">
        <div className="hero-content">
          <span className="hero-tag">Get In Touch</span>
          <h1><span className="word">Say</span> <span className="word">Hi.</span></h1>
        </div>
      </section>
      <section className="block contact-block">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item" data-animate=""><div className="contact-icon">📍</div><div><div className="contact-label">Location</div><div className="contact-value">7200 Counts Massie Rd<br />North Little Rock, AR 72113</div></div></div>
              <div className="contact-item" data-animate=""><div className="contact-icon">📞</div><div><div className="contact-label">Phone</div><div className="contact-value"><a href="tel:5017919150">(501) 791-9150</a></div></div></div>
              <div className="contact-item" data-animate=""><div className="contact-icon">✉️</div><div><div className="contact-label">Email</div><div className="contact-value"><a href="mailto:info@millenniumbowllr.com">info@millenniumbowllr.com</a></div></div></div>
              <div className="contact-item" data-animate="">
                <div className="contact-icon">🕒</div>
                <div>
                  <div className="contact-label">Hours</div>
                  <ul className="hours-list">
                    <li><span className="day">Mon–Thu</span><span>9 AM — 12 AM</span></li>
                    <li><span className="day">Fri</span><span>9 AM — 2 AM</span></li>
                    <li><span className="day">Sat</span><span>9 AM — 2 AM</span></li>
                    <li><span className="day">Sun</span><span>10 AM — 12 AM</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="contact-form" data-animate="">
              <h3 className="form-heading">Send Us a Message</h3>
              <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label>First Name</label><input type="text" required /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" required /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" required /></div>
                <div className="form-group"><label>Phone</label><input type="tel" /></div>
                <div className="form-group">
                  <label>What&apos;s This About?</label>
                  <select><option>General question</option><option>Birthday party</option><option>Corporate event</option><option>League info</option><option>Pro shop</option><option>Feedback</option></select>
                </div>
                <div className="form-group"><label>Message</label><textarea required placeholder="Tell us what you need..."></textarea></div>
                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Message Sent!"
        message="Thank you for reaching out to Millennium Bowl. Our event team will review your message and get back to you shortly."
      />
    </>
  );
}
