export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snap = await db.collection('lanes').orderBy('number').get();
    const lanes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(lanes, {
      headers: { 'Cache-Control': 'public, s-maxage=20, stale-while-revalidate=40' },
    });
  } catch {
    return NextResponse.json([]);
  }
}
