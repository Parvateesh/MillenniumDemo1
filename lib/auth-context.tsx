'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({ user: null, loading: true, logout: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lazy-load Firebase Auth only after hydration so it doesn't block FCP
    let unsub: (() => void) | undefined;
    import('firebase/auth').then(({ onAuthStateChanged, signOut: _signOut }) => {
      import('./firebase-client').then(({ clientAuth }) => {
        unsub = onAuthStateChanged(clientAuth, u => {
          setUser(u);
          setLoading(false);
        });
      });
    });
    return () => unsub?.();
  }, []);

  async function logout() {
    const { signOut } = await import('firebase/auth');
    const { clientAuth } = await import('./firebase-client');
    await signOut(clientAuth);
  }

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
