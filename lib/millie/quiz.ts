// "What should we do?" quiz. Every recommendation comes from published Millennium Bowl facts.

import type { Day, TimeOfDay } from './pricing';

export type QuizAnswers = {
  who?: 'family' | 'friends' | 'date' | 'work';
  when?: 'weekdayDay' | 'weekdayNight' | 'weekendNight' | 'special';
  vibe?: 'bowl' | 'games' | 'food' | 'party';
};

export const QUIZ: { key: keyof QuizAnswers; question: string; options: { value: string; label: string }[] }[] = [
  {
    key: 'who', question: "Who's coming?",
    options: [
      { value: 'family', label: '👨‍👩‍👧 Kids & family' }, { value: 'friends', label: '🙌 Friends' },
      { value: 'date', label: '💕 Date night' }, { value: 'work', label: '💼 Work or team group' },
    ],
  },
  {
    key: 'when', question: 'When are you thinking?',
    options: [
      { value: 'special', label: '💸 Tuesday or Sunday' }, { value: 'weekdayDay', label: '☀️ Weekday daytime' },
      { value: 'weekdayNight', label: '🌙 Weeknight' }, { value: 'weekendNight', label: '🪩 Friday or Saturday night' },
    ],
  },
  {
    key: 'vibe', question: 'What sounds best?',
    options: [
      { value: 'bowl', label: '🎳 Just bowling' }, { value: 'games', label: '🕹️ Bowling + arcade & games' },
      { value: 'food', label: '🍕 Bowling + food & drinks' }, { value: 'party', label: '🎉 A celebration' },
    ],
  },
];

export type QuizResult = {
  title: string;
  picks: string[];
  calc?: { day: Day; time: TimeOfDay };
  showParty: boolean;
  showMenu: boolean;
  showGroup: boolean;
};

export function recommend(a: QuizAnswers): QuizResult {
  const picks: string[] = [];
  let title = 'Your Millennium Bowl plan';
  let calc: QuizResult['calc'];

  switch (a.when) {
    case 'special':
      title = 'Go on a $2.99 day!';
      picks.push('Tuesdays and Sundays: $2.99 a game and $2.99 shoes, all day. Walk-ins welcome.');
      calc = { day: 'sun', time: 'before5' };
      break;
    case 'weekdayDay':
      picks.push('Weekday games before 5 PM are $4.99 per person (Mon, Wed, Thu & Fri), or rent a lane for $24.99 an hour.');
      calc = { day: 'wed', time: 'before5' };
      break;
    case 'weekdayNight':
      picks.push('Weeknight games are $5.59 per person after 5 PM (Mon, Wed & Thu), or rent a lane for $33.99 an hour for up to 6 bowlers.');
      calc = { day: 'wed', time: 'after5' };
      break;
    case 'weekendNight':
      title = 'Glow Bowl night!';
      picks.push('Glow Bowl lights up Friday and Saturday after 9 PM, with a DJ on Saturdays. Open until 2 AM.');
      picks.push('Friday and Saturday after 5 PM are lane rental: $33.99 per lane per hour, up to 6 bowlers.');
      calc = { day: 'sat', time: 'after5' };
      break;
  }

  if (a.who === 'family') picks.push('Great for kids: bumpers and bowling ramps, arcade games and skee-ball. All lanes and the kitchen are open to all ages.');
  if (a.who === 'date' || a.who === 'friends') picks.push('Play pool or shuffleboard between games. The bar is 21+.');
  if (a.who === 'work') picks.push('We host company and team events. Send us your group details and our team will put a package together.');

  if (a.vibe === 'games') picks.push('Arcade, pool tables, shuffleboard and skee-ball are all here. Our F1 racing simulator is coming soon.');
  if (a.vibe === 'food') picks.push('The kitchen serves pizza, wings, baskets and more, until 11 PM on weekdays and 1 AM on Friday and Saturday.');
  if (a.vibe === 'party') picks.push('Birthday packages: Spare Package $240 or Strike Package $280 (plus tax, deposit required), with lanes and bowling included.');

  return {
    title,
    picks,
    calc,
    showParty: a.vibe === 'party' || a.who === 'family',
    showMenu: a.vibe === 'food',
    showGroup: a.who === 'work',
  };
}
