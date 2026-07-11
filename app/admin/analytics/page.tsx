import { db } from '@/lib/firebase-admin';

export const metadata = { title: 'Analytics — Millennium Bowl Admin' };

async function getStats(collection: string) {
  const snap = await db.collection(collection).orderBy('timestamp', 'desc').get();
  const clicks = snap.docs.map(d => d.data() as { timestamp: string });
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    total: clicks.length,
    thisWeek: clicks.filter(c => new Date(c.timestamp) >= startOfWeek).length,
    thisMonth: clicks.filter(c => new Date(c.timestamp) >= startOfMonth).length,
    recent: clicks.slice(0, 20),
  };
}

async function getClickStats() {
  try {
    const [proshop, order] = await Promise.all([
      getStats('proshop_clicks'),
      getStats('order_clicks'),
    ]);
    return { proshop, order, error: null };
  } catch {
    return {
      proshop: { total: 0, thisWeek: 0, thisMonth: 0, recent: [] },
      order: { total: 0, thisWeek: 0, thisMonth: 0, recent: [] },
      error: 'Could not load analytics. Firebase may still be initializing.',
    };
  }
}

function StatGrid({ data, label }: { data: { total: number; thisWeek: number; thisMonth: number }; label: string }) {
  return (
    <div className="admin-dashboard-grid" style={{ marginBottom: '1.5rem' }}>
      <div className="admin-dashboard-card" style={{ cursor: 'default' }}>
        <div className="admin-dashboard-icon">🖱️</div>
        <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{data.total}</div>
        <div className="admin-dashboard-desc">{label} — all time</div>
      </div>
      <div className="admin-dashboard-card" style={{ cursor: 'default' }}>
        <div className="admin-dashboard-icon">📅</div>
        <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{data.thisMonth}</div>
        <div className="admin-dashboard-desc">This month</div>
      </div>
      <div className="admin-dashboard-card" style={{ cursor: 'default' }}>
        <div className="admin-dashboard-icon">📆</div>
        <div className="admin-dashboard-label" style={{ fontSize: '2rem' }}>{data.thisWeek}</div>
        <div className="admin-dashboard-desc">This week</div>
      </div>
    </div>
  );
}

function RecentTable({ clicks, total, empty }: { clicks: { timestamp: string }[]; total: number; empty: string }) {
  if (clicks.length === 0) return <div className="admin-empty">{empty}</div>;
  return (
    <div className="admin-table-wrap" style={{ marginBottom: '2.5rem' }}>
      <table className="admin-table">
        <thead><tr><th>#</th><th>Date</th><th>Time</th></tr></thead>
        <tbody>
          {clicks.map((click, i) => {
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
  );
}

export default async function AnalyticsPage() {
  const { proshop, order, error } = await getClickStats();
  const h2Style = { fontFamily: 'var(--font-bowlby, "Bowlby One", cursive)', fontSize: '1.2rem', marginBottom: '1rem' };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-sub">Traffic your website sends to third-party partners</p>
        </div>
      </div>

      {error ? (
        <div className="admin-alert">{error}</div>
      ) : (
        <>
          <h2 style={h2Style}>🍕 Online Ordering (Square)</h2>
          <div className="admin-alert" style={{ marginBottom: '1rem' }}>
            Every visit below is a customer who used your website to place a food order.
          </div>
          <StatGrid data={order} label="Order page visits" />
          <RecentTable clicks={order.recent} total={order.total} empty="No order page visits yet." />

          <h2 style={h2Style}>🎳 Bowl 101 Pro Shop</h2>
          <div className="admin-alert" style={{ marginBottom: '1rem' }}>
            💡 Use these numbers when negotiating a placement fee with Bowl 101 — every click is a customer they received for free from your website.
          </div>
          <StatGrid data={proshop} label="Bowl 101 click-throughs" />
          <RecentTable clicks={proshop.recent} total={proshop.total} empty="No clicks recorded yet. They'll appear here once visitors click through to Bowl 101." />
        </>
      )}
    </div>
  );
}
