import { motion } from 'motion/react'
import { useLang } from '@/hooks/useLang'
import { NICHES } from '@/data/koc-data'

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
  return (
    <section className="px-12 pb-20">
      <div className="max-w-[1240px] mx-auto grid grid-cols-6 gap-4">
        {NICHES.map((n, i) => {
          const p = PALETTE[i]
          const rotate = (i % 2 === 0 ? -1 : 1) * 1.5
          return (
            <motion.div
              key={n.en}
              className="py-7 px-4 rounded-clay-lg shadow-clay text-center cursor-pointer"
              style={{ background: p.bg }}
              initial={{ rotate }}
              whileHover={{ rotate: 0, y: -6, scale: 1.04, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="text-[40px] mb-2.5">{n.emoji}</div>
              <p className="text-sm font-bold" style={{ color: p.ink }}>{n[lang]}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
