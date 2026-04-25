import type { Stat, PortfolioItem, Package, Testimonial, FAQ, Product, KocData, Tone } from '@/types'

const ID   = import.meta.env.VITE_SHEETS_ID      as string
const KEY  = import.meta.env.VITE_SHEETS_API_KEY  as string
const BASE = `https://sheets.googleapis.com/v4/spreadsheets`

async function fetchTab(tab: string): Promise<Record<string, string>[]> {
  const res = await fetch(`${BASE}/${ID}/values/${encodeURIComponent(tab)}!A:Z?key=${KEY}`)
  if (!res.ok) throw new Error(`Sheets error ${res.status}`)
  const { values } = await res.json() as { values?: string[][] }
  if (!values || values.length < 2) return []
  const [headers, ...rows] = values
  return rows
    .filter(row => row.some(c => c?.trim()))
    .map(row => Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] ?? '').trim()])))
}

export async function fetchStats(): Promise<Stat[]> {
  const rows = await fetchTab('stats')
  return rows.map(r => ({
    label: { vi: r.label_vi, en: r.label_en },
    value: r.value,
    sub: r.sub_vi === r.sub_en
      ? r.sub_vi
      : { vi: r.sub_vi, en: r.sub_en },
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
    title: { vi: r.title_vi, en: r.title_en },
    platform: r.platform,
    date: r.date,
    format: { vi: r.format_vi, en: r.format_en },
  }))
}

export async function fetchPackages(): Promise<Package[]> {
  const rows = await fetchTab('packages')
  return rows.map(r => ({
    id: r.id,
    name: { vi: r.name_vi, en: r.name_en },
    tagline: { vi: r.tagline_vi, en: r.tagline_en },
    price: { vi: r.price_vi, en: r.price_en },
    tone: (r.tone || 'mint') as Tone,
    featured: r.featured === 'true',
    deliverables: {
      vi: r.deliverables_vi.split('|').map(s => s.trim()).filter(Boolean),
      en: r.deliverables_en.split('|').map(s => s.trim()).filter(Boolean),
    },
  }))
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchTab('testimonials')
  return rows.map(r => ({
    brand: r.brand,
    person: r.person,
    role: { vi: r.role_vi, en: r.role_en },
    quote: { vi: r.quote_vi, en: r.quote_en },
    tone: (r.tone || 'pink') as Tone,
  }))
}

export async function fetchFaqs(): Promise<FAQ[]> {
  const rows = await fetchTab('faqs')
  return rows.map(r => ({
    q: { vi: r.q_vi, en: r.q_en },
    a: { vi: r.a_vi, en: r.a_en },
  }))
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const rows = await fetchTab('featured_products')
  return rows.map(r => ({
    id: r.id,
    brand: r.brand,
    name: { vi: r.name_vi, en: r.name_en },
    niche: { vi: r.niche_vi, en: r.niche_en },
    rating: parseFloat(r.rating) || 0,
    price: r.price,
    tone: (r.tone || 'pink') as Tone,
    tag: { vi: r.tag_vi, en: r.tag_en },
  }))
}

export async function fetchKocData(): Promise<KocData> {
  const rows = await fetchTab('koc_profile')
  if (!rows[0]) throw new Error('koc_profile tab empty')
  const r = rows[0]
  return {
    name: r.name,
    handle: r.handle,
    tagline: { vi: r.tagline_vi, en: r.tagline_en },
    bio: { vi: r.bio_vi, en: r.bio_en },
    location: r.location,
    email: r.email,
    phone: r.phone,
  }
}
