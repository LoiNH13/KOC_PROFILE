import type { ReactNode, CSSProperties } from 'react'

interface ShimmerProps {
  children: ReactNode
  colors?: [string, string, string]
  duration?: number
  style?: CSSProperties
}

export function Shimmer({
  children,
  colors = ['#FF5B8A', '#FFCB3D', '#FF5B8A'],
  duration = 4,
  style,
}: ShimmerProps) {
  return (
    <span
      style={{
        background: `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `shimmer-sweep ${duration}s linear infinite`,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
