import { ClayCard, Blob, Sparkle, CursorGlow, PhotoPlaceholder } from '@/components/primitives'
import { Nav } from '@/components/layout/Nav'
import { PageHero } from '@/components/layout/PageHero'
import { PageFooter } from '@/components/layout/PageFooter'
import { useLang } from '@/hooks/useLang'
import type { Page } from '@/types'

interface AboutPageProps { onNavigate: (p: Page) => void }

const VALUES = [
  { emoji: '🤝', title: { vi: 'Chân thật trước',  en: 'Honesty first' },   desc: { vi: 'Nếu không dùng thật, mình sẽ không review.',             en: "If I don't really use it, I don't review it." },   tone: 'pink' },
  { emoji: '🐌', title: { vi: 'Chậm mà chắc',     en: 'Slow & steady' },   desc: { vi: '2-3 project/tháng là đủ. Chất lượng hơn số lượng.',      en: '2-3 projects/month is enough. Quality over volume.' }, tone: 'mint' },
  { emoji: '🎙️', title: { vi: 'Giọng riêng',       en: 'My own voice' },   desc: { vi: 'Không rập khuôn KOC sale — mỗi video là một câu chuyện.', en: 'Not a cookie-cutter sales voice — every video is a story.' }, tone: 'butter' },
  { emoji: '📊', title: { vi: 'Dữ liệu thật',      en: 'Real data' },      desc: { vi: 'Mọi con số mình chia sẻ đều có screenshot.',              en: 'Every number I share is screenshot-backed.' },       tone: 'lilac' },
]

const SETUP = [
  { label: { vi: 'Điện thoại',    en: 'Phone' },          value: 'iPhone 14' },
  { label: { vi: 'Đèn',          en: 'Light' },           value: { vi: 'Ring 18" + softbox', en: 'Ring 18" + softbox' } },
  { label: { vi: 'Mic',          en: 'Mic' },             value: 'Rode Wireless Go' },
  { label: { vi: 'Edit',         en: 'Edit' },            value: 'CapCut · Lightroom' },
  { label: { vi: 'Studio',       en: 'Studio' },          value: { vi: 'Phòng 8m² tại nhà', en: '8m² home room' } },
  { label: { vi: 'Lịch quay',    en: 'Shoot schedule' },  value: { vi: 'Thứ 3, Thứ 6',      en: 'Tue, Fri' } },
]

const BG: Record<string, string> = { pink: 'var(--color-clay-pink)', mint: 'var(--color-clay-mint)', butter: 'var(--color-clay-butter)', lilac: 'var(--color-clay-lilac)' }

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { lang } = useLang()
  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(255,143,181,0.3)" />
      <Nav page="about" onNavigate={onNavigate} />
      <PageHero
        eyebrow={lang === 'vi' ? 'Về Linh Chi' : 'About Linh Chi'}
        title={lang === 'vi' ? 'Một KOC mới, đang học mỗi ngày.' : 'A new KOC, learning every day.'}
        sub={lang === 'vi' ? 'Không có team, không có budget, chỉ có một điện thoại và một ý tưởng rằng: câu chuyện tốt quan trọng hơn số lượt xem.' : 'No team, no budget — just a phone and a belief that a good story matters more than view counts.'}
      />

      {/* Portrait stack */}
      <section className="relative px-12 pb-20">
        <div className="max-w-[1240px] mx-auto grid grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="relative h-[560px]">
            <ClayCard bg="var(--color-clay-pink)" rotate={-4} className="absolute top-0 left-10 w-[300px] h-[380px] p-4">
              <PhotoPlaceholder tone="pink" label="Portrait · 2025" className="h-full" />
            </ClayCard>
            <ClayCard bg="var(--color-clay-butter)" rotate={5} className="absolute top-[120px] right-5 w-[260px] h-[320px] p-3.5">
              <PhotoPlaceholder tone="butter" label="Studio @ home" className="h-full" />
            </ClayCard>
            <ClayCard bg="var(--color-clay-mint)" rotate={-2} className="absolute bottom-0 left-0 w-[240px] h-[240px] p-3.5">
              <PhotoPlaceholder tone="mint" label="On set" className="h-full" />
            </ClayCard>
            <Sparkle size={32} color="var(--color-clay-accent)" className="absolute top-14 right-20" style={{ transform: 'rotate(15deg)' }} />
            <Sparkle size={22} color="var(--color-clay-butter-deep)" className="absolute bottom-28 right-36" style={{ transform: 'rotate(-20deg)' }} />
          </div>
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-pink shadow-clay text-xs font-bold text-clay-accent-ink uppercase tracking-widest mb-5">
              ✨ {lang === 'vi' ? 'Hi, mình là Chi' : "Hi, I'm Chi"}
            </div>
            <h2 className="font-display text-[42px] font-medium tracking-[-1.5px] leading-[1.1] mb-6 max-w-[480px]">
              {lang === 'vi'
                ? 'Mình tin rằng review tốt nhất đến từ trải nghiệm thật — dù là một cây son hay một chiếc áo linen.'
                : "I believe the best reviews come from real experiences — whether it's one lipstick or one linen shirt."}
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-clay-ink-soft">
              {[0,1,2].map((pi) => (
                <p key={pi} className="m-0">
                  {lang === 'vi' ? [
                    'Mình bắt đầu quay video đầu năm 2025 khi đang là sinh viên năm cuối. Không có ê-kip, không có studio — chỉ có điện thoại và một chiếc đèn ring.',
                    'Một năm sau, mình có 3.8K người đồng hành, 6 brand đã tin tưởng, và một nguyên tắc đơn giản: không review thứ mình không thực sự thích.',
                    'Ngách của mình là những sản phẩm hằng ngày — đủ rẻ để ai cũng thử, đủ thật để nói được điều gì đó.',
                  ][pi] : [
                    'I started filming in early 2025 as a final-year student. No crew, no studio — just a phone and a ring light.',
                    'A year later, I have 3.8K people who follow along, 6 brands who trust me, and a simple rule: never review something I don\'t truly like.',
                    'My niche is everyday products — cheap enough for anyone to try, real enough to have something to say.',
                  ][pi]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-12 py-20 bg-clay-bg-alt">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-butter shadow-clay text-xs font-bold text-[#7A5E00] uppercase tracking-widest mb-4">
              {lang === 'vi' ? 'Nguyên tắc làm việc' : 'How I work'}
            </div>
            <h2 className="font-display text-[48px] font-medium tracking-[-1.8px] leading-[1.05]">
              {lang === 'vi' ? '4 điều mình luôn giữ' : '4 things I always keep'}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <ClayCard key={i} bg={BG[v.tone]} rotate={i % 2 === 0 ? -1 : 1} className="p-7">
                <div className="text-[40px] mb-4">{v.emoji}</div>
                <h3 className="font-display text-xl font-semibold mb-2.5 tracking-tight">{v.title[lang]}</h3>
                <p className="text-sm text-clay-ink/80 leading-[1.55]">{v.desc[lang]}</p>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="px-12 py-20">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-mint shadow-clay text-xs font-bold text-[#1F6B47] uppercase tracking-widest mb-5">
              {lang === 'vi' ? 'Sau hậu trường' : 'Behind the scenes'}
            </div>
            <h2 className="font-display text-[42px] font-medium tracking-[-1.5px] leading-[1.1] mb-4">
              {lang === 'vi' ? 'Setup nhỏ, làm với những gì có' : 'Small setup, making it work'}
            </h2>
            <p className="text-[17px] text-clay-ink-soft leading-relaxed mb-8">
              {lang === 'vi' ? 'Mình không cần thiết bị xịn để kể chuyện hay.' : "I don't need fancy gear to tell a good story."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {SETUP.map((it, i) => (
                <div key={i} className="px-4 py-3.5 rounded-2xl bg-clay-bg-alt border border-clay-border">
                  <p className="text-[11px] font-bold text-clay-ink-muted uppercase tracking-widest mb-1">
                    {typeof it.label === 'object' ? it.label[lang] : it.label}
                  </p>
                  <p className="text-sm font-semibold text-clay-ink">
                    {typeof it.value === 'object' ? it.value[lang] : it.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <Blob color="var(--color-clay-lilac)" size={320} top={40} right={40} delay={2} />
            <ClayCard
              bg="var(--color-clay-ink)"
              className="w-[280px] h-[560px] p-3.5 rounded-[48px] relative z-10"
            >
              <div
                className="w-full h-full rounded-[36px] overflow-hidden p-4 flex flex-col gap-2.5"
                style={{ background: `linear-gradient(180deg, var(--color-clay-peach), var(--color-clay-pink))` }}
              >
                <div className="flex justify-between text-[11px] font-bold text-white">
                  <span>9:41</span><span>●●●</span>
                </div>
                <p className="font-display text-[24px] font-semibold text-white tracking-tight mt-3">
                  {lang === 'vi' ? 'Hôm nay quay gì?' : 'Shoot today?'}
                </p>
                <p className="text-[13px] text-white/90 leading-relaxed">
                  {lang === 'vi' ? '2 lipstick · granola bowl · OOTD linen' : '2 lipsticks · granola bowl · linen OOTD'}
                </p>
                <div className="flex gap-2 mt-auto flex-wrap">
                  {['15:00 Studio','16:30 Edit','20:00 Post'].map((s) => (
                    <span key={s} className="px-2.5 py-1.5 rounded-full bg-white/25 text-[11px] text-white font-semibold">{s}</span>
                  ))}
                </div>
              </div>
            </ClayCard>
            <Sparkle size={28} color="var(--color-clay-butter-deep)" className="absolute top-5 left-14" style={{ transform: 'rotate(25deg)' }} />
          </div>
        </div>
      </section>

      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
