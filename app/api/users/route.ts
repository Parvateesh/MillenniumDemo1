export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, db } from '@/lib/firebase-admin';

async function getDecodedToken(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (e) {
    console.error('[api/users] Failed to verify ID token:', e);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = await getDecodedToken(req);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uid, email, name } = await req.json();

    // Secure check: ensure users can only register/modify their own database profile
    if (uid !== decoded.uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    const dataToSave = {
      uid,
      email: email || decoded.email || '',
      displayName: name || decoded.name || '',
      updatedAt: new Date().toISOString(),
    };

    if (!doc.exists) {
      await userRef.set({
        ...dataToSave,
        createdAt: new Date().toISOString(),
      });
      console.log(`[api/users] Created new Firestore profile for user: ${uid}`);
    } else {
      // Merge updates
      await userRef.update(dataToSave);
      console.log(`[api/users] Updated Firestore profile for user: ${uid}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/users] Error handling POST request:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
