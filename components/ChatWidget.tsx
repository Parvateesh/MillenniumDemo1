'use client';

import { useEffect, useRef, useState } from 'react';
import { TOPICS, FALLBACK, findAnswer, type Topic } from '@/lib/millie-answers';

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETING: Msg = {
  role: 'assistant',
  content: "Hi! I'm Millie, Millennium Bowl's helper. Tap a topic or type a question about hours, prices, parties, gift cards, leagues and more.",
};
const QUICK = TOPICS.filter((t) => t.label);
const TEASER_IDS = ['hours', 'prices', 'birthday'];
const TEASER = TEASER_IDS.map((id) => TOPICS.find((t) => t.id === id)).filter((t): t is Topic => Boolean(t && t.label));
const TEASER_KEY = 'millie-teaser-dismissed';

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
  const [showChips, setShowChips] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(TEASER_KEY) === '1'; } catch { /* storage unavailable */ }
    if (dismissed) return;
    const t = window.setTimeout(() => setTeaser(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  function hideTeaser() {
    setTeaser(false);
    try { sessionStorage.setItem(TEASER_KEY, '1'); } catch { /* storage unavailable */ }
  }

  function openChat(topic?: Topic) {
    hideTeaser();
    setOpen(true);
    if (topic) reply(topic.label as string, topic);
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showForm, sent, open, showChips]);

  function reply(question: string, topic: Topic | null) {
    setMessages((m) => [...m, { role: 'user', content: question }, { role: 'assistant', content: topic ? topic.answer : FALLBACK }]);
    setShowChips(!topic);
    if (topic?.showPartyForm && !sent) setShowForm(true);
  }

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setInput('');
    reply(q, findAnswer(q));
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
              <span className="millie-sub"><span className="millie-dot" aria-hidden="true" />Chat bot · instant answers</span>
            </div>
            <button className="millie-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="millie-list" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'millie-msg millie-user' : 'millie-msg millie-bot'}>{m.content}</div>
            ))}
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
            {showChips ? (
              <div className="millie-chips">
                {QUICK.map((t) => (
                  <button key={t.id} className={t.showPartyForm ? 'millie-chip millie-chip-pink' : 'millie-chip'} onClick={() => reply(t.label as string, t)}>{t.label}</button>
                ))}
              </div>
            ) : (
              <button className="millie-more" onClick={() => setShowChips(true)}>See all topics</button>
            )}
          </div>

          <form className="millie-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <label htmlFor="millie-text" className="millie-sr">Message</label>
            <input id="millie-text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Millie a question…" maxLength={300} autoComplete="off" />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
          <p className="millie-foot">For bookings and anything else, call (501) 791-9150.</p>
        </div>
      )}
      {teaser && !open && (
        <div className="millie-teaser" role="status">
          <button className="millie-teaser-x" aria-label="Hide message" onClick={hideTeaser}>×</button>
          <p className="millie-teaser-hi"><span aria-hidden="true">👋</span> Hi, I&apos;m Millie!</p>
          <p className="millie-teaser-text">I&apos;m Millennium Bowl&apos;s chat bot. Ask me anything about bowling, food, parties or gift cards.</p>
          <div className="millie-teaser-chips">
            {TEASER.map((t) => (
              <button key={t.id} className="millie-chip" onClick={() => openChat(t)}>{t.label}</button>
            ))}
          </div>
        </div>
      )}
      <button
        className={open ? 'millie-launcher is-open' : 'millie-launcher'}
        aria-label={open ? 'Close chat with Millie' : 'Chat with Millie, our chat bot'}
        onClick={() => (open ? setOpen(false) : openChat())}
      >
        <span className="millie-launch-icon">
          {open ? <span aria-hidden="true">×</span> : <PinIcon />}
          {!open && <span className="millie-launch-badge" aria-hidden="true">?</span>}
        </span>
        {!open && (
          <span className="millie-launch-text" aria-hidden="true">
            <span className="millie-launch-title">Ask Millie</span>
            <span className="millie-launch-sub"><span className="millie-dot" />Chat bot · online</span>
          </span>
        )}
      </button>
    </>
  );
}
