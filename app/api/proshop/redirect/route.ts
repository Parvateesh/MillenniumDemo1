import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  const referer = req.headers.get('referer') ?? 'direct';

  await db.collection('proshop_clicks').add({
    timestamp: new Date().toISOString(),
    referer,
  });

  return NextResponse.redirect(
    'https://www.bowl101.net?utm_source=millennium-bowl&utm_medium=website&utm_campaign=proshop-page'
  );
}
