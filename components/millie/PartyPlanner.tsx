'use client';

import { useState } from 'react';
import { PARTY_PACKAGES, PHONE, PHONE_TEL } from '@/lib/millie/facts';
import EnquiryForm from './EnquiryForm';
import type { ToolApi } from './types';

const STEPS = ['When', 'Guests', 'Package', 'Your details'] as const;

// Step-by-step birthday party planner. Collects details, then sends a party request.
// Only published package facts are shown; nothing is confirmed here.
export default function PartyPlanner({ memory, remember, act, say }: ToolApi) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(memory.partyDate ?? '');
  const [guests, setGuests] = useState(String(memory.partyGuests ?? memory.bowlers ?? ''));
  const [age, setAge] = useState(memory.partyAge ?? '');
  const [pkg, setPkg] = useState(memory.partyPackage ?? '');

  const next = () => {
    remember({
      partyDate: date || undefined,
      partyGuests: guests ? Number(guests) : undefined,
      partyAge: age || undefined,
      partyPackage: pkg || undefined,
      kids: true,
    });
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const chosen = PARTY_PACKAGES.find((p) => p.id === pkg);
  const note = [
    `Birthday child age: ${age || 'not given'}`,
    `Package interest: ${chosen ? `${chosen.name} ($${chosen.price} + tax)` : 'not sure yet'}`,
  ].join('. ');

  return (
    <div className="millie-card millie-planner">
      <div className="millie-card-title">🎉 Birthday party planner</div>
      <ol className="millie-steps" aria-label="Steps">
        {STEPS.map((s, i) => <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>{s}</li>)}
      </ol>

      {step === 0 && (
        <div className="millie-step">
          <label className="millie-field">Preferred date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <p className="millie-fine">Not sure yet? Leave it blank; the party team will help you pick a date.</p>
          <button type="button" className="millie-submit" onClick={next}>Next</button>
        </div>
      )}

      {step === 1 && (
        <div className="millie-step">
          <div className="millie-form-row">
            <label className="millie-field">Number of guests
              <input inputMode="numeric" value={guests} onChange={(e) => setGuests(e.target.value.replace(/\D/g, '').slice(0, 3))} placeholder="e.g. 12" />
            </label>
            <label className="millie-field">Birthday child&apos;s age
              <input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))} placeholder="optional" />
            </label>
          </div>
          <p className="millie-fine">Bumpers and kid ramps are available, and all ages are welcome on every lane.</p>
          <div className="millie-row-btns">
            <button type="button" className="millie-ghost" onClick={() => setStep(0)}>Back</button>
            <button type="button" className="millie-submit" onClick={next}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="millie-step">
          <div className="millie-packages">
            {PARTY_PACKAGES.map((p) => (
              <button key={p.id} type="button" className={pkg === p.id ? 'millie-package is-on' : 'millie-package'} aria-pressed={pkg === p.id} onClick={() => setPkg(p.id)}>
                <span className="millie-package-name">{p.name}</span>
                <span className="millie-package-price">${p.price} <small>+ tax</small></span>
                <span className="millie-package-blurb">{p.blurb}</span>
              </button>
            ))}
            <button type="button" className={pkg === 'unsure' ? 'millie-package is-on' : 'millie-package'} aria-pressed={pkg === 'unsure'} onClick={() => setPkg('unsure')}>
              <span className="millie-package-name">Not sure yet</span>
              <span className="millie-package-blurb">The party team will help you choose</span>
            </button>
          </div>
          <p className="millie-fine">Deposit required to reserve. For full package details, call <a className="millie-link" href={PHONE_TEL}>{PHONE}</a>.</p>
          <div className="millie-row-btns">
            <button type="button" className="millie-ghost" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="millie-submit" onClick={next}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="millie-step">
          <div className="millie-summary">
            <div><span>Date</span><strong>{date || 'Flexible'}</strong></div>
            <div><span>Guests</span><strong>{guests || 'Not sure'}</strong></div>
            <div><span>Age</span><strong>{age || '—'}</strong></div>
            <div><span>Package</span><strong>{chosen ? `${chosen.name} · $${chosen.price} + tax` : 'Not sure yet'}</strong></div>
          </div>
          <EnquiryForm
            kind="party"
            memory={{ ...memory, partyDate: date || memory.partyDate, partyGuests: guests ? Number(guests) : memory.partyGuests }}
            note={note}
            remember={remember}
            onSent={(summary) => say(summary, [{ label: '🍕 See the menu', tool: 'menu' }, { label: '🎁 Gift cards', topic: 'giftcards' }])}
          />
          <div className="millie-row-btns">
            <button type="button" className="millie-ghost" onClick={() => setStep(2)}>Back</button>
            <button type="button" className="millie-ghost" onClick={() => act({ label: 'Menu', tool: 'menu' })}>Browse the menu</button>
          </div>
        </div>
      )}
    </div>
  );
}
