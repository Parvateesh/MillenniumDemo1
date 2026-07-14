import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { sendWaitlistNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Prevent duplicate emails
    const existing = await db.collection('booking_waitlist')
      .where('email', '==', email.toLowerCase().trim())
      .limit(1)
      .get();
    if (!existing.empty) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await db.collection('booking_waitlist').add({
      name:      name?.trim() || '',
      email:     email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
    });

    sendWaitlistNotification({
      name:  name?.trim() || '',
      email: email.toLowerCase().trim(),
    }).catch(err => console.error('[email/waitlist]', err));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[waitlist]', e);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snap = await db.collection('booking_waitlist').orderBy('timestamp', 'desc').get();
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ list });
  } catch {
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
