export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebase-admin';

async function getUid(req: NextRequest): Promise<string | null> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const uid = await getUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const snap = await db
    .collection('bookings')
    .where('userId', '==', uid)
    .orderBy('date', 'desc')
    .limit(30)
    .get();

  const bookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const uid = await getUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const ref = await db.collection('bookings').add({
    userId: uid,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ id: ref.id });
}
