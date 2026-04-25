import { Blob, ClayCard, TiltCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { TESTIMONIALS as TESTIMONIALS_FALLBACK } from '@/data/koc-data'
import { fetchTestimonials } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { TONE_BG } from '@/lib/utils'

export function Testimonials() {
  const { lang } = useLang()
  const TESTIMONIALS = useSheetData('testimonials', fetchTestimonials, TESTIMONIALS_FALLBACK)
  return (
    <section className="relative px-12 py-20">
      <Blob color="var(--color-clay-pink)" size={400} top={100} right={-60} />
      <div className="relative max-w-[1240px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-butter shadow-clay text-xs font-bold text-[#7A5E00] uppercase tracking-widest mb-4">
              💬 {lang === 'vi' ? 'Brand nói gì' : 'Brands say'}
            </div>
            <h2 className="font-display text-[52px] font-semibold tracking-[-1.8px] text-clay-ink leading-none">
              {lang === 'vi' ? 'Được tin cậy,' : 'Trusted,'}{' '}
              <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'được giới thiệu' : 'recommended'}</em>
            </h2>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-clay-surface rounded-full shadow-clay">
            <span className="text-[28px]">⭐</span>
            <div>
              <p className="font-display text-[22px] font-bold text-clay-ink leading-none">4.9/5</p>
              <p className="text-[11px] text-clay-ink-soft font-semibold">{lang === 'vi' ? 'từ 6 brand' : '6 brand reviews'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {TESTIMONIALS.map((tst, i) => (
            <TiltCard key={i}>
              <ClayCard
                bg={TONE_BG[tst.tone]}
                rotate={(i - 1) * 1.2}
                className="p-7 flex flex-col min-h-[280px]"
              >
                <p className="font-display text-[72px] font-bold text-clay-ink/15 leading-[0.8] tracking-[-4px] mb-0">"</p>
                <p className="text-base leading-[1.55] text-clay-ink font-medium flex-1 mb-6">{tst.quote[lang]}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-clay-ink/10">
                  <div className="w-10 h-10 rounded-xl bg-clay-surface shadow-clay flex items-center justify-center font-display text-sm font-bold text-clay-accent-ink">
                    {tst.person.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-clay-ink">{tst.person}</p>
                    <p className="text-[11px] text-clay-ink-soft">{tst.role[lang]} · {tst.brand}</p>
                  </div>
                </div>
              </ClayCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
