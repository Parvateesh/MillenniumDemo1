'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  pageTitle: string;
  pageDesc: string;
  icon?: string;
  launchDate?: string;
  backHref?: string;
  backLabel?: string;
}

type Phase = 'idle' | 'rolling' | 'strike' | 'miss';

const MISS_LINES: [string, string][] = [
  ['Gutter Ball. 😬', "The lane needs work. So does this page."],
  ['7-10 Split. 😤', "Nearly impossible — just like shipping this on time."],
  ['3 Pins. 🥲', "You tried. We're trying too. Almost there."],
  ['Left the Headpin. 🫠', "Aim for the center. We'll aim to finish this soon."],
];

// Each pin's scatter: [translateX, translateY, rotate]
const SCATTER: [string, string, string][] = [
  ['-60px', '-40px', '-45deg'],
  ['-20px', '-55px', '30deg'],
  ['50px', '-50px', '-60deg'],
  ['70px', '-30px', '50deg'],
  ['-45px', '-25px', '70deg'],
  ['10px', '-60px', '-35deg'],
  ['55px', '-20px', '60deg'],
  ['-50px', '-10px', '-80deg'],
  ['30px', '-45px', '40deg'],
  ['0px', '-70px', '-20deg'],
];

export default function ComingSoon({
  pageTitle,
  pageDesc,
  icon = '🎳',
  launchDate,
  backHref = '/',
  backLabel = 'Back to Home',
}: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [missLine] = useState<[string, string]>(
    () => MISS_LINES[Math.floor(Math.random() * MISS_LINES.length)]
  );

  function roll() {
    if (phase === 'rolling') return;
    setPhase('rolling');
    setTimeout(() => {
      setPhase(Math.random() < 0.65 ? 'strike' : 'miss');
    }, 1350);
  }

  function reset() {
    setPhase('idle');
  }

  const isScattered = phase === 'strike';
  const isRolling   = phase === 'rolling';
  const isMiss      = phase === 'miss';

  return (
    <div className="cs-wrap">

      {/* Page label */}
      <div className="cs-eyebrow">
        <span className="cs-icon">{icon}</span>
        {pageTitle}
      </div>

      {/* Lane + pins + ball */}
      <div className="cs-lane-wrap">
        {/* Lane borders */}
        <div className="cs-lane-left" />
        <div className="cs-lane-right" />

        {/* Pin triangle */}
        <div className="cs-pins">
          {SCATTER.map(([sx, sy, sr], i) => (
            <div
              key={i}
              className={`cs-pin cs-pin-${i + 1}${isScattered ? ' scattered' : ''}`}
              style={{ '--sx': sx, '--sy': sy, '--sr': sr } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Ball */}
        <div
          className={`cs-ball${isRolling ? ' rolling' : ''}${isMiss ? ' guttered' : ''}`}
          onClick={!isRolling ? roll : undefined}
        />
      </div>

      {/* Idle prompt */}
      {phase === 'idle' && (
        <div className="cs-prompt">
          <p className="cs-prompt-text">Roll to find out what&apos;s coming</p>
          <button className="cs-roll-btn" onClick={roll}>
            🎳 Roll the Ball
          </button>
        </div>
      )}

      {/* Rolling feedback */}
      {phase === 'rolling' && (
        <div className="cs-rolling-msg">
          <span className="cs-rolling-dot" />
          <span className="cs-rolling-dot" />
          <span className="cs-rolling-dot" />
        </div>
      )}

      {/* STRIKE — teaser card */}
      {phase === 'strike' && (
        <div className="cs-result-strike">
          <div className="cs-strike-label">STRIKE!</div>
          <div className="cs-teaser-card">
            <div className="cs-teaser-icon">{icon}</div>
            <h2 className="cs-teaser-title">{pageTitle}</h2>
            <p className="cs-teaser-desc">{pageDesc}</p>
            {launchDate && (
              <div className="cs-teaser-date">Coming {launchDate}</div>
            )}
            <div className="cs-teaser-actions">
              <button className="cs-roll-btn cs-roll-btn--sm" onClick={reset}>
                Bowl Again
              </button>
              <Link href={backHref} className="btn btn-ghost">
                {backLabel}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MISS — funny message + retry */}
      {phase === 'miss' && (
        <div className="cs-result-miss">
          <div className="cs-miss-headline">{missLine[0]}</div>
          <p className="cs-miss-sub">{missLine[1]}</p>
          <div className="cs-teaser-actions">
            <button className="cs-roll-btn" onClick={reset}>
              Try Again
            </button>
            <Link href={backHref} className="btn btn-ghost">
              {backLabel}
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
