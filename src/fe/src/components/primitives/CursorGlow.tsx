import { useRef, useEffect } from 'react'

interface CursorGlowProps {
  size?: number
  color?: string
}

export function CursorGlow({ size = 360, color = 'rgba(255,143,181,0.35)' }: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect()
      el.style.opacity = '1'
      el.style.transform = `translate(${e.clientX - r.left - size / 2}px, ${e.clientY - r.top - size / 2}px)`
    }
    const onLeave = () => { el.style.opacity = '0' }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
    }
  }, [size])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 rounded-full opacity-0 mix-blend-multiply blur-xl transition-opacity duration-300 z-0"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  )
}
