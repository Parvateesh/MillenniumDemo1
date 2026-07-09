'use client';

import { useState, FormEvent } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const googleProvider = new GoogleAuthProvider();

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<'email' | 'google' | null>(null);

  async function handleEmail(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading('email');
    try {
      const cred = await createUserWithEmailAndPassword(clientAuth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      router.push('/account');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/email-already-in-use') setError('Email already in use. Sign in instead.');
      else if (code === 'auth/weak-password') setError('Password must be at least 6 characters.');
      else setError('Something went wrong. Try again.');
    } finally {
      setLoading(null);
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading('google');
    try {
      await signInWithPopup(clientAuth, googleProvider);
      router.push('/account');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code !== 'auth/popup-closed-by-user') setError('Google sign-up failed. Try again.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo">MILLENNIUM<br />BOWL</div>
        <p className="auth-sub">Create your account</p>

        <button
          className="admin-google-btn"
          onClick={handleGoogle}
          disabled={!!loading}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          {loading === 'google' ? 'Creating account…' : 'Sign up with Google'}
        </button>

        <div className="admin-divider"><span>or</span></div>

        <form onSubmit={handleEmail} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={!!loading}
          >
            {loading === 'email' ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
