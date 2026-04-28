import { ClayCard } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import type { Page } from '@/types'

interface PageFooterProps {
  onNavigate: (p: Page) => void
}

export function PageFooter({ onNavigate }: PageFooterProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const contact = [KOC_DATA.email, KOC_DATA.phone].filter(Boolean).join(' · ')
  return (
    <footer className="px-4 sm:px-6 md:px-8 lg:px-12 pt-12 lg:pt-14 pb-10 lg:pb-12 mt-8 lg:mt-10">
      <div className="max-w-[1240px] mx-auto">
        <ClayCard
          bg="var(--color-clay-ink)"
          className="px-6 sm:px-10 lg:px-12 py-8 lg:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap gap-5 lg:gap-6"
        >
          <div>
            <p className="font-display text-[22px] sm:text-[26px] lg:text-[28px] font-medium text-white tracking-tight leading-tight">
              {lang === 'vi' ? 'Cùng kể một câu chuyện?' : "Let's tell a story together?"}
            </p>
            {contact && (
              <p className="text-sm text-white/60 mt-1.5 break-all">{contact}</p>
            )}
          </div>
          <Button
            variant="clay"
            size="lg"
            onClick={() => onNavigate('booking')}
          >
            💌 {lang === 'vi' ? 'Gửi brief' : 'Send a brief'}
          </Button>
        </ClayCard>
        <p className="text-center mt-5 lg:mt-6 text-xs text-clay-ink-muted font-medium">
          © {new Date().getFullYear()}{KOC_DATA.handle ? ` · ${KOC_DATA.handle}` : ''} · {lang === 'vi' ? 'Làm với 💖 tại VN' : 'Made with 💖 in VN'}
        </p>
      </div>
    </footer>
  )
}
