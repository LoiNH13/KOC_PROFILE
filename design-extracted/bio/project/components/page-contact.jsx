// Contact page — direct channels, FAQ quick-reference, working hours

const ContactChannels = ({ t, lang }) => {
  const channels = [
    { icon: '📧', label: { vi: 'Email (ưu tiên)', en: 'Email (preferred)' }, value: KOC_DATA.email,
      note: { vi: 'Phản hồi trong 24h', en: 'Reply within 24h' }, tone: 'pink' },
    { icon: '📱', label: { vi: 'Điện thoại / Zalo', en: 'Phone / Zalo' }, value: KOC_DATA.phone,
      note: { vi: '9h-18h T2-T6', en: '9am-6pm Mon-Fri' }, tone: 'butter' },
    { icon: '🎵', label: 'TikTok DM', value: KOC_DATA.handle,
      note: { vi: 'Reply vài lần/tuần', en: 'Reply few times/week' }, tone: 'mint' },
    { icon: '📸', label: 'Instagram DM', value: KOC_DATA.handle,
      note: { vi: 'Reply vài lần/tuần', en: 'Reply few times/week' }, tone: 'lilac' },
  ];
  return (
    <section className="r-pad-48" style={{ padding: '24px 48px 60px' }}>
      <div className="rg-2/1-sm" style={{ maxWidth: 1240, margin: '0 auto',
                     display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {channels.map((c, i) => (
          <ClayCard key={i} t={t}
            bg={t[c.tone]}
            rotate={i % 2 === 0 ? -1 : 1}
            style={{ padding: 32, cursor: 'pointer', transition: 'transform 0.25s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1 : 1}deg) translateY(-4px)`}
            onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1 : 1}deg)`}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>{c.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>
              {typeof c.label === 'object' ? c.label[lang] : c.label}
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 600, letterSpacing: -0.5, marginBottom: 10, wordBreak: 'break-all' }}>
              {c.value}
            </div>
            <div style={{ fontSize: 13, color: t.ink, opacity: 0.7, fontWeight: 600 }}>
              {typeof c.note === 'object' ? c.note[lang] : c.note}
            </div>
          </ClayCard>
        ))}
      </div>
    </section>
  );
};

const ContactHours = ({ t, lang }) => {
  const schedule = [
    { day: { vi: 'Thứ 2 - Thứ 6', en: 'Mon - Fri' }, hours: '9:00 - 18:00', badge: { vi: 'Working', en: 'Working' }, tone: 'mint' },
    { day: { vi: 'Thứ 7', en: 'Saturday' }, hours: { vi: 'Quay video', en: 'Video day' }, badge: { vi: 'Studio', en: 'Studio' }, tone: 'butter' },
    { day: { vi: 'Chủ nhật', en: 'Sunday' }, hours: { vi: 'Nghỉ', en: 'Off' }, badge: 'OFF', tone: 'lilac' },
  ];
  return (
    <section className="r-pad-48" style={{ padding: '40px 48px', background: t.bgAlt }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="rg-2/1" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Pill t={t} tone="mint">🕐 {lang === 'vi' ? 'Lịch làm việc' : 'Working hours'}</Pill>
            <h3 style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 500, letterSpacing: -1.4, lineHeight: 1.1, margin: '16px 0 12px', textWrap: 'pretty' }}>
              {lang === 'vi' ? 'Khi nào mình online' : 'When I\u2019m online'}
            </h3>
            <p style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
              {lang === 'vi'
                ? 'Giờ Việt Nam (GMT+7). Ngoài giờ mình vẫn đọc email nhưng sẽ reply vào sáng hôm sau.'
                : 'Vietnam time (GMT+7). I still read emails after hours but reply the next morning.'}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {schedule.map((s, i) => (
              <ClayCard key={i} t={t} bg={t[s.tone]} rotate={i === 1 ? 0 : (i === 0 ? -1 : 1)} style={{ padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: t.accentInk, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>
                  {typeof s.badge === 'object' ? s.badge[lang] : s.badge}
                </div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 600, letterSpacing: -0.4, marginBottom: 4 }}>
                  {s.day[lang]}
                </div>
                <div style={{ fontSize: 13, color: t.ink, opacity: 0.75, fontWeight: 600 }}>
                  {typeof s.hours === 'object' ? s.hours[lang] : s.hours}
                </div>
              </ClayCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactQuickForm = ({ t, lang, onNavigate }) => {
  const [msg, setMsg] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const input = {
    padding: '14px 18px', borderRadius: 16,
    border: `1.5px solid ${t.border}`, background: t.surface,
    fontSize: 15, color: t.ink, width: '100%', outline: 'none', fontFamily: 'inherit',
  };
  const label = { fontSize: 12, fontWeight: 700, color: t.inkSoft, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' };

  return (
    <section className="r-pad-48" style={{ padding: '60px 48px' }}>
      <div className="rg-2/1" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
        <div>
          <Pill t={t} tone="pink">💬 {lang === 'vi' ? 'Tin nhắn nhanh' : 'Quick message'}</Pill>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 44, fontWeight: 500, letterSpacing: -1.6, lineHeight: 1.08, margin: '20px 0 16px', textWrap: 'pretty' }}>
            {lang === 'vi' ? 'Chỉ muốn hỏi một câu?' : 'Just a quick question?'}
          </h3>
          <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.6, margin: '0 0 20px', textWrap: 'pretty' }}>
            {lang === 'vi'
              ? 'Nếu chưa cần gửi brief đầy đủ, bạn có thể nhắn vài dòng tại đây. Mình sẽ reply trong 24h.'
              : 'If you don\u2019t need a full brief yet, just drop a few lines. I\u2019ll reply within 24h.'}
          </p>
          <button onClick={() => onNavigate('booking')} style={{
            padding: '12px 22px', borderRadius: 999, background: t.ink, color: '#fff',
            border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {lang === 'vi' ? 'Hoặc gửi brief chi tiết →' : 'Or send detailed brief →'}
          </button>
        </div>

        <ClayCard t={t} bg={t.surface} style={{ padding: 32 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✨</div>
              <h4 style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, margin: '0 0 10px', letterSpacing: -0.6 }}>
                {lang === 'vi' ? 'Nhận được rồi!' : 'Got it!'}
              </h4>
              <p style={{ fontSize: 14, color: t.inkSoft, margin: 0 }}>
                {lang === 'vi' ? 'Mình sẽ reply sớm 💖' : 'I\u2019ll reply soon 💖'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={label}>{lang === 'vi' ? 'Tên bạn' : 'Your name'}</label>
                <input style={input} value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })}/>
              </div>
              <div>
                <label style={label}>Email</label>
                <input style={input} type="email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })}/>
              </div>
              <div>
                <label style={label}>{lang === 'vi' ? 'Nội dung' : 'Message'}</label>
                <textarea style={{ ...input, minHeight: 120, resize: 'vertical' }}
                  value={msg.message} onChange={(e) => setMsg({ ...msg, message: e.target.value })}
                  placeholder={lang === 'vi' ? 'Viết vài dòng...' : 'A few lines...'}/>
              </div>
              <button onClick={() => setSent(true)} style={{
                padding: '14px 24px', borderRadius: 999, background: t.accent, color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 3px 0 ${t.accentInk}, 0 8px 20px rgba(255,91,138,0.4)`,
              }}>💌 {lang === 'vi' ? 'Gửi tin nhắn' : 'Send message'}</button>
            </div>
          )}
        </ClayCard>
      </div>
    </section>
  );
};

const ContactQuickFAQ = ({ t, lang }) => {
  const [open, setOpen] = React.useState(0);
  const short = FAQS.slice(0, 4);
  return (
    <section style={{ padding: '60px 48px', background: t.bgAlt }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Pill t={t} tone="butter">{lang === 'vi' ? 'Hỏi nhanh' : 'Quick FAQ'}</Pill>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 500, letterSpacing: -1.4, lineHeight: 1.1, margin: '16px 0 0' }}>
            {lang === 'vi' ? 'Có thể bạn đang thắc mắc' : 'You might be wondering'}
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {short.map((f, i) => {
            const isOpen = open === i;
            return (
              <ClayCard key={i} t={t} bg={t.surface} style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', padding: '18px 24px', textAlign: 'left', background: 'transparent',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center', gap: 16,
                }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: t.ink }}>{f.q[lang]}</span>
                  <span style={{ fontSize: 20, color: t.accent, transform: isOpen ? 'rotate(45deg)' : '', transition: 'transform 0.2s' }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: t.inkSoft, lineHeight: 1.6, textWrap: 'pretty' }}>
                    {f.a[lang]}
                  </div>
                )}
              </ClayCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactPage = ({ t, lang, onNavigate }) => (
  <div style={{ background: t.bg, color: t.ink, fontFamily: t.font, minHeight: '100%', position: 'relative' }}>
    <CursorGlow color={`${t.pinkDeep}66`} size={500}/>
    <PageNav t={t} lang={lang} page="contact" onNavigate={onNavigate}/>
    <PageHero t={t} lang={lang}
      eyebrow={lang === 'vi' ? 'Liên hệ' : 'Get in touch'}
      title={lang === 'vi' ? 'Nói chuyện thôi.' : 'Let\u2019s talk.'}
      sub={lang === 'vi'
        ? 'Brand, fan, hay chỉ muốn hỏi về setup quay — mình đều sẵn sàng nghe.'
        : 'Brands, fans, or just curious about my setup — I\u2019m all ears.'}
      tone="butter"
    />
    <ContactChannels t={t} lang={lang}/>
    <ContactHours t={t} lang={lang}/>
    <ContactQuickForm t={t} lang={lang} onNavigate={onNavigate}/>
    <ContactQuickFAQ t={t} lang={lang}/>
    <PageFooter t={t} lang={lang} onNavigate={onNavigate}/>
  </div>
);

Object.assign(window, { ContactPage });
