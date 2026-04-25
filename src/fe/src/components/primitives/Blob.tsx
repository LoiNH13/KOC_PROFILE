import type { CSSProperties } from 'react'

interface BlobProps {
  color: string
  size?: number
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  delay?: number
}

export function Blob({ color, size = 400, top, left, right, bottom, delay = 0 }: BlobProps) {
  const style: CSSProperties = {
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    background: color,
    filter: 'blur(60px)',
    opacity: 0.5,
    borderRadius: '42% 58% 53% 47% / 51% 45% 55% 49%',
    animation: `blob-float 20s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: 'none',
    zIndex: 0,
  }
  return <div style={style} aria-hidden />
}
