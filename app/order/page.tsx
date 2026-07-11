'use client';

import { useEffect, useRef, useState } from 'react';

const SQUARE_URL = 'https://millenniumbowl.square.site';

export default function OrderPage() {
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetch('/api/order/track', { method: 'POST' }).catch(() => {});
  }, []);

  function handleLoad() {
    setTimeout(() => {
      try {
        // Cross-origin content throws SecurityError → iframe loaded real content
        void iframeRef.current?.contentWindow?.location.href;
        // No throw → browser showing its own error/blank page → Square blocked framing
        setBlocked(true);
      } catch {
        // SecurityError = real cross-origin content loaded successfully
      }
    }, 100);
  }

  return (
    <>
      {blocked ? (
        <div className="order-fallback">
          <div className="order-fallback-icon">🍕</div>
          <h2 className="order-fallback-title">Order Food Online</h2>
          <p className="order-fallback-sub">
            Pizza, wings, burgers, nachos and more — fresh from our kitchen.
            Order online and pick up at the counter.
          </p>
          <a
            href={SQUARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open Menu &amp; Order Now →
          </a>
          <p className="order-fallback-note">🔒 Payments secured by Square</p>
        </div>
      ) : (
        <div className="order-frame-wrap">
          <div className="order-frame-bar">
            <span className="order-frame-note">🔒 Payments secured by Square</span>
            <a
              href={SQUARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="order-frame-link"
            >
              Open in new tab ↗
            </a>
          </div>
          <iframe
            ref={iframeRef}
            src={SQUARE_URL}
            title="Order Food Online — Millennium Bowl"
            className="order-frame"
            allow="payment"
            onLoad={handleLoad}
          />
        </div>
      )}
    </>
  );
}
