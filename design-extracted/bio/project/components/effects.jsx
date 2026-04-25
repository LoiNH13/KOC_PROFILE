// Scroll-triggered reveal + shimmer text effect
// Lightweight, no deps.

// <Reveal> — fade-up when element enters viewport.
const Reveal = ({ children, delay = 0, distance = 24, as: Tag = 'div', style = {}, ...rest }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
      transition: `opacity 0.6s cubic-bezier(.2,.8,.3,1) ${delay}ms, transform 0.6s cubic-bezier(.2,.8,.3,1) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
};

// <RevealStagger> — wraps children and staggers each one.
const RevealStagger = ({ children, baseDelay = 0, stagger = 80, ...rest }) => (
  <>{React.Children.map(children, (child, i) => (
    <Reveal delay={baseDelay + i * stagger} {...rest}>{child}</Reveal>
  ))}</>
);

// <Shimmer> — subtle gradient sweep on text. Use for hero name / key phrases.
const Shimmer = ({ children, colors = ['#FF5B8A', '#FFCB3D', '#FF5B8A'], duration = 4, style = {} }) => (
  <>
    <style>{`
      @keyframes shimmer-sweep {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `}</style>
    <span style={{
      background: `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2] || colors[0]} 100%)`,
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      animation: `shimmer-sweep ${duration}s linear infinite`,
      display: 'inline-block',
      ...style,
    }}>{children}</span>
  </>
);

Object.assign(window, { Reveal, RevealStagger, Shimmer });
