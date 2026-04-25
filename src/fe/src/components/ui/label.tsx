import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'block text-[11px] font-bold text-clay-ink-soft uppercase tracking-widest mb-2',
      className,
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
