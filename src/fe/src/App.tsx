import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LangProvider, useLang } from '@/hooks/useLang'
import { DarkProvider, useDark } from '@/hooks/useDark'
import { KocDataProvider } from '@/hooks/useKocData'
import { LandingPage } from '@/pages/LandingPage'
import { AboutPage } from '@/pages/AboutPage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { BookingPage } from '@/pages/BookingPage'
import { ContactPage } from '@/pages/ContactPage'
import { MediaKitPage } from '@/pages/MediaKitPage'
import type { Page } from '@/types'

function Controls() {
  const { lang, setLang } = useLang()
  const { dark, toggle } = useDark()

  return (
    <div className="no-print fixed bottom-6 right-6 z-50 flex gap-2 items-center">
      <button
        onClick={toggle}
        title={dark ? 'Light mode' : 'Dark mode'}
        className="w-10 h-10 rounded-full border-none cursor-pointer shadow-clay flex items-center justify-center text-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          background: dark ? '#2E1834' : 'rgba(255,255,255,0.9)',
          color: dark ? '#FFE07A' : '#2E1A2E',
        }}
      >
        {dark ? '☀️' : '🌙'}
      </button>

      <button
        onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
        className="w-12 h-12 rounded-full bg-clay-ink text-white text-sm font-bold shadow-clay hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        aria-label="Toggle language"
      >
        {lang === 'vi' ? 'EN' : 'VI'}
      </button>
    </div>
  )
}

function AppInner() {
  const [page, setPage] = useState<Page>('landing')

  const pages: Record<Page, React.ReactNode> = {
    landing:   <LandingPage   onNavigate={setPage} />,
    about:     <AboutPage     onNavigate={setPage} />,
    portfolio: <PortfolioPage onNavigate={setPage} />,
    booking:   <BookingPage   onNavigate={setPage} />,
    contact:   <ContactPage   onNavigate={setPage} />,
    mediakit:  <MediaKitPage />,
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
      <Controls />
    </>
  )
}

export default function App() {
  return (
    <DarkProvider>
      <LangProvider>
        <KocDataProvider>
          <AppInner />
        </KocDataProvider>
      </LangProvider>
    </DarkProvider>
  )
}
