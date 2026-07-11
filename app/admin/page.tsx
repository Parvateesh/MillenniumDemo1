import Link from 'next/link';

export const metadata = { title: 'Admin Dashboard — Millennium Bowl' };

const sections = [
  { href: '/admin/inventory/proshop', icon: '🎳', label: 'Pro Shop', desc: 'Balls, shoes, accessories, brands' },
  { href: '/admin/inventory/kitchen', icon: '🍕', label: 'Kitchen', desc: 'Food stock, ingredients, menu items' },
  { href: '/admin/inventory/bar', icon: '🍺', label: 'Bar', desc: 'Drinks, kegs, bottles, spirits' },
  { href: '/admin/lanes', icon: '🎿', label: 'Lanes', desc: 'All 32 lanes — status and availability' },
  { href: '/admin/messages', icon: '✉️', label: 'Messages', desc: 'Contact form submissions from customers' },
  { href: '/admin/analytics', icon: '📊', label: 'Analytics', desc: 'Bowl 101 click-throughs from your website' },
  { href: '/admin/waitlist', icon: '🎳', label: 'Lane Waitlist', desc: 'Customers waiting for online lane booking' },
];

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-sub">Millennium Bowl Staff Portal</p>
      </div>
      <div className="admin-dashboard-grid">
        {sections.map(({ href, icon, label, desc }) => (
          <Link key={href} href={href} className="admin-dashboard-card">
            <div className="admin-dashboard-icon">{icon}</div>
            <div className="admin-dashboard-label">{label}</div>
            <div className="admin-dashboard-desc">{desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
