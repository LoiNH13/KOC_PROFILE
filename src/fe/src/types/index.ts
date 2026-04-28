export type Lang = 'vi' | 'en'
export type Page = 'landing' | 'about' | 'portfolio' | 'booking' | 'contact' | 'mediakit'
export type Tone = 'pink' | 'mint' | 'butter' | 'lilac' | 'peach' | 'sky' | 'ink' | 'surface'

export interface BilingualText {
  vi: string
  en: string
}

export interface KocData {
  name: string
  handle: string
  tagline: BilingualText
  bio: BilingualText
  location: string
  email: string
  phone: string
  avatarUrl?: string
  logoUrl?: string
  tiktokUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  packagesVisible?: boolean
  notifyEmails?: string[]
}

export interface AboutPhoto {
  slot: 'portrait' | 'studio' | 'behind'
  url: string
  label: BilingualText
}

export interface Stat {
  label: BilingualText
  value: string
  sub: string | BilingualText
}

export interface Niche {
  vi: string
  en: string
  emoji: string
}

export interface Product {
  id: string
  brand: string
  name: BilingualText
  niche: BilingualText
  rating: number
  price: string
  tone: Tone
  tag: BilingualText
  link?: string
  imageUrl?: string
}

export interface Video {
  id: string
  title: BilingualText
  views: string
  likes: string
  duration: string
  tone: Tone
  imageUrl?: string
  link?: string
}

export interface TrendingItem {
  id: string
  title: BilingualText
  niche: string
  engagement: string
}

export interface Package {
  id: string
  name: BilingualText
  tagline: BilingualText
  price: BilingualText
  tone: Tone
  featured?: boolean
  deliverables: {
    vi: string[]
    en: string[]
  }
}

export interface Testimonial {
  brand: string
  person: string
  role: BilingualText
  quote: BilingualText
  tone: Tone
}

export interface ProcessStep {
  step: string
  title: BilingualText
  desc: BilingualText
  time: string
}

export interface StoryItem {
  year: string | BilingualText
  title: BilingualText
  desc: BilingualText
}

export interface FAQ {
  q: BilingualText
  a: BilingualText
}

export interface ContactChannel {
  kind: string
  icon: string
  label: BilingualText
  value: string
  desc: BilingualText
  href: string
  tone: Tone
}

export interface AudienceAge {
  range: string
  pct: number
}

export interface AudienceGender {
  label: BilingualText
  pct: number
  color: string
}

export interface AudienceCity {
  name: string | BilingualText
  pct: number
}

export interface AudiencePlatform {
  name: string
  value: string
  growth: string
}

export interface Audience {
  age: AudienceAge[]
  gender: AudienceGender[]
  cities: AudienceCity[]
  platforms: AudiencePlatform[]
}

export interface PortfolioItem {
  id: number
  brand: string
  niche: string
  tone: Tone
  duration: string
  views: string
  likes: string
  title: BilingualText
  platform: string
  date: string
  format: BilingualText
  imageUrl?: string
}
