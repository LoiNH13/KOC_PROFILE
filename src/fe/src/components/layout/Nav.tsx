import { motion } from 'motion/react'
import { useLang } from '@/hooks/useLang'
import { Button } from '@/components/ui/button'
import type { Page } from '@/types'

interface NavProps {
  page: Page
  onNavigate: (p: Page) => void
}

const LINKS: { key: Page; vi: string; en: string }[] = [
  { key: 'landing',   vi: 'Trang chủ', en: 'Home' },
  { key: 'about',     vi: 'Về mình',   en: 'About' },
  { key: 'portfolio', vi: 'Portfolio', en: 'Portfolio' },
  { key: 'booking',   vi: 'Booking',   en: 'Booking' },
  { key: 'contact',   vi: 'Liên hệ',   en: 'Contact' },
]

export function Nav({ page, onNavigate }: NavProps) {
  const { lang } = useLang()

  return (
    <nav className="sticky top-4 z-50 mx-6 mt-4 flex items-center justify-between rounded-full px-5 py-3 bg-white/70 backdrop-blur-lg shadow-clay">
      {/* Logo */}
      <button
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-clay-accent-ink text-sm shadow-clay"
          style={{ background: 'linear-gradient(135deg, var(--color-clay-pink), var(--color-clay-butter))' }}
        >
          LC
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">Linh Chi</span>
      </button>

      {/* Links */}
      <div className="hidden md:flex gap-1">
        {LINKS.map((l) => {
          const active = page === l.key
          return (
            <motion.button
              key={l.key}
              onClick={() => onNavigate(l.key)}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer',
                active
                  ? 'font-bold text-clay-accent-ink bg-clay-pink'
                  : 'text-clay-ink hover:bg-clay-bg-alt',
              ].join(' ')}
              whileTap={{ scale: 0.97 }}
            >
              {l[lang]}
            </motion.button>
          )
        })}
      </div>

      {/* CTA */}
      <Button
        variant="clay"
        size="sm"
        onClick={() => onNavigate('booking')}
      >
        💌 {lang === 'vi' ? 'Book ngay' : 'Book now'}
      </Button>
    </nav>
  )
}
