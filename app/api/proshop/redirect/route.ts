import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  const referer = req.headers.get('referer') ?? 'direct';

  // Fire-and-forget — never block the redirect on a Firestore error
  db.collection('proshop_clicks').add({
    timestamp: new Date().toISOString(),
    referer,
  }).catch(() => {});

  return NextResponse.redirect(
    'https://www.bowl101.net?utm_source=millennium-bowl&utm_medium=website&utm_campaign=proshop-page'
  );
}
