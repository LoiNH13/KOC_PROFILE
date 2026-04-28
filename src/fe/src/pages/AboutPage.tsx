import { ClayCard, Sparkle, CursorGlow, PhotoPlaceholder } from '@/components/primitives'
import { Nav } from '@/components/layout/Nav'
import { PageHero } from '@/components/layout/PageHero'
import { PageFooter } from '@/components/layout/PageFooter'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import { useSheetData } from '@/hooks/useSheetData'
import { fetchAboutPhotos } from '@/lib/sheets'
import type { Page, AboutPhoto } from '@/types'

interface AboutPageProps { onNavigate: (p: Page) => void }

const VALUES = [
  { emoji: '🤝', title: { vi: 'Chân thật trước',  en: 'Honesty first' },   desc: { vi: 'Nếu không dùng thật, mình sẽ không review.',             en: "If I don't really use it, I don't review it." },   tone: 'pink' },
  { emoji: '🐌', title: { vi: 'Chậm mà chắc',     en: 'Slow & steady' },   desc: { vi: '2-3 project/tháng là đủ. Chất lượng hơn số lượng.',      en: '2-3 projects/month is enough. Quality over volume.' }, tone: 'mint' },
  { emoji: '🎙️', title: { vi: 'Giọng riêng',       en: 'My own voice' },   desc: { vi: 'Không rập khuôn KOC sale — mỗi video là một câu chuyện.', en: 'Not a cookie-cutter sales voice — every video is a story.' }, tone: 'butter' },
  { emoji: '📊', title: { vi: 'Dữ liệu thật',      en: 'Real data' },      desc: { vi: 'Mọi con số mình chia sẻ đều có screenshot.',              en: 'Every number I share is screenshot-backed.' },       tone: 'lilac' },
]

const BG: Record<string, string> = {
  pink: 'var(--color-clay-pink)',
  mint: 'var(--color-clay-mint)',
  butter: 'var(--color-clay-butter)',
  lilac: 'var(--color-clay-lilac)',
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const photos = useSheetData<AboutPhoto[]>('about_photos', fetchAboutPhotos, [])
  const photoMap = Object.fromEntries(photos.map(p => [p.slot, p]))
  const firstName = (KOC_DATA.name || '').split(/\s+/).pop() || ''
  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(255,143,181,0.3)" />
      <Nav page="about" onNavigate={onNavigate} />
      <PageHero
        eyebrow={lang === 'vi'
          ? `Về ${KOC_DATA.name || 'mình'}`
          : `About ${KOC_DATA.name || 'me'}`}
        title={KOC_DATA.tagline[lang] || (lang === 'vi' ? 'Một KOC đang học mỗi ngày.' : 'A KOC, learning every day.')}
        sub={KOC_DATA.bio[lang]}
      />

      {/* Portrait stack */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-14 lg:pb-20">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          <div className="relative h-[420px] sm:h-[500px] lg:h-[560px]">
            <ClayCard bg="var(--color-clay-pink)" rotate={-4} className="absolute top-0 left-2 sm:left-6 lg:left-10 w-[55%] max-w-[300px] h-[60%] max-h-[380px] p-3 sm:p-4">
              <PhotoPlaceholder tone="pink" label={lang === 'vi' ? 'Chân dung' : 'Portrait'} dims="3:4" className="h-full" src={photoMap.portrait?.url} />
            </ClayCard>
            <ClayCard bg="var(--color-clay-butter)" rotate={5} className="absolute top-[20%] right-1 sm:right-3 lg:right-5 w-[48%] max-w-[260px] h-[55%] max-h-[320px] p-3 sm:p-3.5">
              <PhotoPlaceholder tone="butter" label="Studio" dims="4:5" className="h-full" src={photoMap.studio?.url} />
            </ClayCard>
            <ClayCard bg="var(--color-clay-mint)" rotate={-2} className="absolute bottom-0 left-0 w-[44%] max-w-[240px] h-[42%] max-h-[240px] p-3 sm:p-3.5">
              <PhotoPlaceholder tone="mint" label={lang === 'vi' ? 'Hậu trường' : 'Behind scenes'} dims="1:1" className="h-full" src={photoMap.behind?.url} />
            </ClayCard>
            <Sparkle size={32} color="var(--color-clay-accent)" className="hidden sm:block absolute top-14 right-20" style={{ transform: 'rotate(15deg)' }} />
            <Sparkle size={22} color="var(--color-clay-butter-deep)" className="hidden sm:block absolute bottom-28 right-36" style={{ transform: 'rotate(-20deg)' }} />
          </div>
          <div>
            {firstName && (
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-pink shadow-clay text-xs font-bold text-clay-accent-ink uppercase tracking-widest mb-4 lg:mb-5">
                ✨ {lang === 'vi' ? `Hi, mình là ${firstName}` : `Hi, I'm ${firstName}`}
              </div>
            )}
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-medium tracking-[-1.2px] lg:tracking-[-1.5px] leading-[1.1] mb-5 lg:mb-6 max-w-[480px]">
              {KOC_DATA.bio[lang] || (lang === 'vi'
                ? 'Mình tin rằng review tốt nhất đến từ trải nghiệm thật.'
                : 'I believe the best reviews come from real experiences.')}
            </h2>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20 bg-clay-bg-alt">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-block px-3 py-1.5 rounded-full bg-clay-butter shadow-clay text-[11px] font-bold text-[#7A5E00] uppercase tracking-widest mb-3 lg:mb-4">
              {lang === 'vi' ? 'Nguyên tắc làm việc' : 'How I work'}
            </div>
            <h2 className="font-display text-[30px] sm:text-[38px] lg:text-[48px] font-medium tracking-[-1.2px] lg:tracking-[-1.8px] leading-[1.05]">
              {lang === 'vi' ? '4 điều mình luôn giữ' : '4 things I always keep'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {VALUES.map((v) => (
              <ClayCard key={v.title.en} bg={BG[v.tone]} rotate={Math.random() > 0.5 ? -1 : 1} className="p-6 lg:p-7">
                <div className="text-[36px] lg:text-[40px] mb-3 lg:mb-4">{v.emoji}</div>
                <h3 className="font-display text-lg lg:text-xl font-semibold mb-2 lg:mb-2.5 tracking-tight">{v.title[lang]}</h3>
                <p className="text-sm text-clay-ink/80 leading-[1.55]">{v.desc[lang]}</p>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
