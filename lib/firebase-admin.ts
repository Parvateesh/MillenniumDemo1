import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function init() {
  if (getApps().length) return;

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      initializeApp({ credential: cert(JSON.parse(json)) });
    } catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e);
    }
    return;
  }

  // Fallback: individual env vars (strips wrapping quotes and normalises \n)
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n');

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  } catch (e) {
    console.error('[firebase-admin] Failed to initialise with individual env vars:', e);
  }
}

init();

export const adminAuth = getAuth();
export const db = getFirestore();
