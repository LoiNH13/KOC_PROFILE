import type {
  Stat, PortfolioItem, Package, Testimonial, FAQ, Product, KocData, Tone,
  Niche, Video, TrendingItem, StoryItem, ProcessStep, Audience, AboutPhoto, ContactChannel,
} from '@/types'
import { driveUrl } from '@/lib/utils'

const ID   = import.meta.env.VITE_SHEETS_ID
const KEY  = import.meta.env.VITE_SHEETS_API_KEY
const BASE = `https://sheets.googleapis.com/v4/spreadsheets`

async function fetchTab(tab: string): Promise<Record<string, string>[]> {
  if (!ID || !KEY) throw new Error('Sheets env not configured')
  const res = await fetch(`${BASE}/${ID}/values/${encodeURIComponent(tab)}!A:Z?key=${KEY}`)
  if (!res.ok) throw new Error(`Sheets error ${res.status}`)
  const { values } = await res.json() as { values?: string[][] }
  if (!values || values.length < 2) return []
  const [headers, ...rows] = values
  return rows
    .filter(row => row.some(c => c?.trim()))
    .map(row => Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] ?? '').trim()])))
}

const bilingual = (vi: string, en: string) => ({ vi, en: en || vi })

export async function fetchStats(): Promise<Stat[]> {
  const rows = await fetchTab('stats')
  return rows.map(r => ({
    label: bilingual(r.label_vi, r.label_en),
    value: r.value,
    sub: r.sub_vi === r.sub_en ? r.sub_vi : bilingual(r.sub_vi, r.sub_en),
  }))
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const rows = await fetchTab('portfolio_items')
  return rows.map((r, i) => ({
    id: Number(r.id) || i + 1,
    brand: r.brand,
    niche: r.niche,
    tone: (r.tone || 'pink') as Tone,
    duration: r.duration,
    views: r.views,
    likes: r.likes,
    title: bilingual(r.title_vi, r.title_en),
    platform: r.platform,
    date: r.date,
    format: bilingual(r.format_vi, r.format_en),
    imageUrl: driveUrl(r.image_url || ''),
  }))
}

export async function fetchPackages(): Promise<Package[]> {
  const rows = await fetchTab('packages')
  return rows.map(r => ({
    id: r.id,
    name: bilingual(r.name_vi, r.name_en),
    tagline: bilingual(r.tagline_vi, r.tagline_en),
    price: bilingual(r.price_vi, r.price_en),
    tone: (r.tone || 'mint') as Tone,
    featured: r.featured === 'true',
    deliverables: {
      vi: (r.deliverables_vi || '').split('|').map(s => s.trim()).filter(Boolean),
      en: (r.deliverables_en || '').split('|').map(s => s.trim()).filter(Boolean),
    },
  }))
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchTab('testimonials')
  return rows.map(r => ({
    brand: r.brand,
    person: r.person,
    role: bilingual(r.role_vi, r.role_en),
    quote: bilingual(r.quote_vi, r.quote_en),
    tone: (r.tone || 'pink') as Tone,
  }))
}

export async function fetchFaqs(): Promise<FAQ[]> {
  const rows = await fetchTab('faqs')
  return rows.map(r => ({
    q: bilingual(r.q_vi, r.q_en),
    a: bilingual(r.a_vi, r.a_en),
  }))
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const rows = await fetchTab('featured_products')
  return rows.map(r => ({
    id: r.id,
    brand: r.brand,
    name: bilingual(r.name_vi, r.name_en),
    niche: bilingual(r.niche_vi, r.niche_en),
    rating: Number.parseFloat(r.rating) || 0,
    price: r.price,
    tone: (r.tone || 'pink') as Tone,
    tag: bilingual(r.tag_vi, r.tag_en),
    link: r.link || undefined,
    imageUrl: driveUrl(r.image_url || '') || undefined,
  }))
}

export async function fetchKocData(): Promise<KocData> {
  const rows = await fetchTab('koc_profile')
  if (!rows[0]) throw new Error('koc_profile tab empty')
  const r = rows[0]
  return {
    name: r.name,
    handle: r.handle,
    tagline: bilingual(r.tagline_vi, r.tagline_en),
    bio: bilingual(r.bio_vi, r.bio_en),
    location: r.location,
    email: r.email,
    phone: r.phone,
    avatarUrl: driveUrl(r.avatar_url || ''),
    logoUrl: driveUrl(r.logo_url || ''),
    tiktokUrl: r.tiktok_url || undefined,
    instagramUrl: r.instagram_url || undefined,
    youtubeUrl: r.youtube_url || undefined,
    facebookUrl: r.facebook_url || undefined,
    packagesVisible: r.show_packages === 'true',
  }
}

export async function fetchNiches(): Promise<Niche[]> {
  const rows = await fetchTab('niches')
  return rows.map(r => ({
    vi: r.label_vi,
    en: r.label_en,
    emoji: r.emoji || '✨',
  }))
}

export async function fetchVideos(): Promise<Video[]> {
  const rows = await fetchTab('videos')
  return rows.map((r, i) => ({
    id: r.id || `v${i + 1}`,
    title: bilingual(r.title_vi, r.title_en),
    views: r.views,
    likes: r.likes,
    duration: r.duration,
    tone: (r.tone || 'pink') as Tone,
    imageUrl: driveUrl(r.image_url || '') || undefined,
    link: r.link || undefined,
  }))
}

export async function fetchTrending(): Promise<TrendingItem[]> {
  const rows = await fetchTab('trending')
  return rows.map((r, i) => ({
    id: r.id || `t${i + 1}`,
    title: bilingual(r.title_vi, r.title_en),
    niche: r.niche,
    engagement: r.engagement,
  }))
}

export async function fetchBrands(): Promise<string[]> {
  const rows = await fetchTab('brands')
  return rows.map(r => r.name).filter(Boolean)
}

export async function fetchStory(): Promise<StoryItem[]> {
  const rows = await fetchTab('story')
  return rows.map(r => ({
    year: r.year_vi === r.year_en || !r.year_en ? r.year_vi : bilingual(r.year_vi, r.year_en),
    title: bilingual(r.title_vi, r.title_en),
    desc: bilingual(r.desc_vi, r.desc_en),
  }))
}

export async function fetchProcess(): Promise<ProcessStep[]> {
  const rows = await fetchTab('process')
  return rows.map(r => ({
    step: r.step,
    title: bilingual(r.title_vi, r.title_en),
    desc: bilingual(r.desc_vi, r.desc_en),
    time: r.time,
  }))
}

// `audience` tab uses a flat schema with `kind` column to discriminate rows.
// kind = 'age' | 'gender' | 'city' | 'platform'
//   age:      label, pct
//   gender:   label_vi, label_en, pct, color
//   city:     label_vi, label_en, pct
//   platform: label, value, growth
export async function fetchAudience(): Promise<Audience> {
  const rows = await fetchTab('audience')
  const age = rows
    .filter(r => r.kind === 'age')
    .map(r => ({ range: r.label_vi || r.label, pct: Number(r.pct) || 0 }))
  const gender = rows
    .filter(r => r.kind === 'gender')
    .map(r => ({
      label: bilingual(r.label_vi, r.label_en),
      pct: Number(r.pct) || 0,
      color: r.color || 'var(--color-clay-pink)',
    }))
  const cities = rows
    .filter(r => r.kind === 'city')
    .map(r => ({
      name: r.label_en && r.label_vi !== r.label_en
        ? bilingual(r.label_vi, r.label_en)
        : r.label_vi || r.label,
      pct: Number(r.pct) || 0,
    }))
  const platforms = rows
    .filter(r => r.kind === 'platform')
    .map(r => ({
      name: r.label_vi || r.label,
      value: r.value,
      growth: r.growth,
    }))
  return { age, gender, cities, platforms }
}

export async function fetchAboutPhotos(): Promise<AboutPhoto[]> {
  const rows = await fetchTab('about_photos')
  return rows
    .filter(r => r.url)
    .map(r => ({
      slot: (r.slot || 'portrait') as AboutPhoto['slot'],
      url: driveUrl(r.url),
      label: bilingual(r.label_vi || '', r.label_en || ''),
    }))
}

export async function fetchContactChannels(): Promise<ContactChannel[]> {
  const rows = await fetchTab('contact_channels')
  return rows
    .filter(r => r.value || r.href)
    .map(r => ({
      kind: r.kind,
      icon: r.icon || '📩',
      label: bilingual(r.label_vi, r.label_en),
      value: r.value,
      desc: bilingual(r.desc_vi, r.desc_en),
      href: r.href,
      tone: (r.tone || 'pink') as Tone,
    }))
}
