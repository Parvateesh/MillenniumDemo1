import { db } from '@/lib/firebase-admin';

type Standing = {
  rank: number;
  team: string;
  player: string;
  avg: number;
  high: number;
  games: number;
  wins: number;
  losses: number;
};

const DEMO: Standing[] = [
  { rank: 1, team: 'Pin Crushers',    player: 'Marcus T.',   avg: 198, high: 278, games: 84, wins: 22, losses: 6  },
  { rank: 2, team: 'Strike Force',    player: 'Destiny W.',  avg: 192, high: 265, games: 84, wins: 20, losses: 8  },
  { rank: 3, team: 'Gutter Birds',    player: 'Ray H.',      avg: 187, high: 256, games: 84, wins: 18, losses: 10 },
  { rank: 4, team: 'Alley Oops',      player: 'Sandra K.',   avg: 184, high: 248, games: 84, wins: 17, losses: 11 },
  { rank: 5, team: 'Rolling Thunder', player: 'D.J. Moore',  avg: 179, high: 245, games: 84, wins: 15, losses: 13 },
  { rank: 6, team: 'Spare Parts',     player: 'Brenda L.',   avg: 175, high: 237, games: 84, wins: 14, losses: 14 },
  { rank: 7, team: 'Pin Heads',       player: 'Carlos V.',   avg: 171, high: 231, games: 84, wins: 12, losses: 16 },
  { rank: 8, team: 'Lucky Strikes',   player: 'Tamika J.',   avg: 166, high: 223, games: 84, wins: 10, losses: 18 },
];

async function getStandings(): Promise<Standing[]> {
  try {
    const snap = await db.collection('league_standings').orderBy('rank', 'asc').limit(12).get();
    if (snap.empty) return DEMO;
    return snap.docs.map(d => d.data() as Standing);
  } catch {
    return DEMO;
  }
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default async function LeagueLeaderboard() {
  const standings = await getStandings();

  return (
    <div className="leaderboard-wrap" data-animate="">
      <div className="leaderboard-header">
        <div>
          <div className="leaderboard-eyebrow">Live Standings</div>
          <h3 className="leaderboard-title">2026/2027 Season — Monday Mixed</h3>
        </div>
        <div className="leaderboard-meta">
          <span className="leaderboard-week">Week 14 of 32</span>
          <span className="leaderboard-updated">Updated weekly</span>
        </div>
      </div>

      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Anchor</th>
              <th>Avg</th>
              <th>High</th>
              <th>W</th>
              <th>L</th>
              <th>Pct</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, i) => {
              const pct = ((s.wins / (s.wins + s.losses)) * 100).toFixed(0);
              return (
                <tr key={s.rank} className={i < 3 ? 'lb-top-3' : ''}>
                  <td className="lb-rank">
                    {i < 3 ? <span className="lb-medal">{MEDALS[i]}</span> : <span className="lb-rank-num">{s.rank}</span>}
                  </td>
                  <td className="lb-team">{s.team}</td>
                  <td className="lb-player">{s.player}</td>
                  <td className="lb-avg">{s.avg}</td>
                  <td className="lb-high">{s.high}</td>
                  <td className="lb-w">{s.wins}</td>
                  <td className="lb-l">{s.losses}</td>
                  <td className="lb-pct">
                    <div className="lb-pct-bar-wrap">
                      <div className="lb-pct-bar" style={{ width: `${pct}%` }} />
                      <span>{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="leaderboard-note">
        ★ Standings shown are for the Monday Mixed 4-person league. Each team plays 3 games per week.
        Top 4 teams advance to the Spring Playoffs.
      </p>
    </div>
  );
}
