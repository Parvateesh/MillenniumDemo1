// What Millie remembers during a visit (group size, day, kids, party details).
// Kept in sessionStorage only: it survives page changes and reloads, and is cleared by Restart
// or when the browser tab is closed.

import { nowInNLR, type Day, type TimeOfDay } from './pricing';

export type Memory = {
  bowlers?: number;
  seniors?: number;
  day?: Day;
  time?: TimeOfDay;
  kids?: boolean;
  occasion?: 'family' | 'friends' | 'date' | 'work' | 'party';
  partyDate?: string;
  partyGuests?: number;
  partyAge?: string;
  partyPackage?: string;
  name?: string;
  phone?: string;
  email?: string;
};

const DAY_WORDS: [RegExp, Day][] = [
  [/\bmon(day)?\b/, 'mon'], [/\btue(s|sday)?\b/, 'tue'], [/\bwed(nesday)?\b/, 'wed'], [/\bthu(r|rs|rsday)?\b/, 'thu'],
  [/\bfri(day)?\b/, 'fri'], [/\bsat(urday)?\b/, 'sat'], [/\bsun(day)?\b/, 'sun'],
];

// Pull simple facts out of a typed question, e.g. "how much for 8 people saturday night".
export function extractFacts(text: string): Partial<Memory> {
  const q = text.toLowerCase();
  const found: Partial<Memory> = {};

  const people = q.match(/\b(\d{1,2})\s*(people|persons|bowlers|of us|adults|kids|guests|players|friends|ppl)\b/)
    ?? q.match(/\b(?:for|party of|group of)\s*(\d{1,2})\b/);
  if (people) {
    const n = Number(people[1]);
    if (n >= 1 && n <= 60) found.bowlers = n;
  }

  for (const [re, d] of DAY_WORDS) if (re.test(q)) { found.day = d; break; }
  if (/\b(today|tonight|right now|now)\b/.test(q)) {
    const now = nowInNLR();
    found.day = found.day ?? now.day;
    if (/\btonight\b/.test(q)) found.time = 'after5';
  }
  if (/\b(night|evening|tonight|after 5|after five|late)\b/.test(q)) found.time = 'after5';
  else if (/\b(morning|afternoon|daytime|before 5|before five|lunch|noon)\b/.test(q)) found.time = 'before5';

  if (/\b(kid|kids|child|children|son|daughter|toddler|family)\b/.test(q)) found.kids = true;
  if (/\bseniors?\b/.test(q)) {
    const s = q.match(/\b(\d{1,2})\s*seniors?\b/);
    if (s) found.seniors = Number(s[1]);
  }
  return found;
}

const KEY = 'millie-chat-v2';

export type Saved<T> = { messages: T[]; memory: Memory };

export function loadSaved<T>(): Saved<T> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Saved<T>;
    return Array.isArray(data.messages) ? data : null;
  } catch {
    return null;
  }
}

export function save<T>(data: Saved<T>) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ ...data, messages: data.messages.slice(-60) }));
  } catch { /* storage full or blocked: chat still works, just not remembered */ }
}

export function clearSaved() {
  try { window.sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}
