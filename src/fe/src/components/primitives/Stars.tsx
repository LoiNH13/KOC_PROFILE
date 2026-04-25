interface StarsProps {
  value?: number
}

export function Stars({ value = 5 }: StarsProps) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="inline-flex items-center gap-0.5 text-clay-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13" height="13" viewBox="0 0 20 20"
          fill={i < full || (i === full && half) ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.5"
        >
          <path d="M10 1.5l2.5 5.7 6.2.6-4.7 4.2 1.4 6.1L10 15l-5.4 3.1 1.4-6.1L1.3 7.8l6.2-.6L10 1.5z" />
        </svg>
      ))}
      <span className="text-clay-ink-soft text-xs ml-1 font-medium">{value.toFixed(1)}</span>
    </span>
  )
}
