import { ClayCard } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { KOC_DATA } from '@/data/koc-data'
import type { Page } from '@/types'

interface PageFooterProps {
  onNavigate: (p: Page) => void
}

export function PageFooter({ onNavigate }: PageFooterProps) {
  const { lang } = useLang()
  return (
    <footer className="px-12 pt-14 pb-12 mt-10">
      <div className="max-w-[1240px] mx-auto">
        <ClayCard
          bg="var(--color-clay-ink)"
          className="px-12 py-10 flex items-center justify-between flex-wrap gap-6"
        >
          <div>
            <p className="font-display text-[28px] font-medium text-white tracking-tight leading-tight">
              {lang === 'vi' ? 'Cùng kể một câu chuyện?' : "Let's tell a story together?"}
            </p>
            <p className="text-sm text-white/60 mt-1.5">{KOC_DATA.email} · {KOC_DATA.phone}</p>
          </div>
          <Button
            variant="clay"
            size="lg"
            onClick={() => onNavigate('booking')}
          >
            💌 {lang === 'vi' ? 'Gửi brief' : 'Send a brief'}
          </Button>
        </ClayCard>
        <p className="text-center mt-6 text-xs text-clay-ink-muted font-medium">
          © 2026 · {KOC_DATA.handle} · {lang === 'vi' ? 'Làm với 💖 tại VN' : 'Made with 💖 in VN'}
        </p>
      </div>
    </footer>
  )
}
