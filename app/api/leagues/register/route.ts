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
    .collection('league_registrations')
    .where('userId', '==', uid)
    .get();

  const regs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json(regs);
}

export async function POST(req: NextRequest) {
  const uid = await getUid(req);
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { leagueId, leagueName, name, email, phone } = await req.json();

  const existing = await db
    .collection('league_registrations')
    .where('userId', '==', uid)
    .where('leagueId', '==', leagueId)
    .get();

  if (!existing.empty) {
    return NextResponse.json({ error: 'Already registered' }, { status: 409 });
  }

  const ref = await db.collection('league_registrations').add({
    userId: uid,
    leagueId,
    leagueName,
    name,
    email,
    phone,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ id: ref.id });
}
