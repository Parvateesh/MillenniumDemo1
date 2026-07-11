import { db } from '@/lib/firebase-admin';

export const metadata = { title: 'Lane Waitlist — Millennium Bowl Admin' };

async function getWaitlist() {
  try {
    const snap = await db.collection('booking_waitlist').orderBy('timestamp', 'desc').get();
    return { list: snap.docs.map(d => ({ id: d.id, ...d.data() } as { id: string; name: string; email: string; timestamp: string })), error: null };
  } catch {
    return { list: [], error: 'Could not load waitlist.' };
  }
}

export default async function WaitlistPage() {
  const { list, error } = await getWaitlist();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Lane Booking Waitlist</h1>
          <p className="admin-page-sub">
            Customers who want to be notified when online lane booking goes live —
            <strong style={{ color: 'var(--neon-cyan)' }}> {list.length} signed up</strong>
          </p>
        </div>
      </div>

      <div className="admin-alert" style={{ marginBottom: '2rem' }}>
        💡 When online booking launches, email this list first. These are your highest-intent customers — they actively asked to be notified.
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {list.length === 0 && !error ? (
        <div className="admin-empty">No one on the waitlist yet. They&apos;ll appear here when customers sign up from the Book a Lane page.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {list.map((entry, i) => (
                <tr key={entry.id}>
                  <td style={{ color: 'var(--text-dim)', fontFamily: 'Space Mono' }}>{list.length - i}</td>
                  <td><strong>{entry.name || '—'}</strong></td>
                  <td><a href={`mailto:${entry.email}`} style={{ color: 'var(--neon-cyan)' }}>{entry.email}</a></td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
