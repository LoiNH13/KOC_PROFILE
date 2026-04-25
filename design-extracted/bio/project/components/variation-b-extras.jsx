// Variation B — Extra sections
// About, Services, Testimonials, Process, Media Kit, FAQ
// All use the same clay tokens from TOKENS_B via `t` prop.

// ─────────────────────────────────────────────────────────────
// About / Story — journey timeline
// ─────────────────────────────────────────────────────────────
const VB_About = ({ t, lang }) => (
  <section style={{ padding: '80px 48px', position: 'relative' }}>
    <Blob color={t.lilac} size={400} top={60} left={-80}/>
    <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
      <div className="rg-2/1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56, alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 999,
            background: t.lilac, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#5B3A8C',
            textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20,
          }}>{lang === 'vi' ? '👋 Về mình' : '👋 About me'}</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: '0 0 24px', lineHeight: 1 }}>
            {lang === 'vi' ? 'Hành trình' : 'A journey'}<br/>
            <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'từ 500 → 842K' : 'from 500 to 842K'}</em>
          </h2>
          <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.65, margin: '0 0 28px', maxWidth: 420 }}>
            {lang === 'vi'
              ? 'Từ một người thích thử và chia sẻ, mình xây dựng profile dựa trên nguyên tắc: review thật, không nói quá, chỉ hợp tác với sản phẩm mình thực sự dùng.'
              : 'From someone who loves trying and sharing, I built this profile on one principle: real reviews, no exaggeration, only collaborating with products I truly use.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 400 }}>
            {[
              { n: '4', l: { vi: 'Nền tảng', en: 'Platforms' } },
              { n: '6', l: { vi: 'Ngách', en: 'Niches' } },
              { n: '120+', l: { vi: 'Brand', en: 'Brands' } },
              { n: '4', l: { vi: 'Năm kinh nghiệm', en: 'Years active' } },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: t.radius,
                background: t.surface, boxShadow: t.clay,
              }}>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 700, color: t.accentInk, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4, fontWeight: 600 }}>{s.l[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 3, background: t.pink, borderRadius: 2 }}/>
          {STORY.map((s, i) => {
            const bgs = [t.pink, t.mint, t.butter, t.lilac, t.peach];
            return (
              <div key={i} style={{ position: 'relative', marginBottom: 24 }}>
                <div style={{
                  position: 'absolute', left: -32, top: 8, width: 17, height: 17, borderRadius: 10,
                  background: t.accent, boxShadow: `inset 0 1px 2px rgba(255,255,255,0.4), 0 0 0 4px ${t.bg}, 0 2px 6px rgba(255,91,138,0.4)`,
                }}/>
                <div data-tilt>
                <ClayCard t={t} bg={bgs[i]} style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                    <div style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 700, color: t.accentInk, letterSpacing: -1.5, lineHeight: 1 }}>{typeof s.year === 'object' ? s.year[lang] : s.year}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: t.ink, fontFamily: t.fontDisplay }}>{s.title[lang]}</div>
                  </div>
                  <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{s.desc[lang]}</p>
                </ClayCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Services / Packages
// ─────────────────────────────────────────────────────────────
const VB_Packages = ({ t, lang }) => (
  <section style={{ padding: '80px 48px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block', padding: '6px 14px', borderRadius: 999,
          background: t.peach, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#A04526',
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
        }}>{lang === 'vi' ? '💼 Gói hợp tác' : '💼 Packages'}</div>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: '0 0 12px', lineHeight: 1 }}>
          {lang === 'vi' ? 'Ba gói — một chuẩn' : 'Three packages,'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'chất lượng' : 'one standard'}</em>
        </h2>
        <p style={{ fontSize: 16, color: t.inkSoft, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          {lang === 'vi' ? 'Mọi gói đều bao gồm concept riêng, 2 vòng chỉnh sửa, analytics report. Giá tham khảo — quote riêng theo brief.' : 'All packages include original concept, 2 revision rounds, analytics report. Indicative pricing — final quote per brief.'}
        </p>
      </div>

      <div className="rg-3/1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>
        {PACKAGES.map((p, i) => {
          const bgMap = { mint: t.mint, pink: t.pink, butter: t.butter };
          const inkMap = { mint: '#1F6B47', pink: t.accentInk, butter: '#7A5E00' };
          return (
            <div key={p.id} data-tilt style={{ display: 'flex' }}>
            <div style={{
              padding: 32,
              background: p.featured ? t.ink : bgMap[p.tone],
              borderRadius: t.radiusLg,
              boxShadow: p.featured ? `inset 0 2px 4px rgba(255,255,255,0.1), 0 5px 0 rgba(0,0,0,0.15), 0 18px 36px rgba(46,26,46,0.2)` : t.clay,
              color: p.featured ? '#fff' : t.ink,
              position: 'relative',
              transform: p.featured ? 'translateY(-8px)' : 'none',
              display: 'flex', flexDirection: 'column', width: '100%',
            }}>
              {p.featured && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  padding: '5px 14px', borderRadius: 999, background: t.accent, color: '#fff',
                  fontSize: 11, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
                  boxShadow: `0 3px 0 ${t.accentInk}, 0 8px 16px rgba(255,91,138,0.4)`,
                }}>⭐ {lang === 'vi' ? 'Phổ biến' : 'Most popular'}</div>
              )}
              <div style={{
                display: 'inline-block', alignSelf: 'flex-start',
                padding: '4px 12px', borderRadius: 999,
                background: p.featured ? 'rgba(255,255,255,0.12)' : t.surface,
                color: p.featured ? '#fff' : inkMap[p.tone],
                fontSize: 11, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5,
              }}>{p.tagline[lang]}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 42, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1, marginBottom: 8 }}>{p.name[lang]}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, color: p.featured ? t.butter : inkMap[p.tone], marginBottom: 24 }}>{p.price[lang]}</div>
              <div style={{
                height: 1, background: p.featured ? 'rgba(255,255,255,0.12)' : 'rgba(46,26,46,0.1)', marginBottom: 20,
              }}/>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {p.deliverables[lang].map((d, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, fontSize: 14, fontWeight: 500, lineHeight: 1.45 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 10, flexShrink: 0,
                      background: p.featured ? t.accent : t.surface,
                      color: p.featured ? '#fff' : inkMap[p.tone],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800, marginTop: 1,
                    }}>✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <button style={{
                marginTop: 'auto', padding: '14px 20px', borderRadius: 999,
                background: p.featured ? t.accent : t.ink, color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                boxShadow: `inset 0 2px 4px rgba(255,255,255,0.25), 0 3px 0 ${p.featured ? t.accentInk : 'rgba(0,0,0,0.25)'}`,
              }}>{lang === 'vi' ? 'Chọn gói này' : 'Choose this'}</button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Testimonials from brands
// ─────────────────────────────────────────────────────────────
const VB_Testimonials = ({ t, lang }) => (
  <section style={{ padding: '80px 48px', position: 'relative' }}>
    <Blob color={t.pink} size={400} top={100} right={-60}/>
    <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
      <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 999,
            background: t.butter, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#7A5E00',
            textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
          }}>{lang === 'vi' ? '💬 Brand nói gì' : '💬 Brands say'}</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: 0, lineHeight: 1 }}>
            {lang === 'vi' ? 'Được tin cậy,' : 'Trusted,'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'được giới thiệu' : 'recommended'}</em>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: t.surface, borderRadius: 999, boxShadow: t.clay }}>
          <div style={{ fontSize: 28 }}>⭐</div>
          <div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 700, color: t.ink, lineHeight: 1 }}>4.9/5</div>
            <div style={{ fontSize: 11, color: t.inkSoft, fontWeight: 600 }}>{lang === 'vi' ? '120+ đánh giá' : '120+ reviews'}</div>
          </div>
        </div>
      </div>

      <div className="rg-3/1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {TESTIMONIALS.map((tst, i) => {
          const bgMap = { pink: t.pink, butter: t.butter, mint: t.mint };
          return (
            <div key={i} data-tilt>
            <ClayCard t={t} bg={bgMap[tst.tone]} style={{ padding: 28, display: 'flex', flexDirection: 'column', minHeight: 280 }}>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 72, fontWeight: 700, color: 'rgba(46,26,46,0.15)', lineHeight: 0.8, letterSpacing: -4 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: t.ink, margin: '0 0 24px', fontWeight: 500, flex: 1 }}>
                {tst.quote[lang]}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(46,26,46,0.08)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: t.surface, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.fontDisplay, fontSize: 14, fontWeight: 700, color: t.accentInk,
                }}>{tst.person.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>{tst.person}</div>
                  <div style={{ fontSize: 11, color: t.inkSoft, fontWeight: 500 }}>{tst.role[lang]} · {tst.brand}</div>
                </div>
              </div>
            </ClayCard>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Process timeline
// ─────────────────────────────────────────────────────────────
const VB_Process = ({ t, lang }) => (
  <section style={{ padding: '80px 48px', background: t.bgAlt }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block', padding: '6px 14px', borderRadius: 999,
          background: t.sky, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#1B4B8E',
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
        }}>{lang === 'vi' ? '⚙️ Quy trình' : '⚙️ Process'}</div>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: 0, lineHeight: 1 }}>
          {lang === 'vi' ? 'Từ brief đến' : 'From brief to'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'viral' : 'viral'}</em>
        </h2>
      </div>
      <div className="rg-5-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, position: 'relative' }}>
        {PROCESS.map((p, i) => {
          const bgs = [t.pink, t.butter, t.mint, t.lilac, t.peach];
          return (
            <div key={p.step} style={{ position: 'relative' }}>
              <ClayCard t={t} bg={bgs[i]} rotate={(i % 2 === 0 ? -1 : 1) * 1.2} style={{ padding: 22, height: '100%' }}>
                <div style={{
                  fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 700, color: t.accentInk, letterSpacing: -1.5, lineHeight: 1, marginBottom: 12,
                }}>{p.step}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, marginBottom: 8, fontFamily: t.fontDisplay }}>{p.title[lang]}</div>
                <div style={{ fontSize: 12, color: t.inkSoft, lineHeight: 1.5, marginBottom: 14, fontWeight: 500 }}>{p.desc[lang]}</div>
                <div style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 999,
                  background: t.surface, fontSize: 10, fontWeight: 700, color: t.ink,
                  letterSpacing: 0.3, textTransform: 'uppercase',
                }}>⏱ {p.time}</div>
              </ClayCard>
              {i < PROCESS.length - 1 && (
                <div style={{ position: 'absolute', top: 50, right: -14, zIndex: 2, color: t.accent, fontSize: 20, fontWeight: 700 }}>→</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────
// Media Kit — audience demographics
// ─────────────────────────────────────────────────────────────
const VB_MediaKit = ({ t, lang }) => {
  const pickColor = (key) => ({ pink: t.pinkDeep, sky: '#7EC4FF', butter: t.butterDeep }[key] || t.pink);
  return (
    <section style={{ padding: '80px 48px', position: 'relative' }}>
      <Blob color={t.mint} size={420} bottom={60} right={-80}/>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: 999,
              background: t.mint, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#1F6B47',
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
            }}>{lang === 'vi' ? '📊 Media kit' : '📊 Media kit'}</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: 0, lineHeight: 1 }}>
              {lang === 'vi' ? 'Ai đang' : 'Who is'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'xem nội dung?' : 'watching?'}</em>
            </h2>
          </div>
          <button style={{
            padding: '14px 24px', borderRadius: 999,
            background: t.ink, color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.15), 0 3px 0 rgba(0,0,0,0.25)`,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>📄 {lang === 'vi' ? 'Tải PDF media kit' : 'Download media kit PDF'}</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
          {/* Platforms */}
          <ClayCard t={t} style={{ gridColumn: 'span 12', padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 18 }}>
              {lang === 'vi' ? 'Nền tảng' : 'Platforms'}
            </div>
            <div className="rg-4/2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {AUDIENCE.platforms.map((pl, i) => {
                const bgs = [t.ink, t.pink, t.accent, t.sky];
                const fgs = ['#fff', t.accentInk, '#fff', '#1B4B8E'];
                const icons = ['tiktok', 'instagram', 'youtube', 'facebook'];
                return (
                  <div key={pl.name} style={{
                    padding: 20, borderRadius: t.radius,
                    background: bgs[i], color: fgs[i],
                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15), 0 3px 0 rgba(0,0,0,0.1)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <SocialIcon kind={icons[i]} size={22}/>
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.3 }}>{pl.name}</span>
                    </div>
                    <div style={{ fontFamily: t.fontDisplay, fontSize: 32, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>{pl.value}</div>
                    <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8, fontWeight: 600 }}>📈 {pl.growth} {lang === 'vi' ? 'tháng qua' : 'past month'}</div>
                  </div>
                );
              })}
            </div>
          </ClayCard>

          {/* Age bar chart */}
          <ClayCard t={t} bg={t.pink} style={{ gridColumn: 'span 5', padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
              {lang === 'vi' ? 'Độ tuổi' : 'Age range'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {AUDIENCE.age.map((a) => (
                <div key={a.range}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, fontWeight: 700, color: t.ink }}>
                    <span>{a.range}</span><span>{a.pct}%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(46,26,46,0.08)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${a.pct}%`, height: '100%',
                      background: t.accent,
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                      borderRadius: 5,
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </ClayCard>

          {/* Gender donut */}
          <ClayCard t={t} bg={t.butter} style={{ gridColumn: 'span 3', padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7A5E00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              {lang === 'vi' ? 'Giới tính' : 'Gender'}
            </div>
            <svg viewBox="0 0 42 42" width="140" height="140" style={{ margin: '0 auto 12px', display: 'block' }}>
              {(() => {
                let cum = 0;
                const R = 16, C = 2 * Math.PI * R;
                return AUDIENCE.gender.map((g, i) => {
                  const dash = (g.pct / 100) * C;
                  const gap = C - dash;
                  const offset = -cum / 100 * C + C / 4;
                  cum += g.pct;
                  return (
                    <circle key={i} cx="21" cy="21" r={R} fill="none" stroke={pickColor(g.color)} strokeWidth="8"
                      strokeDasharray={`${dash} ${gap}`} strokeDashoffset={offset} transform="rotate(-90 21 21)"/>
                  );
                });
              })()}
              <circle cx="21" cy="21" r="10" fill={t.surface}/>
              <text x="21" y="23" textAnchor="middle" fontSize="7" fontWeight="700" fill={t.ink} fontFamily="Plus Jakarta Sans">78%</text>
            </svg>
            <div style={{ fontSize: 11, color: t.inkSoft, display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
              {AUDIENCE.gender.map((g) => (
                <div key={g.label.en} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: pickColor(g.color) }}/>
                  <span style={{ fontWeight: 600, color: t.ink }}>{g.label[lang]}</span>
                  <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{g.pct}%</span>
                </div>
              ))}
            </div>
          </ClayCard>

          {/* Cities */}
          <ClayCard t={t} bg={t.mint} style={{ gridColumn: 'span 4', padding: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F6B47', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
              {lang === 'vi' ? 'Top thành phố' : 'Top cities'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {AUDIENCE.cities.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, background: t.surface,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800, color: '#1F6B47',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.05)',
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>{typeof c.name === 'string' ? c.name : c.name[lang]}</div>
                    <div style={{ height: 5, borderRadius: 3, background: 'rgba(46,26,46,0.08)', marginTop: 5 }}>
                      <div style={{ width: `${c.pct * 2.5}%`, height: '100%', background: '#1F8F55', borderRadius: 3 }}/>
                    </div>
                  </div>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 700, color: t.ink }}>{c.pct}%</div>
                </div>
              ))}
            </div>
          </ClayCard>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// FAQ — accordion
// ─────────────────────────────────────────────────────────────
const VB_FAQ = ({ t, lang }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: '80px 48px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 999,
            background: t.pink, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: t.accentInk,
            textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
          }}>{lang === 'vi' ? '❓ FAQ' : '❓ FAQ'}</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: 52, fontWeight: 600, letterSpacing: -1.6, color: t.ink, margin: 0, lineHeight: 1 }}>
            {lang === 'vi' ? 'Câu hỏi' : 'Frequently'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'thường gặp' : 'asked'}</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <ClayCard key={i} t={t} bg={isOpen ? t.butter : t.surface} style={{
                padding: 0, overflow: 'hidden', transform: 'none',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', padding: '20px 24px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  textAlign: 'left', fontFamily: 'inherit',
                }}>
                  <span style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 600, color: t.ink, letterSpacing: -0.3 }}>{f.q[lang]}</span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 16,
                    background: isOpen ? t.ink : t.bg, color: isOpen ? '#fff' : t.ink,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 700, flexShrink: 0,
                    transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 24px', fontSize: 15, color: t.inkSoft, lineHeight: 1.6, fontWeight: 500 }}>
                    {f.a[lang]}
                  </div>
                )}
              </ClayCard>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 15, color: t.inkSoft }}>
          {lang === 'vi' ? 'Còn câu hỏi khác?' : 'More questions?'}
          <a href={`mailto:${KOC_DATA.email}`} style={{ marginLeft: 8, color: t.accentInk, fontWeight: 700, textDecoration: 'underline' }}>{KOC_DATA.email}</a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { VB_About, VB_Packages, VB_Testimonials, VB_Process, VB_MediaKit, VB_FAQ });
