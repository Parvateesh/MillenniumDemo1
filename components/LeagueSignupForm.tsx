'use client';
import { useState, useRef } from 'react';
import { confettiBurst } from '@/lib/confetti';

type Status = 'idle' | 'sending' | 'done' | 'error';

const NIGHTS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const LEVELS = ['Just for fun', 'Intermediate (avg 120–159)', 'Advanced (avg 160–189)', 'Competitive (avg 190+)'];

export default function LeagueSignupForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      level: fd.get('level'),
      night: fd.get('night'),
      type: fd.get('type'),
    };

    try {
      const res = await fetch('/api/leagues/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.duplicate) {
        setStatus('done'); // treat duplicate gracefully
        return;
      }
      if (data.ok) {
        setStatus('done');
        if (btnRef.current) {
          const r = btnRef.current.getBoundingClientRect();
          confettiBurst(r.left + r.width / 2, r.top, 60);
        }
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
      setErrMsg('Something went wrong. Please call us at (501) 791-9150.');
    }
  }

  if (status === 'done') {
    return (
      <div className="league-form-success">
        <div className="league-form-success-icon">🎳</div>
        <h3 className="league-form-success-title">You&apos;re on the list!</h3>
        <p>Our league coordinator will reach out within 2 business days to confirm your spot and answer any questions. See you on the lanes.</p>
      </div>
    );
  }

  return (
    <form className="league-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lf-name">Full Name *</label>
          <input id="lf-name" name="name" type="text" placeholder="Jane Smith" required />
        </div>
        <div className="form-group">
          <label htmlFor="lf-email">Email *</label>
          <input id="lf-email" name="email" type="email" placeholder="jane@email.com" required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lf-phone">Phone</label>
          <input id="lf-phone" name="phone" type="tel" placeholder="(501) 555-0100" />
        </div>
        <div className="form-group">
          <label htmlFor="lf-night">Preferred Night *</label>
          <select id="lf-night" name="night" required defaultValue="">
            <option value="" disabled>Choose a night</option>
            {NIGHTS.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lf-level">Skill Level *</label>
          <select id="lf-level" name="level" required defaultValue="">
            <option value="" disabled>Choose your level</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Joining as *</label>
          <div className="league-radio-group">
            <label className="league-radio">
              <input type="radio" name="type" value="solo" defaultChecked required />
              <span>Solo — pair me with a team</span>
            </label>
            <label className="league-radio">
              <input type="radio" name="type" value="team" />
              <span>I already have a team</span>
            </label>
          </div>
        </div>
      </div>
      {errMsg && <p className="form-error">{errMsg}</p>}
      <button
        ref={btnRef}
        type="submit"
        className="btn btn-primary btn-full"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Submitting...' : 'Reserve My Spot →'}
      </button>
      <p className="form-note">No commitment yet — our coordinator will confirm availability and details.</p>
    </form>
  );
}
