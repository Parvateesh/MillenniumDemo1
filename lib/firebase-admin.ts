import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

function init() {
  if (getApps().length) return;

  // 1. Try environment variable
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      initializeApp({ credential: cert(JSON.parse(json)) });
      return;
    } catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e);
    }
  }

  // 2. Try to search for a local service account file in the workspace root
  try {
    const rootDir = process.cwd();
    const files = fs.readdirSync(rootDir);
    const serviceAccountFile = files.find(f => f.includes('firebase-adminsdk') && f.endsWith('.json'));
    if (serviceAccountFile) {
      const filePath = path.join(rootDir, serviceAccountFile);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const serviceAccount = JSON.parse(fileContent);
      initializeApp({ credential: cert(serviceAccount) });
      console.log(`[firebase-admin] Initialised successfully using local service account file: ${serviceAccountFile}`);
      return;
    }
  } catch (e) {
    console.error('[firebase-admin] Failed to load local service account file:', e);
  }

  // 3. Fallback: individual env vars (strips wrapping quotes and normalises \n)
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

