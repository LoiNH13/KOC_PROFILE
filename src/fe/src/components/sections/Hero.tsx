import { motion } from 'motion/react'
import { Blob, Sparkle, ClayCard, SocialIcon, Counter, Avatar, Shimmer } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { KOC_DATA } from '@/data/koc-data'
import type { Page } from '@/types'

interface HeroProps {
  onNavigate: (p: Page) => void
}

const SOCIAL = [
  { kind: 'tiktok'    as const, bg: 'var(--color-clay-ink)',  color: '#fff',                         rotate: -6 },
  { kind: 'instagram' as const, bg: 'var(--color-clay-pink)', color: 'var(--color-clay-accent-ink)', rotate: 6 },
  { kind: 'youtube'   as const, bg: 'var(--color-clay-accent)',color: '#fff',                         rotate: -8 },
  { kind: 'facebook'  as const, bg: 'var(--color-clay-sky)',  color: '#1B4B8E',                      rotate: 4 },
]

export function Hero({ onNavigate }: HeroProps) {
  const { lang } = useLang()
  return (
    <section className="relative px-12 pb-28 pt-6 overflow-hidden">
      <Blob color="var(--color-clay-pink)"   size={500} top={-100} right={-80} delay={0} />
      <Blob color="var(--color-clay-mint)"   size={420} bottom={-60} left={-60} delay={3} />
      <Blob color="var(--color-clay-butter)" size={300} top={200} left="40%" delay={6} />

      <Sparkle size={32} color="var(--color-clay-butter-deep)" className="absolute top-20 right-[15%] animate-spin-slow" />
      <Sparkle size={20} color="var(--color-clay-pink-deep)"   className="absolute top-[300px] right-[8%] animate-spin-med" />
      <Sparkle size={24} color="var(--color-clay-mint-deep)"   className="absolute bottom-28 left-[10%] animate-spin-fast" />

      <div className="relative max-w-[1240px] mx-auto grid grid-cols-[1.1fr_1fr] gap-14 items-center">
        {/* Left */}
        <div>
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay-mint shadow-clay mb-7">
            <span className="w-2 h-2 rounded-full bg-[#1F8F55] shadow-[0_0_10px_#1F8F55]" />
            <span className="text-[13px] font-bold text-[#1F6B47]">
              {lang === 'vi' ? 'Online · Nhận booking Q2' : 'Online · Booking Q2 open'}
            </span>
          </div>

          <h1 className="font-display text-[88px] leading-[0.95] tracking-[-3px] font-medium text-clay-ink mb-7">
            {lang === 'vi' ? (
              <>Hi, mình là<br />
                <Shimmer>Linh Chi</Shimmer> ✨
              </>
            ) : (
              <>Hi, I'm<br />
                <Shimmer>Linh Chi</Shimmer> ✨
              </>
            )}
          </h1>

          <p className="text-lg leading-[1.55] text-clay-ink-soft max-w-[520px] mb-9">
            {KOC_DATA.tagline[lang]}. {KOC_DATA.bio[lang]}
          </p>

          <div className="flex gap-3.5 items-center flex-wrap">
            <Button variant="clay" size="lg" onClick={() => onNavigate('mediakit')}>
              {lang === 'vi' ? 'Xem media kit' : 'View media kit'} →
            </Button>
            <Button variant="ghost" size="lg" onClick={() => onNavigate('booking')}>
              💼 {lang === 'vi' ? 'Booking ngay' : 'Book now'}
            </Button>
          </div>

          {/* Social row */}
          <div className="flex gap-2.5 mt-11 items-center">
            {SOCIAL.map((s) => (
              <motion.a
                key={s.kind}
                className="w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer shadow-clay"
                style={{ background: s.bg, color: s.color }}
                whileHover={{ y: -2, rotate: s.rotate, transition: { type: 'spring', stiffness: 400 } }}
              >
                <SocialIcon kind={s.kind} size={20} />
              </motion.a>
            ))}
            <span className="ml-2 text-sm font-semibold text-clay-ink-soft">{KOC_DATA.handle}</span>
          </div>
        </div>

        {/* Right: Avatar + stickers */}
        <div className="relative h-[620px]">
          <Avatar size={560} />

          {/* Rating sticker */}
          <ClayCard bg="var(--color-clay-butter)" rotate={-8} className="absolute top-6 -left-10 px-5 py-4 flex items-center gap-3">
            <span className="text-[36px]">⭐</span>
            <div>
              <p className="font-display text-2xl font-bold text-clay-ink leading-none">4.9</p>
              <p className="text-[11px] text-clay-ink-soft mt-0.5">{lang === 'vi' ? 'từ 6 brand' : 'from 6 brands'}</p>
            </div>
          </ClayCard>

          {/* Views sticker */}
          <ClayCard bg="var(--color-clay-mint)" rotate={5} className="absolute top-48 -right-12 px-5 py-4 min-w-[200px]">
            <p className="text-[11px] font-bold text-[#1F6B47] uppercase tracking-[0.5px] mb-1">
              {lang === 'vi' ? 'Tuần này' : 'This week'}
            </p>
            <p className="font-display text-[28px] font-bold text-clay-ink leading-none">
              <Counter value="48K" />
            </p>
            <div className="flex items-end gap-0.5 h-7 mt-2.5">
              {[12,18,14,22,19,28,24].map((h, i) => (
                <div key={i} className="w-2 rounded-sm bg-[#1F8F55]" style={{ height: `${h * 3}%` }} />
              ))}
            </div>
          </ClayCard>

          {/* Product sticker */}
          <ClayCard bg="var(--color-clay-lilac)" rotate={8} className="absolute bottom-10 -left-9 p-3.5 flex items-center gap-3 min-w-[220px]">
            <div
              className="w-13 h-13 rounded-2xl"
              style={{ background: `linear-gradient(135deg, var(--color-clay-accent), var(--color-clay-pink-deep))`, boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4)' }}
            />
            <div>
              <p className="text-[10px] font-bold text-clay-accent-ink uppercase tracking-[0.5px]">{lang === 'vi' ? 'Đang review' : 'Reviewing'}</p>
              <p className="text-[13px] font-bold text-clay-ink mt-0.5 leading-snug">Hermosa Velvet 04</p>
              <p className="text-[11px] text-clay-ink-soft mt-0.5">💄 Beauty · ⭐ 4.8</p>
            </div>
          </ClayCard>

          {/* Niche bubbles */}
          <div className="absolute -top-5 right-10 flex gap-1.5">
            {['👗','💄','🍜'].map((e, i) => (
              <motion.div
                key={e}
                className="w-12 h-12 rounded-2xl bg-clay-surface shadow-clay flex items-center justify-center text-[22px]"
                style={{ transform: `rotate(${(i-1)*8}deg)` }}
                whileHover={{ y: -4, rotate: 0 }}
              >{e}</motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
