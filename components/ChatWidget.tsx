'use client';

import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
  role: 'assistant',
  content: "Hi! I'm Millie, Millennium Bowl's helper. Ask me about lane prices, hours, parties, leagues or gift cards.",
};
const QUICK = ["Today's hours", 'Lane prices', 'Gift cards', 'Leagues'];

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2.5c1.6 0 2.4 1.4 2.4 3 0 1.3-.7 2-.7 3.2 0 1.6 2.8 3.6 2.8 7.4 0 3.4-2 5.4-4.5 5.4s-4.5-2-4.5-5.4c0-3.8 2.8-5.8 2.8-7.4 0-1.2-.7-1.9-.7-3.2 0-1.6.8-3 2.4-3z" />
      <path d="M10.2 9.6h3.6" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showForm, sent, open]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Sorry, something went wrong. Please call (501) 791-9150.' }]);
    } finally {
      setBusy(false);
    }
  }

  async function sendParty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: get('name'),
        phone: get('phone'),
        email: get('email'),
        message: `Party request from Millie (website chat). Date: ${get('date') || 'not given'}. Guests: ${get('guests') || 'not given'}. Notes: ${get('notes') || 'none'}.`,
        source: 'chatbot-party',
      }),
    }).catch(() => undefined);
    setShowForm(false);
    setSent(true);
  }

  return (
    <>
      {open && (
        <div className="millie-panel" role="dialog" aria-label="Chat with Millie">
          <div className="millie-head">
            <div className="millie-avatar"><PinIcon /></div>
            <div className="millie-title">
              <span className="millie-name">Millie</span>
              <span className="millie-sub">Millennium Bowl helper</span>
            </div>
            <button className="millie-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="millie-list" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'millie-msg millie-user' : 'millie-msg millie-bot'}>{m.content}</div>
            ))}
            {messages.length === 1 && (
              <div className="millie-chips">
                {QUICK.map((q) => (
                  <button key={q} className="millie-chip" onClick={() => ask(q)}>{q}</button>
                ))}
                <button className="millie-chip millie-chip-pink" onClick={() => setShowForm(true)}>Plan a party</button>
              </div>
            )}
            {busy && <div className="millie-msg millie-bot millie-typing">Millie is typing…</div>}
            {showForm && (
              <form className="millie-form" onSubmit={sendParty}>
                <span className="millie-form-title">Party request</span>
                <label>Your name<input name="name" required autoComplete="name" /></label>
                <label>Phone<input name="phone" type="tel" required autoComplete="tel" /></label>
                <label>Email (optional)<input name="email" type="email" autoComplete="email" /></label>
                <div className="millie-form-row">
                  <label>Date<input name="date" placeholder="e.g. Sat, Dec 12" /></label>
                  <label>Guests<input name="guests" placeholder="e.g. 10 kids" /></label>
                </div>
                <label>Anything else?<input name="notes" placeholder="Birthday, company party…" /></label>
                <button type="submit" className="millie-submit">Send to the party team</button>
              </form>
            )}
            {sent && <div className="millie-msg millie-bot">Thanks! Our party team will contact you soon. Questions now? Call (501) 791-9150.</div>}
          </div>

          <form className="millie-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <label htmlFor="millie-text" className="millie-sr">Message</label>
            <input id="millie-text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Millie a question…" maxLength={500} autoComplete="off" />
            <button type="submit" aria-label="Send" disabled={busy || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
          <p className="millie-foot">Answers come from Millennium Bowl&apos;s info. For bookings call (501) 791-9150.</p>
        </div>
      )}
      <button className="millie-launcher" aria-label={open ? 'Close chat with Millie' : 'Chat with Millie'} onClick={() => setOpen(!open)}>
        {open ? <span aria-hidden="true">×</span> : <PinIcon />}
      </button>
    </>
  );
}
