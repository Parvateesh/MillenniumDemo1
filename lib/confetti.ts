export function confettiBurst(x: number, y: number, count = 40): void {
  const colors = ['#ff2e93', '#00f0ff', '#ffe600', '#9d4edd', '#39ff14'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const angle = Math.random() * 360 * (Math.PI / 180);
    const speed = 80 + Math.random() * 200;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed - 120;
    const dur = 0.7 + Math.random() * 0.7;
    const rot = Math.round(Math.random() * 720 - 360) + 'deg';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 8;

    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.backgroundColor = color;
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.setProperty('--dx', Math.round(dx) + 'px');
    piece.style.setProperty('--dy', Math.round(dy) + 'px');
    piece.style.setProperty('--dur', dur + 's');
    piece.style.setProperty('--rot', rot);

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), dur * 1000 + 100);
  }
}

type CSSProperties = Record<string, string>;
