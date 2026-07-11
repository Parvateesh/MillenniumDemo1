'use client';

const SQUARE_URL = 'https://millenniumbowl.square.site';

export default function OrderButton({ className = 'btn btn-primary' }: { className?: string }) {
  function handleClick() {
    fetch('/api/order/track', { method: 'POST' }).catch(() => {});
  }

  return (
    <a
      href={SQUARE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      Order Now on Square →
    </a>
  );
}
