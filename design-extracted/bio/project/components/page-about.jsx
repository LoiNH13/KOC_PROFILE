// About page — a more personal, story-first page
// Uses: ClayCard, Blob, Sparkle, Stars (from variation-b/primitives)

const AboutIntro = ({ t, lang }) => (
  <section className="r-pad-48" style={{ padding: '24px 48px 80px', position: 'relative' }}>
    <div className="rg-2/1" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid',
                   gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
      {/* Left: portrait stack */}
      <div className="r-portrait-stack" style={{ position: 'relative', height: 560 }}>
        <ClayCard t={t} bg={t.pink} rotate={-4} style={{
          position: 'absolute', top: 0, left: 40, width: 300, height: 380, padding: 16,
        }}>
          <PhotoPlaceholder tone="pink" t={t} aspect="3/4" label="Portrait · 2025" style={{ height: '100%' }}/>
        </ClayCard>
        <ClayCard t={t} bg={t.butter} rotate={5} style={{
          position: 'absolute', top: 120, right: 20, width: 260, height: 320, padding: 14,
        }}>
          <PhotoPlaceholder tone="butter" t={t} aspect="1/1" label="Studio @ home" style={{ height: '100%' }}/>
        </ClayCard>
        <ClayCard t={t} bg={t.mint} rotate={-2} style={{
          position: 'absolute', bottom: 0, left: 0, width: 240, height: 240, padding: 14,
        }}>
          <PhotoPlaceholder tone="mint" t={t} aspect="1/1" label="On set" style={{ height: '100%' }}/>
        </ClayCard>
        <Sparkle size={32} color={t.accent} style={{ position: 'absolute', top: 60, right: 80, transform: 'rotate(15deg)' }}/>
        <Sparkle size={22} color={t.butterDeep} style={{ position: 'absolute', bottom: 120, right: 140, transform: 'rotate(-20deg)' }}/>
      </div>

      {/* Right: story text */}
      <div>
        <Pill t={t} tone="pink">{lang === 'vi' ? '✨ Hi, mình là Chi' : '✨ Hi, I\u2019m Chi'}</Pill>
        <h2 className="r-h1" style={{
          fontFamily: t.fontDisplay, fontSize: 44, fontWeight: 500, letterSpacing: -1.5,
          lineHeight: 1.1, margin: '20px 0 24px', textWrap: 'pretty',
        }}>
          {lang === 'vi'
            ? 'Mình tin rằng review tốt nhất đến từ trải nghiệm thật — dù là một cây son hay một chiếc áo linen.'
            : 'I believe the best reviews come from real experiences — whether it\u2019s one lipstick or one linen shirt.'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 16, lineHeight: 1.65, color: t.inkSoft, textWrap: 'pretty' }}>
          <p style={{ margin: 0 }}>
            {lang === 'vi'
              ? 'Mình bắt đầu quay video đầu năm 2025 khi đang là sinh viên năm cuối. Không có ê-kip, không có studio — chỉ có điện thoại và một chiếc đèn ring.'
              : 'I started filming in early 2025 as a final-year student. No crew, no studio — just a phone and a ring light.'}
          </p>
          <p style={{ margin: 0 }}>
            {lang === 'vi'
              ? 'Một năm sau, mình có 3.8K người đồng hành, 6 brand đã tin tưởng, và một nguyên tắc đơn giản: không review thứ mình không thực sự thích.'
              : 'A year later, I have 3.8K people who follow along, 6 brands who trust me, and a simple rule: never review something I don\u2019t truly like.'}
          </p>
          <p style={{ margin: 0 }}>
            {lang === 'vi'
              ? 'Ngách của mình là những sản phẩm hằng ngày — đủ rẻ để ai cũng thử, đủ thật để nói được điều gì đó.'
              : 'My niche is everyday products — cheap enough for anyone to try, real enough to have something to say.'}
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AboutValues = ({ t, lang }) => {
  const values = [
    { emoji: '🤝', title: { vi: 'Chân thật trước', en: 'Honesty first' },
      desc: { vi: 'Nếu không dùng thật, mình sẽ không review. Đơn giản vậy thôi.', en: 'If I don\u2019t really use it, I don\u2019t review it. That simple.' },
      tone: 'pink' },
    { emoji: '🐌', title: { vi: 'Chậm mà chắc', en: 'Slow & steady' },
      desc: { vi: '2-3 project/tháng là đủ. Chất lượng hơn số lượng.', en: '2-3 projects/month is enough. Quality over volume.' },
      tone: 'mint' },
    { emoji: '🎙️', title: { vi: 'Giọng riêng', en: 'My own voice' },
      desc: { vi: 'Không rập khuôn KOC sale — mỗi video là một câu chuyện.', en: 'Not a cookie-cutter sales voice — every video is a story.' },
      tone: 'butter' },
    { emoji: '📊', title: { vi: 'Dữ liệu thật', en: 'Real data' },
      desc: { vi: 'Mọi con số mình chia sẻ đều có screenshot. Không inflate.', en: 'Every number I share is screenshot-backed. No inflation.' },
      tone: 'lilac' },
  ];
  return (
    <section className="r-pad-48 r-pad-v-80" style={{ padding: '80px 48px', background: t.bgAlt, position: 'relative' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Pill t={t} tone="butter">{lang === 'vi' ? 'Nguyên tắc làm việc' : 'How I work'}</Pill>
          <h2 className="r-h2" style={{
            fontFamily: t.fontDisplay, fontSize: 52, fontWeight: 500, letterSpacing: -1.8,
            lineHeight: 1.05, margin: '20px 0 0', textWrap: 'pretty',
          }}>
            {lang === 'vi' ? '4 điều mình luôn giữ' : '4 things I always keep'}
          </h2>
        </div>
        <div className="rg-4/2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {values.map((v, i) => (
            <ClayCard key={i} t={t} bg={t[v.tone]} rotate={i % 2 === 0 ? -1 : 1} style={{ padding: 28 }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{v.emoji}</div>
              <h3 style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 600, margin: '0 0 10px', letterSpacing: -0.4 }}>
                {v.title[lang]}
              </h3>
              <p style={{ fontSize: 14, color: t.ink, opacity: 0.8, lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
                {v.desc[lang]}
              </p>
            </ClayCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutBehindTheScenes = ({ t, lang }) => {
  const items = [
    { label: { vi: 'Điện thoại', en: 'Phone' }, value: 'iPhone 14' },
    { label: { vi: 'Đèn', en: 'Light' }, value: { vi: 'Ring 18" + softbox', en: 'Ring 18" + softbox' } },
    { label: { vi: 'Mic', en: 'Mic' }, value: 'Rode Wireless Go' },
    { label: { vi: 'Edit', en: 'Edit' }, value: 'CapCut · Lightroom' },
    { label: { vi: 'Studio', en: 'Studio' }, value: { vi: 'Phòng 8m² tại nhà', en: '8m² home room' } },
    { label: { vi: 'Lịch quay', en: 'Shoot schedule' }, value: { vi: 'Thứ 3, Thứ 6', en: 'Tue, Fri' } },
  ];
  return (
    <section className="r-pad-48 r-pad-v-80" style={{ padding: '80px 48px' }}>
      <div className="rg-2/1" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <Pill t={t} tone="mint">{lang === 'vi' ? 'Sau hậu trường' : 'Behind the scenes'}</Pill>
          <h2 style={{
            fontFamily: t.fontDisplay, fontSize: 44, fontWeight: 500, letterSpacing: -1.5,
            lineHeight: 1.1, margin: '20px 0 16px', textWrap: 'pretty',
          }}>
            {lang === 'vi' ? 'Setup nhỏ, làm với những gì có' : 'Small setup, making it work'}
          </h2>
          <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: '0 0 32px', textWrap: 'pretty' }}>
            {lang === 'vi'
              ? 'Mình không cần thiết bị xịn để kể chuyện hay. Đây là tất cả những gì mình đang dùng — và mình tin ý tưởng quan trọng hơn máy móc.'
              : 'I don\u2019t need fancy gear to tell a good story. Here\u2019s everything I use — and I believe ideas matter more than equipment.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                padding: '14px 18px', borderRadius: 16, background: t.bgAlt,
                border: `1px solid ${t.border}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                  {it.label[lang] || it.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.ink }}>
                  {typeof it.value === 'object' ? it.value[lang] : it.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chunky phone mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Blob color={t.lilac} size={320} top={40} right={40} delay={2}/>
          <ClayCard t={t} bg={t.ink} style={{
            width: 280, height: 560, padding: 14, borderRadius: 48, position: 'relative', zIndex: 1,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
              background: `linear-gradient(180deg, ${t.peach}, ${t.pink})`,
              display: 'flex', flexDirection: 'column', padding: 16, gap: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#fff' }}>
                <span>9:41</span>
                <span>●●●</span>
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 600, color: '#fff', letterSpacing: -0.5, marginTop: 12 }}>
                {lang === 'vi' ? 'Hôm nay quay gì?' : 'Shoot today?'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                {lang === 'vi' ? '2 lipstick · granola bowl · OOTD linen' : '2 lipsticks · granola bowl · linen OOTD'}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
                {['15:00 Studio', '16:30 Edit', '20:00 Post'].map((s) => (
                  <span key={s} style={{
                    padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.25)',
                    fontSize: 11, color: '#fff', fontWeight: 600,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </ClayCard>
          <Sparkle size={28} color={t.butterDeep} style={{ position: 'absolute', top: 20, left: 60, transform: 'rotate(25deg)' }}/>
        </div>
      </div>
    </section>
  );
};

const AboutPage = ({ t, lang, onNavigate }) => (
  <div style={{ background: t.bg, color: t.ink, fontFamily: t.font, minHeight: '100%', position: 'relative' }}>
    <CursorGlow color={`${t.pinkDeep}66`} size={500}/>
    <PageNav t={t} lang={lang} page="about" onNavigate={onNavigate}/>
    <PageHero t={t} lang={lang}
      eyebrow={lang === 'vi' ? 'Về Linh Chi' : 'About Linh Chi'}
      title={lang === 'vi' ? 'Một KOC mới, đang học mỗi ngày.' : 'A new KOC, learning every day.'}
      sub={lang === 'vi'
        ? 'Không có team, không có budget, chỉ có một điện thoại và một ý tưởng rằng: câu chuyện tốt quan trọng hơn số lượt xem.'
        : 'No team, no budget — just a phone and a belief that a good story matters more than view counts.'}
    />
    <AboutIntro t={t} lang={lang}/>
    <AboutValues t={t} lang={lang}/>
    <AboutBehindTheScenes t={t} lang={lang}/>
    <PageFooter t={t} lang={lang} onNavigate={onNavigate}/>
  </div>
);

Object.assign(window, { AboutPage });
