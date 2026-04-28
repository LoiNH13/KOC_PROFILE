import { useState } from 'react'
import type React from 'react'
import { Blob, Stars, TiltCard } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { FEATURED_PRODUCTS as FEATURED_PRODUCTS_FALLBACK } from '@/data/koc-data'
import { fetchFeaturedProducts } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { TONE_GRADIENT } from '@/lib/utils'

export function Products() {
  const { lang } = useLang()
  const [filter, setFilter] = useState('all')
  const FEATURED_PRODUCTS = useSheetData('featured_products', fetchFeaturedProducts, FEATURED_PRODUCTS_FALLBACK)
  if (FEATURED_PRODUCTS.length === 0) return null
  const niches = ['all', ...new Set(FEATURED_PRODUCTS.map((p) => p.niche.en))]
  const filtered = filter === 'all' ? FEATURED_PRODUCTS : FEATURED_PRODUCTS.filter((p) => p.niche.en === filter)

  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <Blob color="var(--color-clay-butter)" size={400} top={100} right={-100} />
      <div className="relative max-w-[1240px] mx-auto">
        <div className="flex items-end justify-between mb-8 lg:mb-10 flex-wrap gap-4 lg:gap-6">
          <div>
            <div className="inline-block px-3 py-1.5 rounded-full bg-clay-pink shadow-clay text-[11px] font-bold text-clay-accent-ink uppercase tracking-widest mb-3 lg:mb-4">
              🛍 {lang === 'vi' ? 'Đang review' : 'Reviewing'}
            </div>
            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
              {lang === 'vi' ? 'Sản phẩm' : 'Featured'}{' '}
              <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'đang yêu' : 'products'}</em>
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {niches.map((n) => (
              <Button key={n} variant={filter === n ? 'pill-active' : 'pill'} size="sm" onClick={() => setFilter(n)}>
                {n === 'all' ? (lang === 'vi' ? 'Tất cả' : 'All') : n}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filtered.map((p, i) => {
            const featured = i === 0 && filter === 'all'
            const Wrapper = p.link
              ? ({ children }: { children: React.ReactNode }) => (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                    {children}
                  </a>
                )
              : ({ children }: { children: React.ReactNode }) => <>{children}</>
            return (
              <TiltCard
                key={p.id}
                className={`rounded-clay shadow-clay overflow-hidden cursor-pointer bg-clay-surface${featured ? ' sm:[grid-column:span_2]' : ''}`}
              >
                <Wrapper>
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{ aspectRatio: featured ? '16/7' : '4/3', background: TONE_GRADIENT[p.tone] }}
                >
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.name[lang]} className="absolute inset-0 w-full h-full object-cover" />
                    : <div
                        className="rounded-full"
                        style={{
                          width: featured ? 200 : 120,
                          height: featured ? 200 : 120,
                          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${TONE_GRADIENT[p.tone]})`,
                          boxShadow: 'inset -8px -8px 20px rgba(46,26,46,0.15), 0 12px 30px rgba(46,26,46,0.2)',
                        }}
                      />
                  }
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-clay-ink text-white text-[11px] font-bold tracking-wide">
                    {p.tag[lang]}
                  </div>
                </div>
                <div className={featured ? 'p-6 lg:p-7' : 'p-4 lg:p-5'}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[11px] font-extrabold tracking-widest text-clay-accent-ink uppercase">{p.brand}</span>
                    <span className="text-[11px] text-clay-ink-muted font-semibold">{p.niche[lang]}</span>
                  </div>
                  <p className={`font-display font-semibold text-clay-ink mb-3 leading-snug tracking-tight ${featured ? 'text-[22px] lg:text-[26px]' : 'text-[16px] lg:text-[17px]'}`}>
                    {p.name[lang]}
                  </p>
                  <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
                    <Stars value={p.rating} />
                    <span className={`font-bold text-clay-ink font-display ${featured ? 'text-lg' : 'text-sm'}`}>{p.price}</span>
                  </div>
                </div>
              </Wrapper>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
