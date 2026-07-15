export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('__session')?.value;
  if (!session) return null;
  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    return null;
  }
}

export async function GET() {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const snap = await db.collection('lanes').orderBy('number').get();
  const lanes = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Seed 32 lanes if collection is empty
  if (lanes.length === 0) {
    const batch = db.batch();
    for (let i = 1; i <= 32; i++) {
      const ref = db.collection('lanes').doc(String(i));
      batch.set(ref, { number: i, status: 'open', notes: '', updatedAt: new Date().toISOString() });
    }
    await batch.commit();
    return NextResponse.json(
      Array.from({ length: 32 }, (_, i) => ({ id: String(i + 1), number: i + 1, status: 'open', notes: '' }))
    );
  }

  return NextResponse.json(lanes);
}

export async function PUT(req: NextRequest) {
  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status, notes } = await req.json();
  await db.collection('lanes').doc(id).update({ status, notes, updatedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
