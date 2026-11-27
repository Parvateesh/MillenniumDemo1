'use client';

// Millie, the Millennium Bowl website chat bot (predefined answers, no AI).
// This file is the chat shell: launcher, greeting bubble, chat window, history and routing.
// Answers: lib/millie-answers.ts · Facts: lib/millie/facts.ts · Prices: lib/millie/pricing.ts
// Tools (calculator, planner, quiz, menu, enquiry): components/millie/ · Styles: css/components.css + css/millie.css

import { useCallback, useEffect, useRef, useState } from 'react';
import { TOPICS, FALLBACK, findAnswer, topicById, type Reply, type Tool, type Topic } from '@/lib/millie-answers';
import { clearSaved, extractFacts, loadSaved, save, type Memory } from '@/lib/millie/memory';
import { PHONE, PHONE_TEL } from '@/lib/millie/facts';
import RichText from './millie/RichText';
import QuickReplies from './millie/QuickReplies';
import PriceCalculator from './millie/PriceCalculator';
import PartyPlanner from './millie/PartyPlanner';
import ActivityQuiz from './millie/ActivityQuiz';
import MenuBrowser from './millie/MenuBrowser';
import EnquiryForm from './millie/EnquiryForm';
import { TOOL_NAMES, type Msg, type ToolApi } from './millie/types';

const GREETING_TEXT = "Hi! I'm Millie, Millennium Bowl's chat bot 🎳 Tap a topic or type a question about hours, prices, parties, gift cards, leagues and more.";
const QUICK: Reply[] = TOPICS.filter((t) => t.label).map((t) => ({ label: t.label as string, topic: t.id }));
const TEASER_IDS = ['hours', 'prices', 'birthday'];
const TEASER = TEASER_IDS.map((id) => TOPICS.find((t) => t.id === id)).filter((t): t is Topic => Boolean(t && t.label));
const TEASER_KEY = 'millie-teaser-dismissed';
// Topics where a group size typed by the visitor should open the calculator automatically.
const PRICE_TOPICS = new Set(['prices', 'glow', 'specials', 'reserve', 'shoes', 'seniors']);

const newId = () => Math.random().toString(36).slice(2, 10);
const greeting = (): Msg => ({ id: newId(), role: 'assistant', text: GREETING_TEXT });

function initialState(): { messages: Msg[]; memory: Memory } {
  const saved = loadSaved<Msg>();
  if (!saved || saved.messages.length === 0) return { messages: [greeting()], memory: {} };
  // Restored tool cards come back collapsed; the visitor can reopen them.
  return { messages: saved.messages.map((m) => (m.tool ? { ...m, closed: true } : m)), memory: saved.memory ?? {} };
}

function typingDelay(text: string) {
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 0;
  return Math.min(1100, 350 + text.length * 6);
}

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
  const [state, setState] = useState(initialState);
  const { messages, memory } = state;
  const [input, setInput] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  // Greeting bubble once per visit.
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(TEASER_KEY) === '1'; } catch { /* storage unavailable */ }
    if (dismissed) return;
    const t = window.setTimeout(() => setTeaser(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  // Remember the conversation for this visit.
  useEffect(() => { save({ messages, memory }); }, [messages, memory]);

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open, showAll]);

  // While open: focus the input, close on Escape, lock page scroll on phones, fit the visible screen.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); launcherRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    document.documentElement.classList.add('millie-open');
    const vv = window.visualViewport;
    const fit = () => { if (vv && panelRef.current) panelRef.current.style.setProperty('--millie-vh', `${vv.height}px`); };
    fit();
    vv?.addEventListener('resize', fit);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('millie-open');
      vv?.removeEventListener('resize', fit);
    };
  }, [open]);

  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); }, []);

  const append = useCallback((...msgs: Msg[]) => {
    setState((s) => ({ ...s, messages: [...s.messages, ...msgs] }));
  }, []);

  const remember = useCallback((patch: Partial<Memory>) => {
    setState((s) => ({ ...s, memory: { ...s.memory, ...patch } }));
  }, []);

  // Millie "types", then posts. Tool cards follow the text.
  const botSay = useCallback((text: string, extra: Partial<Msg> = {}, tool?: { tool: Tool; note?: string }) => {
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setState((s) => {
        const msgs = tool ? s.messages.map((m) => (m.tool && !m.closed ? { ...m, closed: true } : m)) : s.messages;
        const add: Msg[] = [{ id: newId(), role: 'assistant', text, ...extra }];
        if (tool) add.push({ id: newId(), role: 'assistant', tool: tool.tool, note: tool.note });
        return { ...s, messages: [...msgs, ...add] };
      });
    }, typingDelay(text));
    timers.current.push(t);
  }, []);

  const openTool = useCallback((tool: Tool, note?: string, intro?: string) => {
    botSay(intro ?? `Here's the ${TOOL_NAMES[tool].replace(/^\S+\s/, '').toLowerCase()}.`, {}, { tool, note });
  }, [botSay]);

  const answerTopic = useCallback((topic: Topic | null, facts: Partial<Memory> = {}) => {
    if (!topic) {
      setShowAll(true);
      botSay(FALLBACK);
      return;
    }
    setShowAll(false);
    let follow = topic.follow;
    const n = facts.bowlers ?? memory.bowlers;
    if (n && PRICE_TOPICS.has(topic.id)) follow = [{ label: `🧮 Cost for my ${n} bowlers`, tool: 'calc' }, ...(follow ?? []).filter((f) => f.tool !== 'calc')];
    if (topic.tool) {
      botSay(topic.answer, {}, { tool: topic.tool });
    } else if (facts.bowlers && PRICE_TOPICS.has(topic.id)) {
      // Dynamic flow: the visitor gave a group size, so work out the cost straight away.
      botSay(topic.answer, { follow: topic.follow }, { tool: 'calc' });
    } else {
      botSay(topic.answer, { follow });
    }
  }, [botSay, memory.bowlers]);

  const act = useCallback((r: Reply, note?: string) => {
    if (r.topic) {
      const t = topicById(r.topic) ?? null;
      append({ id: newId(), role: 'user', text: r.label });
      answerTopic(t);
    } else if (r.tool) {
      append({ id: newId(), role: 'user', text: r.label.replace(/^\p{Extended_Pictographic}\s*/u, '') });
      setShowAll(false);
      openTool(r.tool, note);
    }
  }, [append, answerTopic, openTool]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setInput('');
    append({ id: newId(), role: 'user', text: q });
    const facts = extractFacts(q);
    if (Object.keys(facts).length) remember(facts);
    const topic = findAnswer(q);
    if (!topic && facts.bowlers) {
      answerTopic(topicById('calc') ?? null, facts);
      return;
    }
    answerTopic(topic, facts);
  }

  function hideTeaser() {
    setTeaser(false);
    try { sessionStorage.setItem(TEASER_KEY, '1'); } catch { /* storage unavailable */ }
  }

  function openChat(topic?: Topic) {
    hideTeaser();
    setOpen(true);
    if (topic) act({ label: topic.label as string, topic: topic.id });
  }

  function restart() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setTyping(false);
    clearSaved();
    setState({ messages: [{ id: newId(), role: 'assistant', text: `Fresh start! ${GREETING_TEXT}` }], memory: {} });
    setShowAll(true);
    setInput('');
    inputRef.current?.focus();
  }

  const api: ToolApi = {
    memory,
    remember,
    act,
    say: (text, follow) => botSay(text, { follow }),
  };

  function renderTool(m: Msg) {
    if (!m.tool) return null;
    if (m.closed) {
      return (
        <div key={m.id} className="millie-closed">
          <span>{TOOL_NAMES[m.tool]}</span>
          <button type="button" onClick={() => openTool(m.tool as Tool, m.note, 'Here it is again.')}>Open again</button>
        </div>
      );
    }
    const enquiry = (kind: 'lane' | 'group') => (
      <EnquiryForm kind={kind} memory={memory} note={m.note} remember={remember} onSent={(s) => api.say(s, [{ label: 'Hours', topic: 'hours' }, { label: 'Location', topic: 'location' }])} />
    );
    return (
      <div key={m.id} className="millie-tool">
        {m.tool === 'calc' && <PriceCalculator {...api} />}
        {m.tool === 'party' && <PartyPlanner {...api} />}
        {m.tool === 'quiz' && <ActivityQuiz {...api} />}
        {m.tool === 'menu' && <MenuBrowser />}
        {m.tool === 'enquiry-lane' && enquiry('lane')}
        {m.tool === 'enquiry-group' && enquiry('group')}
      </div>
    );
  }

  const last = messages[messages.length - 1];
  const replies = showAll ? QUICK : (last && !typing && last.role === 'assistant' && !last.tool ? last.follow ?? [] : []);

  return (
    <>
      {open && (
        <div className="millie-panel" role="dialog" aria-label="Chat with Millie" ref={panelRef}>
          <div className="millie-head">
            <div className="millie-avatar"><PinIcon /></div>
            <div className="millie-title">
              <span className="millie-name">Millie</span>
              <span className="millie-sub"><span className="millie-dot" aria-hidden="true" />Chat bot · instant answers</span>
            </div>
            <a className="millie-icon-btn" href={PHONE_TEL} aria-label={`Call ${PHONE}`} title={`Call ${PHONE}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            </a>
            <button type="button" className="millie-icon-btn" aria-label="Restart chat" title="Restart chat" onClick={restart}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
            <button type="button" className="millie-close" aria-label="Close chat" onClick={() => { setOpen(false); launcherRef.current?.focus(); }}>×</button>
          </div>

          <div className="millie-list" ref={listRef} aria-live="polite">
            {messages.map((m) =>
              m.tool ? renderTool(m) : (
                <div key={m.id} className={m.role === 'user' ? 'millie-msg millie-user' : 'millie-msg millie-bot'}>
                  {m.role === 'assistant' ? <RichText text={m.text ?? ''} /> : m.text}
                </div>
              ),
            )}
            {typing && (
              <div className="millie-msg millie-bot millie-typing-dots" aria-label="Millie is typing">
                <span /><span /><span />
              </div>
            )}
            {!typing && <QuickReplies replies={replies} onPick={(r) => act(r)} />}
            {!showAll && !typing && (
              <button type="button" className="millie-more" onClick={() => setShowAll(true)}>See all topics</button>
            )}
          </div>

          <form className="millie-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <label htmlFor="millie-text" className="millie-sr">Message</label>
            <input id="millie-text" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Millie a question…" maxLength={300} autoComplete="off" enterKeyHint="send" />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
          <p className="millie-foot">For bookings and anything else, call <a className="millie-link" href={PHONE_TEL}>{PHONE}</a>.</p>
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
        ref={launcherRef}
        className={open ? 'millie-launcher is-open' : 'millie-launcher'}
        aria-label={open ? 'Close chat with Millie' : 'Chat with Millie, our chat bot'}
        aria-expanded={open}
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
