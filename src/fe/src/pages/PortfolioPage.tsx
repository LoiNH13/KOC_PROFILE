import { useState, useMemo } from 'react'
import { ClayCard, CursorGlow, PhotoPlaceholder, TiltCard } from '@/components/primitives'
import { Nav } from '@/components/layout/Nav'
import { PageHero } from '@/components/layout/PageHero'
import { PageFooter } from '@/components/layout/PageFooter'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { PORTFOLIO_ITEMS as PORTFOLIO_ITEMS_FALLBACK } from '@/data/koc-data'
import { fetchPortfolioItems } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import type { Page } from '@/types'

interface PortfolioPageProps { onNavigate: (p: Page) => void }

function parseViews(v: string): number {
  if (!v) return 0
  const n = Number.parseFloat(v)
  if (Number.isNaN(n)) return 0
  if (/m/i.test(v)) return n * 1_000_000
  if (/k/i.test(v)) return n * 1_000
  return n
}

function formatTotal(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return `${n}`
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const { lang } = useLang()
  const [cat, setCat] = useState('all')
  const PORTFOLIO_ITEMS = useSheetData('portfolio_items', fetchPortfolioItems, PORTFOLIO_ITEMS_FALLBACK)

  const niches = useMemo(() => {
    const seen = new Set<string>()
    PORTFOLIO_ITEMS.forEach((p) => p.niche && seen.add(p.niche))
    return ['all', ...Array.from(seen)]
  }, [PORTFOLIO_ITEMS])

  const filtered = cat === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((x) => x.niche === cat)
  const totalViews = PORTFOLIO_ITEMS.reduce((s, x) => s + parseViews(x.views), 0)
  const brandCount = new Set(PORTFOLIO_ITEMS.map((x) => x.brand)).size
  const nicheCount = new Set(PORTFOLIO_ITEMS.map((x) => x.niche)).size

  let heroTitle: string
  if (PORTFOLIO_ITEMS.length === 0) {
    heroTitle = 'Portfolio'
  } else if (lang === 'vi') {
    heroTitle = `${PORTFOLIO_ITEMS.length} video, ${nicheCount} ngách.`
  } else {
    heroTitle = `${PORTFOLIO_ITEMS.length} videos, ${nicheCount} niches.`
  }

  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(255,143,181,0.3)" />
      <Nav page="portfolio" onNavigate={onNavigate} />
      <PageHero
        eyebrow="Portfolio"
        title={heroTitle}
        sub={lang === 'vi'
          ? 'Mỗi video là một brief được đọc kỹ, một ý tưởng được thử, một câu chuyện nhỏ.'
          : 'Each video is a brief read carefully, an idea tried, a small story told.'}
        tone="mint"
      />

      {PORTFOLIO_ITEMS.length > 0 && (
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-6">
          <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { label: { vi: 'Tổng video', en: 'Total videos' }, value: `${PORTFOLIO_ITEMS.length}`, tone: 'pink' },
              { label: { vi: 'Tổng views', en: 'Total views' },  value: formatTotal(totalViews),     tone: 'mint' },
              { label: { vi: 'Brand',      en: 'Brands' },       value: `${brandCount}`,             tone: 'butter' },
              { label: { vi: 'Ngách',      en: 'Niches' },       value: `${nicheCount}`,             tone: 'lilac' },
            ].map((s, i) => (
              <ClayCard key={s.tone} bg={`var(--color-clay-${s.tone})`} rotate={i % 2 === 0 ? -0.8 : 0.8} className="p-5 lg:p-6">
                <p className="font-display text-[30px] lg:text-[38px] font-semibold tracking-[-1.5px] leading-none mb-2">{s.value}</p>
                <p className="text-xs font-semibold text-clay-ink/75">{s.label[lang]}</p>
              </ClayCard>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-14 lg:pb-20">
        <div className="max-w-[1240px] mx-auto">
          {niches.length > 1 && (
            <div className="flex gap-2 flex-wrap justify-center mb-8 lg:mb-10">
              {niches.map((c) => (
                <Button key={c} variant={cat === c ? 'pill-active' : 'pill'} size="sm" onClick={() => setCat(c)}>
                  {c === 'all' ? (lang === 'vi' ? 'Tất cả' : 'All') : c}
                </Button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {filtered.map((item) => (
              <TiltCard
                key={item.id}
                className="bg-clay-surface rounded-clay shadow-clay overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <PhotoPlaceholder tone={item.tone} aspect="9/11" label={`${item.brand} · ${item.format[lang]}`} src={item.imageUrl} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 4v16l14-8z" fill="var(--color-clay-accent)" /></svg>
                    </div>
                  </div>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-clay-ink uppercase tracking-widest">{item.platform}</div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/70 text-[11px] font-bold text-white font-mono">{item.duration}</div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-extrabold text-clay-accent-ink uppercase tracking-widest mb-1.5">{item.brand} · {item.niche}</p>
                  <h3 className="font-display text-[16px] lg:text-[17px] font-semibold tracking-tight leading-snug mb-3">{item.title[lang]}</h3>
                  <div className="flex justify-between text-xs text-clay-ink-soft font-semibold">
                    <span>▶ {item.views} · ♥ {item.likes}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-16 lg:py-20 text-clay-ink-soft text-base">
              {PORTFOLIO_ITEMS.length === 0
                ? (lang === 'vi' ? 'Chưa có video nào trong sheet portfolio_items.' : 'No videos yet in portfolio_items sheet.')
                : (lang === 'vi' ? 'Chưa có nội dung thuộc ngách này.' : 'No content in this niche yet.')}
            </p>
          )}
        </div>
      </section>
      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
