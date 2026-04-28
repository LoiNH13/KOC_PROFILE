import { ClayCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { PROCESS as PROCESS_FALLBACK } from '@/data/koc-data'
import { fetchProcess } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

const BG = ['var(--color-clay-pink)', 'var(--color-clay-mint)', 'var(--color-clay-butter)', 'var(--color-clay-lilac)', 'var(--color-clay-peach)']

export function Process() {
  const { lang } = useLang()
  const PROCESS = useSheetData('process', fetchProcess, PROCESS_FALLBACK)
  if (PROCESS.length === 0) return null
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20 bg-clay-bg-alt">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-mint shadow-clay text-[11px] font-bold text-[#1F6B47] uppercase tracking-widest mb-3 lg:mb-4">
            🗂 {lang === 'vi' ? 'Quy trình' : 'Process'}
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
            {PROCESS.length} {lang === 'vi' ? 'bước,' : 'steps,'}{' '}
            <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'không bất ngờ' : 'no surprises'}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {PROCESS.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center">
              <ClayCard bg={BG[i % BG.length]} rotate={(i % 2 === 0 ? -1 : 1) * 0.8} className="w-full p-5 text-center">
                <p className="font-display text-[36px] lg:text-[44px] font-bold text-clay-accent-ink tracking-[-2px] leading-none mb-2">{step.step}</p>
                <p className="font-bold text-sm text-clay-ink mb-2">{step.title[lang]}</p>
                <p className="text-[12px] text-clay-ink-soft leading-snug mb-3">{step.desc[lang]}</p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-clay-surface text-[10px] font-bold text-clay-ink-soft">{step.time}</span>
              </ClayCard>
              {i < PROCESS.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-clay-ink-muted text-lg font-bold z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
