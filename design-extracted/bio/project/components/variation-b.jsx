// Variation B — Clay Pop
// Chunky claymorphism, bold pastel saturation, playful Gen-Z energy.
// 3D clay shadows, rotated stickers, blob backgrounds, sparkle accents.

const ClayCard = ({ t, style = {}, children, bg, rotate = 0, onHover, ...rest }) => (
  <div style={{
    background: bg || t.surface,
    borderRadius: t.radiusLg,
    boxShadow: t.clay,
    transform: `rotate(${rotate}deg)`,
    transition: 'transform 0.3s cubic-bezier(.2,.8,.3,1), box-shadow 0.3s',
    ...style,
  }} {...rest}>{children}</div>
);

const Sparkle = ({ size = 24, color, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L13.5 9.5L23 11L13.5 12.5L12 22L10.5 12.5L1 11L10.5 9.5L12 0Z"/>
  </svg>
);

const Blob = ({ color, size = 400, top, left, right, bottom, delay = 0 }) => (
  <div style={{
    position: 'absolute', top, left, right, bottom,
    width: size, height: size,
    background: color,
    filter: 'blur(60px)',
    opacity: 0.5,
    borderRadius: '42% 58% 53% 47% / 51% 45% 55% 49%',
    animation: `blob-float 20s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: 'none',
  }}/>
);

const VB_Nav = ({ t, lang, onNavigate = () => {} }) => (
  <nav style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 24px', margin: '16px 24px 0',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(16px)',
    borderRadius: 999,
    boxShadow: t.clay,
    position: 'sticky', top: 16, zIndex: 50,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
      <div style={{
        width: 40, height: 40, borderRadius: 14,
        background: `linear-gradient(135deg, ${t.pink}, ${t.butter})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, color: t.accentInk, fontSize: 15,
        boxShadow: t.clay,
      }}>LC</div>
      <span style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>Linh Chi</span>
    </div>
    <div style={{ display: 'flex', gap: 4 }}>
      {[
        { key: 'landing', vi: 'Trang chủ', en: 'Home' },
        { key: 'about', vi: 'Về mình', en: 'About' },
        { key: 'portfolio', vi: 'Portfolio', en: 'Portfolio' },
        { key: 'booking', vi: 'Booking', en: 'Booking' },
        { key: 'contact', vi: 'Liên hệ', en: 'Contact' },
      ].map((l) => {
        const active = l.key === 'landing';
        return (
        <a key={l.key} onClick={() => onNavigate(l.key)} style={{
          padding: '8px 14px', borderRadius: 999, fontSize: 14, fontWeight: active ? 700 : 500,
          color: active ? t.accentInk : t.ink, textDecoration: 'none', cursor: 'pointer',
          background: active ? t.pink : 'transparent',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }} onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = t.bgAlt; }}
           onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>{l[lang]}</a>
        );
      })}
    </div>
    <button onClick={() => onNavigate('booking')} style={{
      padding: '12px 22px', borderRadius: 999,
      background: t.accent, color: '#fff', border: 'none',
      fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
      boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(196,40,98,0.3), 0 3px 0 ${t.accentInk}, 0 8px 20px rgba(255,91,138,0.4)`,
      transform: 'translateY(0)', transition: 'all 0.15s',
    }} onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
       onMouseUp={(e) => e.currentTarget.style.transform = ''}
       onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
      {lang === 'vi' ? '💌 Book ngay' : '💌 Book now'}
    </button>
  </nav>
);

const VB_Hero = ({ t, lang }) => {
  // Parallax: track scroll position of the hero section
  const sectionRef = React.useRef(null);
  const [py, setPy] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      // Find the scroll container — the artboard or window
      const scroller = el.closest('[data-scroll]') || window;
      const top = scroller === window ? window.scrollY : scroller.scrollTop;
      setPy(top);
    };
    const el = sectionRef.current;
    const scroller = el ? (el.closest('[data-scroll]') || window) : window;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '48px 48px 120px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${py * 0.15}px)`, pointerEvents: 'none' }}>
        <Blob color={t.pink} size={500} top={-100} right={-80} delay={0}/>
      </div>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${py * 0.08}px)`, pointerEvents: 'none' }}>
        <Blob color={t.mint} size={420} bottom={-60} left={-60} delay={3}/>
      </div>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${py * 0.25}px)`, pointerEvents: 'none' }}>
        <Blob color={t.butter} size={300} top={200} left={'40%'} delay={6}/>
      </div>

      {/* Floating sparkles moved into right-column portrait wrapper below to avoid
          overlapping bio text. (v3 hotfix — see CHANGELOG.md) */}

      <div className="rg-2/1" style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 999,
            background: t.mint, boxShadow: t.clay,
            marginBottom: 28,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: '#1F8F55', boxShadow: '0 0 10px #1F8F55' }}/>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1F6B47' }}>
              {lang === 'vi' ? 'Online · Nhận booking Q2' : 'Online · Booking Q2 open'}
            </span>
          </div>
          <h1 style={{
            fontFamily: t.fontDisplay, fontSize: 92, lineHeight: 0.95, letterSpacing: -3,
            fontWeight: 500, color: t.ink, margin: '0 0 28px', textWrap: 'balance',
          }}>
            {lang === 'vi' ? (
              <>Hi, mình là<br/>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ position: 'absolute', inset: '-6px -16px', background: t.butter, borderRadius: 20, zIndex: -1, transform: 'rotate(-2deg)' }}/>
                  <em style={{ fontStyle: 'italic', position: 'relative' }}>
                    <Shimmer colors={[t.accent, t.accentInk, t.accent]} duration={5}>Linh Chi</Shimmer>
                  </em>
                </span> ✨
              </>
            ) : (
              <>Hi, I'm<br/>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ position: 'absolute', inset: '-6px -16px', background: t.butter, borderRadius: 20, zIndex: -1, transform: 'rotate(-2deg)' }}/>
                  <em style={{ fontStyle: 'italic', position: 'relative' }}>
                    <Shimmer colors={[t.accent, t.accentInk, t.accent]} duration={5}>Linh Chi</Shimmer>
                  </em>
                </span> ✨
              </>
            )}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, maxWidth: 520, marginBottom: 36 }}>
            {KOC_DATA.tagline[lang]}. {KOC_DATA.bio[lang]}
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '16px 28px', borderRadius: 999,
              background: t.accent, color: '#fff', border: 'none',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 0 ${t.accentInk}, 0 10px 24px rgba(255,91,138,0.4)`,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              {lang === 'vi' ? 'Xem media kit' : 'View media kit'} →
            </button>
            <button style={{
              padding: '16px 28px', borderRadius: 999,
              background: t.surface, color: t.ink, border: 'none',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              boxShadow: t.clay,
            }}>
              {lang === 'vi' ? '📄 Hồ sơ PDF' : '📄 PDF profile'}
            </button>
          </div>

          {/* Social row with clay buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 44, alignItems: 'center' }}>
            {[
              { k: 'tiktok', bg: t.ink, c: '#fff' },
              { k: 'instagram', bg: t.pink, c: t.accentInk },
              { k: 'youtube', bg: t.accent, c: '#fff' },
              { k: 'facebook', bg: t.sky, c: '#1B4B8E' },
            ].map((s) => (
              <a key={s.k} style={{
                width: 44, height: 44, borderRadius: 14,
                background: s.bg, color: s.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: t.clay, cursor: 'pointer',
                transition: 'transform 0.15s',
              }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px) rotate(-6deg)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
                <SocialIcon kind={s.k} size={20}/>
              </a>
            ))}
            <span style={{ marginLeft: 8, fontSize: 14, fontWeight: 600, color: t.inkSoft }}>{KOC_DATA.handle}</span>
          </div>
        </div>

        {/* Right: portrait + 3D stickers */}
        <div style={{ position: 'relative', height: 620 }}>
          {/* Sparkles — scoped to portrait column so they never overlap bio text */}
          <div style={{ position: 'absolute', top: -10, left: -24, transform: `translateY(${py * 0.3}px)`, pointerEvents: 'none', zIndex: 3 }}>
            <Sparkle size={32} color={t.butterDeep} style={{ animation: 'spin 12s linear infinite', display: 'block' }}/>
          </div>
          <div style={{ position: 'absolute', top: 280, right: -28, transform: `translateY(${py * 0.5}px)`, pointerEvents: 'none', zIndex: 3 }}>
            <Sparkle size={20} color={t.pinkDeep} style={{ animation: 'spin 8s linear infinite reverse', display: 'block' }}/>
          </div>
          <div style={{ position: 'absolute', bottom: -16, right: 80, transform: `translateY(${py * -0.2}px)`, pointerEvents: 'none', zIndex: 3 }}>
            <Sparkle size={24} color={t.mintDeep} style={{ animation: 'spin 15s linear infinite', display: 'block' }}/>
          </div>

          {/* Big squircle photo */}
          <Avatar t={t} size={560}/>

          {/* Rating sticker */}
          <ClayCard t={t} bg={t.butter} rotate={-8} style={{
            position: 'absolute', top: 24, left: -40,
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 36 }}>⭐</div>
            <div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 700, color: t.ink, lineHeight: 1 }}>4.9</div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>{lang === 'vi' ? `từ ${STATS[3].value} brand` : `from ${STATS[3].value} brands`}</div>
            </div>
          </ClayCard>

          {/* Views sticker */}
          <ClayCard t={t} bg={t.mint} rotate={5} style={{
            position: 'absolute', top: 200, right: -48,
            padding: '16px 20px', minWidth: 200,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1F6B47', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              {lang === 'vi' ? 'Tháng này' : 'This month'}
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 700, color: t.ink, lineHeight: 1 }}>{STATS[1].value} views</div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 3, height: 28, marginTop: 10 }}>
              {[12, 18, 14, 22, 19, 28, 24].map((h, i) => (
                <div key={i} style={{ width: 8, height: `${h * 3}%`, background: '#1F8F55', borderRadius: 3 }}/>
              ))}
            </div>
          </ClayCard>

          {/* Product sticker */}
          <ClayCard t={t} bg={t.lilac} rotate={8} style={{
            position: 'absolute', bottom: 40, left: -36,
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, minWidth: 220,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: `linear-gradient(135deg, ${t.accent}, ${t.pinkDeep})`,
              boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4)',
            }}/>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 0.5 }}>{lang === 'vi' ? 'Đang review' : 'Reviewing'}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.ink, marginTop: 2, lineHeight: 1.2 }}>Hermosa Velvet 04</div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>💄 Beauty · ⭐ 4.8</div>
            </div>
          </ClayCard>

          {/* Niche bubble badges */}
          <div style={{ position: 'absolute', top: -20, right: 40, display: 'flex', gap: 6 }}>
            {['👗', '💄', '🍜'].map((e, i) => (
              <div key={i} style={{
                width: 48, height: 48, borderRadius: 16,
                background: t.surface, boxShadow: t.clay,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
                transform: `rotate(${(i - 1) * 8}deg)`,
              }}>{e}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const VB_Stats = ({ t, lang }) => (
  <section className="r-pad-48" style={{ padding: '40px 48px 80px', position: 'relative' }}>
    <div className="rg-4/2" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {STATS.map((s, i) => {
        const bgs = [t.pink, t.mint, t.butter, t.lilac];
        const fgs = [t.accentInk, '#1F6B47', '#7A5E00', '#5B3A8C'];
        return (
          <ClayCard key={i} t={t} bg={bgs[i]} rotate={(i % 2 === 0 ? -1 : 1) * 1.5} style={{
            padding: 28, textAlign: 'left',
          }}>
            <Counter value={s.value} style={{
              display: 'block', fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 700,
              color: fgs[i], letterSpacing: -2, lineHeight: 1, marginBottom: 12,
            }}/>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, marginBottom: 4 }}>{s.label[lang]}</div>
            <div style={{ fontSize: 12, color: t.inkSoft }}>{typeof s.sub === 'string' ? s.sub : s.sub[lang]}</div>
          </ClayCard>
        );
      })}
    </div>
  </section>
);

const VB_Niches = ({ t, lang }) => (
  <section style={{ padding: '40px 48px 80px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div className="rg-6-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
        {NICHES.map((n, i) => {
          const palette = [
            { bg: t.pink, ink: t.accentInk },
            { bg: t.mint, ink: '#1F6B47' },
            { bg: t.butter, ink: '#7A5E00' },
            { bg: t.lilac, ink: '#5B3A8C' },
            { bg: t.peach, ink: '#A04526' },
            { bg: t.sky, ink: '#1B4B8E' },
          ];
          const p = palette[i];
          return (
            <div key={n.en} style={{
              padding: '28px 16px',
              background: p.bg,
              borderRadius: t.radiusLg,
              boxShadow: t.clay,
              textAlign: 'center',
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)`,
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0) translateY(-6px) scale(1.04)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)`}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{n.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.ink }}>{n[lang]}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const VB_Products = ({ t, lang }) => {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? FEATURED_PRODUCTS : FEATURED_PRODUCTS.filter(p => p.niche.en === filter);
  const niches = ['all', ...new Set(FEATURED_PRODUCTS.map(p => p.niche.en))];
  return (
    <section style={{ padding: '80px 48px', position: 'relative' }}>
      <Blob color={t.butter} size={400} top={100} right={-100}/>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: 999,
              background: t.pink, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: t.accentInk,
              textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
            }}>{lang === 'vi' ? '🛍 Đang review' : '🛍 Reviewing'}</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.5, color: t.ink, margin: 0, lineHeight: 1 }}>
              {lang === 'vi' ? 'Sản phẩm' : 'Featured'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'đang yêu' : 'products'}</em>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {niches.map((n) => (
              <button key={n} onClick={() => setFilter(n)} style={{
                padding: '10px 18px', borderRadius: 999,
                background: filter === n ? t.ink : t.surface,
                color: filter === n ? '#fff' : t.ink,
                border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: filter === n ? `0 3px 0 rgba(0,0,0,0.15)` : t.clay,
              }}>{n === 'all' ? (lang === 'vi' ? 'Tất cả' : 'All') : n}</button>
            ))}
          </div>
        </div>

        {/* Bento layout: first card spans 2 cols */}
        <div className="rg-3/2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, gridAutoRows: 'min-content' }}>
          {filtered.map((p, i) => {
            const featured = i === 0 && filter === 'all';
            return (
              <div key={p.id} data-tilt style={{
                gridColumn: featured ? 'span 2' : 'span 1',
                gridRow: featured ? 'span 2' : 'span 1',
              }}>
              <ClayCard t={t} style={{
                padding: 0, overflow: 'hidden',
                cursor: 'pointer',
              }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    aspectRatio: featured ? '16/10' : '4/3',
                    background: `linear-gradient(135deg, ${t[p.tone] || t.pink}, ${t.peach})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: featured ? 200 : 120, height: featured ? 200 : 120,
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 30% 30%, ${t.surface}cc, ${t[p.tone]})`,
                      boxShadow: 'inset -8px -8px 20px rgba(46,26,46,0.15), 0 12px 30px rgba(46,26,46,0.2)',
                    }}/>
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      padding: '6px 12px', borderRadius: 999,
                      background: t.ink, color: '#fff',
                      fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                    }}>{p.tag[lang]}</div>
                  </div>
                </div>
                <div style={{ padding: featured ? 28 : 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: t.accentInk, textTransform: 'uppercase' }}>{p.brand}</span>
                    <span style={{ fontSize: 11, color: t.inkMuted, fontWeight: 600 }}>{p.niche[lang]}</span>
                  </div>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: featured ? 28 : 18, fontWeight: 600, color: t.ink, marginBottom: 12, lineHeight: 1.2, letterSpacing: -0.5 }}>{p.name[lang]}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stars value={p.rating} t={t}/>
                    <span style={{ fontSize: featured ? 18 : 14, fontWeight: 800, color: t.ink, fontFamily: t.fontDisplay }}>{p.price}</span>
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
};

const VB_Videos = ({ t, lang }) => (
  <section style={{ padding: '80px 48px', position: 'relative' }}>
    <Blob color={t.mint} size={400} bottom={0} left={-60}/>
    <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block', padding: '6px 14px', borderRadius: 999,
          background: t.mint, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#1F6B47',
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
        }}>{lang === 'vi' ? '🎥 Video hot' : '🎥 Hot videos'}</div>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.5, color: t.ink, margin: 0 }}>
          {lang === 'vi' ? 'Đang viral' : 'Going viral'} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'tuần này' : 'this week'}</em>
        </h2>
      </div>
      <div className="rg-4/2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {VIDEOS.map((v, i) => (
          <div key={v.id} style={{
            transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)`,
            cursor: 'pointer', transition: 'transform 0.25s',
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0) translateY(-8px) scale(1.03)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)`}>
            <div style={{
              aspectRatio: '9/16',
              borderRadius: t.radiusLg,
              background: `linear-gradient(135deg, ${t[v.tone] || t.pink}, ${t.peach})`,
              boxShadow: t.clay,
              position: 'relative', overflow: 'hidden',
              marginBottom: 14,
            }}>
              {/* Play button — clay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 36, background: t.surface,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: t.clay,
                }}>
                  <svg width="22" height="22" viewBox="0 0 16 16" fill={t.ink}><path d="M4 2l10 6-10 6V2z"/></svg>
                </div>
              </div>
              {/* Duration */}
              <div style={{
                position: 'absolute', bottom: 12, right: 12,
                padding: '4px 10px', background: t.ink, color: '#fff',
                borderRadius: 999, fontSize: 11, fontWeight: 700,
              }}>{v.duration}</div>
              {/* Views pill */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                padding: '4px 10px', background: t.surface,
                borderRadius: 999, fontSize: 11, fontWeight: 700, color: t.ink,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}>▶ {v.views}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, marginBottom: 4, lineHeight: 1.35, fontFamily: t.fontDisplay }}>{v.title[lang]}</div>
            <div style={{ fontSize: 12, color: t.inkSoft, fontWeight: 600 }}>♥ {v.likes} likes</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VB_Trending = ({ t, lang }) => (
  <section style={{ padding: '64px 48px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <h2 style={{ fontFamily: t.fontDisplay, fontSize: 44, fontWeight: 600, letterSpacing: -1.2, color: t.ink, marginBottom: 32 }}>
        🔥 {lang === 'vi' ? 'Chủ đề bùng nổ' : 'Hot topics'}
      </h2>
      <div className="rg-3/1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {TRENDING.map((item, i) => {
          const bgs = [t.pink, t.butter, t.mint];
          const inks = [t.accentInk, '#7A5E00', '#1F6B47'];
          return (
            <ClayCard key={item.id} t={t} bg={bgs[i]} rotate={(i - 1) * 1.5} style={{
              padding: 28, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 200,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 700, color: inks[i], lineHeight: 0.9, letterSpacing: -2 }}>0{i + 1}</div>
                <div style={{ padding: '4px 12px', borderRadius: 999, background: t.surface, fontSize: 11, fontWeight: 700, color: t.ink, boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>{item.niche}</div>
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, lineHeight: 1.25, color: t.ink, fontWeight: 600, letterSpacing: -0.4 }}>{item.title[lang]}</div>
              <div style={{ marginTop: 'auto', fontSize: 13, color: t.ink, display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>{lang === 'vi' ? 'Tương tác' : 'Engagement'}</span>
                <span style={{ fontWeight: 800 }}>📈 {item.engagement}</span>
              </div>
            </ClayCard>
          );
        })}
      </div>
    </div>
  </section>
);

const VB_Brands = ({ t, lang }) => (
  <section style={{ padding: '72px 0 56px' }}>
    <div style={{ textAlign: 'center', marginBottom: 36, padding: '0 48px' }}>
      <div style={{
        display: 'inline-block', padding: '6px 14px', borderRadius: 999,
        background: t.sky, boxShadow: t.clay, fontSize: 12, fontWeight: 700, color: '#1B4B8E',
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16,
      }}>{lang === 'vi' ? '🤝 Đối tác' : '🤝 Partners'}</div>
      <h2 style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 600, letterSpacing: -1, color: t.ink, margin: 0 }}>
        {lang === 'vi' ? '120+ thương hiệu đã đồng hành' : '120+ brands collaborated'}
      </h2>
    </div>
    <Marquee speed={35}>
      {BRANDS.map((b, i) => (
        <div key={i} style={{
          padding: '18px 32px',
          background: t.surface,
          borderRadius: t.radius,
          boxShadow: t.clay,
          fontFamily: t.fontDisplay, fontSize: 26,
          color: t.ink, fontWeight: 600, letterSpacing: -0.5, whiteSpace: 'nowrap',
          fontStyle: i % 3 === 0 ? 'italic' : 'normal',
          transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1}deg)`,
        }}>{b}</div>
      ))}
    </Marquee>
  </section>
);

const VB_Booking = ({ t, lang }) => (
  <section style={{ padding: '80px 48px', position: 'relative' }}>
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      background: `linear-gradient(135deg, ${t.pink} 0%, ${t.butter} 50%, ${t.mint} 100%)`,
      borderRadius: 48,
      padding: 56,
      position: 'relative', overflow: 'hidden',
      boxShadow: t.clayLg,
    }}>
      <Sparkle size={28} color="#fff" style={{ position: 'absolute', top: 32, right: 48, opacity: 0.8 }}/>
      <Sparkle size={20} color="#fff" style={{ position: 'absolute', bottom: 48, left: 60, opacity: 0.6 }}/>

      <div className="rg-2/1" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: 56, fontWeight: 600, letterSpacing: -1.8, color: t.ink, margin: '0 0 20px', lineHeight: 1 }}>
            {lang === 'vi' ? 'Kể câu chuyện brand' : "Let's tell your brand"} <em style={{ fontStyle: 'italic', color: t.accentInk }}>{lang === 'vi' ? 'cùng mình ✨' : "story ✨"}</em>
          </h2>
          <p style={{ fontSize: 17, color: t.ink, opacity: 0.8, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 480, fontWeight: 500 }}>
            {lang === 'vi'
              ? 'Từ gifting đến long-term ambassador — 4-6 slots mỗi tháng. Gửi brief để nhận media kit và rate card.'
              : 'From gifting to long-term ambassador — 4–6 slots per month. Send a brief to get the media kit and rate card.'}
          </p>
          <div style={{
            background: t.surface, padding: '16px 22px', borderRadius: t.radius,
            display: 'inline-flex', alignItems: 'center', gap: 20, boxShadow: t.clay,
          }}>
            <div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginBottom: 2, fontWeight: 600 }}>{lang === 'vi' ? 'Phản hồi' : 'Reply'}</div>
              <div style={{ fontSize: 22, fontFamily: t.fontDisplay, fontWeight: 700, color: t.ink }}>⚡ 24h</div>
            </div>
            <div style={{ width: 1, height: 36, background: t.border }}/>
            <div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginBottom: 2, fontWeight: 600 }}>Email</div>
              <div style={{ fontSize: 14, color: t.ink, fontWeight: 700 }}>{KOC_DATA.email}</div>
            </div>
          </div>
        </div>
        <ClayCard t={t} bg={t.surface} style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, marginBottom: 4, fontFamily: t.fontDisplay }}>📅 {lang === 'vi' ? 'Lịch tháng 5' : 'May availability'}</div>
          <div style={{ fontSize: 12, color: t.inkSoft, marginBottom: 16 }}>{lang === 'vi' ? '4 slots — nhanh tay!' : '4 slots — book fast!'}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { d: '06 May', status: 'open', type: lang === 'vi' ? 'Gifting video' : 'Gifting video', bg: t.mint },
              { d: '12 May', status: 'open', type: lang === 'vi' ? 'Livestream' : 'Livestream', bg: t.pink },
              { d: '18 May', status: 'full', type: lang === 'vi' ? 'Event hosting' : 'Event hosting', bg: t.bgAlt },
              { d: '25 May', status: 'open', type: lang === 'vi' ? 'Long-form' : 'Long-form', bg: t.butter },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', borderRadius: 16,
                background: s.bg,
                opacity: s.status === 'full' ? 0.45 : 1,
                boxShadow: s.status === 'full' ? 'none' : 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.04)',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>{s.d}</div>
                  <div style={{ fontSize: 11, color: t.inkSoft, fontWeight: 500 }}>{s.type}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5,
                  padding: '4px 10px', borderRadius: 999,
                  background: s.status === 'full' ? 'transparent' : t.surface,
                  color: s.status === 'full' ? t.inkMuted : t.ink,
                }}>{s.status === 'full' ? (lang === 'vi' ? 'Hết' : 'Full') : (lang === 'vi' ? 'Trống' : 'Open')}</span>
              </div>
            ))}
          </div>
          <button style={{
            width: '100%', marginTop: 18, padding: '14px',
            borderRadius: 999, background: t.accent, color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 8px 16px rgba(255,91,138,0.35)`,
          }}>{lang === 'vi' ? '💌 Gửi brief' : '💌 Submit brief'}</button>
        </ClayCard>
      </div>
    </div>
  </section>
);

const VB_Newsletter = ({ t, lang }) => (
  <section style={{ padding: '64px 48px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <ClayCard t={t} bg={t.ink} style={{
        padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: t.butter, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
            {lang === 'vi' ? '📬 Newsletter hàng tuần' : '📬 Weekly newsletter'}
          </div>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 600, color: '#fff', margin: 0, letterSpacing: -1, lineHeight: 1.1 }}>
            {lang === 'vi' ? 'Review mới, deal hot — mỗi thứ Sáu' : 'New reviews, hot deals — every Friday'}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 10, flex: 1, minWidth: 300 }}>
          <input placeholder="you@email.com" style={{
            flex: 1, padding: '14px 18px', borderRadius: 999,
            border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff',
            fontSize: 14, outline: 'none', fontFamily: 'inherit',
          }}/>
          <button style={{
            padding: '14px 24px', borderRadius: 999, background: t.accent, color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}`,
          }}>{lang === 'vi' ? 'Subscribe' : 'Subscribe'}</button>
        </div>
      </ClayCard>
    </div>
  </section>
);

const VB_Footer = ({ t, lang }) => (
  <footer style={{ padding: '56px 48px 40px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${t.pink}, ${t.butter})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: t.accentInk, fontSize: 15, boxShadow: t.clay }}>LC</div>
        <span style={{ fontFamily: t.fontDisplay, fontSize: 17, fontWeight: 600 }}>Linh Chi · {KOC_DATA.handle}</span>
      </div>
      <div style={{ fontSize: 13, color: t.inkSoft, fontWeight: 500 }}>© 2026 · {lang === 'vi' ? 'Làm với 💖 tại VN' : 'Made with 💖 in VN'}</div>
    </div>
  </footer>
);

const VariationB = ({ lang = 'vi', onNavigate = () => {}, t: tProp }) => {
  const t = tProp || TOKENS_B;
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.font, minHeight: '100%', position: 'relative' }}>
      <CursorGlow color={`${t.pinkDeep}66`} size={500}/>
      <VB_Nav t={t} lang={lang} onNavigate={onNavigate}/>
      <VB_Hero t={t} lang={lang}/>
      <Reveal><VB_Stats t={t} lang={lang}/></Reveal>
      <Reveal><VB_Niches t={t} lang={lang}/></Reveal>
      <Reveal><VB_About t={t} lang={lang}/></Reveal>
      <Reveal><VB_Products t={t} lang={lang}/></Reveal>
      <Reveal><VB_Videos t={t} lang={lang}/></Reveal>
      <Reveal><VB_Trending t={t} lang={lang}/></Reveal>
      <Reveal><VB_Testimonials t={t} lang={lang}/></Reveal>
      <Reveal><VB_MediaKit t={t} lang={lang}/></Reveal>
      <Reveal><VB_Packages t={t} lang={lang}/></Reveal>
      <Reveal><VB_Process t={t} lang={lang}/></Reveal>
      <Reveal><VB_Brands t={t} lang={lang}/></Reveal>
      <Reveal><VB_FAQ t={t} lang={lang}/></Reveal>
      <Reveal><VB_Booking t={t} lang={lang}/></Reveal>
      <Reveal><VB_Newsletter t={t} lang={lang}/></Reveal>
      <VB_Footer t={t} lang={lang}/>
    </div>
  );
};

Object.assign(window, { VariationB });
