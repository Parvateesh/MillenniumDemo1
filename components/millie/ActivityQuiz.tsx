'use client';

import { useState } from 'react';
import { QUIZ, recommend, type QuizAnswers } from '@/lib/millie/quiz';
import type { Reply } from '@/lib/millie-answers';
import QuickReplies from './QuickReplies';
import type { ToolApi } from './types';

// Three-question activity quiz with a recommendation built from published facts.
export default function ActivityQuiz({ remember, act }: ToolApi) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const step = QUIZ.findIndex((q) => !answers[q.key]);
  const done = step === -1;

  const pick = (key: keyof QuizAnswers, value: string) => {
    const next = { ...answers, [key]: value } as QuizAnswers;
    setAnswers(next);
    if (key === 'who') remember({ kids: value === 'family' ? true : undefined, occasion: value as QuizAnswers['who'] });
  };

  if (!done) {
    const q = QUIZ[step];
    return (
      <div className="millie-card millie-quiz">
        <div className="millie-card-title">✨ What should we do? <span className="millie-count">{step + 1} / {QUIZ.length}</span></div>
        <p className="millie-quiz-q">{q.question}</p>
        <div className="millie-quiz-opts">
          {q.options.map((o) => (
            <button key={o.value} type="button" className="millie-quiz-opt" onClick={() => pick(q.key, o.value)}>{o.label}</button>
          ))}
        </div>
        {step > 0 && (
          <button type="button" className="millie-ghost" onClick={() => setAnswers((a) => { const c = { ...a }; delete c[QUIZ[step - 1].key]; return c; })}>Back</button>
        )}
      </div>
    );
  }

  const res = recommend(answers);
  const replies: Reply[] = [];
  if (res.calc) replies.push({ label: '🧮 Calculate my cost', tool: 'calc' });
  if (res.showParty) replies.push({ label: '🎉 Plan a party', tool: 'party' });
  if (res.showMenu) replies.push({ label: '🍕 See the menu', tool: 'menu' });
  if (res.showGroup) replies.push({ label: '📝 Group request', tool: 'enquiry-group' });
  replies.push({ label: '📞 Call us', call: true });

  return (
    <div className="millie-card millie-quiz">
      <div className="millie-card-title">✨ {res.title}</div>
      <ul className="millie-picks">{res.picks.map((p) => <li key={p}>{p}</li>)}</ul>
      <QuickReplies
        replies={replies}
        onPick={(r) => {
          if (r.tool === 'calc' && res.calc) remember({ day: res.calc.day, time: res.calc.time });
          act(r);
        }}
      />
      <button type="button" className="millie-ghost" onClick={() => setAnswers({})}>Take the quiz again</button>
    </div>
  );
}
