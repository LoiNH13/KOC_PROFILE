import { cn } from '@/lib/utils'
import { TONE_GRADIENT } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PhotoPlaceholderProps {
  tone?: string
  label?: string
  aspect?: string
  className?: string
  children?: ReactNode
  dims?: string
  src?: string
}

export function PhotoPlaceholder({
  tone = 'pink',
  label,
  aspect = '1/1',
  className,
  children,
  dims,
  src,
}: PhotoPlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn('relative rounded-clay overflow-hidden', className)}
        style={{ aspectRatio: aspect }}
      >
        <img
          src={src}
          alt={label ?? ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative rounded-clay overflow-hidden flex items-center justify-center',
        className,
      )}
      style={{
        aspectRatio: aspect,
        background: TONE_GRADIENT[tone] ?? TONE_GRADIENT.pink,
        border: '1.5px dashed rgba(255,255,255,0.7)',
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden
        style={{ opacity: 0.45 }}
      >
        <defs>
          <pattern
            id={`ph-diag-${tone}`}
            patternUnits="userSpaceOnUse"
            width="14"
            height="14"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ph-diag-${tone})`} />
      </svg>

      {!children && (
        <div className="relative z-10 flex flex-col items-center gap-1.5 px-3 text-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(46,26,46,0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-clay-ink/55">
              {label}
            </span>
          )}
          {dims && (
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-clay-ink/35">
              {dims}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
