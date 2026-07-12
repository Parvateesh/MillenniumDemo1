import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'BUILD_TIME_DUMMY_KEY',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'millennium-bowl.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'millennium-bowl',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'millennium-bowl.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:dummy',
};

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn(
    '[firebase-client] WARNING: NEXT_PUBLIC_FIREBASE_API_KEY is not set. ' +
    'Client-side Firebase authentication (login/signup) will fail. ' +
    'Please set NEXT_PUBLIC_FIREBASE_API_KEY in your env variables.'
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const clientAuth = getAuth(app);

