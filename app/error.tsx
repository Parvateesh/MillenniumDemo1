'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        <div className="not-found-icon">⚠️</div>
        <h1 className="not-found-code">Oops</h1>
        <h2 className="not-found-title">Something went wrong</h2>
        <p className="not-found-desc">
          We hit a snag on our end. Give it another try or call us at (501) 791-9150.
        </p>
        <div className="not-found-actions">
          <button className="btn btn-primary" onClick={reset}>Try Again →</button>
          <a href="/" className="btn btn-ghost">Go Home</a>
        </div>
      </div>
    </div>
  );
}
