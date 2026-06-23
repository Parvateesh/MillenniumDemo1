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

    Object.assign(piece.style, {
      left: x + 'px',
      top: y + 'px',
      backgroundColor: color,
      width: size + 'px',
      height: size + 'px',
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      '--dx': Math.round(dx) + 'px',
      '--dy': Math.round(dy) + 'px',
      '--dur': dur + 's',
      '--rot': rot,
    } as CSSProperties);

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), dur * 1000 + 100);
  }
}

type CSSProperties = Record<string, string>;
