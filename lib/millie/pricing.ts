// Bowling prices exactly as published on millenniumbowllr.com (homepage pricing section),
// plus the senior rate confirmed by management (Nov 27, 2026). Prices are before tax.

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type TimeOfDay = 'before5' | 'after5';

export const DAYS: { id: Day; label: string }[] = [
  { id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }, { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' }, { id: 'fri', label: 'Fri' }, { id: 'sat', label: 'Sat' }, { id: 'sun', label: 'Sun' },
];

export const MAX_PER_LANE = 6;
export const SENIOR_GAME = 3.25;
export const SOCKS = 5.99;
// Estimate only, using the rates set in Square: bowling 9.5%, shoe rental 10.5%.
export const TAX = { bowling: 0.095, shoes: 0.105 };

export type Rates = {
  perGame: number | null;   // null = per-game bowling not offered then (lane rental only)
  lanePerHour: number;
  shoes: number;
  special: boolean;         // Tuesday / Sunday $2.99 day
};

export function getRates(day: Day, time: TimeOfDay): Rates {
  const before5 = time === 'before5';
  if (day === 'tue' || day === 'sun') {
    // $2.99 games and shoes all day. Lanes can still be rented by the hour at the normal rates.
    const lane = day === 'tue' && before5 ? 24.99 : 33.99;
    return { perGame: 2.99, lanePerHour: lane, shoes: 2.99, special: true };
  }
  if (day === 'fri') {
    return before5
      ? { perGame: 4.99, lanePerHour: 24.99, shoes: 4.5, special: false }
      : { perGame: null, lanePerHour: 33.99, shoes: 4.5, special: false }; // Fri after 5 PM: lane rental only
  }
  if (day === 'sat') {
    return before5
      ? { perGame: 5.59, lanePerHour: 33.99, shoes: 4.5, special: false }
      : { perGame: null, lanePerHour: 33.99, shoes: 4.5, special: false }; // Sat after 5 PM: lane rental only
  }
  // Mon, Wed, Thu
  return before5
    ? { perGame: 4.99, lanePerHour: 24.99, shoes: 4.5, special: false }
    : { perGame: 5.59, lanePerHour: 33.99, shoes: 4.5, special: false };
}

export type CalcInput = {
  day: Day;
  time: TimeOfDay;
  bowlers: number;
  seniors: number;   // how many of the bowlers are senior citizens
  games: number;     // games per person (per-game option)
  hours: number;     // hours (lane rental option)
  shoes: number;     // pairs of rental shoes
};

export type Option = { label: string; lines: string[]; bowling: number; shoes: number; subtotal: number; tax: number; total: number };

export type CalcResult = {
  rates: Rates;
  lanes: number;
  perGame: Option | null;
  lane: Option;
  best: 'perGame' | 'lane';
  savings: number;
  notes: string[];
};

const round = (n: number) => Math.round(n * 100) / 100;
export const money = (n: number) => `$${n.toFixed(2)}`;

export function clampInput(i: CalcInput): CalcInput {
  const bowlers = Math.min(60, Math.max(1, Math.round(i.bowlers || 1)));
  return {
    ...i,
    bowlers,
    seniors: Math.min(bowlers, Math.max(0, Math.round(i.seniors || 0))),
    games: Math.min(10, Math.max(1, Math.round(i.games || 1))),
    hours: Math.min(8, Math.max(1, Math.round(i.hours || 1))),
    shoes: Math.min(bowlers, Math.max(0, Math.round(i.shoes ?? bowlers))),
  };
}

export function calculate(raw: CalcInput): CalcResult {
  const i = clampInput(raw);
  const rates = getRates(i.day, i.time);
  const lanes = Math.ceil(i.bowlers / MAX_PER_LANE);
  const shoeCost = round(i.shoes * rates.shoes);
  const shoeLine = i.shoes > 0 ? [`${i.shoes} × shoes at ${money(rates.shoes)} = ${money(shoeCost)}`] : [];
  const build = (label: string, lines: string[], bowling: number): Option => {
    const tax = round(bowling * TAX.bowling + shoeCost * TAX.shoes);
    const subtotal = round(bowling + shoeCost);
    return { label, lines: [...lines, ...shoeLine], bowling: round(bowling), shoes: shoeCost, subtotal, tax, total: round(subtotal + tax) };
  };

  let perGame: Option | null = null;
  if (rates.perGame !== null) {
    // Seniors pay $3.25 a game, or the day's price if that is lower (e.g. $2.99 days).
    const seniorRate = Math.min(SENIOR_GAME, rates.perGame);
    const regular = i.bowlers - i.seniors;
    const lines: string[] = [];
    if (regular > 0) lines.push(`${regular} × ${i.games} game${i.games > 1 ? 's' : ''} at ${money(rates.perGame)} = ${money(round(regular * i.games * rates.perGame))}`);
    if (i.seniors > 0) lines.push(`${i.seniors} senior${i.seniors > 1 ? 's' : ''} × ${i.games} game${i.games > 1 ? 's' : ''} at ${money(seniorRate)} = ${money(round(i.seniors * i.games * seniorRate))}`);
    perGame = build('Pay per game', lines, regular * i.games * rates.perGame + i.seniors * i.games * seniorRate);
  }

  const laneBowling = lanes * i.hours * rates.lanePerHour;
  const lane = build('Rent lanes by the hour', [
    `${lanes} lane${lanes > 1 ? 's' : ''} × ${i.hours} hour${i.hours > 1 ? 's' : ''} at ${money(rates.lanePerHour)} = ${money(round(laneBowling))}`,
  ], laneBowling);

  const best = perGame && perGame.subtotal <= lane.subtotal ? 'perGame' : 'lane';
  const savings = perGame ? round(Math.abs(perGame.subtotal - lane.subtotal)) : 0;

  const notes: string[] = [];
  if (rates.perGame === null) notes.push('Friday and Saturday after 5 PM are lane rental only.');
  if (rates.special) notes.push('Tuesday and Sunday special: $2.99 games and $2.99 shoes all day.');
  if (i.seniors > 0) notes.push('Senior citizen rate is $3.25 per game. Please ask at the front desk.');
  notes.push(`Up to ${MAX_PER_LANE} bowlers per lane. Prices are before tax; the tax shown is an estimate.`);
  notes.push('Holiday prices may differ. Call to check lane availability.');
  return { rates, lanes, perGame, lane, best, savings, notes };
}

// Day and time "now" in North Little Rock (Central time).
export function nowInNLR(date = new Date()): { day: Day; time: TimeOfDay } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(date);
  const wd = (parts.find((p) => p.type === 'weekday')?.value ?? 'Mon').slice(0, 3).toLowerCase() as Day;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12) % 24;
  // After midnight (open until 2 AM) still counts as the previous evening.
  if (hour < 3) {
    const order: Day[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return { day: order[(order.indexOf(wd) + 6) % 7], time: 'after5' };
  }
  return { day: wd, time: hour >= 17 ? 'after5' : 'before5' };
}
