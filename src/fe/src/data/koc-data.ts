// Empty defaults for Sheets-driven content. When a tab is absent or empty,
// the corresponding section renders nothing rather than fake mock data.
// All real content lives in Google Sheets — see src/fe/README.md.

import type {
  KocData, Stat, Niche, Product, Video, TrendingItem,
  Package, Testimonial, ProcessStep, StoryItem, FAQ,
  Audience, PortfolioItem,
} from '@/types'

export const KOC_DATA: KocData = {
  name: '',
  handle: '',
  tagline: { vi: '', en: '' },
  bio: { vi: '', en: '' },
  location: '',
  email: '',
  phone: '',
}

export const STATS: Stat[] = []
export const NICHES: Niche[] = []
export const FEATURED_PRODUCTS: Product[] = []
export const VIDEOS: Video[] = []
export const TRENDING: TrendingItem[] = []
export const BRANDS: string[] = []
export const STORY: StoryItem[] = []
export const PACKAGES: Package[] = []
export const TESTIMONIALS: Testimonial[] = []
export const PROCESS: ProcessStep[] = []
export const FAQS: FAQ[] = []
export const PORTFOLIO_ITEMS: PortfolioItem[] = []

export const AUDIENCE: Audience = {
  age: [],
  gender: [],
  cities: [],
  platforms: [],
}
