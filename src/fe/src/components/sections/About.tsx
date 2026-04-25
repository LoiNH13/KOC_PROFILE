import { Blob, ClayCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { STORY } from '@/data/koc-data'

const BG = ['var(--color-clay-pink)', 'var(--color-clay-mint)', 'var(--color-clay-butter)', 'var(--color-clay-lilac)']

export function About() {
  const { lang } = useLang()
  return (
    <section className="relative px-12 py-20">
      <Blob color="var(--color-clay-lilac)" size={400} top={60} left={-80} />
      <div className="relative max-w-[1240px] mx-auto grid grid-cols-[1fr_1.3fr] gap-14 items-start">

        {/* Sticky left */}
        <div className="sticky top-24">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-lilac shadow-clay text-xs font-bold text-[#5B3A8C] uppercase tracking-widest mb-5">
            👋 {lang === 'vi' ? 'Về mình' : 'About me'}
          </div>
          <h2 className="font-display text-[52px] font-semibold tracking-[-1.8px] text-clay-ink leading-none mb-6">
            {lang === 'vi' ? 'Hành trình' : 'A journey'}<br />
            <em className="italic text-clay-accent-ink">
              {lang === 'vi' ? 'từ 0 → 3.8K' : 'from 0 to 3.8K'}
            </em>
          </h2>
          <p className="text-base text-clay-ink-soft leading-relaxed mb-7 max-w-[400px]">
            {lang === 'vi'
              ? 'Từ một người thích thử và chia sẻ, mình xây dựng profile dựa trên nguyên tắc: review thật, không nói quá, chỉ hợp tác với sản phẩm mình thực sự dùng.'
              : 'From someone who loves trying and sharing, I built this profile on one principle: real reviews, no exaggeration, only collaborating with products I truly use.'}
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-[380px]">
            {[
              { n: '4',   l: { vi: 'Nền tảng',       en: 'Platforms' } },
              { n: '6',   l: { vi: 'Ngách',           en: 'Niches' } },
              { n: '6',   l: { vi: 'Brand',           en: 'Brands' } },
              { n: '1+',  l: { vi: 'Năm kinh nghiệm', en: 'Year active' } },
            ].map((s, i) => (
              <div key={i} className="p-3.5 rounded-clay bg-clay-surface shadow-clay">
                <p className="font-display text-[28px] font-bold text-clay-accent-ink leading-none">{s.n}</p>
                <p className="text-xs text-clay-ink-soft mt-1 font-semibold">{s.l[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-clay-pink rounded" />
          {STORY.map((s, i) => (
            <div key={i} className="relative mb-6">
              <div className="absolute -left-8 top-2 w-4 h-4 rounded-full bg-clay-accent shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_0_4px_var(--color-clay-bg),0_2px_6px_rgba(255,91,138,0.4)]" />
              <ClayCard bg={BG[i]} rotate={(i % 2 === 0 ? -0.8 : 0.8)} className="p-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-display text-[38px] font-bold text-clay-accent-ink tracking-[-1.5px] leading-none">
                    {typeof s.year === 'object' ? s.year[lang] : s.year}
                  </span>
                  <span className="text-lg font-bold text-clay-ink font-display">{s.title[lang]}</span>
                </div>
                <p className="text-sm text-clay-ink-soft leading-[1.55] font-medium">{s.desc[lang]}</p>
              </ClayCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
