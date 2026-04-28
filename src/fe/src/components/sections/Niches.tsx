import { motion } from 'motion/react'
import { useLang } from '@/hooks/useLang'
import { NICHES as NICHES_FALLBACK } from '@/data/koc-data'
import { fetchNiches } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

const PALETTE = [
  { bg: 'var(--color-clay-pink)',   ink: 'var(--color-clay-accent-ink)' },
  { bg: 'var(--color-clay-mint)',   ink: '#1F6B47' },
  { bg: 'var(--color-clay-butter)', ink: '#7A5E00' },
  { bg: 'var(--color-clay-lilac)',  ink: '#5B3A8C' },
  { bg: 'var(--color-clay-peach)',  ink: '#A04526' },
  { bg: 'var(--color-clay-sky)',    ink: '#1B4B8E' },
]

export function Niches() {
  const { lang } = useLang()
  const NICHES = useSheetData('niches', fetchNiches, NICHES_FALLBACK)
  if (NICHES.length === 0) return null
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {NICHES.map((n, i) => {
          const p = PALETTE[i % PALETTE.length]
          const rotate = (i % 2 === 0 ? -1 : 1) * 1.5
          return (
            <motion.div
              key={n.en}
              className="py-5 sm:py-6 lg:py-7 px-3 sm:px-4 rounded-clay-lg shadow-clay text-center cursor-pointer"
              style={{ background: p.bg }}
              initial={{ rotate }}
              whileHover={{ rotate: 0, y: -6, scale: 1.04, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="text-[32px] sm:text-[36px] lg:text-[40px] mb-2 lg:mb-2.5">{n.emoji}</div>
              <p className="text-xs sm:text-sm font-bold" style={{ color: p.ink }}>{n[lang]}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
