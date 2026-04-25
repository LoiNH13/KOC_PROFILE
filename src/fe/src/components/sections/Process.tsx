import { ClayCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { PROCESS } from '@/data/koc-data'

const BG = ['var(--color-clay-pink)', 'var(--color-clay-mint)', 'var(--color-clay-butter)', 'var(--color-clay-lilac)', 'var(--color-clay-peach)']

export function Process() {
  const { lang } = useLang()
  return (
    <section className="px-12 py-20 bg-clay-bg-alt">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-mint shadow-clay text-xs font-bold text-[#1F6B47] uppercase tracking-widest mb-4">
            🗂 {lang === 'vi' ? 'Quy trình' : 'Process'}
          </div>
          <h2 className="font-display text-[52px] font-semibold tracking-[-1.8px] text-clay-ink leading-none">
            {lang === 'vi' ? '5 bước,' : '5 steps,'}{' '}
            <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'không bất ngờ' : 'no surprises'}</em>
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-4 items-start">
          {PROCESS.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-center">
              <ClayCard bg={BG[i]} rotate={(i % 2 === 0 ? -1 : 1) * 0.8} className="w-full p-5 text-center">
                <p className="font-display text-[44px] font-bold text-clay-accent-ink tracking-[-2px] leading-none mb-2">{step.step}</p>
                <p className="font-bold text-sm text-clay-ink mb-2">{step.title[lang]}</p>
                <p className="text-[12px] text-clay-ink-soft leading-snug mb-3">{step.desc[lang]}</p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-clay-surface text-[10px] font-bold text-clay-ink-soft">{step.time}</span>
              </ClayCard>
              {i < PROCESS.length - 1 && (
                <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-clay-ink-muted text-lg font-bold z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
