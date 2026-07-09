import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const body = await req.json();
  await db.collection('contact_messages').add({
    ...body,
    createdAt: new Date().toISOString(),
    read: false,
  });
  return NextResponse.json({ ok: true });
}
