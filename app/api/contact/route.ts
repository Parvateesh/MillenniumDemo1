export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { sendContactNotification } from '@/lib/email';

// Used by the Contact page and by Millie (chat bot) enquiry forms.
// Only known fields are stored; inputs are trimmed and length-limited.

const SOURCES = new Set(['contact-page', 'chatbot-party', 'chatbot-lane', 'chatbot-group']);
const MILLIE_TOPICS: Record<string, string> = { 'chatbot-party': 'Millie: party', 'chatbot-lane': 'Millie: lane request', 'chatbot-group': 'Millie: group event' };

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Spam trap: real people never fill the hidden "website" field.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120) || [str(body.firstName, 60), str(body.lastName, 60)].filter(Boolean).join(' ');
  // The admin Messages page shows firstName + lastName, so fill them from a full name when needed.
  const [first = '', ...rest] = name.split(/\s+/);
  const firstName = str(body.firstName, 60) || first;
  const lastName = str(body.lastName, 60) || rest.join(' ');
  const email = str(body.email, 200);
  const phone = str(body.phone, 30);
  const message = str(body.message, 3000);
  const source = SOURCES.has(String(body.source)) ? String(body.source) : 'contact-page';
  const topic = str(body.topic, 80) || MILLIE_TOPICS[source] || '';

  if (!name) return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });
  if (!email && phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'An email or phone number is required' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Email address is not valid' }, { status: 400 });
  }

  try {
    await db.collection('contact_messages').add({
      name, firstName, lastName, email, phone, topic, message, source,
      createdAt: new Date().toISOString(),
      read: false,
    });
  } catch (err) {
    console.error('[contact] save failed', err);
    return NextResponse.json({ ok: false, error: 'Could not save your message' }, { status: 500 });
  }

  // Fire-and-forget: don't fail the request if email errors.
  sendContactNotification({
    name,
    email,
    phone,
    message: topic ? `[${topic}] ${message}` : message,
    source,
  }).catch((err) => console.error('[email/contact]', err));

  return NextResponse.json({ ok: true });
}
