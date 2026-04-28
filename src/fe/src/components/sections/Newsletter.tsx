import { useState } from 'react'
import { ClayCard } from '@/components/primitives'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { useFormSubmit } from '@/hooks/useFormSubmit'

export function Newsletter() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  // 23505 = unique_violation (already subscribed) → treat as success
  const { submit, loading, done } = useFormSubmit('newsletter_subscribers', { ignoreErrorCodes: ['23505'] })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) await submit({ email, source: 'landing' })
  }

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-12 lg:py-16">
      <div className="max-w-[1240px] mx-auto">
        <ClayCard
          bg="var(--color-clay-ink)"
          className="px-6 sm:px-10 lg:px-12 py-9 lg:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 lg:gap-8"
        >
          <div className="flex-1 min-w-[260px]">
            <p className="text-xs font-extrabold text-clay-butter uppercase tracking-[0.15em] mb-2">
              📬 {lang === 'vi' ? 'Newsletter hàng tuần' : 'Weekly newsletter'}
            </p>
            <h3 className="font-display text-[24px] sm:text-[28px] lg:text-[34px] font-semibold text-white tracking-tight leading-snug">
              {lang === 'vi' ? 'Review mới, deal hot — mỗi thứ Sáu' : 'New reviews, hot deals — every Friday'}
            </h3>
          </div>
          {done ? (
            <p className="text-clay-mint font-bold text-lg">🎉 {lang === 'vi' ? 'Cảm ơn bạn!' : 'Thank you!'}</p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2.5 flex-1 min-w-[260px]">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40"
              />
              <Button type="submit" variant="clay" size="md" disabled={loading}>
                {loading ? '...' : 'Subscribe'}
              </Button>
            </form>
          )}
        </ClayCard>
      </div>
    </section>
  )
}
