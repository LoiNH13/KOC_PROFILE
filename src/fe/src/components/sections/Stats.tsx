import { ClayCard, Counter } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { STATS as STATS_FALLBACK } from '@/data/koc-data'
import { fetchStats } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

const BG   = ['var(--color-clay-pink)', 'var(--color-clay-mint)', 'var(--color-clay-butter)', 'var(--color-clay-lilac)']
const INK  = ['var(--color-clay-accent-ink)', '#1F6B47', '#7A5E00', '#5B3A8C']

export function Stats() {
  const { lang } = useLang()
  const STATS = useSheetData('stats', fetchStats, STATS_FALLBACK)
  if (STATS.length === 0) return null
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {STATS.map((s, i) => (
          <ClayCard key={`${s.label.en}-${i}`} bg={BG[i % BG.length]} rotate={(i % 2 === 0 ? -1 : 1) * 1.5} className="p-5 lg:p-7">
            <Counter
              value={s.value}
              className="block font-display text-[36px] sm:text-[44px] lg:text-[56px] font-bold leading-none mb-2 lg:mb-3 tracking-[-2px]"
              style={{ color: INK[i % INK.length] }}
            />
            <p className="text-[13px] lg:text-[15px] font-bold text-clay-ink mb-1">{s.label[lang]}</p>
            <p className="text-xs text-clay-ink-soft">
              {typeof s.sub === 'string' ? s.sub : s.sub[lang]}
            </p>
          </ClayCard>
        ))}
      </div>
    </section>
  )
}
