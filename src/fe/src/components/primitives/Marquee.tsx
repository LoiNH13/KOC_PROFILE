import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Marquee({ children, speed = 40, className }: MarqueeProps) {
  return (
    <div className={cn('overflow-hidden w-full', className)}>
      <div
        className="flex gap-12 w-max"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
