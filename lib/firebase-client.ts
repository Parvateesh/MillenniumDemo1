import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'millennium-bowl.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'millennium-bowl',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'millennium-bowl.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.warn(
    '[firebase-client] WARNING: NEXT_PUBLIC_FIREBASE_API_KEY is not set. ' +
    'Client-side Firebase authentication (login/signup) will fail. ' +
    'Please set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.'
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const clientAuth = getAuth(app);

