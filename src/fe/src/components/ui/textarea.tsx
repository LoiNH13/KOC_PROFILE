import { cn } from '@/lib/utils'
import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full px-4 py-3.5 rounded-2xl border border-clay-border bg-clay-surface text-clay-ink text-sm',
        'placeholder:text-clay-ink-muted outline-none resize-none min-h-[120px]',
        '[box-shadow:inset_0_2px_4px_rgba(46,26,46,0.04)]',
        'focus:[box-shadow:inset_0_2px_4px_rgba(46,26,46,0.04),_0_0_0_2px_var(--color-clay-accent)]',
        'transition-shadow',
        className,
      )}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'

export { Textarea }
