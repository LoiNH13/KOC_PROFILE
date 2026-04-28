import type { CSSProperties } from 'react'

interface AvatarProps {
  size?: number
  src?: string
  style?: CSSProperties
  className?: string
}

export function Avatar({ size = 560, src, style, className }: AvatarProps) {
  if (src) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: size,
          borderRadius: 60,
          boxShadow: 'var(--shadow-clay-lg)',
          overflow: 'hidden',
          ...style,
        }}
      >
        <img
          src={src}
          alt="Avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: size,
        borderRadius: 60,
        background: 'linear-gradient(135deg, var(--color-clay-pink) 0%, var(--color-clay-peach) 100%)',
        boxShadow: 'var(--shadow-clay-lg)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Ambient light blobs */}
      <div style={{
        position: 'absolute', top: -40, left: -40, width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,224,122,0.67) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, right: -40, width: 260, height: 260,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,181,245,0.67) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      {/* Inner frame */}
      <div style={{
        position: 'absolute', inset: 20, borderRadius: 48,
        background: 'linear-gradient(160deg, var(--color-clay-pink-deep) 0%, var(--color-clay-peach) 100%)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <svg viewBox="0 0 400 500" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="av-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--color-clay-ink)', stopOpacity: 0.92 }} />
              <stop offset="100%" style={{ stopColor: 'var(--color-clay-accent-ink)', stopOpacity: 0.7 }} />
            </linearGradient>
            <linearGradient id="av-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0D0" />
              <stop offset="100%" stopColor="#FFCFB8" />
            </linearGradient>
            <linearGradient id="av-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--color-clay-surface)' }} />
              <stop offset="60%" style={{ stopColor: 'var(--color-clay-butter)', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>

          {/* Shoulders */}
          <path d="M 50 500 Q 50 380 130 340 Q 200 320 270 340 Q 350 380 350 500 Z" fill="url(#av-top)" />
          {/* Neck */}
          <path d="M 170 350 Q 170 310 200 310 Q 230 310 230 350 L 230 370 L 170 370 Z" fill="url(#av-skin)" />
          {/* Head */}
          <ellipse cx="200" cy="240" rx="78" ry="92" fill="url(#av-skin)" />
          {/* Hair back */}
          <path d="M 115 220 Q 110 140 200 130 Q 290 140 285 220 Q 290 260 278 280 L 275 200 Q 260 175 240 170 L 245 155 Q 200 140 160 160 L 160 175 Q 135 185 125 205 Q 120 245 122 280 Q 110 260 115 220 Z" fill="url(#av-hair)" />
          {/* Bangs */}
          <path d="M 130 190 Q 150 155 200 150 Q 250 155 270 190 Q 250 175 220 178 Q 200 172 180 178 Q 150 175 130 190 Z" fill="url(#av-hair)" />
          {/* Blush */}
          <circle cx="160" cy="260" r="14" fill="var(--color-clay-accent)" opacity="0.35" />
          <circle cx="240" cy="260" r="14" fill="var(--color-clay-accent)" opacity="0.35" />
          {/* Eyes */}
          <path d="M 160 232 Q 170 224 180 232" stroke="var(--color-clay-ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 220 232 Q 230 224 240 232" stroke="var(--color-clay-ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Smile */}
          <path d="M 188 278 Q 200 288 212 278" stroke="var(--color-clay-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Earrings */}
          <circle cx="126" cy="255" r="5" fill="var(--color-clay-butter-deep)" />
          <circle cx="274" cy="255" r="5" fill="var(--color-clay-butter-deep)" />
        </svg>

        {/* Floating heart */}
        <div style={{
          position: 'absolute', top: 32, right: 40, fontSize: 28,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
          animation: 'blob-float 6s ease-in-out infinite',
        }}>💗</div>
      </div>

      {/* Highlight overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
      }} />
    </div>
  )
}
