import { useRef, type ReactNode, type CSSProperties } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxDeg?: number
}

export function TiltCard({ children, className, style, maxDeg = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const ry = (px - 0.5) * maxDeg * 2
    const rx = -(py - 0.5) * maxDeg * 2
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(.2,.8,.3,1), box-shadow 0.25s',
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
