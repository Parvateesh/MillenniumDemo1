'use client';

import { useSyncExternalStore } from 'react';

const DEFAULT_TAG = 'Open Fri & Sat Until 2 AM';

// Holiday hours shown in the homepage hero tag on the listed dates (Central time).
// Add a line for each holiday; the normal tag comes back automatically afterwards.
const HOLIDAY_TAGS: { from: string; to: string; text: string }[] = [
  { from: '2026-11-23', to: '2026-11-25', text: 'Thanksgiving Day: Open 3 PM – 11 PM' },
  { from: '2026-11-26', to: '2026-11-26', text: 'Open Today, Thanksgiving: 3 PM – 11 PM' },
];

function todayInCentral(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function currentTag(): string {
  const today = todayInCentral();
  return HOLIDAY_TAGS.find((h) => today >= h.from && today <= h.to)?.text ?? DEFAULT_TAG;
}

const subscribe = () => () => {};

export default function HeroTag() {
  // Server render shows the normal tag; the browser swaps in holiday hours for today's date.
  const text = useSyncExternalStore(subscribe, currentTag, () => DEFAULT_TAG);
  return <span className="hero-tag">{text}</span>;
}
