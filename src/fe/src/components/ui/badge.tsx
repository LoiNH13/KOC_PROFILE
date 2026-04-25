import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'pink' | 'mint' | 'butter' | 'lilac' | 'peach' | 'sky' | 'ink' | 'accent'
}

const toneStyles: Record<NonNullable<BadgeProps['tone']>, string> = {
  pink:   'bg-clay-pink   text-clay-accent-ink',
  mint:   'bg-clay-mint   text-[#1F6B47]',
  butter: 'bg-clay-butter text-[#7A5E00]',
  lilac:  'bg-clay-lilac  text-[#5B3A8C]',
  peach:  'bg-clay-peach  text-[#A04526]',
  sky:    'bg-clay-sky    text-[#1B4B8E]',
  ink:    'bg-clay-ink    text-white',
  accent: 'bg-clay-accent text-white',
}

export function Badge({ tone = 'ink', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-clay',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
