import { Check } from 'lucide-react'
import { useLang } from '@/hooks/useLang'
import { PACKAGES as PACKAGES_FALLBACK } from '@/data/koc-data'
import { fetchPackages } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { TONE_BG, TONE_INK } from '@/lib/utils'
import { TiltCard } from '@/components/primitives'
import { useKocData } from '@/hooks/useKocData'
import type { Page } from '@/types'

interface PackagesProps {
  onNavigate: (p: Page) => void
}

export function Packages({ onNavigate }: PackagesProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const PACKAGES = useSheetData('packages', fetchPackages, PACKAGES_FALLBACK)
  if (!KOC_DATA.packagesVisible || PACKAGES.length === 0) return null
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-peach shadow-clay text-[11px] font-bold text-[#A04526] uppercase tracking-widest mb-3 lg:mb-4">
            💼 {lang === 'vi' ? 'Gói hợp tác' : 'Packages'}
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05] mb-3">
            {lang === 'vi' ? 'Các gói —' : 'Packages,'}{' '}
            <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'một chuẩn chất lượng' : 'one standard'}</em>
          </h2>
          <p className="text-[15px] lg:text-base text-clay-ink-soft max-w-[540px] mx-auto leading-relaxed">
            {lang === 'vi' ? 'Mọi gói đều bao gồm concept riêng, 2 vòng chỉnh sửa, analytics report.' : 'All packages include original concept, 2 revision rounds, analytics report.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {PACKAGES.map((p) => (
            <TiltCard
              key={p.id}
              className="relative rounded-clay-lg flex flex-col p-7 lg:p-8"
              style={{
                background: p.featured ? 'var(--color-clay-ink)' : TONE_BG[p.tone],
                boxShadow: p.featured
                  ? 'inset 0 2px 4px rgba(255,255,255,0.1), 0 5px 0 rgba(0,0,0,0.15), 0 18px 36px rgba(46,26,46,0.2)'
                  : 'var(--shadow-clay)',
                color: p.featured ? '#fff' : 'var(--color-clay-ink)',
              }}
            >
              {p.featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full text-white text-[11px] font-extrabold tracking-wide uppercase whitespace-nowrap"
                  style={{ background: 'var(--color-clay-accent)', boxShadow: `0 3px 0 var(--color-clay-accent-ink), 0 8px 16px rgba(255,91,138,0.4)` }}
                >
                  ⭐ {lang === 'vi' ? 'Phổ biến' : 'Most popular'}
                </div>
              )}
              <div
                className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold mb-4 tracking-wide"
                style={{
                  background: p.featured ? 'rgba(255,255,255,0.12)' : 'var(--color-clay-surface)',
                  color: p.featured ? '#fff' : TONE_INK[p.tone],
                }}
              >
                {p.tagline[lang]}
              </div>
              <p className="font-display text-[32px] lg:text-[40px] font-semibold tracking-[-1.5px] leading-none mb-2">{p.name[lang]}</p>
              <p
                className="font-display text-lg lg:text-xl font-medium mb-5 lg:mb-6"
                style={{ color: p.featured ? 'var(--color-clay-butter)' : TONE_INK[p.tone] }}
              >
                {p.price[lang]}
              </p>
              <div className="h-px mb-5" style={{ background: p.featured ? 'rgba(255,255,255,0.12)' : 'rgba(46,26,46,0.1)' }} />
              <ul className="flex flex-col gap-3 mb-6 lg:mb-7 flex-1">
                {p.deliverables[lang].map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm font-medium leading-snug">
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{
                        background: p.featured ? 'var(--color-clay-accent)' : 'var(--color-clay-surface)',
                        color: p.featured ? '#fff' : TONE_INK[p.tone],
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate('booking')}
                className="mt-auto w-full py-3.5 rounded-full font-bold text-sm text-white cursor-pointer"
                style={{
                  background: p.featured ? 'var(--color-clay-accent)' : 'var(--color-clay-ink)',
                  boxShadow: `inset 0 2px 4px rgba(255,255,255,0.25), 0 3px 0 ${p.featured ? 'var(--color-clay-accent-ink)' : 'rgba(0,0,0,0.25)'}`,
                }}
              >
                {lang === 'vi' ? 'Chọn gói này' : 'Choose this'}
              </button>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
