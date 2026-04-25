import { useRef, useState, useMemo, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: string
  duration?: number
  className?: string
  style?: CSSProperties
}

export function Counter({ value, duration = 1200, className, style }: CounterProps) {
  const [display, setDisplay] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const parsed = useMemo(() => {
    const m = String(value).match(/^([\d.]+)(.*)$/)
    if (!m) return { num: 0, suf: '' }
    return { num: parseFloat(m[1]), suf: m[2] }
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            const cur = parsed.num * eased
            setDisplay(`${parsed.num % 1 === 0 ? Math.round(cur) : cur.toFixed(1)}${parsed.suf}`)
            if (p < 1) requestAnimationFrame(tick)
          }
          setDisplay(`0${parsed.suf}`)
          requestAnimationFrame(tick)
        }
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [parsed, duration])

  return <span ref={ref} className={cn(className)} style={style}>{display}</span>
}
