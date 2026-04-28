import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import type { Page } from '@/types'

interface NavProps {
  page: Page
  onNavigate: (p: Page) => void
}

const LINKS: { key: Page; vi: string; en: string }[] = [
  { key: 'landing',   vi: 'Trang chủ', en: 'Home' },
  { key: 'about',     vi: 'Về mình',   en: 'About' },
  { key: 'portfolio', vi: 'Portfolio', en: 'Portfolio' },
  { key: 'contact',   vi: 'Liên hệ',   en: 'Contact' },
]

export function Nav({ page, onNavigate }: NavProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const [open, setOpen] = useState(false)
  const initials = (KOC_DATA.name || '  ')
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join('')
    .toUpperCase() || '·'

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (p: Page) => {
    onNavigate(p)
    setOpen(false)
  }

  return (
    <>
      <nav className="sticky top-2 sm:top-4 z-50 mx-3 sm:mx-6 mt-3 sm:mt-4 flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white/70 backdrop-blur-lg shadow-clay">
        <button
          onClick={() => go('landing')}
          className="flex items-center gap-2.5 cursor-pointer min-w-0"
        >
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-extrabold text-clay-accent-ink text-sm shadow-clay flex-shrink-0 overflow-hidden"
            style={KOC_DATA.logoUrl ? undefined : { background: 'linear-gradient(135deg, var(--color-clay-pink), var(--color-clay-butter))' }}
          >
            {KOC_DATA.logoUrl
              ? <img src={KOC_DATA.logoUrl} alt={KOC_DATA.name} className="w-full h-full object-cover" />
              : initials
            }
          </div>
          {KOC_DATA.name && (
            <span className="font-display text-base sm:text-lg font-semibold tracking-tight truncate">
              {KOC_DATA.name}
            </span>
          )}
        </button>

        <div className="hidden md:flex gap-1">
          {LINKS.map((l) => {
            const active = page === l.key
            return (
              <motion.button
                key={l.key}
                onClick={() => go(l.key)}
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden w-10 h-10 rounded-2xl bg-clay-surface shadow-clay flex items-center justify-center"
          >
            <span className="relative w-5 h-5 flex flex-col justify-center gap-1">
              <span className={`block h-0.5 bg-clay-ink rounded transition-all ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-0.5 bg-clay-ink rounded transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-clay-ink rounded transition-all ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-clay-ink/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="mob-panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed left-3 right-3 top-20 z-50 rounded-clay-lg bg-clay-surface shadow-clay-lg p-3 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {LINKS.map((l) => {
                  const active = page === l.key
                  return (
                    <button
                      key={l.key}
                      onClick={() => go(l.key)}
                      className={[
                        'px-4 py-3 rounded-2xl text-left text-base font-semibold',
                        active
                          ? 'bg-clay-pink text-clay-accent-ink'
                          : 'text-clay-ink hover:bg-clay-bg-alt',
                      ].join(' ')}
                    >
                      {l[lang]}
                    </button>
                  )
                })}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
