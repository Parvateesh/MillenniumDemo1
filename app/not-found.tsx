import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | Millennium Bowl',
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        <div className="not-found-icon">🎳</div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Lane Not Found</h2>
        <p className="not-found-desc">
          Looks like this page went into the gutter. Let&apos;s get you back on the lane.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">Back to Home →</Link>
          <Link href="/contact" className="btn btn-ghost">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
