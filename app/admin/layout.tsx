'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: '🏠 Dashboard', exact: true },
  { href: '/admin/inventory/proshop', label: '🎳 Pro Shop' },
  { href: '/admin/inventory/kitchen', label: '🍕 Kitchen' },
  { href: '/admin/inventory/bar', label: '🍺 Bar' },
  { href: '/admin/lanes', label: '🎿 Lanes' },
  { href: '/admin/messages', label: '✉️ Messages' },
  { href: '/admin/analytics', label: '📊 Analytics' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">MB<br /><span>Admin</span></div>
        <nav className="admin-nav">
          {navItems.map(({ href, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`admin-nav-item${active ? ' active' : ''}`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Sign Out</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
