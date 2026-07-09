import { db } from '@/lib/firebase-admin';

export const metadata = { title: 'Analytics — Millennium Bowl Admin' };

async function getClickStats() {
  const snap = await db.collection('proshop_clicks').orderBy('timestamp', 'desc').get();
  const clicks = snap.docs.map(d => d.data() as { timestamp: string });

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const thisWeek = clicks.filter(c => new Date(c.timestamp) >= startOfWeek).length;
  const thisMonth = clicks.filter(c => new Date(c.timestamp) >= startOfMonth).length;
  const total = clicks.length;
  const recent = clicks.slice(0, 20);

  return { total, thisWeek, thisMonth, recent };
}

export default async function AnalyticsPage() {
  const { total, thisWeek, thisMonth, recent } = await getClickStats();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Bowl 101 Analytics</h1>
          <p className="admin-page-sub">Click-throughs from your website to bowl101.net</p>
        </div>
      </div>

      <div className="admin-alert" style={{ marginBottom: '2rem' }}>
        💡 Use these numbers when negotiating a placement fee with Bowl 101 — every click below is a customer they received for free from your website.
      </div>

      <div className="admin-dashboard-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="admin-dashboard-card" style={{ textDecoration: 'none', cursor: 'default' }}>
          <div className="admin-dashboard-icon">🖱️</div>
          <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{total}</div>
          <div className="admin-dashboard-desc">Total clicks (all time)</div>
        </div>
        <div className="admin-dashboard-card" style={{ textDecoration: 'none', cursor: 'default' }}>
          <div className="admin-dashboard-icon">📅</div>
          <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{thisMonth}</div>
          <div className="admin-dashboard-desc">Clicks this month</div>
        </div>
        <div className="admin-dashboard-card" style={{ textDecoration: 'none', cursor: 'default' }}>
          <div className="admin-dashboard-icon">📆</div>
          <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{thisWeek}</div>
          <div className="admin-dashboard-desc">Clicks this week</div>
        </div>
      </div>

      <h2 style={{ fontFamily: 'var(--font-bowlby, "Bowlby One", cursive)', fontSize: '1.2rem', marginBottom: '1rem' }}>
        Recent Click-throughs
      </h2>

      {recent.length === 0 ? (
        <div className="admin-empty">No clicks recorded yet. They&apos;ll appear here once visitors start clicking through to Bowl 101.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((click, i) => {
                const d = new Date(click.timestamp);
                return (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-dim)', fontFamily: 'Space Mono' }}>{total - i}</td>
                    <td>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style={{ fontFamily: 'Space Mono', fontSize: '0.85rem' }}>{d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
