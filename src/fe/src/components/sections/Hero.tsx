import { motion } from 'motion/react'
import { Blob, Sparkle, ClayCard, SocialIcon, Counter, Avatar, Shimmer } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import { useSheetData } from '@/hooks/useSheetData'
import { fetchStats } from '@/lib/sheets'
import { STATS as STATS_FALLBACK } from '@/data/koc-data'
import type { Page } from '@/types'

interface HeroProps {
  onNavigate: (p: Page) => void
}

const SOCIAL_CONFIG = [
  { kind: 'tiktok'    as const, bg: 'var(--color-clay-ink)',   color: '#fff',                         rotate: -6,  urlKey: 'tiktokUrl'    as const },
  { kind: 'instagram' as const, bg: 'var(--color-clay-pink)',  color: 'var(--color-clay-accent-ink)', rotate: 6,   urlKey: 'instagramUrl' as const },
  { kind: 'youtube'   as const, bg: 'var(--color-clay-accent)',color: '#fff',                         rotate: -8,  urlKey: 'youtubeUrl'   as const },
  { kind: 'facebook'  as const, bg: 'var(--color-clay-sky)',   color: '#1B4B8E',                      rotate: 4,   urlKey: 'facebookUrl'  as const },
]

export function Hero({ onNavigate }: HeroProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const STATS = useSheetData('stats', fetchStats, STATS_FALLBACK)
  const viewsStat = STATS.find((s) => /view|xem/i.test(s.label.en) || /view|xem/i.test(s.label.vi))
  const followersStat = STATS.find((s) => /follow|theo dõi/i.test(s.label.en) || /follow|theo dõi/i.test(s.label.vi))
  const displayName = KOC_DATA.name || ''
  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 lg:pb-28 pt-4 lg:pt-6 overflow-hidden">
      <Blob color="var(--color-clay-pink)"   size={500} top={-100} right={-80} delay={0} />
      <Blob color="var(--color-clay-mint)"   size={420} bottom={-60} left={-60} delay={3} />
      <Blob color="var(--color-clay-butter)" size={300} top={200} left="40%" delay={6} />

      <Sparkle size={32} color="var(--color-clay-butter-deep)" className="hidden md:block absolute top-20 right-[15%] animate-spin-slow" />
      <Sparkle size={20} color="var(--color-clay-pink-deep)"   className="hidden md:block absolute top-[300px] right-[8%] animate-spin-med" />
      <Sparkle size={24} color="var(--color-clay-mint-deep)"   className="hidden md:block absolute bottom-28 left-[10%] animate-spin-fast" />

      <div className="relative max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clay-mint shadow-clay mb-5 lg:mb-7">
            <span className="w-2 h-2 rounded-full bg-[#1F8F55] shadow-[0_0_10px_#1F8F55]" />
            <span className="text-[12px] lg:text-[13px] font-bold text-[#1F6B47]">
              {lang === 'vi' ? 'Online · Nhận booking' : 'Online · Booking open'}
            </span>
          </div>

          <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[88px] leading-[1.02] sm:leading-[0.98] lg:leading-[0.95] tracking-[-1.5px] sm:tracking-[-2px] lg:tracking-[-3px] font-medium text-clay-ink mb-5 lg:mb-7">
            {lang === 'vi' ? <>Hi, mình là<br /></> : <>Hi, I'm<br /></>}
            <Shimmer>{displayName}</Shimmer> ✨
          </h1>

          <p className="text-[15px] lg:text-lg leading-[1.55] text-clay-ink-soft max-w-[520px] mb-7 lg:mb-9">
            {KOC_DATA.tagline[lang]}
            {KOC_DATA.tagline[lang] && KOC_DATA.bio[lang] ? '. ' : ''}
            {KOC_DATA.bio[lang]}
          </p>

          <div className="flex gap-3 lg:gap-3.5 items-center flex-wrap">
            <Button variant="clay" size="lg" onClick={() => onNavigate('mediakit')}>
              {lang === 'vi' ? 'Xem media kit' : 'View media kit'} →
            </Button>
            <Button variant="ghost" size="lg" onClick={() => onNavigate('booking')}>
              💼 {lang === 'vi' ? 'Booking ngay' : 'Book now'}
            </Button>
          </div>

          <div className="flex gap-2.5 mt-8 lg:mt-11 items-center flex-wrap">
            {SOCIAL_CONFIG.filter(s => KOC_DATA[s.urlKey]).map((s) => (
              <motion.a
                key={s.kind}
                href={KOC_DATA[s.urlKey]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center cursor-pointer shadow-clay"
                style={{ background: s.bg, color: s.color }}
                whileHover={{ y: -2, rotate: s.rotate, transition: { type: 'spring', stiffness: 400 } }}
              >
                <SocialIcon kind={s.kind} size={20} />
              </motion.a>
            ))}
            {KOC_DATA.handle && (
              <span className="ml-1 lg:ml-2 text-sm font-semibold text-clay-ink-soft">{KOC_DATA.handle}</span>
            )}
          </div>
        </div>

        {/* Right: Avatar + stickers */}
        <div className="relative h-[440px] sm:h-[540px] lg:h-[620px] order-first lg:order-last">
          <Avatar size={560} src={KOC_DATA.avatarUrl || undefined} style={{ height: '100%' }} />

          {followersStat && (
            <ClayCard bg="var(--color-clay-butter)" rotate={-8} className="absolute top-4 lg:top-6 -left-3 lg:-left-10 px-4 lg:px-5 py-3 lg:py-4 flex items-center gap-3">
              <span className="text-[28px] lg:text-[36px]">⭐</span>
              <div>
                <p className="font-display text-xl lg:text-2xl font-bold text-clay-ink leading-none">{followersStat.value}</p>
                <p className="text-[11px] text-clay-ink-soft mt-0.5">{followersStat.label[lang]}</p>
              </div>
            </ClayCard>
          )}

          {viewsStat && (
            <ClayCard bg="var(--color-clay-mint)" rotate={5} className="absolute bottom-4 lg:bottom-8 -right-3 lg:-right-12 px-4 lg:px-5 py-3 lg:py-4 min-w-[160px] lg:min-w-[200px]">
              <p className="text-[11px] font-bold text-[#1F6B47] uppercase tracking-[0.5px] mb-1">
                {viewsStat.label[lang]}
              </p>
              <p className="font-display text-[24px] lg:text-[28px] font-bold text-clay-ink leading-none">
                <Counter value={viewsStat.value} />
              </p>
              <div className="flex items-end gap-0.5 h-6 lg:h-7 mt-2 lg:mt-2.5">
                {[12,18,14,22,19,28,24].map((h) => (
                  <div key={`bar-${h}`} className="w-2 rounded-sm bg-[#1F8F55]" style={{ height: `${h * 3}%` }} />
                ))}
              </div>
            </ClayCard>
          )}
        </div>
      </div>
    </section>
  )
}
