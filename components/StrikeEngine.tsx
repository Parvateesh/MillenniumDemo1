'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

type EngineState = 'IDLE' | 'ROLL' | 'STRIKE' | 'GUTTER' | 'OPEN' | 'CLEANUP';

interface Palette { primary: string; secondary: string; accent: string; dark: string; sparks: string[]; }

const COMBO: Record<number, string> = {
  2: '🔥 DOUBLE',
  3: '🦃 TURKEY',
  4: '🍗 HAMBONE',
  5: '🎯 FIVE-BAGGER',
  6: '🔥 SIX-PACK',
  7: '⚡ SEVEN-BAGGER',
  8: '💫 EIGHT-BAGGER',
  9: '👑 GOLDEN NINE',
  10: '🏆 PERFECT GAME',
};

const MAX_AIM = 0.36;   // max 3D x offset at pin line
const GUTTER_X = 0.48; // x beyond this = gutter

export default function StrikeEngine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const triggerRef   = useRef<((aimed?: boolean) => void) | null>(null);
  const onIdleRef    = useRef<(() => void) | null>(null);
  const streakRef    = useRef(0);
  const aimXRef      = useRef(0);
  const powerRef     = useRef(0);
  const isChargingRef = useRef(false);
  const chargeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isIdle, setIsIdle]             = useState(true);
  const [streak, setStreak]             = useState(0);
  const [lastResult, setLastResult]     = useState<string | null>(null);
  const [stats, setStats]               = useState({ strikes: 0, gutters: 0, balls: 0, best: 0 });
  const [power, setPower]               = useState(0);
  const [isCharging, setIsCharging]     = useState(false);

  // Wire idle callback so hint reappears between balls
  useEffect(() => {
    onIdleRef.current = () => setIsIdle(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const palette: Palette = {
      primary: '#ff2e93',
      secondary: '#00f0ff',
      accent: '#ffe600',
      dark: '#0a0118',
      sparks: ['#ff2e93', '#00f0ff', '#ffe600', '#ffffff'],
    };

    let engineState: EngineState = 'IDLE';
    let stateTime = 0;
    let shakeAmount = 0;
    let isVisible = !document.hidden;
    let isMouseOver = false;
    let pinsKnockedCount = 0;
    let isAutoRoll = true; // true when triggered by timer, false when user-aimed

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

    function project(x3d: number, y3d: number, z3d: number) {
      const targetY = Y_foreground - z3d * (Y_foreground - Y_horizon) - y3d * (1 - z3d * 0.8);
      const laneWidth = W_lane_front * (1 - z3d) + W_lane_back * z3d;
      const targetX = centerX + x3d * laneWidth;
      const scale = (1 - z3d) * 1.5 + 0.35;
      return { x: targetX, y: targetY, scale };
    }

    class Pin {
      id: number; originX: number; originZ: number;
      x3d = 0; y3d = 0; z3d = 0;
      vx = 0; vy = 0; vz = 0;
      pitch = 0; yaw = 0; roll = 0;
      dpitch = 0; dyaw = 0; droll = 0;
      active = true; collided = false;
      radius = 0.08;

      constructor(gridX: number, gridZ: number, id: number) {
        this.id = id; this.originX = gridX; this.originZ = gridZ; this.reset();
      }

      reset() {
        this.x3d = this.originX; this.y3d = 0; this.z3d = this.originZ;
        this.vx = 0; this.vy = 0; this.vz = 0;
        this.pitch = 0; this.yaw = 0; this.roll = 0;
        this.dpitch = 0; this.dyaw = 0; this.droll = 0;
        this.active = true; this.collided = false;
      }

      update(dt: number) {
        if (!this.collided) return;
        this.vy -= 9.8 * dt * 0.8;
        this.x3d += this.vx * dt; this.y3d += this.vy * dt; this.z3d += this.vz * dt;
        this.vx *= 0.98; this.vz *= 0.98;
        if (this.y3d < 0) {
          this.y3d = 0; this.vy = -this.vy * 0.35;
          this.vx += (Math.random() - 0.5) * 0.3;
          this.vz += (Math.random() - 0.2) * 0.4;
        }
        this.pitch += this.dpitch * dt; this.yaw += this.dyaw * dt; this.roll += this.droll * dt;
        if (this.z3d > 1.4 || this.z3d < -0.2 || Math.abs(this.x3d) > 3.0) this.active = false;
      }

      draw() {
        if (!this.active) return;
        const pt = project(this.x3d, this.y3d, this.z3d);
        if (pt.scale <= 0) return;
        ctx!.save();
        ctx!.translate(pt.x, pt.y);
        ctx!.rotate(this.roll);
        ctx!.scale(pt.scale, pt.scale);
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
        ctx!.strokeStyle = this.collided ? 'rgba(255,255,255,0.08)' : palette.primary + '50';
        ctx!.lineWidth = 6; drawContour(); ctx!.stroke();
        ctx!.strokeStyle = this.collided ? 'rgba(255,255,255,0.5)' : '#ffffff';
        ctx!.lineWidth = 1.8; drawContour(); ctx!.stroke();
        ctx!.strokeStyle = palette.secondary; ctx!.lineWidth = 1.5;
        ctx!.beginPath(); ctx!.moveTo(-3.4, -9.5); ctx!.lineTo(3.4, -9.5); ctx!.stroke();
        ctx!.restore();
      }
    }

    const pinOffsets = [
      { x: 0, z: 0.82 },
      { x: -0.12, z: 0.85 }, { x: 0.12, z: 0.85 },
      { x: -0.24, z: 0.88 }, { x: 0, z: 0.88 }, { x: 0.24, z: 0.88 },
      { x: -0.36, z: 0.91 }, { x: -0.12, z: 0.91 }, { x: 0.12, z: 0.91 }, { x: 0.36, z: 0.91 },
    ];
    let pins = pinOffsets.map((off, idx) => new Pin(off.x, off.z, idx));

    const ball = {
      x3d: 0, y3d: 0, z3d: 0,
      targetAimX: 0,
      vz: 0,
      rotation: 0,
      active: false,
      inGutter: false,

      reset(aimX = 0, speedMult = 1) {
        this.x3d = 0; this.y3d = 0; this.z3d = 0.05;
        this.targetAimX = aimX * MAX_AIM;
        this.vz = 0.88 * (0.55 + speedMult * 0.9);
        this.rotation = 0; this.active = true; this.inGutter = false;
      },

      update(dt: number) {
        if (!this.active || engineState === 'IDLE') return;
        const progress = Math.min(this.z3d / 0.82, 1);
        this.x3d = this.targetAimX * progress;
        this.z3d += this.vz * dt;
        this.rotation += 4.5 * dt;
        if (Math.abs(this.x3d) > GUTTER_X && !this.inGutter) {
          this.inGutter = true;
          transitionTo('GUTTER');
        }
      },

      draw() {
        const pt = project(this.x3d, this.y3d, this.z3d);
        if (pt.scale <= 0) return;
        const r = 16 * pt.scale;
        ctx!.save(); ctx!.translate(pt.x, pt.y); ctx!.rotate(this.rotation);

        // Gutter ball dims
        if (this.inGutter) ctx!.globalAlpha = 0.4;

        ctx!.strokeStyle = palette.secondary + '60'; ctx!.lineWidth = 8;
        ctx!.beginPath(); ctx!.arc(0, 0, r, 0, Math.PI * 2); ctx!.stroke();
        ctx!.strokeStyle = '#ffffff'; ctx!.lineWidth = 2.0;
        ctx!.beginPath(); ctx!.arc(0, 0, r, 0, Math.PI * 2); ctx!.stroke();
        ctx!.strokeStyle = palette.secondary; ctx!.lineWidth = 1.0;
        ctx!.beginPath(); ctx!.arc(0, 0, r * 0.8, 0, Math.PI * 2); ctx!.stroke();
        ctx!.fillStyle = '#0a0118'; ctx!.strokeStyle = palette.secondary; ctx!.lineWidth = 1.2;
        const holes = [
          { x: -r * 0.35, y: -r * 0.25, hR: r * 0.15 },
          { x: r * 0.08,  y: -r * 0.45, hR: r * 0.15 },
          { x: r * 0.22,  y: -r * 0.15, hR: r * 0.15 },
        ];
        holes.forEach(hole => {
          ctx!.beginPath(); ctx!.arc(hole.x, hole.y, hole.hR, 0, Math.PI * 2);
          ctx!.fill(); ctx!.stroke();
        });
        ctx!.restore();
      },
    };

    class Spark {
      x: number; y: number; vx: number; vy: number;
      color: string; alpha = 1.0; decay: number; size: number;
      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.color = color;
        this.decay = Math.random() * 0.5 + 0.5; this.size = Math.random() * 3 + 1.5;
      }
      update(dt: number) { this.x += this.vx * dt; this.y += this.vy * dt; this.alpha -= this.decay * dt; }
      draw() {
        if (this.alpha <= 0) return;
        ctx!.save(); ctx!.globalAlpha = this.alpha; ctx!.fillStyle = this.color;
        ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx!.fill();
        ctx!.restore();
      }
    }
    let sparks: Spark[] = [];

    function createSparks(x: number, y: number, count: number, colorOverride?: string) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 160 + 60;
        const color = colorOverride ?? palette.sparks[Math.floor(Math.random() * palette.sparks.length)];
        sparks.push(new Spark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed - 40, color));
      }
    }

    function runCollision(dt: number) {
      if (ball.active && !ball.inGutter) {
        pins.forEach(pin => {
          if (pin.active && !pin.collided) {
            const dx = pin.x3d - ball.x3d, dz = pin.z3d - ball.z3d;
            if (Math.sqrt(dx * dx + dz * dz) < ball.vz * 0.14 + pin.radius) {
              pin.collided = true;
              const angle = Math.atan2(dx, dz) + (Math.random() - 0.5) * 0.15;
              const force = 4.2 + powerRef.current * 2;
              pin.vx = Math.sin(angle) * force; pin.vz = Math.cos(angle) * force + ball.vz * 0.35;
              pin.vy = Math.random() * 4 + 2.5;
              pin.dpitch = Math.random() * 16 - 8; pin.dyaw = Math.random() * 16 - 8; pin.droll = Math.random() * 16 - 8;
              ball.vz *= 0.75;
              const p2d = project(pin.x3d, pin.y3d, pin.z3d);
              createSparks(p2d.x, p2d.y, 8);
            }
          }
        });
      }
      for (let i = 0; i < pins.length; i++) {
        const p1 = pins[i]; if (!p1.active) continue;
        for (let j = i + 1; j < pins.length; j++) {
          const p2 = pins[j]; if (!p2.active) continue;
          if (!p1.collided && !p2.collided) continue;
          const dx = p2.x3d - p1.x3d, dz = p2.z3d - p1.z3d, dy = p2.y3d - p1.y3d;
          if (Math.sqrt(dx * dx + dz * dz + dy * dy) < p1.radius * 2.25) {
            if (p1.collided && !p2.collided) {
              p2.collided = true;
              p2.vx = p1.vx * 0.8 + (Math.random() - 0.5) * 1.5; p2.vz = p1.vz * 0.8 + (Math.random() - 0.5) * 1.5;
              p2.vy = Math.max(p1.vy * 0.5, 0) + Math.random() * 2 + 1;
              p2.dpitch = Math.random() * 10 - 5; p2.droll = Math.random() * 10 - 5; p1.vx *= -0.25;
            } else if (p2.collided && !p1.collided) {
              p1.collided = true;
              p1.vx = p2.vx * 0.8 + (Math.random() - 0.5) * 1.5; p1.vz = p2.vz * 0.8 + (Math.random() - 0.5) * 1.5;
              p1.vy = Math.max(p2.vy * 0.5, 0) + Math.random() * 2 + 1;
              p1.dpitch = Math.random() * 10 - 5; p1.droll = Math.random() * 10 - 5; p2.vx *= -0.25;
            }
          }
        }
      }
    }

    function transitionTo(next: EngineState) {
      engineState = next; stateTime = 0;
      if (next === 'IDLE') {
        pins.forEach(p => p.reset()); ball.reset(); ball.active = true;
        onIdleRef.current?.();
      } else if (next === 'ROLL') {
        ball.reset(isAutoRoll ? 0 : aimXRef.current, powerRef.current);
      } else if (next === 'STRIKE') {
        shakeAmount = 14;
        const hit = project(ball.x3d, 0, 0.85);
        createSparks(hit.x, hit.y, 50);
        createSparks(hit.x, hit.y, 20, palette.accent);
        pinsKnockedCount = 10;
        streakRef.current += 1;
        setStreak(streakRef.current);
        setLastResult('STRIKE');
        setStats(prev => ({
          ...prev, strikes: prev.strikes + 1, balls: prev.balls + 1,
          best: Math.max(prev.best, streakRef.current),
        }));
      } else if (next === 'GUTTER') {
        streakRef.current = 0; setStreak(0); setLastResult('GUTTER');
        setStats(prev => ({ ...prev, gutters: prev.gutters + 1, balls: prev.balls + 1 }));
      } else if (next === 'OPEN') {
        pinsKnockedCount = pins.filter(p => p.collided).length;
        streakRef.current = 0; setStreak(0); setLastResult('OPEN');
        setStats(prev => ({ ...prev, balls: prev.balls + 1 }));
      }
    }

    function rollBall(auto = false) {
      if (engineState !== 'IDLE') {
        transitionTo('IDLE');
        setTimeout(() => { isAutoRoll = auto; transitionTo('ROLL'); }, 150);
      } else {
        isAutoRoll = auto;
        transitionTo('ROLL');
      }
    }

    triggerRef.current = (aimed = false) => rollBall(!aimed);

    // ── Draw Helpers ─────────────────────────────────────────────────────────────

    function drawLane() {
      const glStart = project(-0.55, 0, 0), glEnd = project(-0.55, 0, 1);
      const grStart = project(0.55, 0, 0), grEnd = project(0.55, 0, 1);
      ctx!.strokeStyle = palette.primary + '30'; ctx!.lineWidth = 6;
      ctx!.beginPath();
      ctx!.moveTo(glStart.x, glStart.y); ctx!.lineTo(glEnd.x, glEnd.y);
      ctx!.moveTo(grStart.x, grStart.y); ctx!.lineTo(grEnd.x, grEnd.y);
      ctx!.stroke();
      ctx!.strokeStyle = palette.primary; ctx!.lineWidth = 1.5; ctx!.stroke();

      ctx!.strokeStyle = palette.secondary + '15'; ctx!.lineWidth = 1.0;
      [-0.35, -0.18, 0, 0.18, 0.35].forEach(bx => {
        const bS = project(bx, 0, 0), bE = project(bx, 0, 1);
        ctx!.beginPath(); ctx!.moveTo(bS.x, bS.y); ctx!.lineTo(bE.x, bE.y); ctx!.stroke();
      });

      const hS = project(-0.55, 0, 1), hE = project(0.55, 0, 1);
      const ctrlY = hS.y - 16;
      ctx!.fillStyle = '#05000c';
      ctx!.beginPath();
      ctx!.moveTo(hS.x, hS.y); ctx!.quadraticCurveTo(centerX, ctrlY, hE.x, hE.y);
      ctx!.lineTo(hE.x, hE.y + 10); ctx!.lineTo(hS.x, hS.y + 10); ctx!.closePath(); ctx!.fill();
      const pitGlow = ctx!.createRadialGradient(centerX, hS.y - 6, 2, centerX, hS.y - 6, 40);
      pitGlow.addColorStop(0, palette.secondary + '20'); pitGlow.addColorStop(1, 'transparent');
      ctx!.fillStyle = pitGlow; ctx!.beginPath(); ctx!.arc(centerX, hS.y - 6, 40, 0, Math.PI * 2); ctx!.fill();
      ctx!.strokeStyle = palette.primary + '40'; ctx!.lineWidth = 5;
      ctx!.beginPath(); ctx!.moveTo(hS.x, hS.y); ctx!.quadraticCurveTo(centerX, ctrlY, hE.x, hE.y); ctx!.stroke();
      ctx!.strokeStyle = palette.primary; ctx!.lineWidth = 1.8;
      ctx!.beginPath(); ctx!.moveTo(hS.x, hS.y); ctx!.quadraticCurveTo(centerX, ctrlY, hE.x, hE.y); ctx!.stroke();
    }

    function drawAimGuide() {
      if (!isMouseOver || engineState !== 'IDLE') return;
      const ax = aimXRef.current;
      const targetX = ax * MAX_AIM;
      const isGutter = Math.abs(ax) > GUTTER_X / MAX_AIM;
      const isRisky  = Math.abs(ax) > 0.75;

      const ballPt = project(0, 0, 0.05);
      const pinPt  = project(targetX, 0, 0.83);

      // Aim line
      ctx!.save();
      ctx!.setLineDash([5, 7]);
      ctx!.strokeStyle = isGutter ? '#ff4040' : isRisky ? palette.accent : palette.secondary;
      ctx!.lineWidth = 1.8;
      ctx!.globalAlpha = 0.7;
      ctx!.beginPath(); ctx!.moveTo(ballPt.x, ballPt.y); ctx!.lineTo(pinPt.x, pinPt.y); ctx!.stroke();
      ctx!.setLineDash([]);

      // Target dot at pin area
      ctx!.globalAlpha = 0.5;
      ctx!.fillStyle = isGutter ? '#ff4040' : palette.secondary;
      ctx!.beginPath(); ctx!.arc(pinPt.x, pinPt.y, 5, 0, Math.PI * 2); ctx!.fill();
      ctx!.restore();
    }

    function drawPowerBar() {
      if (!isChargingRef.current) return;
      const p = powerRef.current;
      const barW = Math.min(width * 0.3, 160);
      const barH = 10;
      const bx = centerX - barW / 2;
      const by = height - 36;

      ctx!.save();
      // Background
      ctx!.fillStyle = 'rgba(0,0,0,0.55)';
      ctx!.beginPath(); ctx!.roundRect(bx - 2, by - 2, barW + 4, barH + 4, 6); ctx!.fill();
      // Fill
      const grad = ctx!.createLinearGradient(bx, 0, bx + barW, 0);
      grad.addColorStop(0, palette.secondary);
      grad.addColorStop(p > 0.6 ? 0.6 : p, palette.primary);
      if (p > 0.6) grad.addColorStop(1, '#ff8800');
      ctx!.fillStyle = grad;
      ctx!.beginPath(); ctx!.roundRect(bx, by, barW * p, barH, 4); ctx!.fill();
      // Label
      ctx!.fillStyle = 'rgba(255,255,255,0.8)';
      ctx!.font = `700 10px var(--font-space-mono), monospace`;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';
      ctx!.fillText('POWER', centerX, by - 10);
      ctx!.restore();
    }

    function drawResultText() {
      const state = engineState;
      if (state !== 'STRIKE' && state !== 'GUTTER' && state !== 'OPEN' && state !== 'CLEANUP') return;

      const textY = height * 0.32;
      const isExiting = state === 'CLEANUP';
      const alpha = isExiting ? Math.max(1 - stateTime / 0.8, 0) : Math.min(stateTime / 0.18, 1);
      if (alpha <= 0) return;

      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.textAlign = 'center'; ctx!.textBaseline = 'middle';

      const scale = state === 'STRIKE' ? 1 + Math.sin(stateTime * 6) * 0.03 : 1;
      const fs = Math.floor(Math.min(width * 0.10, 52) * scale);

      if (state === 'STRIKE' || (isExiting && lastResult === 'STRIKE')) {
        ctx!.shadowColor = palette.primary; ctx!.shadowBlur = 24;
        ctx!.fillStyle = '#ffffff';
        ctx!.font = `italic 800 ${fs}px var(--font-inter), sans-serif`;
        ctx!.fillText('STRIKE!', centerX, textY);

        const s = streakRef.current;
        const comboLabel = s >= 2 ? COMBO[Math.min(s, 10)] : null;
        if (comboLabel) {
          ctx!.shadowColor = palette.accent; ctx!.shadowBlur = 18;
          ctx!.fillStyle = palette.accent;
          ctx!.font = `700 ${Math.floor(fs * 0.48)}px var(--font-inter), sans-serif`;
          ctx!.fillText(comboLabel, centerX, textY + fs * 0.75);
        }
      } else if (state === 'GUTTER' || (isExiting && lastResult === 'GUTTER')) {
        ctx!.shadowColor = '#ff4040'; ctx!.shadowBlur = 20;
        ctx!.fillStyle = '#ff6060';
        ctx!.font = `italic 800 ${fs}px var(--font-inter), sans-serif`;
        ctx!.fillText('GUTTER!', centerX, textY);
        ctx!.font = `400 ${Math.floor(fs * 0.38)}px var(--font-inter), sans-serif`;
        ctx!.fillStyle = 'rgba(255,150,150,0.8)';
        ctx!.fillText('try again — aim for center', centerX, textY + fs * 0.7);
      } else if (state === 'OPEN' || (isExiting && lastResult === 'OPEN')) {
        ctx!.shadowColor = palette.accent; ctx!.shadowBlur = 16;
        ctx!.fillStyle = palette.accent;
        ctx!.font = `italic 800 ${Math.floor(fs * 0.8)}px var(--font-inter), sans-serif`;
        ctx!.fillText(`${pinsKnockedCount} pin${pinsKnockedCount === 1 ? '' : 's'}!`, centerX, textY);
        ctx!.font = `400 ${Math.floor(fs * 0.38)}px var(--font-inter), sans-serif`;
        ctx!.fillStyle = 'rgba(255,255,255,0.5)';
        ctx!.fillText('keep bowling for the spare', centerX, textY + fs * 0.65);
      }

      ctx!.restore();
    }

    function drawStreakBadge() {
      const s = streakRef.current;
      if (s < 2 || engineState === 'IDLE') return;
      const label = COMBO[Math.min(s, 10)] ?? `🔥 ${s}-BAGGER`;
      const pad = 10;
      const fontSize = 13;
      ctx!.save();
      ctx!.font = `700 ${fontSize}px var(--font-inter), sans-serif`;
      ctx!.textBaseline = 'middle'; ctx!.textAlign = 'left';
      const tw = ctx!.measureText(label).width;
      const bw = tw + pad * 2, bh = 28;
      const bx = 16, by = 16;
      ctx!.fillStyle = 'rgba(10,1,24,0.8)';
      ctx!.beginPath(); ctx!.roundRect(bx, by, bw, bh, 14); ctx!.fill();
      ctx!.strokeStyle = palette.accent; ctx!.lineWidth = 1.2;
      ctx!.beginPath(); ctx!.roundRect(bx, by, bw, bh, 14); ctx!.stroke();
      ctx!.fillStyle = palette.accent;
      ctx!.fillText(label, bx + pad, by + bh / 2);
      ctx!.restore();
    }

    // ── Main Loop ────────────────────────────────────────────────────────────────
    let animId = 0;
    let lastFrameTime = performance.now();

    function loop(timestamp: number) {
      if (!isVisible) { animId = 0; return; }
      const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;
      stateTime += dt;

      if (shakeAmount > 0) { shakeAmount -= 24 * dt; if (shakeAmount < 0) shakeAmount = 0; }

      // Power charge update
      if (isChargingRef.current) {
        powerRef.current = Math.min(powerRef.current + dt / 0.9, 1);
        setPower(powerRef.current);
      }

      switch (engineState) {
        case 'IDLE':
          if (stateTime > 4.5 && !isChargingRef.current) rollBall(true);
          break;
        case 'ROLL':
          ball.update(dt);
          if (!ball.inGutter && ball.z3d >= 0.82) {
            const knocked = pins.filter(p => p.collided).length + pins.filter(p => {
              if (p.collided) return false;
              const dx = p.x3d - ball.x3d, dz = p.z3d - ball.z3d;
              return Math.sqrt(dx * dx + dz * dz) < ball.vz * 0.14 + p.radius;
            }).length;
            // Resolve final collision for a frame, then judge
            runCollision(dt);
            const allDown = pins.every(p => p.collided);
            transitionTo(allDown ? 'STRIKE' : 'OPEN');
          }
          runCollision(dt);
          break;
        case 'STRIKE':
          runCollision(dt); pins.forEach(p => p.update(dt));
          if (stateTime > 2.2) transitionTo('CLEANUP');
          break;
        case 'GUTTER':
          ball.update(dt);
          if (stateTime > 1.6) transitionTo('CLEANUP');
          break;
        case 'OPEN':
          runCollision(dt); pins.forEach(p => p.update(dt));
          if (stateTime > 1.8) transitionTo('CLEANUP');
          break;
        case 'CLEANUP':
          pins.forEach(p => p.update(dt));
          if (stateTime > 0.9) transitionTo('IDLE');
          break;
      }

      sparks.forEach(s => s.update(dt));
      sparks = sparks.filter(s => s.alpha > 0);

      // Render
      ctx!.fillStyle = palette.dark;
      ctx!.fillRect(0, 0, width, height);

      ctx!.save();
      if (shakeAmount > 0) {
        ctx!.translate((Math.random() - 0.5) * shakeAmount, (Math.random() - 0.5) * shakeAmount);
      }

      drawLane();
      drawAimGuide();

      if (engineState !== 'CLEANUP' || stateTime < 0.9) {
        ctx!.save();
        if (engineState === 'CLEANUP') ctx!.globalAlpha = Math.max(1 - stateTime / 0.9, 0);
        [...pins].sort((a, b) => b.z3d - a.z3d).forEach(p => p.draw());
        ctx!.restore();
      }

      if (engineState === 'ROLL' || engineState === 'IDLE' || engineState === 'GUTTER') ball.draw();
      sparks.forEach(s => s.draw());
      drawResultText();
      drawStreakBadge();
      drawPowerBar();

      ctx!.restore();
      animId = requestAnimationFrame(loop);
    }

    // ── Init ─────────────────────────────────────────────────────────────────────
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    updateLayout(width, height);
    transitionTo('IDLE');

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        width = entry.contentRect.width; height = entry.contentRect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        updateLayout(width, height);
      }
    });
    ro.observe(container);

    // Mouse events
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      aimXRef.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      isMouseOver = true;
    };
    const onLeave = () => { isMouseOver = false; };
    const onDown = (e: MouseEvent) => {
      e.stopPropagation();
      if (engineState === 'IDLE') {
        isChargingRef.current = true; setIsCharging(true);
        powerRef.current = 0; setPower(0);
        const rect = canvas.getBoundingClientRect();
        aimXRef.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      }
    };
    const onUp = (e: MouseEvent) => {
      e.stopPropagation();
      if (isChargingRef.current) {
        isChargingRef.current = false; setIsCharging(false);
        setIsIdle(false);
        rollBall(false);
        powerRef.current = 0; setPower(0);
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      aimXRef.current = ((t.clientX - rect.left) / rect.width - 0.5) * 2;
      if (engineState === 'IDLE') {
        isChargingRef.current = true; setIsCharging(true);
        powerRef.current = 0; setPower(0);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      aimXRef.current = ((t.clientX - rect.left) / rect.width - 0.5) * 2;
    };
    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (isChargingRef.current) {
        isChargingRef.current = false; setIsCharging(false);
        setIsIdle(false);
        rollBall(false);
        powerRef.current = 0; setPower(0);
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });

    const onVisChange = () => { isVisible = !document.hidden; if (isVisible && animId === 0) { lastFrameTime = performance.now(); animId = requestAnimationFrame(loop); } };
    document.addEventListener('visibilitychange', onVisChange);

    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible && animId === 0) { lastFrameTime = performance.now(); animId = requestAnimationFrame(loop); }
      }
    }, { threshold: 0 });
    io.observe(container);

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      if (chargeTimerRef.current) clearTimeout(chargeTimerRef.current);
    };
  }, []);

  const handleLaunch = useCallback(() => {
    setIsIdle(false);
    triggerRef.current?.(true);
  }, []);

  const comboLabel = streak >= 2 ? COMBO[Math.min(streak, 10)] : null;

  return (
    <div className="se-wrap">
      <div ref={containerRef} className="strike-engine-container">
        <canvas ref={canvasRef} className="strike-engine-canvas" />

        {isIdle && !isCharging && (
          <div className="strike-engine-hint">
            <span className="hint-pulse">●</span>
            <span>Hover to aim · Hold to charge · Release to roll</span>
          </div>
        )}

        {isCharging && (
          <div className="se-charging-hint">
            <span>🎳 Release to bowl!</span>
          </div>
        )}

        <button className="strike-engine-btn" onClick={handleLaunch}>
          🎳 Launch Ball
        </button>
      </div>

      {/* Stats strip */}
      <div className="se-stats">
        <div className="se-stat">
          <span className="se-stat-val">{stats.strikes}</span>
          <span className="se-stat-label">Strikes</span>
        </div>
        <div className="se-stat">
          <span className="se-stat-val">{stats.gutters}</span>
          <span className="se-stat-label">Gutters</span>
        </div>
        <div className="se-stat">
          <span className="se-stat-val se-stat-streak">{stats.best}</span>
          <span className="se-stat-label">Best Streak</span>
        </div>
        <div className="se-stat">
          <span className="se-stat-val">{stats.balls}</span>
          <span className="se-stat-label">Balls Rolled</span>
        </div>
        {comboLabel && (
          <div className="se-combo-badge">
            {comboLabel}
          </div>
        )}
      </div>
    </div>
  );
}
