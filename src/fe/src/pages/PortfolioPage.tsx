import { useState } from 'react'
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

const CATS = [
  { key: 'all',       vi: 'Tất cả',    en: 'All' },
  { key: 'Beauty',    vi: 'Mỹ phẩm',  en: 'Beauty' },
  { key: 'Fashion',   vi: 'Thời trang', en: 'Fashion' },
  { key: 'Food',      vi: 'Ẩm thực',   en: 'Food' },
  { key: 'Fitness',   vi: 'Sức khỏe',  en: 'Fitness' },
  { key: 'Lifestyle', vi: 'Lifestyle', en: 'Lifestyle' },
]

interface PortfolioPageProps { onNavigate: (p: Page) => void }

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const { lang } = useLang()
  const [cat, setCat] = useState('all')
  const PORTFOLIO_ITEMS = useSheetData('portfolio_items', fetchPortfolioItems, PORTFOLIO_ITEMS_FALLBACK)
  const filtered = cat === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((x) => x.niche === cat)
  const totalViews = PORTFOLIO_ITEMS.reduce((s, x) => {
    const n = parseFloat(x.views)
    return s + (x.views.includes('K') ? n * 1000 : n)
  }, 0)

  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(255,143,181,0.3)" />
      <Nav page="portfolio" onNavigate={onNavigate} />
      <PageHero
        eyebrow="Portfolio · 2025-2026"
        title={lang === 'vi' ? '12 video, 5 ngách, 1 năm.' : '12 videos, 5 niches, 1 year.'}
        sub={lang === 'vi' ? 'Mỗi video là một brief được đọc kỹ, một ý tưởng được thử, một câu chuyện nhỏ.' : 'Each video is a brief read carefully, an idea tried, a small story told.'}
        tone="mint"
      />

      {/* Stats row */}
      <section className="px-12 pb-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-4 gap-5">
          {[
            { label: { vi: 'Tổng video', en: 'Total videos' }, value: `${PORTFOLIO_ITEMS.length}`, tone: 'pink' },
            { label: { vi: 'Tổng views', en: 'Total views' },  value: `${(totalViews/1000).toFixed(0)}K`, tone: 'mint' },
            { label: { vi: 'Brand',      en: 'Brands' },       value: '6',  tone: 'butter' },
            { label: { vi: 'Ngách',      en: 'Niches' },       value: '5',  tone: 'lilac' },
          ].map((s, i) => (
            <ClayCard key={i} bg={`var(--color-clay-${s.tone})`} rotate={i % 2 === 0 ? -0.8 : 0.8} className="p-6">
              <p className="font-display text-[38px] font-semibold tracking-[-1.5px] leading-none mb-2">{s.value}</p>
              <p className="text-xs font-semibold text-clay-ink/75">{s.label[lang]}</p>
            </ClayCard>
          ))}
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="px-12 pb-20">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex gap-2 flex-wrap justify-center mb-10">
            {CATS.map((c) => (
              <Button key={c.key} variant={cat === c.key ? 'pill-active' : 'pill'} size="sm" onClick={() => setCat(c.key)}>
                {c[lang]}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-7">
            {filtered.map((item) => {
              return (
                <TiltCard
                  key={item.id}
                  className="bg-clay-surface rounded-clay shadow-clay overflow-hidden cursor-pointer"
                >
                  <div className="relative">
                    <PhotoPlaceholder tone={item.tone} aspect="9/11" label={`${item.brand} · ${item.format[lang]}`} />
                    {/* Play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 4v16l14-8z" fill="var(--color-clay-accent)" /></svg>
                      </div>
                    </div>
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-extrabold text-clay-ink uppercase tracking-widest">{item.platform}</div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/70 text-[11px] font-bold text-white font-mono">{item.duration}</div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-extrabold text-clay-accent-ink uppercase tracking-widest mb-1.5">{item.brand} · {item.niche}</p>
                    <h3 className="font-display text-[17px] font-semibold tracking-tight leading-snug mb-3">{item.title[lang]}</h3>
                    <div className="flex justify-between text-xs text-clay-ink-soft font-semibold">
                      <span>▶ {item.views} · ♥ {item.likes}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </TiltCard>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-20 text-clay-ink-soft text-base">
              {lang === 'vi' ? 'Chưa có nội dung thuộc ngách này.' : 'No content in this niche yet.'}
            </p>
          )}
        </div>
      </section>
      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
