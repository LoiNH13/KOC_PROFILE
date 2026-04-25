import { Sparkle, ClayCard } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { KOC_DATA } from '@/data/koc-data'
import type { Page } from '@/types'

interface BookingCTAProps {
  onNavigate: (p: Page) => void
}

const CALENDAR = [
  { d: '06 May', status: 'open' as const,  type: { vi: 'Gifting video',   en: 'Gifting video' },   bg: 'var(--color-clay-mint)' },
  { d: '12 May', status: 'open' as const,  type: { vi: 'Livestream',      en: 'Livestream' },      bg: 'var(--color-clay-pink)' },
  { d: '18 May', status: 'full' as const,  type: { vi: 'Event hosting',   en: 'Event hosting' },   bg: 'var(--color-clay-bg-alt)' },
  { d: '25 May', status: 'open' as const,  type: { vi: 'Long-form',       en: 'Long-form' },       bg: 'var(--color-clay-butter)' },
]

export function BookingCTA({ onNavigate }: BookingCTAProps) {
  const { lang } = useLang()
  return (
    <section className="px-12 py-20">
      <div
        className="max-w-[1100px] mx-auto rounded-[48px] p-14 relative overflow-hidden shadow-clay-lg"
        style={{ background: 'linear-gradient(135deg, var(--color-clay-pink) 0%, var(--color-clay-butter) 50%, var(--color-clay-mint) 100%)' }}
      >
        <Sparkle size={28} color="#fff" className="absolute top-8 right-12 opacity-80" />
        <Sparkle size={20} color="#fff" className="absolute bottom-12 left-15 opacity-60" />

        <div className="relative grid grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <h2 className="font-display text-[52px] font-semibold tracking-[-1.8px] text-clay-ink leading-none mb-5">
              {lang === 'vi' ? 'Kể câu chuyện brand' : "Let's tell your brand"}{' '}
              <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'cùng mình ✨' : 'story ✨'}</em>
            </h2>
            <p className="text-[17px] text-clay-ink/80 leading-relaxed mb-7 max-w-[480px] font-medium">
              {lang === 'vi'
                ? 'Từ gifting đến long-term — 2-3 slots mỗi tháng. Gửi brief để nhận rate card.'
                : 'From gifting to long-term — 2-3 slots per month. Send a brief to get the rate card.'}
            </p>
            <div className="inline-flex items-center gap-5 px-5 py-4 rounded-clay bg-clay-surface shadow-clay">
              <div>
                <p className="text-[11px] text-clay-ink-soft mb-0.5 font-semibold">{lang === 'vi' ? 'Phản hồi' : 'Reply'}</p>
                <p className="text-[22px] font-display font-bold text-clay-ink">⚡ 24h</p>
              </div>
              <div className="w-px h-9 bg-clay-border" />
              <div>
                <p className="text-[11px] text-clay-ink-soft mb-0.5 font-semibold">Email</p>
                <p className="text-sm text-clay-ink font-bold">{KOC_DATA.email}</p>
              </div>
            </div>
          </div>

          <ClayCard bg="var(--color-clay-surface)" className="p-6">
            <p className="font-display text-[15px] font-bold text-clay-ink mb-1">
              📅 {lang === 'vi' ? 'Lịch tháng 5' : 'May availability'}
            </p>
            <p className="text-xs text-clay-ink-soft mb-4">{lang === 'vi' ? '3 slots — nhanh tay!' : '3 slots — book fast!'}</p>
            <div className="flex flex-col gap-2 mb-4">
              {CALENDAR.map((s) => (
                <div
                  key={s.d}
                  className="flex justify-between items-center px-4 py-3 rounded-2xl"
                  style={{ background: s.bg, opacity: s.status === 'full' ? 0.45 : 1, boxShadow: s.status === 'full' ? 'none' : 'inset 0 1px 2px rgba(255,255,255,0.5)' }}
                >
                  <div>
                    <p className="text-sm font-bold text-clay-ink">{s.d}</p>
                    <p className="text-[11px] text-clay-ink-soft font-medium">{s.type[lang]}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full ${s.status === 'full' ? 'text-clay-ink-muted' : 'bg-clay-surface text-clay-ink'}`}>
                    {s.status === 'full' ? (lang === 'vi' ? 'Hết' : 'Full') : (lang === 'vi' ? 'Trống' : 'Open')}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="clay" size="md" className="w-full" onClick={() => onNavigate('booking')}>
              💌 {lang === 'vi' ? 'Gửi brief' : 'Submit brief'}
            </Button>
          </ClayCard>
        </div>
      </div>
    </section>
  )
}
