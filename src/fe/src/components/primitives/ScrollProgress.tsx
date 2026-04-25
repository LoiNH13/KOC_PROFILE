import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${pct}%`,
        height: 4,
        background: 'linear-gradient(90deg, var(--color-clay-accent), var(--color-clay-butter-deep))',
        zIndex: 999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
