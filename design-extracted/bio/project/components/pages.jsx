// Additional pages for KOC profile
// About, Portfolio, Booking, Contact — all in Clay Pop style
// Reuses ClayCard, Sparkle, Blob from variation-b.jsx

// ─────────────────────────────────────────────────────────────
// Shared nav (replaces VB_Nav inside pages so links route)
// ─────────────────────────────────────────────────────────────
const PageNav = ({ t, lang, page, onNavigate }) => {
  const links = [
    { key: 'landing', vi: 'Trang chủ', en: 'Home' },
    { key: 'about', vi: 'Về mình', en: 'About' },
    { key: 'portfolio', vi: 'Portfolio', en: 'Portfolio' },
    { key: 'booking', vi: 'Booking', en: 'Booking' },
    { key: 'contact', vi: 'Liên hệ', en: 'Contact' },
  ];
  return (
    <nav className="r-nav" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 24px', margin: '16px 24px 0',
      background: 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(16px)',
      borderRadius: 999,
      boxShadow: t.clay,
      position: 'sticky', top: 16, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
           onClick={() => onNavigate('landing')}>
        <div style={{
          width: 40, height: 40, borderRadius: 14,
          background: `linear-gradient(135deg, ${t.pink}, ${t.butter})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, color: t.accentInk, fontSize: 15,
          boxShadow: t.clay,
        }}>LC</div>
        <span style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>Linh Chi</span>
      </div>
      <div className="r-nav-links" style={{ display: 'flex', gap: 4 }}>
        {links.map((l) => {
          const active = page === l.key;
          return (
            <a key={l.key} onClick={() => onNavigate(l.key)} style={{
              padding: '8px 14px', borderRadius: 999, fontSize: 14, fontWeight: active ? 700 : 500,
              color: active ? t.accentInk : t.ink, textDecoration: 'none', cursor: 'pointer',
              background: active ? t.pink : 'transparent',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
            }} onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = t.bgAlt; }}
               onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
              {l[lang]}
            </a>
          );
        })}
      </div>
      <button className="r-nav-cta" onClick={() => onNavigate('booking')} style={{
        padding: '12px 22px', borderRadius: 999,
        background: t.accent, color: '#fff', border: 'none',
        fontSize: 13, fontWeight: 700, cursor: 'pointer',
        boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(196,40,98,0.3), 0 3px 0 ${t.accentInk}, 0 8px 20px rgba(255,91,138,0.4)`,
        fontFamily: 'inherit',
      }}>
        {lang === 'vi' ? '💌 Book ngay' : '💌 Book now'}
      </button>
    </nav>
  );
};

// Shared small page hero (compact)
const PageHero = ({ t, lang, eyebrow, title, sub, tone = 'pink' }) => (
  <section className="r-pad-48" style={{ padding: '48px 48px 32px', position: 'relative' }}>
    <Blob color={t[tone]} size={360} top={-40} left={-80}/>
    <Blob color={t.butter} size={280} top={40} right={-60} delay={4}/>
    <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
        {eyebrow}
      </div>
      <h1 className="r-hero-h1" style={{
        fontFamily: t.fontDisplay, fontSize: 72, fontWeight: 500, letterSpacing: -2.5,
        lineHeight: 1.02, margin: 0, maxWidth: 900, textWrap: 'pretty',
      }}>{title}</h1>
      {sub && (
        <p className="r-sub" style={{ fontSize: 19, color: t.inkSoft, maxWidth: 680, marginTop: 20, lineHeight: 1.55, textWrap: 'pretty' }}>
          {sub}
        </p>
      )}
    </div>
  </section>
);

// Compact footer used on every non-landing page
const PageFooter = ({ t, lang, onNavigate }) => (
  <footer style={{ padding: '56px 48px 48px', marginTop: 40 }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <ClayCard t={t} bg={t.ink} className="r-stack-sm" style={{
        padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 24,
      }}>
        <div>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 500, color: '#fff', letterSpacing: -0.8 }}>
            {lang === 'vi' ? 'Cùng kể một câu chuyện?' : 'Let\u2019s tell a story together?'}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
            {KOC_DATA.email} · {KOC_DATA.phone}
          </div>
        </div>
        <button onClick={() => onNavigate('booking')} style={{
          padding: '16px 28px', borderRadius: 999, background: t.accent, color: '#fff',
          border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 10px 24px rgba(255,91,138,0.4)`,
        }}>{lang === 'vi' ? '💌 Gửi brief' : '💌 Send a brief'}</button>
      </ClayCard>
      <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: t.inkMuted, fontWeight: 500 }}>
        © 2026 · {KOC_DATA.handle} · {lang === 'vi' ? 'Làm với 💖 tại VN' : 'Made with 💖 in VN'}
      </div>
    </div>
  </footer>
);

Object.assign(window, { PageNav, PageHero, PageFooter });
