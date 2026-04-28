import { useLang } from '@/hooks/useLang'
import { AUDIENCE as AUDIENCE_FALLBACK } from '@/data/koc-data'
import { fetchAudience } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { ClayCard } from '@/components/primitives'

export function MediaKit() {
  const { lang } = useLang()
  const audience = useSheetData('audience', fetchAudience, AUDIENCE_FALLBACK)
  const { age, gender, cities, platforms } = audience
  const hasAny = age.length || gender.length || cities.length || platforms.length
  if (!hasAny) return null

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20 bg-clay-bg-alt">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-sky shadow-clay text-[11px] font-bold text-[#1B4B8E] uppercase tracking-widest mb-3 lg:mb-4">
            📊 Media Kit
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
            {lang === 'vi' ? 'Audience thật,' : 'Real audience,'}{' '}
            <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'số liệu thật' : 'real data'}</em>
          </h2>
        </div>

        {platforms.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-5">
            {platforms.map((p) => (
              <ClayCard key={p.name} bg="var(--color-clay-surface)" className="p-4 lg:p-5 text-center">
                <p className="text-[11px] font-extrabold text-clay-ink-muted uppercase tracking-widest mb-2">{p.name}</p>
                <p className="font-display text-[26px] lg:text-[32px] font-bold text-clay-ink leading-none mb-1">{p.value}</p>
                <p className="text-xs font-bold text-[#1F6B47]">{p.growth}</p>
              </ClayCard>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {age.length > 0 && (
            <ClayCard bg="var(--color-clay-surface)" className="p-5 lg:p-6">
              <p className="text-[11px] font-extrabold text-clay-ink-soft uppercase tracking-widest mb-4 lg:mb-5">
                {lang === 'vi' ? 'Độ tuổi' : 'Age groups'}
              </p>
              <div className="flex flex-col gap-3">
                {age.map((a) => (
                  <div key={a.range}>
                    <div className="flex justify-between text-sm font-semibold text-clay-ink mb-1">
                      <span>{a.range}</span><span>{a.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-clay-bg-alt overflow-hidden">
                      <div
                        className="h-full rounded-full bg-clay-accent"
                        style={{ width: `${a.pct}%`, transition: 'width 1s ease' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ClayCard>
          )}

          {gender.length > 0 && (
            <ClayCard bg="var(--color-clay-surface)" className="p-5 lg:p-6 flex flex-col">
              <p className="text-[11px] font-extrabold text-clay-ink-soft uppercase tracking-widest mb-4 lg:mb-5">
                {lang === 'vi' ? 'Giới tính' : 'Gender'}
              </p>
              <div className="flex-1 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-28 h-28 lg:w-32 lg:h-32">
                  {(() => {
                    let acc = 0
                    return gender.map((g) => {
                      const frac = g.pct / 100
                      const start = acc * 2 * Math.PI - Math.PI / 2
                      acc += frac
                      const end = acc * 2 * Math.PI - Math.PI / 2
                      const r = 38, cx = 50, cy = 50
                      const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
                      const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end)
                      const large = frac > 0.5 ? 1 : 0
                      return (
                        <path
                          key={g.label.vi}
                          d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
                          fill={g.color}
                          stroke="white" strokeWidth="2"
                        />
                      )
                    })
                  })()}
                </svg>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {gender.map((g) => (
                  <div key={g.label.vi} className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: g.color }} />
                    <span>{g.label[lang]}</span>
                    <span className="ml-auto font-bold">{g.pct}%</span>
                  </div>
                ))}
              </div>
            </ClayCard>
          )}

          {cities.length > 0 && (
            <ClayCard bg="var(--color-clay-surface)" className="p-5 lg:p-6">
              <p className="text-[11px] font-extrabold text-clay-ink-soft uppercase tracking-widest mb-4 lg:mb-5">
                {lang === 'vi' ? 'Thành phố' : 'Cities'}
              </p>
              <div className="flex flex-col gap-3">
                {cities.map((c, i) => {
                  const name = typeof c.name === 'object' ? c.name[lang] : c.name
                  return (
                    <div key={`${name}-${i}`}>
                      <div className="flex justify-between text-sm font-semibold text-clay-ink mb-1">
                        <span>{name}</span><span>{c.pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-clay-bg-alt overflow-hidden">
                        <div
                          className="h-full rounded-full bg-clay-lilac"
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </ClayCard>
          )}
        </div>
      </div>
    </section>
  )
}
