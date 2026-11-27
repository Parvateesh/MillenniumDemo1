'use client';

import { useState } from 'react';
import { calculate, DAYS, money, nowInNLR, type Day, type TimeOfDay } from '@/lib/millie/pricing';
import type { ToolApi } from './types';

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="millie-stepper">
      <span>{label}</span>
      <div>
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

// Interactive bowling cost calculator. Uses only published prices (lib/millie/pricing.ts).
export default function PriceCalculator({ memory, remember, act }: ToolApi) {
  const now = nowInNLR();
  const [day, setDay] = useState<Day>(memory.day ?? now.day);
  const [time, setTime] = useState<TimeOfDay>(memory.time ?? now.time);
  const [bowlers, setBowlers] = useState(memory.bowlers ?? 4);
  const [seniors, setSeniors] = useState(memory.seniors ?? 0);
  const [games, setGames] = useState(2);
  const [hours, setHours] = useState(1);
  const [shoes, setShoes] = useState(memory.bowlers ?? 4);
  const [shoesTouched, setShoesTouched] = useState(false);

  const r = calculate({ day, time, bowlers, seniors, games, hours, shoes });
  const dayLabel = DAYS.find((d) => d.id === day)?.label ?? '';
  const summary = `${bowlers} bowler${bowlers > 1 ? 's' : ''}, ${dayLabel} ${time === 'after5' ? 'after 5 PM' : 'before 5 PM'}, `
    + (r.best === 'perGame' && r.perGame ? `${games} game${games > 1 ? 's' : ''} each, est. ${money(r.perGame.subtotal)} before tax` : `${r.lanes} lane${r.lanes > 1 ? 's' : ''} for ${hours} hour${hours > 1 ? 's' : ''}, est. ${money(r.lane.subtotal)} before tax`);

  const update = (patch: { day?: Day; time?: TimeOfDay; bowlers?: number; seniors?: number }) => {
    if (patch.day) setDay(patch.day);
    if (patch.time) setTime(patch.time);
    if (patch.bowlers !== undefined) {
      setBowlers(patch.bowlers);
      if (seniors > patch.bowlers) setSeniors(patch.bowlers);
      if (!shoesTouched || shoes > patch.bowlers) setShoes(patch.bowlers);
    }
    if (patch.seniors !== undefined) setSeniors(patch.seniors);
    remember({ ...patch, ...(patch.bowlers !== undefined && seniors > patch.bowlers ? { seniors: patch.bowlers } : {}) });
  };

  const option = (o: NonNullable<typeof r.perGame>, best: boolean) => (
    <div className={best ? 'millie-option is-best' : 'millie-option'}>
      <div className="millie-option-head">
        <span>{o.label}</span>
        {best && <span className="millie-badge">Best value</span>}
      </div>
      <ul>{o.lines.map((l) => <li key={l}>{l}</li>)}</ul>
      <div className="millie-option-total">
        <strong>{money(o.subtotal)}</strong> <span>before tax</span>
      </div>
      <div className="millie-option-tax">≈ {money(o.total)} with est. tax ({money(o.tax)})</div>
    </div>
  );

  return (
    <div className="millie-card millie-calc">
      <div className="millie-card-title">🧮 Bowling cost calculator</div>

      <div className="millie-seg" role="group" aria-label="Day">
        {DAYS.map((d) => (
          <button key={d.id} type="button" className={d.id === day ? 'is-on' : ''} aria-pressed={d.id === day} onClick={() => update({ day: d.id })}>{d.label}</button>
        ))}
      </div>
      <div className="millie-seg millie-seg-2" role="group" aria-label="Time">
        <button type="button" className={time === 'before5' ? 'is-on' : ''} aria-pressed={time === 'before5'} onClick={() => update({ time: 'before5' })}>Before 5 PM</button>
        <button type="button" className={time === 'after5' ? 'is-on' : ''} aria-pressed={time === 'after5'} onClick={() => update({ time: 'after5' })}>After 5 PM</button>
      </div>

      <Stepper label="Bowlers" value={bowlers} min={1} max={60} onChange={(n) => update({ bowlers: n })} />
      {r.rates.perGame !== null && (
        <>
          <Stepper label="Seniors" value={seniors} min={0} max={bowlers} onChange={(n) => update({ seniors: n })} />
          <Stepper label="Games each" value={games} min={1} max={10} onChange={setGames} />
        </>
      )}
      <Stepper label="Hours (lane rental)" value={hours} min={1} max={8} onChange={setHours} />
      <Stepper label="Rental shoes" value={shoes} min={0} max={bowlers} onChange={(n) => { setShoesTouched(true); setShoes(n); }} />

      <div className="millie-options">
        {r.perGame && option(r.perGame, r.best === 'perGame')}
        {option(r.lane, r.best === 'lane')}
      </div>
      {r.perGame && r.savings > 0 && (
        <p className="millie-save">{r.best === 'perGame' ? 'Paying per game' : 'Renting lanes'} saves about {money(r.savings)} for your group.</p>
      )}
      <ul className="millie-notes">{r.notes.map((n) => <li key={n}>{n}</li>)}</ul>

      <div className="millie-chips">
        <a className="millie-chip millie-chip-call" href="tel:+15017919150">📞 Call to reserve</a>
        <button type="button" className="millie-chip" onClick={() => act({ label: 'Send a lane request', tool: 'enquiry-lane' }, `Calculator: ${summary}.`)}>📝 Send a lane request</button>
      </div>
    </div>
  );
}
