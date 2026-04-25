import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        /** Pink clay CTA — primary action */
        clay: [
          'bg-clay-accent text-white rounded-full',
          '[box-shadow:inset_0_2px_4px_rgba(255,255,255,0.3),_0_4px_0_var(--color-clay-accent-ink),_0_10px_24px_rgba(255,91,138,0.4)]',
          'active:translate-y-[2px] active:[box-shadow:inset_0_2px_4px_rgba(255,255,255,0.3),_0_1px_0_var(--color-clay-accent-ink)]',
        ],
        /** Dark clay secondary */
        dark: [
          'bg-clay-ink text-white rounded-full',
          '[box-shadow:inset_0_2px_4px_rgba(255,255,255,0.1),_0_3px_0_rgba(0,0,0,0.25)]',
          'active:translate-y-[2px]',
        ],
        /** Ghost / outline */
        ghost: 'bg-clay-surface text-clay-ink rounded-full shadow-clay hover:bg-clay-bg-alt',
        /** Transparent, for nav links */
        link: 'bg-transparent text-clay-ink hover:bg-clay-bg-alt rounded-full',
        /** Filter pill — inactive */
        pill: 'bg-clay-surface text-clay-ink rounded-full shadow-clay hover:bg-clay-bg-alt',
        /** Filter pill — active */
        'pill-active': [
          'bg-clay-accent text-white rounded-full',
          '[box-shadow:inset_0_2px_4px_rgba(255,255,255,0.3),_0_3px_0_var(--color-clay-accent-ink),_0_6px_16px_rgba(255,91,138,0.3)]',
        ],
      },
      size: {
        sm:  'px-4 py-2 text-xs',
        md:  'px-5 py-3 text-sm',
        lg:  'px-7 py-4 text-base',
        icon:'w-11 h-11 p-0',
      },
    },
    defaultVariants: { variant: 'clay', size: 'md' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
