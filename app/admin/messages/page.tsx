import { db } from '@/lib/firebase-admin';

export const metadata = { title: 'Messages — Millennium Bowl Admin' };

type Message = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  createdAt: string;
};

async function getMessages(): Promise<{ messages: Message[]; error: string | null }> {
  try {
    const snap = await db.collection('contact_messages').orderBy('createdAt', 'desc').limit(50).get();
    const messages = snap.docs.map(d => ({ id: d.id, ...d.data() } as Message));
    return { messages, error: null };
  } catch {
    return { messages: [], error: 'Could not load messages.' };
  }
}

export default async function MessagesPage() {
  const { messages, error } = await getMessages();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Messages</h1>
          <p className="admin-page-sub">Contact form submissions from your website</p>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {messages.length === 0 && !error ? (
        <div className="admin-empty">No messages yet. They&apos;ll appear here when customers use the contact form.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email / Phone</th>
                <th>Topic</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id}>
                  <td><strong>{msg.firstName} {msg.lastName}</strong></td>
                  <td>
                    <div><a href={`mailto:${msg.email}`} style={{ color: 'var(--neon-cyan)' }}>{msg.email}</a></div>
                    {msg.phone && <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{msg.phone}</div>}
                  </td>
                  <td><span className="admin-badge badge-ok">{msg.topic}</span></td>
                  <td style={{ maxWidth: '300px' }}>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
