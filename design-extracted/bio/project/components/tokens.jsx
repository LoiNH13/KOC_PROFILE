// Design tokens for both variations
// Variation A — Safe pastel clean
// Variation B — Bold claymorphism 3D (light + dark)

const TOKENS_A = {
  name: 'Soft Clean',
  // Cream / ivory base + soft pastel accents
  bg: '#FBF7F2',
  bgAlt: '#F4EEE6',
  surface: '#FFFFFF',
  ink: '#2B1F1A',
  inkSoft: '#6B5E56',
  inkMuted: '#A89B91',
  border: 'rgba(43,31,26,0.08)',
  // Pastels
  pink: '#FFD3DD',
  pinkDeep: '#FFB8C8',
  mint: '#C8EFD9',
  mintDeep: '#A8E0C2',
  butter: '#FFE9A8',
  butterDeep: '#FFD97A',
  lilac: '#E0D4F7',
  peach: '#FFD4B8',
  // Accent
  accent: '#FF7A9B',
  accentInk: '#B8365A',
  // Radius & shadows
  radius: 20,
  radiusLg: 28,
  shadow: '0 1px 2px rgba(43,31,26,0.04), 0 8px 24px rgba(43,31,26,0.06)',
  shadowLg: '0 2px 4px rgba(43,31,26,0.04), 0 20px 48px rgba(43,31,26,0.08)',
  font: '"Plus Jakarta Sans", -apple-system, system-ui, sans-serif',
  fontDisplay: '"Fraunces", "Plus Jakarta Sans", serif',
};

const TOKENS_B = {
  name: 'Clay Pop',
  // Warmer, more saturated pastel playground
  bg: '#FFF4F0',
  bgAlt: '#FFEADF',
  surface: '#FFFFFF',
  ink: '#2E1A2E',
  inkSoft: '#6B4A5E',
  inkMuted: '#B09CA8',
  border: 'rgba(46,26,46,0.08)',
  // Clay pastels (more saturated)
  pink: '#FFB8D1',
  pinkDeep: '#FF8FB5',
  mint: '#A8EBC8',
  mintDeep: '#6FD9A0',
  butter: '#FFE07A',
  butterDeep: '#FFCB3D',
  lilac: '#C8B5F5',
  peach: '#FFB890',
  sky: '#A8D8FF',
  // Accent
  accent: '#FF5B8A',
  accentInk: '#C42862',
  // Radius & shadows — chunky clay
  radius: 28,
  radiusLg: 40,
  shadow: '0 2px 0 rgba(46,26,46,0.06), 0 12px 28px rgba(255,143,181,0.22)',
  shadowLg: '0 4px 0 rgba(46,26,46,0.08), 0 24px 48px rgba(255,143,181,0.3)',
  // Clay 3D effect: inner highlight + outer shadow
  clay: `
    inset 0 2px 4px rgba(255,255,255,0.6),
    inset 0 -3px 6px rgba(46,26,46,0.08),
    0 3px 0 rgba(46,26,46,0.08),
    0 10px 24px rgba(255,143,181,0.28)
  `,
  clayLg: `
    inset 0 3px 6px rgba(255,255,255,0.7),
    inset 0 -4px 8px rgba(46,26,46,0.1),
    0 5px 0 rgba(46,26,46,0.1),
    0 18px 40px rgba(255,143,181,0.35)
  `,
  font: '"Plus Jakarta Sans", -apple-system, system-ui, sans-serif',
  fontDisplay: '"Fraunces", "Plus Jakarta Sans", serif',
};

Object.assign(window, { TOKENS_A, TOKENS_B, TOKENS_B_DARK: {
  ...TOKENS_B,
  name: 'Clay Pop Dark',
  // Plum/aubergine dark base, same clay energy, brighter accents
  bg: '#1A0E1C',
  bgAlt: '#241028',
  surface: '#2E1834',
  ink: '#FFF4F8',
  inkSoft: '#D4B8C8',
  inkMuted: '#9A7A8C',
  border: 'rgba(255,244,248,0.1)',
  // Muted pastels for surfaces in dark mode
  pink: '#6B2E4A',
  pinkDeep: '#8E3A62',
  mint: '#2B5844',
  mintDeep: '#3D7A5F',
  butter: '#6B5420',
  butterDeep: '#8E7028',
  lilac: '#4A3A6E',
  peach: '#7A3A4A',
  sky: '#2C4A6E',
  accent: '#FF78A3',
  accentInk: '#FFB5CC',
  shadow: '0 2px 0 rgba(0,0,0,0.4), 0 12px 28px rgba(0,0,0,0.5)',
  shadowLg: '0 4px 0 rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.6)',
  clay: `
    inset 0 2px 3px rgba(255,255,255,0.08),
    inset 0 -3px 6px rgba(0,0,0,0.4),
    0 3px 0 rgba(0,0,0,0.4),
    0 10px 24px rgba(0,0,0,0.5)
  `,
  clayLg: `
    inset 0 3px 6px rgba(255,255,255,0.1),
    inset 0 -4px 8px rgba(0,0,0,0.5),
    0 5px 0 rgba(0,0,0,0.5),
    0 18px 40px rgba(0,0,0,0.6)
  `,
}});
