'use client';

import { useState, FormEvent, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';
import ConfirmModal from '@/components/ConfirmModal';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          topic: topicRef.current?.value,
          message: messageRef.current?.value,
        }),
      });
    } catch {
      // still show success — don't leave user hanging
    } finally {
      setSending(false);
    }
    const btn = e.currentTarget.querySelector<HTMLButtonElement>('[type="submit"]');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      confettiBurst(rect.left + rect.width / 2, rect.top, 50);
    }
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
                  <div className="form-group"><label>First Name</label><input type="text" ref={firstNameRef} required /></div>
                  <div className="form-group"><label>Last Name</label><input type="text" ref={lastNameRef} required /></div>
                </div>
                <div className="form-group"><label>Email</label><input type="email" ref={emailRef} required /></div>
                <div className="form-group"><label>Phone</label><input type="tel" ref={phoneRef} /></div>
                <div className="form-group">
                  <label>What&apos;s This About?</label>
                  <select ref={topicRef}><option>General question</option><option>Birthday party</option><option>Corporate event</option><option>League info</option><option>Pro shop</option><option>Feedback</option></select>
                </div>
                <div className="form-group"><label>Message</label><textarea ref={messageRef} required placeholder="Tell us what you need..."></textarea></div>
                <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                  {sending ? 'Sending…' : 'Send Message →'}
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
        message="Thank you for reaching out to Millennium Bowl. Our team will review your message and get back to you within one business day."
      />
    </>
  );
}
