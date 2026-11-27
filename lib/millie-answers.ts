// Millie's predefined answers. No AI: each answer is matched by keywords.
// Confirmed by Millennium Bowl management (Nov 26–27, 2026) and the website. Edit the text here to change an answer.
// Facts that appear in several places (phone, hours, links) live in lib/millie/facts.ts.

import { PHONE, EMAIL, ADDRESS, HOURS_TEXT, KITCHEN_TEXT, GIFT_URL, ORDER_URL, PROSHOP_PHONE } from './millie/facts';

export type Tool = 'calc' | 'party' | 'quiz' | 'menu' | 'enquiry-lane' | 'enquiry-group';

// A quick-reply button: opens a topic, starts a tool, calls, or opens a link.
export type Reply = { label: string; topic?: string; tool?: Tool; call?: boolean; href?: string };

export type Topic = {
  id: string;
  label?: string;           // shown as a quick button when set
  keywords: string[];       // lower-case words or phrases that trigger this answer
  answer: string;
  tool?: Tool;              // start this interactive tool right after the answer
  follow?: Reply[];         // suggested next steps shown under the answer
  showPartyForm?: boolean;  // kept for compatibility; party topics now open the planner
};

const CALL: Reply = { label: `📞 Call ${PHONE}`, call: true };

export const TOPICS: Topic[] = [
  {
    id: 'hours',
    label: 'Hours',
    keywords: ['hour', 'open', 'close', 'closing', 'opening', 'time', 'today', 'tonight', 'late'],
    answer: `We're open ${HOURS_TEXT}. December holiday hours will be posted by the first week of December. Call ${PHONE} with any questions.`,
    follow: [{ label: 'Kitchen hours', topic: 'kitchen' }, { label: 'Glow Bowl', topic: 'glow' }, { label: 'Location', topic: 'location' }],
  },
  {
    id: 'holiday',
    keywords: ['christmas', 'new year', 'holiday', 'thanksgiving', 'nye', 'december'],
    answer: `Our December holiday hours (Christmas Eve, Christmas Day, New Year's Eve and New Year's Day) will be posted by the first week of December. Please call ${PHONE} for the latest.`,
    follow: [{ label: 'Regular hours', topic: 'hours' }, { label: 'Gift cards', topic: 'giftcards' }, CALL],
  },
  {
    id: 'kitchen',
    keywords: ['kitchen hours', 'kitchen open', 'kitchen close', 'kitchen closes', 'food until', 'serve food', 'serving food', 'grill'],
    answer: `Our kitchen is open ${KITCHEN_TEXT}.`,
    follow: [{ label: '🍕 See the menu', tool: 'menu' }, { label: 'Order online', href: ORDER_URL }],
  },
  {
    id: 'calc',
    label: '🧮 Cost calculator',
    keywords: ['calculate', 'calculator', 'estimate', 'total cost', 'how much would', 'how much will', 'would it cost', 'will it cost', 'cost for', 'budget'],
    answer: "Let's work it out! Pick your day, time and group size below. I'll compare paying per game with renting lanes by the hour.",
    tool: 'calc',
  },
  {
    id: 'prices',
    label: 'Lane prices',
    keywords: ['price', 'cost', 'how much', 'rate', 'lane', 'per hour', 'bowling cost', 'charge', 'game', 'people', 'bowlers', 'per person', 'per game'],
    answer:
      'Per game (per person): $4.99 Mon, Wed, Thu & Fri before 5 PM · $5.59 Mon, Wed & Thu after 5 PM · $5.59 Saturday before 5 PM · $2.99 all day Tuesday & Sunday.\n' +
      'Lane rental: $24.99 per lane per hour Mon–Fri before 5 PM, $33.99 evenings and weekends, up to 6 bowlers per lane. Friday and Saturday after 5 PM are lane rental only.\n' +
      'Shoes $4.50 ($2.99 Tue & Sun). Senior citizens $3.25 per game. Prices are before tax.',
    follow: [{ label: '🧮 Calculate my cost', tool: 'calc' }, { label: '$2.99 specials', topic: 'specials' }, { label: 'Reserve a lane', topic: 'reserve' }],
  },
  {
    id: 'seniors',
    keywords: ['senior discount', 'senior rate', 'senior price', 'senior citizen', 'seniors', 'elderly', 'retired', 'retiree'],
    answer: 'Senior citizens bowl for $3.25 per game. Please ask at the front desk.',
    follow: [{ label: '🧮 Calculate my cost', tool: 'calc' }, { label: 'Senior leagues', topic: 'leagues' }],
  },
  {
    id: 'specials',
    label: 'Specials',
    keywords: ['special', 'deal', 'discount', 'cheap', 'tuesday', 'sunday', '2.99', 'coupon', 'school', 'group rate'],
    answer:
      'Every Tuesday and Sunday: $2.99 per game and $2.99 shoes, all day. Walk-ins welcome!\n' +
      `Senior citizens bowl for $3.25 per game. We also list a school special ($3.50 per game) and a group rate ($4.00 per game). Call ${PHONE} to see if your group qualifies.`,
    follow: [{ label: '🧮 Calculate my cost', tool: 'calc' }, { label: 'Hours', topic: 'hours' }],
  },
  {
    id: 'shoes',
    keywords: ['shoe', 'rental', 'sock', 'socks'],
    answer: 'Shoe rental is $4.50, or $2.99 on Tuesdays and Sundays. Socks are $5.99 if you need a pair.',
    follow: [{ label: 'Lane prices', topic: 'prices' }, { label: '🧮 Calculate my cost', tool: 'calc' }],
  },
  {
    id: 'glow',
    keywords: ['glow', 'cosmic', 'dj', 'music', 'friday night', 'saturday night', 'party night'],
    answer: 'Glow Bowl lights up Friday and Saturday after 9 PM, with a DJ on Saturdays. We are open until 2 AM on Friday and Saturday. Friday and Saturday after 5 PM are lane rental: $33.99 per lane per hour, up to 6 bowlers.',
    follow: [{ label: '🧮 Calculate my cost', tool: 'calc' }, { label: 'Reserve a lane', topic: 'reserve' }],
  },
  {
    id: 'reserve',
    keywords: ['reserve', 'reservation', 'book a lane', 'booking', 'available', 'availability', 'wait', 'walk in', 'walk-in'],
    answer: `For lane reservations and availability, please call us at ${PHONE}. You can also send a lane request and our team will get back to you. I can't confirm availability here.`,
    follow: [CALL, { label: '📝 Send a lane request', tool: 'enquiry-lane' }, { label: '🧮 Calculate my cost', tool: 'calc' }],
  },
  {
    id: 'birthday',
    label: 'Birthday parties',
    keywords: ['birthday', 'bday', 'party', 'parties', 'package', 'celebrat', 'kids party'],
    answer: `We have two birthday packages (plus tax, deposit required): the Spare Package for $240 (lanes and bowling, ideal for smaller groups) and the Strike Package for $280 (lanes and bowling, great for larger groups). Plan your party below and our party team will reach out, or call ${PHONE}.`,
    tool: 'party',
    showPartyForm: true,
  },
  {
    id: 'groups',
    keywords: ['corporate', 'company', 'office', 'team', 'work party', 'group', 'school', 'church', 'field trip', 'fundraiser', 'event', 'holiday party', 'buyout', 'lock-in'],
    answer: `We love hosting groups, companies, schools and churches! Call ${PHONE} or leave your details below and our team will put a package together for you.`,
    tool: 'enquiry-group',
    showPartyForm: true,
  },
  {
    id: 'giftcards',
    label: 'Gift cards',
    keywords: ['gift', 'gift card', 'gift cards', 'giftcard', 'egift', 'balance', 'present', 'stocking'],
    answer: 'Gift cards come in $25, $50, $100 or $200 and work for bowling, food, drinks and the arcade. They never expire and have no fees. Buy one online (eGift cards arrive by email) or at the front desk. You can check a balance on the same page.',
    follow: [{ label: '🎁 Buy a gift card', href: GIFT_URL }, { label: 'Hours', topic: 'hours' }],
  },
  {
    id: 'payment',
    keywords: ['credit card', 'debit', 'cash', 'pay', 'payment', 'visa', 'mastercard', 'card'],
    answer: 'We accept credit cards and cash.',
    follow: [{ label: 'Lane prices', topic: 'prices' }, { label: 'Gift cards', topic: 'giftcards' }],
  },
  {
    id: 'leagues',
    label: 'Leagues',
    keywords: ['league', 'team bowling', 'join', 'season', 'senior league', 'ladies', 'mixed'],
    answer: `We have 18 leagues bowling Monday through Sunday, from mixed and seniors to ladies' leagues. To join, use the sign-up form on our Leagues page or call ${PHONE}.`,
    follow: [{ label: 'Leagues page', href: '/leagues' }, CALL],
  },
  {
    id: 'food',
    label: 'Food & menu',
    keywords: ['food', 'menu', 'eat', 'pizza', 'wings', 'kitchen', 'snack', 'hungry', 'order', 'nacho', 'burger', 'fries'],
    answer: `Our kitchen serves pizza, wings, appetizers, baskets and more. It is open ${KITCHEN_TEXT}. Browse the menu below, or order online.`,
    tool: 'menu',
  },
  {
    id: 'quiz',
    label: '✨ What should we do?',
    keywords: ['what should we do', 'what to do', 'recommend', 'suggest', 'ideas', 'bored', 'fun things', 'things to do', 'quiz'],
    answer: 'Answer 3 quick questions and I will suggest the best way to spend your visit.',
    tool: 'quiz',
  },
  {
    id: 'bar',
    keywords: ['bar', 'beer', 'drink', 'alcohol', 'cocktail', 'margarita', 'liquor', 'wine', '21', 'age', 'adult', 'kids allowed', 'kids', 'children', 'minor', 'family', 'teen', 'under 21'],
    answer: 'Everyone is welcome! All 32 lanes and the kitchen are open to all ages, kids and families included, at all hours. Only the bar is adults only (21+).',
    follow: [{ label: 'Bar menu', href: '/bar' }, { label: 'Bumpers & ramps', topic: 'access' }],
  },
  {
    id: 'arcade',
    keywords: ['arcade', 'pool', 'billiard', 'shuffleboard', 'skee', 'games', 'f1', 'simulator', 'racing'],
    answer: 'We have arcade games, pool tables, shuffleboard and skee-ball. Our F1 racing simulator is coming soon!',
    follow: [{ label: '✨ What should we do?', tool: 'quiz' }, { label: 'Hours', topic: 'hours' }],
  },
  {
    id: 'proshop',
    keywords: ['pro shop', 'proshop', 'ball', 'drill', 'bowl 101', 'ebonite', 'equipment', 'bag'],
    answer: `Our pro shop is Bowl 101, run by Brian Kennedy, the Ebonite Gold exclusive in central Arkansas. Call ${PROSHOP_PHONE} or visit bowl101.net.`,
  },
  {
    id: 'access',
    keywords: ['parking', 'park', 'wheelchair', 'accessible', 'handicap', 'disab', 'bumper', 'ramp', 'little kids', 'toddler'],
    answer: 'Yes! We have free parking, we are wheelchair accessible, and we have bumpers and bowling ramps for kids.',
    follow: [{ label: 'Birthday parties', topic: 'birthday' }, { label: 'Location', topic: 'location' }],
  },
  {
    id: 'location',
    label: 'Location',
    keywords: ['where', 'address', 'location', 'direction', 'located', 'map', 'phone', 'call', 'contact', 'email'],
    answer: `We're at ${ADDRESS}. Call ${PHONE} or email ${EMAIL}.`,
    follow: [{ label: '🗺️ Get directions', href: 'https://maps.google.com/?q=7200+Counts+Massie+Rd,+North+Little+Rock,+AR+72113' }, CALL],
  },
  {
    id: 'membership',
    keywords: ['member', 'membership', 'subscription', 'monthly pass', 'vip'],
    answer: `Memberships are coming soon! Follow us on Facebook or call ${PHONE} for updates.`,
  },
  {
    id: 'kbf',
    keywords: ['kids bowl free', 'bowl free', 'free bowling', 'free games'],
    answer: 'Kids Bowl Free is no longer offered, but Tuesdays and Sundays are just $2.99 a game and $2.99 shoes all day!',
  },
  {
    id: 'ads',
    keywords: ['advertis', 'sponsor', 'lane screen', 'promote my business'],
    answer: `We offer advertising on our 32 lane screens for local businesses. Call ${PHONE} for rates.`,
  },
  {
    id: 'manager',
    keywords: ['complaint', 'refund', 'lost', 'found', 'job', 'hiring', 'apply', 'manager', 'problem', 'charged', 'unhappy'],
    answer: `A manager will be happy to help. Please call ${PHONE} or email ${EMAIL}.`,
    follow: [CALL],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'awesome', 'great', 'cool', 'ok', 'okay', 'bye'],
    answer: "You're welcome! See you on the lanes.",
  },
  {
    id: 'hello',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hi there! What can I help you with? You can ask about hours, prices, parties, gift cards, leagues and more.',
  },
];

export const FALLBACK = `I'm not sure about that one. Please call us at ${PHONE}, or pick a topic below.`;

const GENERAL = new Set(['prices', 'hours', 'location', 'thanks', 'hello', 'bar', 'payment']);

// Score each topic by how many of its keywords appear in the question; best match wins.
export function findAnswer(question: string): Topic | null {
  const q = ` ${question.toLowerCase().replace(/[^a-z0-9.+\s-]/g, ' ').replace(/\s+/g, ' ')} `;
  let best: Topic | null = null;
  let bestScore = 0;
  for (const t of TOPICS) {
    let score = 0;
    for (const k of t.keywords) {
      const short = k.length <= 3;
      if (short ? q.includes(` ${k} `) : q.includes(k)) score += k.includes(' ') ? 2 : 1;
    }
    // General topics lose ties, so "how much is a birthday party" goes to parties, not lane prices.
    if (score > 0 && GENERAL.has(t.id)) score -= 0.5;
    if (score > bestScore) { best = t; bestScore = score; }
  }
  return best;
}

export function topicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
