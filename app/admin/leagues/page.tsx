import { db } from '@/lib/firebase-admin';

export const metadata = { title: 'League Sign-Ups — Millennium Bowl Admin' };

type Interest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  night: string;
  type: string;
  timestamp: string;
};

async function getInterests() {
  try {
    const snap = await db.collection('league_interests').orderBy('timestamp', 'desc').get();
    return { list: snap.docs.map(d => ({ id: d.id, ...d.data() } as Interest)), error: null };
  } catch {
    return { list: [], error: 'Could not load league sign-ups.' };
  }
}

const NIGHT_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default async function AdminLeaguesPage() {
  const { list, error } = await getInterests();

  // Group by preferred night
  const byNight: Record<string, Interest[]> = {};
  for (const entry of list) {
    if (!byNight[entry.night]) byNight[entry.night] = [];
    byNight[entry.night].push(entry);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">League Sign-Ups</h1>
          <p className="admin-page-sub">
            Customers who filled out the league interest form —
            <strong style={{ color: 'var(--neon-cyan)' }}> {list.length} total</strong>
          </p>
        </div>
      </div>

      <div className="admin-alert" style={{ marginBottom: '2rem' }}>
        💡 Contact these players to confirm their spot. Sort by night to see demand per league slot.
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {list.length === 0 && !error ? (
        <div className="admin-empty">No sign-ups yet. They&apos;ll appear here when customers fill out the form on the Leagues page.</div>
      ) : (
        <>
          {/* Night breakdown */}
          <div className="admin-dashboard-grid" style={{ marginBottom: '2rem' }}>
            {NIGHT_ORDER.filter(n => byNight[n]).map(night => (
              <div key={night} className="admin-dashboard-card" style={{ cursor: 'default' }}>
                <div className="admin-dashboard-label">{night}</div>
                <div style={{ fontSize: '2rem', fontFamily: 'Bowlby One', color: 'var(--neon-cyan)' }}>
                  {byNight[night].length}
                </div>
                <div className="admin-dashboard-desc">interested players</div>
              </div>
            ))}
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Night</th>
                  <th>Level</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {list.map((entry, i) => (
                  <tr key={entry.id}>
                    <td style={{ color: 'var(--text-dim)', fontFamily: 'Space Mono' }}>{list.length - i}</td>
                    <td><strong>{entry.name}</strong></td>
                    <td><a href={`mailto:${entry.email}`} style={{ color: 'var(--neon-cyan)' }}>{entry.email}</a></td>
                    <td style={{ color: 'var(--text-dim)' }}>{entry.phone || '—'}</td>
                    <td>{entry.night}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{entry.level}</td>
                    <td>
                      <span className={`admin-badge ${entry.type === 'solo' ? 'badge-ok' : 'badge-low'}`}>
                        {entry.type === 'solo' ? 'Solo' : 'Has team'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
