import { Marquee } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { BRANDS as BRANDS_FALLBACK } from '@/data/koc-data'
import { fetchBrands } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

export function Brands() {
  const { lang } = useLang()
  const BRANDS = useSheetData('brands', fetchBrands, BRANDS_FALLBACK)
  if (BRANDS.length === 0) return null
  return (
    <section className="py-12 lg:py-16">
      <div className="text-center mb-7 lg:mb-9 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="inline-block px-3 py-1.5 rounded-full bg-clay-sky shadow-clay text-[11px] font-bold text-[#1B4B8E] uppercase tracking-widest mb-3 lg:mb-4">
          🤝 {lang === 'vi' ? 'Đối tác' : 'Partners'}
        </div>
        <h2 className="font-display text-[26px] sm:text-[32px] lg:text-[38px] font-semibold tracking-tight text-clay-ink leading-[1.1]">
          {lang === 'vi' ? 'Brand đã đồng hành' : 'Brands collaborated'}
        </h2>
      </div>
      <Marquee speed={35}>
        {BRANDS.map((b, i) => (
          <div
            key={`${b}-${i}`}
            className="px-6 lg:px-8 py-3 lg:py-4 rounded-clay bg-clay-surface shadow-clay font-display text-[20px] lg:text-[26px] text-clay-ink font-semibold tracking-tight whitespace-nowrap"
            style={{
              transform: `rotate(${(i % 2 === 0 ? -1 : 1)}deg)`,
              fontStyle: i % 3 === 0 ? 'italic' : 'normal',
            }}
          >
            {b}
          </div>
        ))}
      </Marquee>
    </section>
  )
}
