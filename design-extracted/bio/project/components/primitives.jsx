// Shared UI primitives used by both Variation A & B
// Each primitive accepts a `t` (tokens) prop so it can retheme itself.

// Photo / product placeholder with soft gradient + label
const PhotoPlaceholder = ({ tone = 'pink', t, label, aspect = '1 / 1', style = {}, children }) => {
  const toneMap = {
    pink: [t.pink, t.pinkDeep],
    mint: [t.mint, t.mintDeep],
    butter: [t.butter, t.butterDeep],
    peach: [t.peach || t.pink, t.pinkDeep],
    lilac: [t.lilac || t.pink, t.pinkDeep],
    sky: [t.sky || t.mint, t.mintDeep],
  };
  const [c1, c2] = toneMap[tone] || toneMap.pink;
  return (
    <div style={{
      aspectRatio: aspect,
      borderRadius: t.radius,
      background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      {/* Diagonal stripes overlay */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
        <defs>
          <pattern id={`stripes-${tone}-${Math.random()}`} patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="24" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="white" opacity="0.1"/>
      </svg>
      {label && (
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 11,
          color: 'rgba(43,31,26,0.5)',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          zIndex: 1,
        }}>{label}</div>
      )}
      {children}
    </div>
  );
};

// Pill badge (for niche tags, "new", etc)
const Pill = ({ children, t, tone = 'ink', style = {} }) => {
  const bgs = {
    ink: t.surface, accent: t.accent, pink: t.pink, mint: t.mint, butter: t.butter,
  };
  const fgs = {
    ink: t.ink, accent: '#fff', pink: t.accentInk, mint: '#1F6B47', butter: '#7A5E00',
  };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 999,
      background: bgs[tone] || bgs.ink,
      color: fgs[tone] || fgs.ink,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.2,
      border: tone === 'ink' ? `1px solid ${t.border}` : 'none',
      ...style,
    }}>{children}</span>
  );
};

// Star rating row
const Stars = ({ value = 5, t }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: t.accent }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={i < full || (i === full && half) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M10 1.5l2.5 5.7 6.2.6-4.7 4.2 1.4 6.1L10 15l-5.4 3.1 1.4-6.1L1.3 7.8l6.2-.6L10 1.5z"/>
        </svg>
      ))}
      <span style={{ color: t.inkSoft, fontSize: 12, marginLeft: 4, fontWeight: 500 }}>{value.toFixed(1)}</span>
    </span>
  );
};

// Social icon (outline, uses currentColor)
const SocialIcon = ({ kind, size = 18 }) => {
  const paths = {
    tiktok: <path d="M16 3v3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V17a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V3h3z" fill="currentColor"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></>,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></>,
    facebook: <path d="M13 22v-8h3l.5-4H13V7.5c0-1.2.3-2 2-2h2.1V2.1C16.7 2 15.7 2 14.5 2 11.8 2 10 3.7 10 6.8V10H7v4h3v8h3z" fill="currentColor"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{paths[kind]}</svg>;
};

// Animated counter — counts up when scrolled into view (IntersectionObserver).
const Counter = ({ value, duration = 1200, style = {}, suffix = '' }) => {
  const [display, setDisplay] = React.useState(value);
  const ref = React.useRef(null);
  const hasAnimated = React.useRef(false);

  // Parse value: "842K" -> { num: 842, suf: "K" }, "8.7%" -> { num: 8.7, suf: "%" }
  const parsed = React.useMemo(() => {
    const m = String(value).match(/^([\d.]+)(.*)$/);
    if (!m) return { num: 0, suf: '' };
    return { num: parseFloat(m[1]), suf: m[2] };
  }, [value]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            const cur = parsed.num * eased;
            setDisplay(`${parsed.num % 1 === 0 ? Math.round(cur) : cur.toFixed(1)}${parsed.suf}`);
            if (p < 1) requestAnimationFrame(tick);
          };
          setDisplay(`0${parsed.suf}`);
          requestAnimationFrame(tick);
        }
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [parsed, duration]);

  return <span ref={ref} style={style}>{display}{suffix}</span>;
};

// Marquee — infinite horizontal scroll
const Marquee = ({ children, speed = 40, style = {} }) => {
  return (
    <div style={{ overflow: 'hidden', width: '100%', ...style }}>
      <div style={{
        display: 'flex',
        gap: 48,
        width: 'max-content',
        animation: `marquee ${speed}s linear infinite`,
      }}>
        {children}
        {children}
      </div>
    </div>
  );
};

// Cursor glow — follows cursor with a soft radial highlight. Attaches to
// its parent relative element.
const CursorGlow = ({ color = 'rgba(255,143,181,0.35)', size = 360 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    parent.style.position = parent.style.position || 'relative';
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      el.style.opacity = '1';
      el.style.transform = `translate(${e.clientX - r.left - size / 2}px, ${e.clientY - r.top - size / 2}px)`;
    };
    const onLeave = () => { el.style.opacity = '0'; };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, [size]);
  return (
    <div ref={ref} style={{
      position: 'absolute',
      pointerEvents: 'none',
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: 0,
      transition: 'opacity 0.3s',
      filter: 'blur(8px)',
      zIndex: 0,
      top: 0, left: 0,
      mixBlendMode: 'multiply',
    }}/>
  );
};

Object.assign(window, { PhotoPlaceholder, Pill, Stars, SocialIcon, Counter, Marquee, CursorGlow });
