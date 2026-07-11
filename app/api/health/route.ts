import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    // Server-side Firebase Admin vars
    FIREBASE_SERVICE_ACCOUNT_JSON: !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
    FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
    // Client-side vars (NEXT_PUBLIC_ must be set at build time)
    NEXT_PUBLIC_FIREBASE_API_KEY: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Try a lightweight Firestore operation to confirm Admin SDK works
  let firestoreOk = false;
  let firestoreError: string | null = null;
  try {
    const { db } = await import('@/lib/firebase-admin');
    await db.listCollections();
    firestoreOk = true;
  } catch (e) {
    firestoreError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({
    ok: firestoreOk,
    env: checks,
    firestore: firestoreOk ? 'connected' : firestoreError,
  });
}
