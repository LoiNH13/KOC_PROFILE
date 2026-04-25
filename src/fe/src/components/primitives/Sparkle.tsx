import type { CSSProperties } from 'react'

interface SparkleProps {
  size?: number
  color?: string
  style?: CSSProperties
  className?: string
  spin?: boolean
}

export function Sparkle({ size = 24, color = 'var(--color-clay-butter-deep)', style, className, spin }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={style}
      className={spin ? `animate-spin-slow ${className ?? ''}` : className}
      aria-hidden
    >
      <path d="M12 0L13.5 9.5L23 11L13.5 12.5L12 22L10.5 12.5L1 11L10.5 9.5L12 0Z" />
    </svg>
  )
}
