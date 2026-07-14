export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { sendContactNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  const body = await req.json();
  await db.collection('contact_messages').add({
    ...body,
    createdAt: new Date().toISOString(),
    read: false,
  });
  // Fire-and-forget — don't fail the request if email errors
  sendContactNotification({
    name:    body.name    ?? '',
    email:   body.email   ?? '',
    phone:   body.phone   ?? '',
    message: body.message ?? '',
  }).catch(err => console.error('[email/contact]', err));

  return NextResponse.json({ ok: true });
}
