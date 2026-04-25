import { Marquee } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { BRANDS } from '@/data/koc-data'

export function Brands() {
  const { lang } = useLang()
  return (
    <section className="py-16">
      <div className="text-center mb-9 px-12">
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-sky shadow-clay text-xs font-bold text-[#1B4B8E] uppercase tracking-widest mb-4">
          🤝 {lang === 'vi' ? 'Đối tác' : 'Partners'}
        </div>
        <h2 className="font-display text-[38px] font-semibold tracking-tight text-clay-ink leading-none">
          {lang === 'vi' ? 'Brand đã đồng hành' : 'Brands collaborated'}
        </h2>
      </div>
      <Marquee speed={35}>
        {BRANDS.map((b, i) => (
          <div
            key={i}
            className="px-8 py-4 rounded-clay bg-clay-surface shadow-clay font-display text-[26px] text-clay-ink font-semibold tracking-tight whitespace-nowrap"
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
