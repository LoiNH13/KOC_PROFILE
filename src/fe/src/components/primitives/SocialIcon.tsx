interface SocialIconProps {
  kind: 'tiktok' | 'instagram' | 'youtube' | 'facebook'
  size?: number
}

export function SocialIcon({ kind, size = 18 }: SocialIconProps) {
  const paths: Record<SocialIconProps['kind'], React.ReactNode> = {
    tiktok: <path d="M16 3v3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V17a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V3h3z" fill="currentColor" />,
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
    youtube: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </>
    ),
    facebook: <path d="M13 22v-8h3l.5-4H13V7.5c0-1.2.3-2 2-2h2.1V2.1C16.7 2 15.7 2 14.5 2 11.8 2 10 3.7 10 6.8V10H7v4h3v8h3z" fill="currentColor" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {paths[kind]}
    </svg>
  )
}
