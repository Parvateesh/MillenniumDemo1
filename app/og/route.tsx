import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0a0118 0%, #1a0535 50%, #0a0118 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,46,147,0.25) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', display: 'flex' }} />

        {/* Pin emoji */}
        <div style={{ fontSize: '80px', marginBottom: '24px', display: 'flex' }}>🎳</div>

        {/* Name */}
        <div style={{ fontSize: '72px', fontWeight: 900, color: '#ffffff', letterSpacing: '-2px', marginBottom: '16px', display: 'flex' }}>
          Millennium Bowl
        </div>

        {/* Tagline */}
        <div style={{ fontSize: '32px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', display: 'flex' }}>
          Eat · Drink · Bowl · North Little Rock, AR
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['32 Lanes', 'Full Bar', 'F1 Simulator', 'Bowl 101 Pro Shop'].map((s) => (
            <div
              key={s}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,46,147,0.5)',
                borderRadius: '50px',
                padding: '10px 24px',
                fontSize: '18px',
                color: '#ff2e93',
                display: 'flex',
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: '32px', fontSize: '20px', color: 'rgba(255,255,255,0.4)', display: 'flex' }}>
          millenniumbowllr.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
