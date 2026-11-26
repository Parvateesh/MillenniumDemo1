// Millie's predefined answers. No AI: each answer is matched by keywords.
// Confirmed by Millennium Bowl management, Nov 26, 2026. Edit the text here to change an answer.

export type Topic = {
  id: string;
  label?: string;           // shown as a quick button when set
  keywords: string[];       // lower-case words or phrases that trigger this answer
  answer: string;
  showPartyForm?: boolean;  // offer the party request form after answering
};

const PHONE = '(501) 791-9150';

export const TOPICS: Topic[] = [
  {
    id: 'hours',
    label: 'Hours',
    keywords: ['hour', 'open', 'close', 'closing', 'opening', 'time', 'today', 'tonight', 'late'],
    answer: `We're open Monday–Thursday 9 AM–12 AM, Friday–Saturday 9 AM–2 AM, and Sunday 10 AM–12 AM. December holiday hours will be posted by the first week of December. Call ${PHONE} with any questions.`,
  },
  {
    id: 'holiday',
    keywords: ['christmas', 'new year', 'holiday', 'thanksgiving', 'nye', 'december'],
    answer: `Our December holiday hours (Christmas Eve, Christmas Day, New Year's Eve and New Year's Day) will be posted by the first week of December. Please call ${PHONE} for the latest.`,
  },
  {
    id: 'prices',
    label: 'Lane prices',
    keywords: ['price', 'cost', 'how much', 'rate', 'lane', 'per hour', 'bowling cost', 'charge', 'game'],
    answer: 'Lanes are $24.99 per lane per hour Monday–Friday before 5 PM, and $33.99 per lane per hour evenings and weekends, for up to 6 bowlers per lane. Shoes are $4.50. Prices are before tax. Tip: Tuesdays and Sundays are $2.99 a game and $2.99 shoes all day!',
  },
  {
    id: 'specials',
    label: 'Specials',
    keywords: ['special', 'deal', 'discount', 'cheap', 'tuesday', 'sunday', '2.99', 'coupon'],
    answer: 'Every Tuesday and Sunday: $2.99 per game and $2.99 shoes, all day. Walk-ins welcome!',
  },
  {
    id: 'shoes',
    keywords: ['shoe', 'rental'],
    answer: 'Shoe rental is $4.50, or $2.99 on Tuesdays and Sundays.',
  },
  {
    id: 'glow',
    keywords: ['glow', 'cosmic', 'dj', 'music', 'friday night', 'saturday night', 'party night'],
    answer: 'Glow Bowl lights up Friday and Saturday after 9 PM, with a DJ on Saturdays. We are open until 2 AM on Friday and Saturday.',
  },
  {
    id: 'reserve',
    keywords: ['reserve', 'reservation', 'book a lane', 'booking', 'available', 'availability', 'wait', 'walk in', 'walk-in'],
    answer: `For lane reservations and availability, please call us at ${PHONE}.`,
  },
  {
    id: 'birthday',
    label: 'Birthday parties',
    keywords: ['birthday', 'bday', 'party', 'parties', 'package', 'celebrat', 'kids party'],
    answer: `We have two birthday packages (plus tax, deposit required): the Spare Package for $240 (lanes and bowling, ideal for smaller groups) and the Strike Package for $280 (lanes and bowling, great for larger groups). For full details and booking, call ${PHONE} or leave your details below and our party team will reach out.`,
    showPartyForm: true,
  },
  {
    id: 'groups',
    keywords: ['corporate', 'company', 'office', 'team', 'work party', 'group', 'school', 'church', 'field trip', 'fundraiser', 'event', 'holiday party', 'buyout', 'lock-in'],
    answer: `We love hosting groups, companies, schools and churches! Call ${PHONE} or leave your details below and our team will put a package together for you.`,
    showPartyForm: true,
  },
  {
    id: 'giftcards',
    label: 'Gift cards',
    keywords: ['gift', 'card', 'egift', 'balance', 'present', 'stocking'],
    answer: 'Gift cards come in $25, $50, $100 or $200 and work for bowling, food, drinks and the arcade. They never expire and have no fees. Buy one online at millenniumbowl.square.site/s/gift-cards (eGift cards arrive by email) or at the front desk. You can check a balance on the same page.',
  },
  {
    id: 'leagues',
    label: 'Leagues',
    keywords: ['league', 'team bowling', 'join', 'season', 'senior', 'ladies', 'mixed'],
    answer: "We have 18 leagues bowling Monday through Sunday, from mixed and seniors to ladies' leagues. To join, use the sign-up form on our Leagues page or call " + PHONE + '.',
  },
  {
    id: 'food',
    label: 'Food & menu',
    keywords: ['food', 'menu', 'eat', 'pizza', 'wings', 'kitchen', 'snack', 'hungry', 'order', 'nacho', 'burger', 'fries'],
    answer: 'Our kitchen serves pizza, wings, appetizers, baskets and more. It is open until 11 PM on weekdays and until 1 AM on Friday and Saturday. See the full menu on our Menu page, or order online at millenniumbowl.square.site.',
  },
  {
    id: 'bar',
    keywords: ['bar', 'beer', 'drink', 'alcohol', 'cocktail', 'margarita', 'liquor', 'wine', '21', 'age', 'adult', 'kids allowed', 'kids', 'kid', 'children', 'child', 'minor', 'family', 'teen', 'under 21'],
    answer: 'Everyone is welcome! All 32 lanes and the kitchen are open to all ages, kids and families included, at all hours. Only the bar is adults only (21+).',
  },
  {
    id: 'arcade',
    keywords: ['arcade', 'pool', 'billiard', 'shuffleboard', 'skee', 'games', 'f1', 'simulator', 'racing'],
    answer: 'We have arcade games, pool tables, shuffleboard and skee-ball. Our F1 racing simulator is coming soon!',
  },
  {
    id: 'proshop',
    keywords: ['pro shop', 'proshop', 'ball', 'drill', 'bowl 101', 'ebonite', 'equipment', 'bag'],
    answer: 'Our pro shop is Bowl 101, run by Brian Kennedy, the Ebonite Gold exclusive in central Arkansas. Call (501) 353-2749 or visit bowl101.net.',
  },
  {
    id: 'access',
    keywords: ['parking', 'park', 'wheelchair', 'accessible', 'handicap', 'disab', 'bumper', 'ramp', 'little kids', 'toddler'],
    answer: 'Yes! We have free parking, we are wheelchair accessible, and we have bumpers and bowling ramps for kids.',
  },
  {
    id: 'location',
    label: 'Location',
    keywords: ['where', 'address', 'location', 'direction', 'located', 'map', 'phone', 'call', 'contact', 'email'],
    answer: `We're at 7200 Counts Massie Rd, North Little Rock, AR 72113. Call ${PHONE} or email info@millenniumbowllr.com.`,
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
    answer: `A manager will be happy to help. Please call ${PHONE} or email info@millenniumbowllr.com.`,
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

const GENERAL = new Set(['prices', 'hours', 'location', 'thanks', 'hello', 'bar']);

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
