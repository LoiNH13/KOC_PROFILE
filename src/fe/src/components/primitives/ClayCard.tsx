import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface ClayCardProps extends HTMLMotionProps<'div'> {
  bg?: string
  rotate?: number
  dark?: boolean
}

export function ClayCard({ bg, rotate = 0, dark = false, className, style, children, ...props }: ClayCardProps) {
  return (
    <motion.div
      initial={{ rotate }}
      whileHover={{
        rotate: 0,
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className={cn('rounded-clay', dark ? 'shadow-clay-dark' : 'shadow-clay', className)}
      style={{ background: bg, ...style }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
