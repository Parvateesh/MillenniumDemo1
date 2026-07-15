'use client';

import { useAuth } from '@/lib/auth-context';
import Nav from './Nav';

export default function NavWithAuth() {
  const { user } = useAuth();
  return <Nav user={user ?? null} />;
}
