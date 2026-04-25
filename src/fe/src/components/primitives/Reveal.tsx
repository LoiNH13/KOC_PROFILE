import { useRef, useState, useEffect, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  distance?: number
  style?: CSSProperties
  className?: string
}

export function Reveal({ children, delay = 0, distance = 24, style, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el) } },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity 0.6s cubic-bezier(.2,.8,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.2,.8,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
