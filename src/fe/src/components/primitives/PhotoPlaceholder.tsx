import { cn } from '@/lib/utils'
import { TONE_GRADIENT } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PhotoPlaceholderProps {
  tone?: string
  label?: string
  aspect?: string
  className?: string
  children?: ReactNode
}

export function PhotoPlaceholder({ tone = 'pink', label, aspect = '1/1', className, children }: PhotoPlaceholderProps) {
  return (
    <div
      className={cn('relative rounded-clay overflow-hidden flex items-center justify-center', className)}
      style={{ aspectRatio: aspect, background: TONE_GRADIENT[tone] ?? TONE_GRADIENT.pink }}
    >
      {/* Diagonal stripes */}
      <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
        <defs>
          <pattern id={`stripes-${tone}`} patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="24" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripes-${tone})`} />
      </svg>
      {label && (
        <span className="relative z-10 font-mono text-[11px] text-clay-ink/50 uppercase tracking-wide">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
