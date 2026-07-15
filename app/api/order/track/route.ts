export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST() {
  try {
    await db.collection('order_clicks').add({ timestamp: new Date().toISOString() });
  } catch {
    // non-blocking — don't fail the page over analytics
  }
  return NextResponse.json({ ok: true });
}
