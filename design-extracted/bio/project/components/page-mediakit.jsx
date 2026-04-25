// Media Kit — 1-page A4 layout, optimized for print → PDF
// A4 at 96dpi: 794 × 1123 px. We design at 794 × 1123 exactly.
// Use "Print" button to trigger window.print(); CSS @media print styles in
// landing-page.html make only this artboard fill the page.

const MediaKitPage = ({ t: tProp, lang = 'vi' }) => {
  const t = tProp || TOKENS_B;
  const PAGE_W = 794;
  const PAGE_H = 1123;

  return (
    <div data-mediakit style={{
      width: PAGE_W, height: PAGE_H, background: t.bg, color: t.ink,
      fontFamily: t.font, position: 'relative', overflow: 'hidden',
      margin: '0 auto',
    }}>
      {/* Corner blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 260, height: 260,
        borderRadius: '50%', background: t.pink, filter: 'blur(50px)', opacity: 0.5,
      }}/>
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 220, height: 220,
        borderRadius: '50%', background: t.butter, filter: 'blur(50px)', opacity: 0.5,
      }}/>

      {/* Header */}
      <div style={{
        padding: '28px 36px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: `linear-gradient(135deg, ${t.pink}, ${t.butter})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: t.accentInk, fontSize: 18,
            boxShadow: t.clay,
          }}>LC</div>
          <div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1 }}>Linh Chi</div>
            <div style={{ fontSize: 12, color: t.inkSoft, fontWeight: 500 }}>{KOC_DATA.handle} · {KOC_DATA.location}</div>
          </div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 999,
          background: t.mint, color: '#1F6B47',
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>Media Kit · 2026</div>
      </div>

      {/* Hero row */}
      <div style={{ padding: '0 36px', display: 'grid', gridTemplateColumns: '1fr 180px', gap: 20, alignItems: 'center' }}>
        <div>
          <div style={{
            fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 600, letterSpacing: -1.5,
            lineHeight: 1, color: t.ink, marginBottom: 10,
          }}>
            {lang === 'vi' ? (
              <>KOC mới · <em style={{ color: t.accentInk, fontStyle: 'italic' }}>Giọng thật</em></>
            ) : (
              <>Emerging KOC · <em style={{ color: t.accentInk, fontStyle: 'italic' }}>Real voice</em></>
            )}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: t.inkSoft, margin: 0, maxWidth: 440 }}>
            {KOC_DATA.bio[lang]}
          </p>
        </div>
        <div style={{
          width: 160, height: 160, borderRadius: 28,
          background: `linear-gradient(135deg, ${t.pink}, ${t.peach})`,
          boxShadow: t.clay,
          overflow: 'hidden',
        }}>
          <Avatar t={t} size={160} style={{ borderRadius: 28 }}/>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '20px 36px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: '14px 12px', borderRadius: 18,
            background: [t.pink, t.mint, t.butter, t.lilac][i % 4],
            boxShadow: t.clay,
          }}>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 700, letterSpacing: -1, lineHeight: 1, color: t.ink }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.inkSoft, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {s.label[lang]}
            </div>
            <div style={{ fontSize: 10, color: t.inkMuted, marginTop: 2 }}>
              {typeof s.sub === 'object' ? s.sub[lang] : s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Niches + Platforms */}
      <div style={{ padding: '20px 36px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Niches */}
        <div style={{ padding: 16, borderRadius: 18, background: t.surface, boxShadow: t.clay }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            {lang === 'vi' ? 'Ngách nội dung' : 'Niches'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {NICHES.map((n, i) => (
              <div key={i} style={{
                padding: '6px 10px', borderRadius: 999,
                background: t.bgAlt, fontSize: 11, fontWeight: 600, color: t.ink,
                border: `1px solid ${t.border}`,
              }}>{n.emoji} {n[lang]}</div>
            ))}
          </div>
        </div>
        {/* Platforms */}
        <div style={{ padding: 16, borderRadius: 18, background: t.surface, boxShadow: t.clay }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            {lang === 'vi' ? 'Nền tảng' : 'Platforms'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {AUDIENCE.platforms.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 0', borderBottom: `1px solid ${t.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.ink }}>{p.name}</span>
                <span style={{ fontFamily: t.fontDisplay, fontSize: 13, fontWeight: 700, color: t.accentInk }}>{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience demographics */}
      <div style={{ padding: '16px 36px 0' }}>
        <div style={{ padding: 16, borderRadius: 18, background: t.surface, boxShadow: t.clay }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            {lang === 'vi' ? 'Khán giả' : 'Audience'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {/* Age */}
            <div>
              <div style={{ fontSize: 10, color: t.inkMuted, fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Độ tuổi' : 'Age'}</div>
              {AUDIENCE.age.map((a, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
                    <span>{a.range}</span><span style={{ fontWeight: 700 }}>{a.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: t.bgAlt, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${a.pct}%`, background: t.accent, borderRadius: 2 }}/>
                  </div>
                </div>
              ))}
            </div>
            {/* Gender */}
            <div>
              <div style={{ fontSize: 10, color: t.inkMuted, fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Giới tính' : 'Gender'}</div>
              {AUDIENCE.gender.map((g, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0' }}>
                  <span style={{ color: t.inkSoft }}>{g.label[lang]}</span>
                  <span style={{ fontWeight: 700 }}>{g.pct}%</span>
                </div>
              ))}
            </div>
            {/* Cities */}
            <div>
              <div style={{ fontSize: 10, color: t.inkMuted, fontWeight: 600, marginBottom: 6 }}>{lang === 'vi' ? 'Thành phố' : 'Cities'}</div>
              {AUDIENCE.cities.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0' }}>
                  <span style={{ color: t.inkSoft }}>{typeof c.name === 'object' ? c.name[lang] : c.name}</span>
                  <span style={{ fontWeight: 700 }}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Packages strip */}
      <div style={{ padding: '16px 36px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {PACKAGES.map((p, i) => {
          const bg = { mint: t.mint, pink: t.pink, butter: t.butter }[p.tone];
          return (
            <div key={p.id} style={{
              padding: 14, borderRadius: 18, background: bg,
              boxShadow: t.clay, position: 'relative',
            }}>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 700, color: t.ink, lineHeight: 1 }}>{p.name[lang]}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 14, fontWeight: 500, color: t.accentInk, margin: '4px 0 8px' }}>{p.price[lang]}</div>
              <div style={{ fontSize: 9.5, color: t.inkSoft, lineHeight: 1.45 }}>
                {p.deliverables[lang].slice(0, 3).join(' · ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Brands + Contact footer */}
      <div style={{ padding: '16px 36px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, alignItems: 'stretch' }}>
        <div style={{ padding: 14, borderRadius: 18, background: t.surface, boxShadow: t.clay }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {lang === 'vi' ? 'Đã hợp tác' : 'Brand partners'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {BRANDS.map((b) => (
              <div key={b} style={{
                padding: '6px 12px', borderRadius: 10,
                background: t.bgAlt, fontSize: 11, fontWeight: 700, color: t.ink,
                fontFamily: t.fontDisplay, letterSpacing: -0.2,
                border: `1px solid ${t.border}`,
              }}>{b}</div>
            ))}
          </div>
        </div>
        <div style={{
          padding: 14, borderRadius: 18, background: t.ink, color: t.surface,
          boxShadow: t.clay, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {lang === 'vi' ? 'Liên hệ hợp tác' : 'Book me'}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6 }}>
              <div>📧 {KOC_DATA.email}</div>
              <div>📱 {KOC_DATA.phone}</div>
              <div style={{ marginTop: 4, opacity: 0.7 }}>{KOC_DATA.handle}</div>
            </div>
          </div>
          <div style={{
            marginTop: 8,
            padding: '8px 12px', borderRadius: 10,
            background: t.accent, color: '#fff',
            fontSize: 10, fontWeight: 700, textAlign: 'center', letterSpacing: 0.5,
          }}>{lang === 'vi' ? 'Phản hồi trong 24h' : 'Replies within 24h'}</div>
        </div>
      </div>
    </div>
  );
};

const MediaKitPrintPage = ({ t, lang = 'vi' }) => {
  const handlePrint = () => window.print();
  return (
    <div style={{ background: t.bgAlt, minHeight: '100%', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{
        display: 'flex', gap: 8, padding: 6, borderRadius: 999,
        background: t.surface, boxShadow: t.clay, alignSelf: 'center',
      }} className="no-print">
        <button onClick={handlePrint} style={{
          padding: '10px 20px', borderRadius: 999,
          background: t.accent, color: '#fff', border: 'none',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: `0 2px 0 ${t.accentInk}`,
        }}>{lang === 'vi' ? '🖨️ In / Lưu PDF' : '🖨️ Print / Save PDF'}</button>
        <div style={{ fontSize: 12, color: t.inkSoft, alignSelf: 'center', padding: '0 12px' }}>
          A4 · 794 × 1123 px · {lang === 'vi' ? '1 trang duy nhất' : 'single page'}
        </div>
      </div>
      <MediaKitPage t={t} lang={lang}/>
    </div>
  );
};

Object.assign(window, { MediaKitPage, MediaKitPrintPage });
