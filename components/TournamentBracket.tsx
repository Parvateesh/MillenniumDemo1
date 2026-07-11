'use client';
import React from 'react';

type Team = { name: string; seed: number | null; score?: number };
type BMatch = {
  id: string;
  t1: Team;
  t2: Team;
  winner: 1 | 2 | null;
  done: boolean;
  live?: boolean;
};

const TOURNAMENT = {
  title: 'Summer Classic 2026',
  dates: 'Jul 12 – Jul 26',
  prizePool: '$1,800',
  rounds: [
    {
      label: 'Quarterfinals',
      sub: 'Jul 12–14',
      matches: [
        { id: 'qf1', t1: { name: 'Pin Crushers', seed: 1, score: 621 }, t2: { name: 'Lucky Strikes', seed: 8, score: 544 }, winner: 1, done: true },
        { id: 'qf2', t1: { name: 'Strike Force', seed: 4, score: 598 }, t2: { name: 'Pin Heads', seed: 5, score: 571 }, winner: 1, done: true },
        { id: 'qf3', t1: { name: 'Gutter Birds', seed: 3, score: 612 }, t2: { name: 'Spare Parts', seed: 6, score: 589 }, winner: 1, done: true },
        { id: 'qf4', t1: { name: 'Alley Oops', seed: 2 }, t2: { name: 'Rolling Thunder', seed: 7 }, winner: null, done: false, live: true },
      ] as BMatch[],
    },
    {
      label: 'Semifinals',
      sub: 'Jul 19–20',
      matches: [
        { id: 'sf1', t1: { name: 'Pin Crushers', seed: 1 }, t2: { name: 'Strike Force', seed: 4 }, winner: null, done: false },
        { id: 'sf2', t1: { name: 'Gutter Birds', seed: 3 }, t2: { name: 'TBD', seed: null }, winner: null, done: false },
      ] as BMatch[],
    },
    {
      label: 'Championship',
      sub: 'Jul 26',
      matches: [
        { id: 'final', t1: { name: 'TBD', seed: null }, t2: { name: 'TBD', seed: null }, winner: null, done: false },
      ] as BMatch[],
    },
  ],
};

function MatchCard({ match }: { match: BMatch }) {
  return (
    <div className={`b-match ${match.live ? 'b-match-live' : ''} ${match.done ? 'b-match-done' : ''}`}>
      {match.live && (
        <div className="b-live-label">
          <span className="b-live-dot" />LIVE NOW
        </div>
      )}
      <div className={`b-team ${match.winner === 1 ? 'b-win' : match.winner === 2 ? 'b-lose' : ''}`}>
        {match.t1.seed && <span className="b-seed">{match.t1.seed}</span>}
        <span className="b-tname">{match.t1.name}</span>
        {match.t1.score != null && <span className="b-score">{match.t1.score}</span>}
        {match.winner === 1 && <span className="b-check">✓</span>}
      </div>
      <div className="b-sep" />
      <div className={`b-team ${match.winner === 2 ? 'b-win' : match.winner === 1 ? 'b-lose' : ''}`}>
        {match.t2.seed && <span className="b-seed">{match.t2.seed}</span>}
        <span className="b-tname">{match.t2.name}</span>
        {match.t2.score != null && <span className="b-score">{match.t2.score}</span>}
        {match.winner === 2 && <span className="b-check">✓</span>}
      </div>
    </div>
  );
}

export default function TournamentBracket() {
  return (
    <div className="tournament-section" data-animate="">
      {/* Header */}
      <div className="tournament-top">
        <div>
          <div className="tournament-eyebrow">🏆 Active Tournament</div>
          <h3 className="tournament-name">{TOURNAMENT.title}</h3>
          <div className="tournament-info">
            <span>📅 {TOURNAMENT.dates}</span>
            <span>💰 Prize Pool: <strong>{TOURNAMENT.prizePool}</strong></span>
            <span className="t-live-chip"><span className="b-live-dot" />1 match live</span>
          </div>
        </div>
        <a href="/contact" className="btn btn-secondary">Register for Next →</a>
      </div>

      {/* Bracket */}
      <div className="bracket-scroll-wrap">
        <div className="bracket">
          {TOURNAMENT.rounds.map((round, ri) => (
            <React.Fragment key={round.label}>
              <div className="b-round">
                <div className="b-round-head">
                  <div className="b-round-label">{round.label}</div>
                  <div className="b-round-sub">{round.sub}</div>
                </div>
                <div className={`b-round-matches b-round-${ri}`}>
                  {round.matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>

              {/* Connector between rounds */}
              {ri < TOURNAMENT.rounds.length - 1 && (
                <div className={`b-conn-col b-conn-${ri}`}>
                  {Array.from({ length: Math.ceil(round.matches.length / 2) }).map((_, i) => (
                    <div key={i} className="b-conn-pair">
                      <div className="b-conn-arm b-conn-top" />
                      <div className="b-conn-arm b-conn-bot" />
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Champion box */}
          <div className="b-champion">
            <div className="b-champion-trophy">🏆</div>
            <div className="b-champion-label">Champion</div>
            <div className="b-champion-name">TBD</div>
            <div className="b-champion-date">Jul 26</div>
          </div>
        </div>
      </div>
    </div>
  );
}
