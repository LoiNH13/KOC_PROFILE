import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolve bilingual text */
export function t<T extends { vi: string; en: string }>(obj: T, lang: 'vi' | 'en'): string {
  return obj[lang]
}

/** Tone → CSS gradient (used for PhotoPlaceholder, ClayCard bg, etc.) */
export const TONE_GRADIENT: Record<string, string> = {
  pink:   'linear-gradient(135deg, var(--color-clay-pink), var(--color-clay-pink-deep))',
  mint:   'linear-gradient(135deg, var(--color-clay-mint), var(--color-clay-mint-deep))',
  butter: 'linear-gradient(135deg, var(--color-clay-butter), var(--color-clay-butter-deep))',
  peach:  'linear-gradient(135deg, var(--color-clay-peach), var(--color-clay-pink-deep))',
  lilac:  'linear-gradient(135deg, var(--color-clay-lilac), var(--color-clay-pink-deep))',
  sky:    'linear-gradient(135deg, var(--color-clay-sky), var(--color-clay-mint-deep))',
  ink:    'linear-gradient(135deg, var(--color-clay-ink), #4A2A4A)',
}

export const TONE_BG: Record<string, string> = {
  pink:    'var(--color-clay-pink)',
  mint:    'var(--color-clay-mint)',
  butter:  'var(--color-clay-butter)',
  lilac:   'var(--color-clay-lilac)',
  peach:   'var(--color-clay-peach)',
  sky:     'var(--color-clay-sky)',
  ink:     'var(--color-clay-ink)',
  surface: 'var(--color-clay-surface)',
}

export const TONE_INK: Record<string, string> = {
  pink:   'var(--color-clay-accent-ink)',
  mint:   '#1F6B47',
  butter: '#7A5E00',
  lilac:  '#5B3A8C',
  peach:  '#A04526',
  sky:    '#1B4B8E',
  ink:    '#FFFFFF',
}

/**
 * Convert any Google Drive share URL to a direct image URL.
 * Accepts:
 *   - https://drive.google.com/file/d/{ID}/view...
 *   - https://drive.google.com/open?id={ID}
 *   - https://drive.google.com/uc?id={ID}
 *   - A bare file ID (no slashes)
 * Returns a thumbnail URL that works for <img src=...> embedding.
 * Pass-through for non-Drive URLs (e.g. direct https:// links).
 */
export function driveUrl(url: string, size = 'w800'): string {
  if (!url) return ''
  // Already a direct image link (not Drive)
  if (!url.includes('drive.google.com') && !url.match(/^[\w-]{25,}$/)) return url
  // Extract file ID
  let id = ''
  const fileMatch = url.match(/\/file\/d\/([\w-]+)/)
  if (fileMatch) { id = fileMatch[1] }
  else {
    const paramMatch = url.match(/[?&]id=([\w-]+)/)
    if (paramMatch) { id = paramMatch[1] }
    else if (/^[\w-]{25,}$/.test(url)) { id = url }
  }
  if (!id) return url
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`
}
