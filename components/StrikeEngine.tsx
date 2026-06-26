'use client';

import { useEffect, useRef, useState } from 'react';

// Animation Engine States
type EngineState = 'LINE' | 'MORPH' | 'ROLL' | 'STRIKE' | 'CLEANUP' | 'COLLAPSE';

interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  sparks: string[];
}

export default function StrikeEngine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerStrikeRef = useRef<(() => void) | null>(null);
  const [hintVisible, setHintVisible] = useState(true);

  // Palette configuration matching the site theme
  const palette: Palette = {
    primary: '#ff2e93',    // Neon Pink
    secondary: '#00f0ff',  // Neon Cyan
    accent: '#ffe600',     // Neon Yellow
    dark: '#0a0118',       // Deep Dark Purple
    sparks: ['#ff2e93', '#00f0ff', '#ffe600', '#ffffff'],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Track state in refs for frame loop access
    let engineState: EngineState = 'LINE';
    let stateTime = 0;
    let shakeAmount = 0;
    let autoLoop = true;

    // Projective flat horizontal parameters (Exactly level with screen center)
    let Y_horizon = height * 0.50;
    let Y_foreground = height * 0.82;
    let W_lane_front = Math.min(width * 0.32, 480);
    let W_lane_back = W_lane_front * 0.16;
    let centerX = width * 0.5;

    function updateLayout(w: number, h: number) {
      Y_horizon = h * 0.50;
      Y_foreground = h * 0.82;
      W_lane_front = Math.min(w * 0.32, 480);
      W_lane_back = W_lane_front * 0.16;
      centerX = w * 0.5;
    }

    // Project 3D vector coordinates into 2D Screen space with horizontal alignment
    function project(x3d: number, y3d: number, z3d: number, morphProgress = 1) {
      const flatY = height * 0.50;
      const targetY = Y_foreground - z3d * (Y_foreground - Y_horizon) - y3d * (1 - z3d * 0.8);
      const yScreen = flatY * (1 - morphProgress) + targetY * morphProgress;

      const laneWidth = W_lane_front * (1 - z3d) + W_lane_back * z3d;
      const targetX = centerX + x3d * laneWidth;
      const flatX = centerX + x3d * W_lane_front * 0.1;
      const xScreen = flatX * (1 - morphProgress) + targetX * morphProgress;

      const scale = ((1 - z3d) * 1.5 + 0.35) * morphProgress;
      return { x: xScreen, y: yScreen, scale };
    }

    // Pin Physics Object
    class Pin {
      id: number;
      originX: number;
      originZ: number;
      x3d = 0;
      y3d = 0;
      z3d = 0;
      vx = 0;
      vy = 0;
      vz = 0;
      pitch = 0;
      yaw = 0;
      roll = 0;
      dpitch = 0;
      dyaw = 0;
      droll = 0;
      active = true;
      collided = false;
      mass = 1.4;
      radius = 0.08;

      constructor(gridX: number, gridZ: number, id: number) {
        this.id = id;
        this.originX = gridX;
        this.originZ = gridZ;
        this.reset();
      }

      reset() {
        this.x3d = this.originX;
        this.y3d = 0;
        this.z3d = this.originZ;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.pitch = 0;
        this.yaw = 0;
        this.roll = 0;
        this.dpitch = 0;
        this.dyaw = 0;
        this.droll = 0;
        this.active = true;
        this.collided = false;
      }

      update(dt: number) {
        if (!this.collided) return;

        // Gravity integration
        this.vy -= 9.8 * dt * 0.8;
        this.x3d += this.vx * dt;
        this.y3d += this.vy * dt;
        this.z3d += this.vz * dt;

        // Air friction
        this.vx *= 0.98;
        this.vz *= 0.98;

        // Ground plane bounce/friction
        if (this.y3d < 0) {
          this.y3d = 0;
          this.vy = -this.vy * 0.35;
          this.vx += (Math.random() - 0.5) * 0.3;
          this.vz += (Math.random() - 0.2) * 0.4;
        }

        // Spin rotations
        this.pitch += this.dpitch * dt;
        this.yaw += this.dyaw * dt;
        this.roll += this.droll * dt;

        // Boundary sweep check
        if (this.z3d > 1.4 || this.z3d < -0.2 || Math.abs(this.x3d) > 3.0) {
          this.active = false;
        }
      }

      draw(morphProgress: number) {
        if (!this.active) return;
        const pt = project(this.x3d, this.y3d, this.z3d, morphProgress);
        if (pt.scale <= 0) return;

        ctx!.save();
        ctx!.translate(pt.x, pt.y);
        ctx!.rotate(this.roll);
        ctx!.scale(pt.scale, pt.scale);

        // Path drawing function
        const drawContour = () => {
          ctx!.beginPath();
          ctx!.moveTo(0, 18);
          ctx!.bezierCurveTo(-8, 18, -9, 13, -7, 8);
          ctx!.bezierCurveTo(-5, 4, -3, 0, -3.8, -6);
          ctx!.bezierCurveTo(-4.8, -10, -3, -17, 0, -17);
          ctx!.bezierCurveTo(3, -17, 4.8, -10, 3.8, -6);
          ctx!.bezierCurveTo(3, 0, 5, 4, 7, 8);
          ctx!.bezierCurveTo(9, 13, 8, 18, 0, 18);
          ctx!.closePath();
        };

        // Glow outer stroke
        ctx!.strokeStyle = this.collided ? 'rgba(255,255,255,0.08)' : palette.primary + '50';
        ctx!.lineWidth = 6;
        drawContour();
        ctx!.stroke();

        // Bright inner core
        ctx!.strokeStyle = this.collided ? 'rgba(255,255,255,0.5)' : '#ffffff';
        ctx!.lineWidth = 1.8;
        drawContour();
        ctx!.stroke();

        // Pin stripe decoration
        ctx!.strokeStyle = palette.secondary;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(-3.4, -9.5);
        ctx!.lineTo(3.4, -9.5);
        ctx!.stroke();

        ctx!.restore();
      }
    }

    const pinOffsets = [
      { x: 0, z: 0.82 },
      { x: -0.12, z: 0.85 }, { x: 0.12, z: 0.85 },
      { x: -0.24, z: 0.88 }, { x: 0, z: 0.88 }, { x: 0.24, z: 0.88 },
      { x: -0.36, z: 0.91 }, { x: -0.12, z: 0.91 }, { x: 0.12, z: 0.91 }, { x: 0.36, z: 0.91 }
    ];

    let pins = pinOffsets.map((off, idx) => new Pin(off.x, off.z, idx));

    // Ball Object
    const ball = {
      x3d: 0,
      y3d: 0,
      z3d: 0,
      vx: 0,
      vz: 0,
      rotation: 0,
      radius: 0.14,
      active: false,

      reset() {
        this.x3d = 0;
        this.y3d = 0;
        this.z3d = 0.05;
        this.vx = 0;
        this.vz = 0.92;
        this.rotation = 0;
        this.active = true;
      },

      update(dt: number) {
        if (!this.active) return;
        this.x3d = 0;
        this.z3d += this.vz * dt;
        this.rotation += 4.5 * dt;
      },

      draw() {
        if (!this.active) return;
        const pt = project(this.x3d, this.y3d, this.z3d, 1);
        if (pt.scale <= 0) return;

        const r = 16 * pt.scale;

        ctx!.save();
        ctx!.translate(pt.x, pt.y);
        ctx!.rotate(this.rotation);

        // Outer glow path
        ctx!.strokeStyle = palette.secondary + '60';
        ctx!.lineWidth = 8;
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0, Math.PI * 2);
        ctx!.stroke();

        // White core line
        ctx!.strokeStyle = '#ffffff';
        ctx!.lineWidth = 2.0;
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0, Math.PI * 2);
        ctx!.stroke();

        // Inner ball ring accent
        ctx!.strokeStyle = palette.secondary;
        ctx!.lineWidth = 1.0;
        ctx!.beginPath();
        ctx!.arc(0, 0, r * 0.8, 0, Math.PI * 2);
        ctx!.stroke();

        // Finger holes
        ctx!.fillStyle = '#0a0118';
        ctx!.strokeStyle = palette.secondary;
        ctx!.lineWidth = 1.2;

        const holes = [
          { x: -r * 0.35, y: -r * 0.25, hR: r * 0.15 },
          { x: r * 0.08, y: -r * 0.45, hR: r * 0.15 },
          { x: r * 0.22, y: -r * 0.15, hR: r * 0.15 }
        ];

        holes.forEach(hole => {
          ctx!.beginPath();
          ctx!.arc(hole.x, hole.y, hole.hR, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.stroke();
        });

        ctx!.restore();
      }
    };

    // Spark Particles
    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha = 1.0;
      decay: number;
      size: number;

      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.decay = Math.random() * 0.5 + 0.5;
        this.size = Math.random() * 3 + 1.5;
      }

      update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.alpha -= this.decay * dt;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx!.save();
        ctx!.globalAlpha = this.alpha;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    let sparks: Spark[] = [];

    function createSparks(x: number, y: number, count: number) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 140 + 60;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 40;
        const color = palette.sparks[Math.floor(Math.random() * palette.sparks.length)];
        sparks.push(new Spark(x, y, vx, vy, color));
      }
    }

    function runCollisionEngine(dt: number) {
      if (ball.active) {
        pins.forEach(pin => {
          if (pin.active && !pin.collided) {
            const dx = pin.x3d - ball.x3d;
            const dz = pin.z3d - ball.z3d;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < (ball.radius + pin.radius)) {
              pin.collided = true;
              const angle = Math.atan2(dx, dz) + (Math.random() - 0.5) * 0.15;
              const force = 4.2;

              pin.vx = Math.sin(angle) * force;
              pin.vz = Math.cos(angle) * force + ball.vz * 0.35;
              pin.vy = Math.random() * 4 + 2.5;

              pin.dpitch = Math.random() * 16 - 8;
              pin.dyaw = Math.random() * 16 - 8;
              pin.droll = Math.random() * 16 - 8;

              ball.vz *= 0.75;

              const p2d = project(pin.x3d, pin.y3d, pin.z3d);
              createSparks(p2d.x, p2d.y, 8);
            }
          }
        });
      }

      // Pin-to-pin cascades
      for (let i = 0; i < pins.length; i++) {
        const p1 = pins[i];
        if (!p1.active) continue;

        for (let j = i + 1; j < pins.length; j++) {
          const p2 = pins[j];
          if (!p2.active) continue;
          if (!p1.collided && !p2.collided) continue;

          const dx = p2.x3d - p1.x3d;
          const dz = p2.z3d - p1.z3d;
          const dy = p2.y3d - p1.y3d;
          const dist = Math.sqrt(dx * dx + dz * dz + dy * dy);

          const collisionThreshold = p1.radius * 2.25;
          if (dist < collisionThreshold) {
            if (p1.collided && !p2.collided) {
              p2.collided = true;
              p2.vx = p1.vx * 0.8 + (Math.random() - 0.5) * 1.5;
              p2.vz = p1.vz * 0.8 + (Math.random() - 0.5) * 1.5;
              p2.vy = Math.max(p1.vy * 0.5, 0) + Math.random() * 2 + 1;
              p2.dpitch = Math.random() * 10 - 5;
              p2.droll = Math.random() * 10 - 5;
              p1.vx *= -0.25;
            } else if (p2.collided && !p1.collided) {
              p1.collided = true;
              p1.vx = p2.vx * 0.8 + (Math.random() - 0.5) * 1.5;
              p1.vz = p2.vz * 0.8 + (Math.random() - 0.5) * 1.5;
              p1.vy = Math.max(p2.vy * 0.5, 0) + Math.random() * 2 + 1;
              p1.dpitch = Math.random() * 10 - 5;
              p1.droll = Math.random() * 10 - 5;
              p2.vx *= -0.25;
            }
          }
        }
      }
    }

    function transitionTo(nextState: EngineState) {
      engineState = nextState;
      stateTime = 0;

      if (nextState === 'MORPH') {
        pins.forEach(p => p.reset());
        ball.reset();
        ball.active = false;
      } else if (nextState === 'ROLL') {
        ball.reset();
      } else if (nextState === 'STRIKE') {
        shakeAmount = 12;
        const soundHit = project(0, 0, 0.85);
        createSparks(soundHit.x, soundHit.y, 40);
      }
    }

    function triggerStrike() {
      if (engineState === 'LINE') {
        transitionTo('MORPH');
      } else if (engineState === 'MORPH' || engineState === 'COLLAPSE') {
        transitionTo('ROLL');
      } else if (engineState === 'STRIKE' || engineState === 'CLEANUP') {
        transitionTo('MORPH');
        setTimeout(() => transitionTo('ROLL'), 150);
      }
    }
    triggerStrikeRef.current = triggerStrike;

    // Animation Loop
    let animId: number;
    function loop(timestamp: number) {
      const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;

      // Update State Timelines
      stateTime += dt;
      if (shakeAmount > 0) {
        shakeAmount -= 24 * dt;
        if (shakeAmount < 0) shakeAmount = 0;
      }

      switch (engineState) {
        case 'LINE':
          if (autoLoop && stateTime > 3.0) {
            transitionTo('MORPH');
          }
          break;

        case 'MORPH':
          if (stateTime > 1.2) {
            transitionTo('ROLL');
          }
          break;

        case 'ROLL':
          ball.update(dt);
          if (ball.z3d >= 0.81) {
            transitionTo('STRIKE');
          }
          break;

        case 'STRIKE':
          runCollisionEngine(dt);
          pins.forEach(p => p.update(dt));
          if (stateTime > 1.8) {
            transitionTo('CLEANUP');
          }
          break;

        case 'CLEANUP':
          pins.forEach(p => p.update(dt));
          if (stateTime > 0.8) {
            transitionTo('COLLAPSE');
          }
          break;

        case 'COLLAPSE':
          if (stateTime > 1.2) {
            transitionTo('LINE');
          }
          break;
      }

      sparks.forEach(s => s.update(dt));
      sparks = sparks.filter(s => s.alpha > 0);

      // Render Stage
      ctx!.fillStyle = palette.dark;
      ctx!.fillRect(0, 0, width, height);

      ctx!.save();
      if (shakeAmount > 0) {
        const sx = (Math.random() - 0.5) * shakeAmount;
        const sy = (Math.random() - 0.5) * shakeAmount;
        ctx!.translate(sx, sy);
      }

      let morph = 0;
      if (engineState === 'MORPH') {
        morph = Math.min(stateTime / 1.0, 1.0);
      } else if (engineState === 'ROLL' || engineState === 'STRIKE' || engineState === 'CLEANUP') {
        morph = 1.0;
      } else if (engineState === 'COLLAPSE') {
        morph = Math.max(1.0 - (stateTime / 1.0), 0);
      }

      // Layer 1: Lane perspective guidelines
      if (morph > 0) {
        ctx!.save();
        ctx!.globalAlpha = morph;

        const glStart = project(-0.55, 0, 0, morph);
        const glEnd = project(-0.55, 0, 1, morph);
        const grStart = project(0.55, 0, 0, morph);
        const grEnd = project(0.55, 0, 1, morph);

        ctx!.strokeStyle = palette.primary + '30';
        ctx!.lineWidth = 6;
        ctx!.beginPath();
        ctx!.moveTo(glStart.x, glStart.y); ctx!.lineTo(glEnd.x, glEnd.y);
        ctx!.moveTo(grStart.x, grStart.y); ctx!.lineTo(grEnd.x, grEnd.y);
        ctx!.stroke();

        ctx!.strokeStyle = palette.primary;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Inner Board Seams
        ctx!.strokeStyle = palette.secondary + '15';
        ctx!.lineWidth = 1.0;
        const boards = [-0.35, -0.18, 0, 0.18, 0.35];
        boards.forEach(bx => {
          const bStart = project(bx, 0, 0, morph);
          const bEnd = project(bx, 0, 1, morph);
          ctx!.beginPath();
          ctx!.moveTo(bStart.x, bStart.y);
          ctx!.lineTo(bEnd.x, bEnd.y);
          ctx!.stroke();
        });

        // Horizon end line
        const hStart = project(-0.55, 0, 1, morph);
        const hEnd = project(0.55, 0, 1, morph);
        ctx!.strokeStyle = palette.primary;
        ctx!.lineWidth = 2.0;
        ctx!.beginPath();
        ctx!.moveTo(hStart.x, hStart.y);
        ctx!.lineTo(hEnd.x, hEnd.y);
        ctx!.stroke();

        ctx!.restore();
      }

      // Layer 2: Idle Line
      if (morph < 1.0) {
        ctx!.save();
        ctx!.globalAlpha = 1.0 - morph;
        const midY = height * 0.50;

        ctx!.strokeStyle = palette.primary + '40';
        ctx!.lineWidth = 8;
        ctx!.beginPath();
        ctx!.moveTo(0, midY);
        ctx!.lineTo(width, midY);
        ctx!.stroke();

        ctx!.strokeStyle = '#ffffff';
        ctx!.lineWidth = 2.0;
        ctx!.stroke();
        ctx!.restore();
      }

      // Layer 3: Pins
      if (morph > 0.35 && engineState !== 'COLLAPSE') {
        ctx!.save();
        if (engineState === 'CLEANUP') {
          ctx!.globalAlpha = Math.max(1.0 - (stateTime / 0.8), 0);
        }
        const sortedPins = [...pins].sort((a, b) => b.z3d - a.z3d);
        sortedPins.forEach(p => p.draw(morph));
        ctx!.restore();
      }

      // Layer 4: Ball
      if (engineState === 'ROLL') {
        ball.draw();
      }

      // Layer 5: Particles
      sparks.forEach(s => s.draw());

      // Layer 6: Neon STRIKE text
      if (engineState === 'STRIKE' || engineState === 'CLEANUP') {
        ctx!.save();
        const textAlpha = engineState === 'STRIKE' ? Math.min(stateTime / 0.2, 1.0) : Math.max(1.0 - (stateTime / 0.8), 0);
        ctx!.globalAlpha = textAlpha;

        const textY = height * 0.32;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        ctx!.shadowColor = palette.primary;
        ctx!.shadowBlur = 20;
        ctx!.fillStyle = '#ffffff';

        const scale = 1.0 + Math.sin(stateTime * 6) * 0.03;
        const fontSize = Math.floor(Math.min(width * 0.10, 52) * scale);
        ctx!.font = `italic 800 ${fontSize}px var(--font-inter), sans-serif`;
        ctx!.fillText('STRIKE!', width * 0.5, textY);
        ctx!.restore();
      }

      ctx!.restore();
      animId = requestAnimationFrame(loop);
    }

    // Set canvas resolution
    let lastFrameTime = performance.now();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    updateLayout(width, height);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        updateLayout(width, height);
      }
    });
    resizeObserver.observe(container);

    // Event Handler Click on canvas to roll
    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      setHintVisible(false);
      triggerStrike();
    };
    canvas.addEventListener('click', onClick);

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="strike-engine-container"
      title="Click anywhere to roll the ball!"
    >
      <canvas ref={canvasRef} className="strike-engine-canvas" />

      {/* Floating Instruction Hint */}
      {hintVisible && (
        <div className="strike-engine-hint">
          <span className="hint-pulse">●</span>
          <span>Click anywhere to roll</span>
        </div>
      )}

      {/* Manual Bowl Button */}
      <button
        className="strike-engine-btn"
        onClick={(e) => {
          e.stopPropagation();
          setHintVisible(false);
          triggerStrikeRef.current?.();
        }}
      >
        🎳 Launch Ball
      </button>
    </div>
  );
}
