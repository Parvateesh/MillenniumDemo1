'use client';

import { useState } from 'react';
import type { Memory } from '@/lib/millie/memory';
import { NOT_A_BOOKING, PHONE, PHONE_TEL } from '@/lib/millie/facts';

export type EnquiryKind = 'party' | 'lane' | 'group';

const TITLES: Record<EnquiryKind, string> = { party: 'Party request', lane: 'Lane request', group: 'Group / event request' };
const SOURCES: Record<EnquiryKind, string> = { party: 'chatbot-party', lane: 'chatbot-lane', group: 'chatbot-group' };

type Props = {
  kind: EnquiryKind;
  memory: Memory;
  note?: string;                           // extra details to include, e.g. a calculator summary
  remember: (patch: Partial<Memory>) => void;
  onSent: (summary: string) => void;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Sends a request to the team through /api/contact. It never confirms a booking.
export default function EnquiryForm({ kind, memory, note, remember, onSent }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const name = get('name');
    const phone = get('phone');
    const email = get('email');
    if (!name || phone.replace(/\D/g, '').length < 7) {
      setError('Please enter your name and a phone number we can call.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That email address does not look right.');
      return;
    }
    const date = get('date');
    const guests = get('guests');
    const notes = get('notes');
    remember({ name, phone, email: email || undefined });
    setError('');
    setStatus('sending');

    const lines = [
      `${TITLES[kind]} from Millie (website chat).`,
      `Date: ${date || 'not given'}.`,
      `Guests: ${guests || 'not given'}.`,
      note ? `Details: ${note}` : '',
      `Notes: ${notes || 'none'}.`,
    ].filter(Boolean);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message: lines.join(' '), source: SOURCES[kind], website: get('website') }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      onSent(`Thanks, ${name.split(' ')[0]}! Your ${TITLES[kind].toLowerCase()} was sent. ${NOT_A_BOOKING} Questions now? Call ${PHONE}.`);
    } catch {
      setStatus('error');
      setError(`Sorry, that didn't send. Please try again, or call ${PHONE}.`);
    }
  }

  if (status === 'sent') {
    return <div className="millie-card millie-sent">✅ Request sent. {NOT_A_BOOKING}</div>;
  }

  return (
    <form className="millie-form" onSubmit={submit} noValidate>
      <span className="millie-form-title">{TITLES[kind]}</span>
      <label>Your name<input name="name" required autoComplete="name" defaultValue={memory.name} /></label>
      <label>Phone<input name="phone" type="tel" required autoComplete="tel" inputMode="tel" defaultValue={memory.phone} /></label>
      <label>Email (optional)<input name="email" type="email" autoComplete="email" defaultValue={memory.email} /></label>
      <div className="millie-form-row">
        <label>Date<input name="date" placeholder="e.g. Sat, Dec 12" defaultValue={memory.partyDate} /></label>
        <label>Guests<input name="guests" inputMode="numeric" placeholder="e.g. 10" defaultValue={memory.partyGuests ?? memory.bowlers} /></label>
      </div>
      <label>Anything else?<input name="notes" placeholder={kind === 'group' ? 'Company, school, church…' : kind === 'lane' ? 'Preferred time…' : 'Birthday child, food…'} /></label>
      {/* Hidden from people; bots that fill it are ignored by the server. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="millie-hp" aria-hidden="true" />
      {error && <p className="millie-error" role="alert">{error}</p>}
      <button type="submit" className="millie-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
      <p className="millie-fine">{NOT_A_BOOKING} Prefer to talk? <a className="millie-link" href={PHONE_TEL}>Call {PHONE}</a></p>
    </form>
  );
}
