// Portfolio page — all video work, organized by niche & brand

const PortfolioFilter = ({ t, lang, active, onChange }) => {
  const cats = [
    { key: 'all', vi: 'Tất cả', en: 'All' },
    { key: 'Beauty', vi: 'Mỹ phẩm', en: 'Beauty' },
    { key: 'Fashion', vi: 'Thời trang', en: 'Fashion' },
    { key: 'Food', vi: 'Ẩm thực', en: 'Food' },
    { key: 'Fitness', vi: 'Sức khỏe', en: 'Fitness' },
    { key: 'Lifestyle', vi: 'Lifestyle', en: 'Lifestyle' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
      {cats.map((c) => {
        const on = active === c.key;
        return (
          <button key={c.key} onClick={() => onChange(c.key)} style={{
            padding: '10px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: on ? t.accent : t.surface, color: on ? '#fff' : t.ink,
            fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
            boxShadow: on
              ? `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 6px 16px rgba(255,91,138,0.3)`
              : t.clay,
            transition: 'all 0.2s',
          }}>{c[lang]}</button>
        );
      })}
    </div>
  );
};

// Synthetic portfolio: 12 items spanning niches
const PORTFOLIO_ITEMS = [
  { id: 1, brand: 'Hermosa', niche: 'Beauty', tone: 'pink', duration: '0:55', views: '12.4K', likes: '950',
    title: { vi: 'Unbox son Hermosa Velvet 04', en: 'Hermosa Velvet 04 unbox' },
    platform: 'TikTok', date: '2026-02-14', format: { vi: 'Short video', en: 'Short video' } },
  { id: 2, brand: 'Lumi', niche: 'Beauty', tone: 'peach', duration: '0:47', views: '18.2K', likes: '1.4K',
    title: { vi: '7 ngày dùng serum Lumi', en: '7 days with Lumi serum' },
    platform: 'TikTok', date: '2026-01-28', format: { vi: 'Series 7 ngày', en: '7-day series' } },
  { id: 3, brand: 'Minto', niche: 'Fashion', tone: 'mint', duration: '1:12', views: '9.6K', likes: '820',
    title: { vi: 'OOTD linen mùa thu', en: 'Autumn linen OOTD' },
    platform: 'Reels', date: '2026-02-02', format: { vi: 'OOTD', en: 'OOTD' } },
  { id: 4, brand: 'Bowl & Co.', niche: 'Food', tone: 'butter', duration: '0:38', views: '24.8K', likes: '2.1K',
    title: { vi: 'Sáng 6h — granola bowl', en: '6AM granola bowl' },
    platform: 'TikTok', date: '2025-12-10', format: { vi: 'Recipe', en: 'Recipe' } },
  { id: 5, brand: 'Pilates Home', niche: 'Fitness', tone: 'lilac', duration: '1:30', views: '6.2K', likes: '480',
    title: { vi: 'Buổi Pilates tại nhà', en: 'Pilates at home' },
    platform: 'YouTube', date: '2026-01-18', format: { vi: 'Tutorial', en: 'Tutorial' } },
  { id: 6, brand: 'Baby Moon', niche: 'Mom & Baby', tone: 'pink', duration: '0:42', views: '4.8K', likes: '410',
    title: { vi: 'Khăn sữa organic review', en: 'Organic muslin wrap review' },
    platform: 'TikTok', date: '2026-02-20', format: { vi: 'Review', en: 'Review' } },
  { id: 7, brand: 'Hermosa', niche: 'Beauty', tone: 'pink', duration: '0:35', views: '8.2K', likes: '620',
    title: { vi: 'Makeup đi học 5 phút', en: '5-min school makeup' },
    platform: 'TikTok', date: '2025-11-14', format: { vi: 'GRWM', en: 'GRWM' } },
  { id: 8, brand: 'Minto', niche: 'Fashion', tone: 'mint', duration: '0:58', views: '7.1K', likes: '540',
    title: { vi: 'Mix áo linen 5 cách', en: '5 ways to style linen' },
    platform: 'Reels', date: '2025-12-22', format: { vi: 'Style guide', en: 'Style guide' } },
  { id: 9, brand: 'Bowl & Co.', niche: 'Food', tone: 'butter', duration: '0:50', views: '14.2K', likes: '1.1K',
    title: { vi: 'Bữa sáng 10 phút cho sinh viên', en: '10-min breakfast for students' },
    platform: 'TikTok', date: '2026-01-05', format: { vi: 'Recipe', en: 'Recipe' } },
  { id: 10, brand: 'Lumi', niche: 'Beauty', tone: 'peach', duration: '1:05', views: '11.8K', likes: '920',
    title: { vi: 'Skincare tối 4 bước', en: '4-step PM skincare' },
    platform: 'TikTok', date: '2026-02-08', format: { vi: 'Routine', en: 'Routine' } },
  { id: 11, brand: 'Pilates Home', niche: 'Lifestyle', tone: 'lilac', duration: '0:44', views: '5.4K', likes: '390',
    title: { vi: 'Morning routine của sinh viên', en: 'Student morning routine' },
    platform: 'Reels', date: '2025-12-05', format: { vi: 'Vlog', en: 'Vlog' } },
  { id: 12, brand: 'Hermosa', niche: 'Lifestyle', tone: 'pink', duration: '0:28', views: '3.2K', likes: '220',
    title: { vi: 'Desk tour tiny studio', en: 'Tiny studio desk tour' },
    platform: 'TikTok', date: '2025-11-02', format: { vi: 'Tour', en: 'Tour' } },
];

const PortfolioCard = ({ t, lang, item }) => (
  <div data-tilt>
  <ClayCard t={t} bg={t.surface} style={{
    padding: 16, cursor: 'pointer',
  }}>
    <div style={{ position: 'relative', borderRadius: t.radius, overflow: 'hidden', marginBottom: 14 }}>
      <PhotoPlaceholder tone={item.tone} t={t} aspect="9/11" label={`${item.brand} · ${item.format[lang]}`}/>
      {/* Play icon */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 4v16l14-8z" fill={t.accent}/></svg>
        </div>
      </div>
      {/* Platform chip */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.9)',
        fontSize: 10, fontWeight: 800, color: t.ink, textTransform: 'uppercase', letterSpacing: 0.8,
      }}>{item.platform}</div>
      {/* Duration chip */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10,
        padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.7)',
        fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'ui-monospace, Menlo, monospace',
      }}>{item.duration}</div>
    </div>
    <div style={{ fontSize: 11, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
      {item.brand} · {item.niche}
    </div>
    <h3 style={{ fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 600, lineHeight: 1.25, margin: '0 0 12px', letterSpacing: -0.3, textWrap: 'pretty' }}>
      {item.title[lang]}
    </h3>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft, fontWeight: 600 }}>
      <span>▶ {item.views} · ♥ {item.likes}</span>
      <span>{item.date}</span>
    </div>
  </ClayCard>
  </div>
);

const PortfolioGrid = ({ t, lang }) => {
  const [cat, setCat] = React.useState('all');
  const filtered = cat === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((x) => x.niche === cat);
  return (
    <section className="r-pad-48" style={{ padding: '32px 48px 80px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <PortfolioFilter t={t} lang={lang} active={cat} onChange={setCat}/>
        <div className="rg-3/2" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
        }}>
          {filtered.map((item) => (
            <PortfolioCard key={item.id} t={t} lang={lang} item={item}/>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80, color: t.inkSoft, fontSize: 16 }}>
            {lang === 'vi' ? 'Chưa có nội dung thuộc ngách này.' : 'No content in this niche yet.'}
          </div>
        )}
      </div>
    </section>
  );
};

const PortfolioStats = ({ t, lang }) => {
  const total = PORTFOLIO_ITEMS.length;
  const totalViews = PORTFOLIO_ITEMS.reduce((s, x) => {
    const n = parseFloat(x.views);
    return s + (x.views.includes('K') ? n * 1000 : n);
  }, 0);
  const stats = [
    { label: { vi: 'Tổng video', en: 'Total videos' }, value: `${total}`, tone: 'pink' },
    { label: { vi: 'Tổng views', en: 'Total views' }, value: `${(totalViews/1000).toFixed(0)}K`, tone: 'mint' },
    { label: { vi: 'Brand đã hợp tác', en: 'Brand partners' }, value: '6', tone: 'butter' },
    { label: { vi: 'Ngách hoạt động', en: 'Active niches' }, value: '5', tone: 'lilac' },
  ];
  return (
    <section className="r-pad-48" style={{ padding: '24px 48px 0' }}>
      <div className="rg-4/2-sm" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid',
                     gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {stats.map((s, i) => (
          <div key={i} data-tilt>
          <ClayCard t={t} bg={t[s.tone]} style={{ padding: 24 }}>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, opacity: 0.75, marginTop: 8 }}>
              {s.label[lang]}
            </div>
          </ClayCard>
          </div>
        ))}
      </div>
    </section>
  );
};

const PortfolioPage = ({ t, lang, onNavigate }) => (
  <div style={{ background: t.bg, color: t.ink, fontFamily: t.font, minHeight: '100%', position: 'relative' }}>
    <CursorGlow color={`${t.pinkDeep}66`} size={500}/>
    <PageNav t={t} lang={lang} page="portfolio" onNavigate={onNavigate}/>
    <PageHero t={t} lang={lang}
      eyebrow={lang === 'vi' ? 'Portfolio · 2025-2026' : 'Portfolio · 2025-2026'}
      title={lang === 'vi' ? '12 video, 5 ngách, 1 năm.' : '12 videos, 5 niches, 1 year.'}
      sub={lang === 'vi'
        ? 'Mỗi video là một brief được đọc kỹ, một ý tưởng được thử, một câu chuyện nhỏ.'
        : 'Each video is a brief read carefully, an idea tried, a small story told.'}
      tone="mint"
    />
    <PortfolioStats t={t} lang={lang}/>
    <PortfolioGrid t={t} lang={lang}/>
    <PageFooter t={t} lang={lang} onNavigate={onNavigate}/>
  </div>
);

Object.assign(window, { PortfolioPage });
