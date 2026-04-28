import { Avatar } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import { useSheetData } from '@/hooks/useSheetData'
import {
  fetchStats, fetchNiches, fetchAudience, fetchPackages, fetchBrands,
} from '@/lib/sheets'
import {
  STATS as STATS_FALLBACK,
  NICHES as NICHES_FALLBACK,
  AUDIENCE as AUDIENCE_FALLBACK,
  PACKAGES as PACKAGES_FALLBACK,
  BRANDS as BRANDS_FALLBACK,
} from '@/data/koc-data'

const TONE_BG: Record<string, string> = {
  pink:    'var(--color-clay-pink)',
  mint:    'var(--color-clay-mint)',
  butter:  'var(--color-clay-butter)',
  lilac:   'var(--color-clay-lilac)',
  peach:   'var(--color-clay-peach)',
  sky:     'var(--color-clay-sky)',
}

import type { Page } from '@/types'

export function MediaKitPage({ onNavigate }: { onNavigate?: (p: Page) => void }) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const STATS = useSheetData('stats', fetchStats, STATS_FALLBACK)
  const NICHES = useSheetData('niches', fetchNiches, NICHES_FALLBACK)
  const AUDIENCE = useSheetData('audience', fetchAudience, AUDIENCE_FALLBACK)
  const PACKAGES = useSheetData('packages', fetchPackages, PACKAGES_FALLBACK)
  const BRANDS = useSheetData('brands', fetchBrands, BRANDS_FALLBACK)

  const statColors = [
    'var(--color-clay-pink)',
    'var(--color-clay-mint)',
    'var(--color-clay-butter)',
    'var(--color-clay-lilac)',
  ]

  const initials = (KOC_DATA.name || '·')
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(-2)
    .join('')
    .toUpperCase() || '·'

  return (
    <div
      style={{
        background: 'var(--color-clay-bg-alt)',
        minHeight: '100vh',
        padding: '24px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Toolbar */}
      <div
        className="no-print"
        style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, padding: 6, borderRadius: 999,
          background: 'var(--color-clay-surface)',
          boxShadow: 'var(--shadow-clay)',
          maxWidth: '100%',
        }}
      >
        {onNavigate && (
          <button
            onClick={() => onNavigate('landing')}
            style={{
              padding: '10px 18px', borderRadius: 999,
              background: 'var(--color-clay-bg-alt)', color: 'var(--color-clay-ink)', border: 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ← {lang === 'vi' ? 'Quay lại' : 'Back'}
          </button>
        )}
        <button
          onClick={() => window.print()}
          style={{
            padding: '10px 18px', borderRadius: 999,
            background: 'var(--color-clay-accent)', color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 2px 0 var(--color-clay-accent-ink)',
          }}
        >
          🖨️ {lang === 'vi' ? 'In / Lưu PDF' : 'Print / Save PDF'}
        </button>
        <div style={{ fontSize: 12, color: 'var(--color-clay-ink-soft)', alignSelf: 'center', padding: '0 12px' }}>
          A4 · {lang === 'vi' ? '1 trang duy nhất' : 'single page'}
        </div>
      </div>

      {/* Scaling viewport — A4 canvas keeps fixed pixel size for print but
          is scaled down via CSS to fit narrow screens. */}
      <div className="mediakit-viewport">
        <div
          data-mediakit
          style={{
            width: 794, height: 1123,
            background: 'var(--color-clay-bg)',
            color: 'var(--color-clay-ink)',
            fontFamily: 'var(--font-body)',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          <div style={{
            position: 'absolute', top: -80, right: -80, width: 260, height: 260,
            borderRadius: '50%', background: 'var(--color-clay-pink)', filter: 'blur(50px)', opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute', bottom: -60, left: -60, width: 220, height: 220,
            borderRadius: '50%', background: 'var(--color-clay-butter)', filter: 'blur(50px)', opacity: 0.5,
          }} />

          <div style={{
            padding: '28px 36px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', zIndex: 1, gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 16,
                background: 'linear-gradient(135deg, var(--color-clay-pink), var(--color-clay-butter))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: 'var(--color-clay-accent-ink)', fontSize: 18,
                boxShadow: 'var(--shadow-clay)',
              }}>{initials}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1 }}>
                  {KOC_DATA.name || ''}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-clay-ink-soft)', fontWeight: 500 }}>
                  {[KOC_DATA.handle, KOC_DATA.location].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
            <div style={{
              padding: '6px 12px', borderRadius: 999,
              background: 'var(--color-clay-mint)', color: '#1F6B47',
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              Media Kit · {new Date().getFullYear()}
            </div>
          </div>

          {/* Hero row */}
          <div style={{ padding: '0 36px', display: 'grid', gridTemplateColumns: '1fr 180px', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: -1.3,
                lineHeight: 1.05, color: 'var(--color-clay-ink)', marginBottom: 10,
              }}>
                {KOC_DATA.tagline[lang] || (lang === 'vi' ? 'KOC · Giọng thật' : 'KOC · Real voice')}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--color-clay-ink-soft)', margin: 0, maxWidth: 440 }}>
                {KOC_DATA.bio[lang]}
              </p>
            </div>
            <div style={{ width: 160, height: 160, borderRadius: 28, overflow: 'hidden' }}>
              <Avatar size={160} style={{ borderRadius: 28, height: 160 }} />
            </div>
          </div>

          {STATS.length > 0 && (
            <div style={{ padding: '20px 36px 0', display: 'grid', gridTemplateColumns: `repeat(${Math.min(STATS.length, 4)}, 1fr)`, gap: 10 }}>
              {STATS.slice(0, 4).map((s, i) => (
                <div key={`${s.label.en}-${i}`} style={{
                  padding: '14px 12px', borderRadius: 18,
                  background: statColors[i % 4],
                  boxShadow: 'var(--shadow-clay)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: -1, lineHeight: 1, color: 'var(--color-clay-ink)' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-clay-ink-soft)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {s.label[lang]}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--color-clay-ink-muted)', marginTop: 2 }}>
                    {typeof s.sub === 'object' ? s.sub[lang] : s.sub}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(NICHES.length > 0 || AUDIENCE.platforms.length > 0) && (
            <div style={{ padding: '20px 36px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {NICHES.length > 0 ? (
                <div style={{ padding: 16, borderRadius: 18, background: 'var(--color-clay-surface)', boxShadow: 'var(--shadow-clay)' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-clay-ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                    {lang === 'vi' ? 'Ngách nội dung' : 'Niches'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {NICHES.map((n) => (
                      <div key={n.en} style={{
                        padding: '6px 10px', borderRadius: 999,
                        background: 'var(--color-clay-bg-alt)', fontSize: 11, fontWeight: 600, color: 'var(--color-clay-ink)',
                        border: '1px solid var(--color-clay-border)',
                      }}>
                        {n.emoji} {n[lang]}
                      </div>
                    ))}
                  </div>
                </div>
              ) : <div />}
              {AUDIENCE.platforms.length > 0 ? (
                <div style={{ padding: 16, borderRadius: 18, background: 'var(--color-clay-surface)', boxShadow: 'var(--shadow-clay)' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-clay-ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                    {lang === 'vi' ? 'Nền tảng' : 'Platforms'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    {AUDIENCE.platforms.map((p) => (
                      <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 0', borderBottom: '1px solid var(--color-clay-border)' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-clay-ink)' }}>{p.name}</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--color-clay-accent-ink)' }}>{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <div />}
            </div>
          )}

          {(AUDIENCE.age.length > 0 || AUDIENCE.gender.length > 0 || AUDIENCE.cities.length > 0) && (
            <div style={{ padding: '16px 36px 0' }}>
              <div style={{ padding: 16, borderRadius: 18, background: 'var(--color-clay-surface)', boxShadow: 'var(--shadow-clay)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-clay-ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                  {lang === 'vi' ? 'Khán giả' : 'Audience'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--color-clay-ink-muted)', fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Độ tuổi' : 'Age'}</div>
                    {AUDIENCE.age.map((a) => (
                      <div key={a.range} style={{ marginBottom: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
                          <span>{a.range}</span><span style={{ fontWeight: 700 }}>{a.pct}%</span>
                        </div>
                        <div style={{ height: 4, background: 'var(--color-clay-bg-alt)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${a.pct}%`, background: 'var(--color-clay-accent)', borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--color-clay-ink-muted)', fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Giới tính' : 'Gender'}</div>
                    {AUDIENCE.gender.map((g) => (
                      <div key={g.label.vi} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0' }}>
                        <span style={{ color: 'var(--color-clay-ink-soft)' }}>{g.label[lang]}</span>
                        <span style={{ fontWeight: 700 }}>{g.pct}%</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--color-clay-ink-muted)', fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Thành phố' : 'Cities'}</div>
                    {AUDIENCE.cities.map((c, i) => {
                      const name = typeof c.name === 'object' ? c.name[lang] : c.name
                      return (
                        <div key={`${name}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0' }}>
                          <span style={{ color: 'var(--color-clay-ink-soft)' }}>{name}</span>
                          <span style={{ fontWeight: 700 }}>{c.pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {KOC_DATA.packagesVisible && PACKAGES.length > 0 && (
            <div style={{ padding: '16px 36px 0', display: 'grid', gridTemplateColumns: `repeat(${Math.min(PACKAGES.length, 3)}, 1fr)`, gap: 10 }}>
              {PACKAGES.slice(0, 3).map((p, i) => (
                <div key={p.id} style={{
                  padding: 14, borderRadius: 18,
                  background: TONE_BG[p.tone] || statColors[i % 4],
                  boxShadow: 'var(--shadow-clay)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--color-clay-ink)', lineHeight: 1 }}>{p.name[lang]}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, color: 'var(--color-clay-accent-ink)', margin: '4px 0 8px' }}>{p.price[lang]}</div>
                  <div style={{ fontSize: 9.5, color: 'var(--color-clay-ink-soft)', lineHeight: 1.45 }}>
                    {p.deliverables[lang].slice(0, 3).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: '16px 36px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
            {BRANDS.length > 0 ? (
              <div style={{ padding: 14, borderRadius: 18, background: 'var(--color-clay-surface)', boxShadow: 'var(--shadow-clay)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-clay-ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  {lang === 'vi' ? 'Đã hợp tác' : 'Brand partners'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {BRANDS.map((b) => (
                    <div key={b} style={{
                      padding: '6px 12px', borderRadius: 10,
                      background: 'var(--color-clay-bg-alt)', fontSize: 11, fontWeight: 700, color: 'var(--color-clay-ink)',
                      fontFamily: 'var(--font-display)', letterSpacing: -0.2,
                      border: '1px solid var(--color-clay-border)',
                    }}>{b}</div>
                  ))}
                </div>
              </div>
            ) : <div />}
            <div style={{
              padding: 14, borderRadius: 18,
              background: 'var(--color-clay-ink)', color: 'var(--color-clay-surface)',
              boxShadow: 'var(--shadow-clay)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  {lang === 'vi' ? 'Liên hệ hợp tác' : 'Book me'}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                  {KOC_DATA.email && <div>📧 {KOC_DATA.email}</div>}
                  {KOC_DATA.phone && <div>📱 {KOC_DATA.phone}</div>}
                  {KOC_DATA.handle && <div style={{ marginTop: 4, opacity: 0.7 }}>{KOC_DATA.handle}</div>}
                </div>
              </div>
              <div style={{
                marginTop: 8, padding: '8px 12px', borderRadius: 10,
                background: 'var(--color-clay-accent)', color: '#fff',
                fontSize: 10, fontWeight: 700, textAlign: 'center', letterSpacing: 0.5,
              }}>
                {lang === 'vi' ? 'Phản hồi trong 24h' : 'Replies within 24h'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
