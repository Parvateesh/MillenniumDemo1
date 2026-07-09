import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

const VALID_CATEGORIES = ['proshop', 'kitchen', 'bar'];

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const snap = await db.collection('inventory').doc(category).collection('items').orderBy('name').get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const ref = await db.collection('inventory').doc(category).collection('items').add({
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ id: ref.id });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, ...body } = await req.json();
  await db.collection('inventory').doc(category).collection('items').doc(id).update({
    ...body,
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const user = await verifySession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  await db.collection('inventory').doc(category).collection('items').doc(id).delete();
  return NextResponse.json({ ok: true });
}
