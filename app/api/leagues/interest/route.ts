import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, level, night, type } = await req.json();

    if (!name || !email || !night || !level || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Deduplicate by email
    const existing = await db.collection('league_interests').where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ duplicate: true });
    }

    await db.collection('league_interests').add({
      name,
      email,
      phone: phone || '',
      level,
      night,
      type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[league/interest]', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snap = await db.collection('league_interests').orderBy('timestamp', 'desc').get();
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
