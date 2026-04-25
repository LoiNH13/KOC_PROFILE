import { ClayCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { TRENDING } from '@/data/koc-data'

const BG  = ['var(--color-clay-pink)', 'var(--color-clay-butter)', 'var(--color-clay-mint)']
const INK = ['var(--color-clay-accent-ink)', '#7A5E00', '#1F6B47']

export function Trending() {
  const { lang } = useLang()
  return (
    <section className="px-12 py-16">
      <div className="max-w-[1240px] mx-auto">
        <h2 className="font-display text-[42px] font-semibold tracking-[-1.2px] text-clay-ink mb-8">
          🔥 {lang === 'vi' ? 'Chủ đề bùng nổ' : 'Hot topics'}
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {TRENDING.map((item, i) => (
            <ClayCard key={item.id} bg={BG[i]} rotate={(i - 1) * 1.5} className="p-7 flex flex-col gap-4 min-h-[200px]">
              <div className="flex justify-between items-start">
                <span className="font-display text-[52px] font-bold leading-[0.9] tracking-[-2px]" style={{ color: INK[i] }}>
                  0{i + 1}
                </span>
                <span className="px-3 py-1 rounded-full bg-clay-surface text-[11px] font-bold text-clay-ink shadow-sm">
                  {item.niche}
                </span>
              </div>
              <p className="font-display text-[21px] leading-snug text-clay-ink font-semibold tracking-tight">
                {item.title[lang]}
              </p>
              <div className="mt-auto flex justify-between text-[13px] text-clay-ink font-semibold">
                <span>{lang === 'vi' ? 'Tương tác' : 'Engagement'}</span>
                <span className="font-extrabold">📈 {item.engagement}</span>
              </div>
            </ClayCard>
          ))}
        </div>
      </div>
    </section>
  )
}
