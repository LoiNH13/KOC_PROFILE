import { Blob, ClayCard } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { STORY as STORY_FALLBACK } from '@/data/koc-data'
import { fetchStory } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

const BG = ['var(--color-clay-pink)', 'var(--color-clay-mint)', 'var(--color-clay-butter)', 'var(--color-clay-lilac)']

export function About() {
  const { lang } = useLang()
  const STORY = useSheetData('story', fetchStory, STORY_FALLBACK)
  if (STORY.length === 0) return null
  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <Blob color="var(--color-clay-lilac)" size={400} top={60} left={-80} />
      <div className="relative max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start">

        <div className="lg:sticky lg:top-24">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-lilac shadow-clay text-[11px] font-bold text-[#5B3A8C] uppercase tracking-widest mb-4 lg:mb-5">
            👋 {lang === 'vi' ? 'Về mình' : 'About me'}
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05] mb-4 lg:mb-6">
            {lang === 'vi' ? 'Hành trình' : 'A journey'}<br />
            <em className="italic text-clay-accent-ink">
              {lang === 'vi' ? 'mỗi ngày một chút' : 'one step at a time'}
            </em>
          </h2>
          <p className="text-[15px] lg:text-base text-clay-ink-soft leading-relaxed mb-6 lg:mb-7 max-w-[400px]">
            {lang === 'vi'
              ? 'Profile được xây dựng dựa trên một nguyên tắc: review thật, không nói quá, chỉ hợp tác với sản phẩm thực sự dùng.'
              : 'This profile is built on one principle: real reviews, no exaggeration, only collaborating with products I truly use.'}
          </p>
        </div>

        <div className="relative pl-6 lg:pl-8">
          <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-clay-pink rounded" />
          {STORY.map((s, i) => {
            const yearKey = typeof s.year === 'object' ? `${s.year.vi}-${s.year.en}` : s.year
            return (
            <div key={`${yearKey}-${s.title.en}`} className="relative mb-5 lg:mb-6">
              <div className="absolute -left-7 lg:-left-8 top-2 w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-clay-accent shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_0_4px_var(--color-clay-bg),0_2px_6px_rgba(255,91,138,0.4)]" />
              <ClayCard bg={BG[i % BG.length]} rotate={(i % 2 === 0 ? -0.8 : 0.8)} className="p-5 lg:p-6">
                <div className="flex items-baseline gap-3 lg:gap-4 mb-2 flex-wrap">
                  <span className="font-display text-[28px] lg:text-[38px] font-bold text-clay-accent-ink tracking-[-1.5px] leading-none">
                    {typeof s.year === 'object' ? s.year[lang] : s.year}
                  </span>
                  <span className="text-base lg:text-lg font-bold text-clay-ink font-display">{s.title[lang]}</span>
                </div>
                <p className="text-sm text-clay-ink-soft leading-[1.55] font-medium">{s.desc[lang]}</p>
              </ClayCard>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
