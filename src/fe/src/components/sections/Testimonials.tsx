import { Blob, ClayCard, TiltCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { TESTIMONIALS as TESTIMONIALS_FALLBACK } from '@/data/koc-data'
import { fetchTestimonials } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { TONE_BG } from '@/lib/utils'

export function Testimonials() {
  const { lang } = useLang()
  const TESTIMONIALS = useSheetData('testimonials', fetchTestimonials, TESTIMONIALS_FALLBACK)
  if (TESTIMONIALS.length === 0) return null
  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <Blob color="var(--color-clay-pink)" size={400} top={100} right={-60} />
      <div className="relative max-w-[1240px] mx-auto">
        <div className="flex items-end justify-between mb-8 lg:mb-12 flex-wrap gap-4 lg:gap-6">
          <div>
            <div className="inline-block px-3 py-1.5 rounded-full bg-clay-butter shadow-clay text-[11px] font-bold text-[#7A5E00] uppercase tracking-widest mb-3 lg:mb-4">
              💬 {lang === 'vi' ? 'Brand nói gì' : 'Brands say'}
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
              {lang === 'vi' ? 'Được tin cậy,' : 'Trusted,'}{' '}
              <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'được giới thiệu' : 'recommended'}</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {TESTIMONIALS.map((tst, i) => (
            <TiltCard key={`${tst.brand}-${tst.person}`}>
              <ClayCard
                bg={TONE_BG[tst.tone]}
                rotate={(i - 1) * 1.2}
                className="p-6 lg:p-7 flex flex-col min-h-[260px] lg:min-h-[280px]"
              >
                <p className="font-display text-[60px] lg:text-[72px] font-bold text-clay-ink/15 leading-[0.8] tracking-[-4px] mb-0">"</p>
                <p className="text-[15px] lg:text-base leading-[1.55] text-clay-ink font-medium flex-1 mb-5 lg:mb-6">{tst.quote[lang]}</p>
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
