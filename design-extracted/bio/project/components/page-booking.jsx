// Booking page — detailed multi-step inquiry form

const BookingForm = ({ t, lang }) => {
  const [form, setForm] = React.useState({
    brand: '', contact: '', email: '', phone: '',
    package: 'campaign', niches: [], budget: '', timeline: '',
    brief: '',
  });
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleNiche = (n) => setForm((f) => ({
    ...f, niches: f.niches.includes(n) ? f.niches.filter((x) => x !== n) : [...f.niches, n],
  }));

  if (submitted) {
    return (
      <ClayCard t={t} bg={t.mint} style={{ padding: 56, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>💌</div>
        <h3 style={{ fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 600, letterSpacing: -1, margin: '0 0 12px' }}>
          {lang === 'vi' ? 'Đã nhận brief!' : 'Brief received!'}
        </h3>
        <p style={{ fontSize: 16, color: t.ink, opacity: 0.8, margin: '0 0 24px', textWrap: 'pretty' }}>
          {lang === 'vi'
            ? 'Mình sẽ phản hồi trong 24h làm việc. Cảm ơn bạn đã tin tưởng 💖'
            : 'I\u2019ll reply within 24 business hours. Thanks for your trust 💖'}
        </p>
        <button onClick={() => { setSubmitted(false); setStep(1); setForm({ brand: '', contact: '', email: '', phone: '', package: 'campaign', niches: [], budget: '', timeline: '', brief: '' }); }} style={{
          padding: '12px 24px', borderRadius: 999, background: t.ink, color: '#fff',
          border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>{lang === 'vi' ? 'Gửi brief khác' : 'Send another brief'}</button>
      </ClayCard>
    );
  }

  const input = {
    padding: '14px 18px', borderRadius: 16,
    border: `1.5px solid ${t.border}`, background: t.surface,
    fontSize: 15, color: t.ink, width: '100%', outline: 'none', fontFamily: 'inherit',
    boxShadow: 'inset 0 2px 4px rgba(46,26,46,0.04)',
  };
  const label = { fontSize: 12, fontWeight: 700, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' };

  return (
    <ClayCard t={t} bg={t.surface} style={{ padding: 40 }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{
            flex: 1, height: 6, borderRadius: 999,
            background: s <= step ? t.accent : t.bgAlt,
            transition: 'background 0.3s',
          }}/>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: -0.8 }}>
            {lang === 'vi' ? '1. Bạn là ai?' : '1. Who are you?'}
          </h3>
          <p style={{ fontSize: 14, color: t.inkSoft, margin: '0 0 28px' }}>
            {lang === 'vi' ? 'Thông tin liên hệ cơ bản' : 'Basic contact info'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={label}>{lang === 'vi' ? 'Tên brand *' : 'Brand name *'}</label>
              <input style={input} value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Hermosa" />
            </div>
            <div>
              <label style={label}>{lang === 'vi' ? 'Người liên hệ *' : 'Contact person *'}</label>
              <input style={input} value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="Mai Anh" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={label}>Email *</label>
              <input style={input} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="hello@brand.com" />
            </div>
            <div>
              <label style={label}>{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
              <input style={input} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+84 94 xxx xxxx" />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: -0.8 }}>
            {lang === 'vi' ? '2. Hình dung hợp tác' : '2. Imagine the collab'}
          </h3>
          <p style={{ fontSize: 14, color: t.inkSoft, margin: '0 0 28px' }}>
            {lang === 'vi' ? 'Chọn gói và ngành hàng' : 'Pick package & niche'}
          </p>
          <label style={label}>{lang === 'vi' ? 'Gói mong muốn' : 'Preferred package'}</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
            {PACKAGES.map((p) => {
              const on = form.package === p.id;
              return (
                <button key={p.id} onClick={() => set('package', p.id)} style={{
                  padding: '14px 12px', borderRadius: 16, border: `2px solid ${on ? t.accent : t.border}`,
                  background: on ? t.pink : t.bgAlt,
                  textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: t.ink }}>{p.name[lang]}</div>
                  <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4 }}>{p.price[lang]}</div>
                </button>
              );
            })}
          </div>

          <label style={label}>{lang === 'vi' ? 'Ngành hàng (có thể chọn nhiều)' : 'Niches (multi-select)'}</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {NICHES.map((n) => {
              const on = form.niches.includes(n.en);
              return (
                <button key={n.en} onClick={() => toggleNiche(n.en)} style={{
                  padding: '10px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: on ? t.accent : t.bgAlt, color: on ? '#fff' : t.ink,
                  fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}>{n.emoji} {n[lang]}</button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={label}>{lang === 'vi' ? 'Budget dự kiến' : 'Budget range'}</label>
              <select style={input} value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                <option value="">{lang === 'vi' ? 'Chọn mức budget' : 'Select range'}</option>
                <option>{lang === 'vi' ? 'Gifting (sản phẩm)' : 'Gifting (product only)'}</option>
                <option>{'<5tr'}</option>
                <option>5-10tr</option>
                <option>10-20tr</option>
                <option>{lang === 'vi' ? 'Thương lượng' : 'Negotiable'}</option>
              </select>
            </div>
            <div>
              <label style={label}>{lang === 'vi' ? 'Timeline' : 'Timeline'}</label>
              <select style={input} value={form.timeline} onChange={(e) => set('timeline', e.target.value)}>
                <option value="">{lang === 'vi' ? 'Chọn timeline' : 'Select timeline'}</option>
                <option>{lang === 'vi' ? 'Gấp (< 2 tuần)' : 'Rush (< 2 weeks)'}</option>
                <option>{lang === 'vi' ? '2-4 tuần' : '2-4 weeks'}</option>
                <option>{lang === 'vi' ? '1-2 tháng' : '1-2 months'}</option>
                <option>{lang === 'vi' ? 'Linh hoạt' : 'Flexible'}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, margin: '0 0 6px', letterSpacing: -0.8 }}>
            {lang === 'vi' ? '3. Kể mình nghe' : '3. Tell me more'}
          </h3>
          <p style={{ fontSize: 14, color: t.inkSoft, margin: '0 0 28px' }}>
            {lang === 'vi' ? 'Càng chi tiết, mình càng phản hồi chính xác' : 'The more detail, the better I can respond'}
          </p>
          <label style={label}>{lang === 'vi' ? 'Brief sơ bộ *' : 'Brief summary *'}</label>
          <textarea style={{ ...input, minHeight: 180, resize: 'vertical', fontFamily: 'inherit' }}
            value={form.brief} onChange={(e) => set('brief', e.target.value)}
            placeholder={lang === 'vi'
              ? 'Sản phẩm muốn giới thiệu, key message, target audience, bất kỳ reference nào bạn có...'
              : 'Product to feature, key message, target audience, any reference you have...'} />
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} style={{
            padding: '14px 24px', borderRadius: 999, background: t.bgAlt, color: t.ink,
            border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>← {lang === 'vi' ? 'Quay lại' : 'Back'}</button>
        ) : <span/>}
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} style={{
            padding: '14px 28px', borderRadius: 999, background: t.accent, color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 8px 20px rgba(255,91,138,0.4)`,
          }}>{lang === 'vi' ? 'Tiếp →' : 'Next →'}</button>
        ) : (
          <button onClick={() => setSubmitted(true)} style={{
            padding: '14px 32px', borderRadius: 999, background: t.accent, color: '#fff',
            border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 8px 20px rgba(255,91,138,0.4)`,
          }}>💌 {lang === 'vi' ? 'Gửi brief' : 'Send brief'}</button>
        )}
      </div>
    </ClayCard>
  );
};

const BookingSidebar = ({ t, lang }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <ClayCard t={t} bg={t.butter} rotate={-1.5} style={{ padding: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
        ⏱ {lang === 'vi' ? 'Cam kết' : 'My promise'}
      </div>
      <h4 style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 600, margin: '0 0 14px', letterSpacing: -0.4 }}>
        {lang === 'vi' ? 'Phản hồi trong 24h' : 'Reply within 24h'}
      </h4>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: t.ink, opacity: 0.85, lineHeight: 1.5 }}>
        <li>✓ {lang === 'vi' ? 'Phản hồi trong 24h làm việc' : 'Reply within 24 business hours'}</li>
        <li>✓ {lang === 'vi' ? 'Call align trong 2-3 ngày' : 'Alignment call within 2-3 days'}</li>
        <li>✓ {lang === 'vi' ? 'Deliverable đúng hẹn' : 'On-time delivery'}</li>
        <li>✓ {lang === 'vi' ? '2 vòng chỉnh sửa miễn phí' : '2 free revision rounds'}</li>
      </ul>
    </ClayCard>

    <ClayCard t={t} bg={t.mint} rotate={1.5} style={{ padding: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#1F6B47', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
        🎯 {lang === 'vi' ? 'Phù hợp với' : 'Best fit for'}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: t.ink, opacity: 0.85, lineHeight: 1.5 }}>
        <li>• {lang === 'vi' ? 'Brand indie, local, bắt đầu' : 'Indie, local, starting brands'}</li>
        <li>• {lang === 'vi' ? 'Sản phẩm < 1 triệu' : 'Products under 1M VND'}</li>
        <li>• {lang === 'vi' ? 'Target Gen-Z, nữ 18-28' : 'Target Gen-Z women 18-28'}</li>
        <li>• {lang === 'vi' ? 'Muốn content có chiều sâu' : 'Want story-driven content'}</li>
      </ul>
    </ClayCard>

    <ClayCard t={t} bg={t.ink} style={{ padding: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: t.butter, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
        📮 {lang === 'vi' ? 'Hoặc liên hệ trực tiếp' : 'Or reach out directly'}
      </div>
      <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.8 }}>
        <div>📧 {KOC_DATA.email}</div>
        <div>📱 {KOC_DATA.phone}</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>📍 {KOC_DATA.location}</div>
      </div>
    </ClayCard>
  </div>
);

const BookingPackageRecap = ({ t, lang }) => (
  <section className="r-pad-48" style={{ padding: '0 48px 60px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h3 className="r-h2" style={{ fontFamily: t.fontDisplay, fontSize: 32, fontWeight: 500, letterSpacing: -1, margin: 0 }}>
          {lang === 'vi' ? 'Xem nhanh 3 gói hợp tác' : '3 packages at a glance'}
        </h3>
      </div>
      <div className="rg-3/1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {PACKAGES.map((p, i) => (
          <ClayCard key={p.id} t={t}
            bg={p.featured ? t.pink : t.surface}
            rotate={i === 0 ? -1 : i === 2 ? 1 : 0}
            style={{ padding: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
              {p.tagline[lang]}
            </div>
            <h4 style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, margin: '0 0 8px', letterSpacing: -0.6 }}>
              {p.name[lang]}
            </h4>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.accentInk, marginBottom: 18 }}>
              {p.price[lang]}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: t.ink, opacity: 0.85 }}>
              {p.deliverables[lang].map((d, j) => (
                <li key={j}>✓ {d}</li>
              ))}
            </ul>
          </ClayCard>
        ))}
      </div>
    </div>
  </section>
);

const BookingPage = ({ t, lang, onNavigate }) => (
  <div style={{ background: t.bg, color: t.ink, fontFamily: t.font, minHeight: '100%', position: 'relative' }}>
    <CursorGlow color={`${t.pinkDeep}66`} size={500}/>
    <PageNav t={t} lang={lang} page="booking" onNavigate={onNavigate}/>
    <PageHero t={t} lang={lang}
      eyebrow={lang === 'vi' ? 'Booking · Gửi brief' : 'Booking · Send brief'}
      title={lang === 'vi' ? 'Cùng kể câu chuyện của brand bạn.' : 'Let\u2019s tell your brand\u2019s story.'}
      sub={lang === 'vi'
        ? 'Điền form 3 bước dưới đây. Mình đọc hết mỗi brief — không có auto-reply.'
        : 'Fill out this 3-step form. I read every brief — no auto-reply.'}
      tone="pink"
    />
    <BookingPackageRecap t={t} lang={lang}/>
    <section className="r-pad-48" style={{ padding: '0 48px 80px' }}>
      <div className="rg-2/1" style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32,
      }}>
        <BookingForm t={t} lang={lang}/>
        <BookingSidebar t={t} lang={lang}/>
      </div>
    </section>
    <PageFooter t={t} lang={lang} onNavigate={onNavigate}/>
  </div>
);

Object.assign(window, { BookingPage });
