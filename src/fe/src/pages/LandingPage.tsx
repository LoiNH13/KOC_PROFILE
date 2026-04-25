import { CursorGlow, ScrollProgress, Reveal } from '@/components/primitives'
import {
  Hero, Stats, Niches, About, Products, Videos,
  Trending, Testimonials, MediaKit, Packages, Process,
  Brands, FAQ, BookingCTA, Newsletter,
} from '@/components/sections'
import { Nav } from '@/components/layout/Nav'
import { PageFooter } from '@/components/layout/PageFooter'
import type { Page } from '@/types'

interface LandingPageProps {
  onNavigate: (p: Page) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow size={500} />
      <Nav page="landing" onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <Reveal><Stats /></Reveal>
      <Reveal delay={60}><Niches /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Products /></Reveal>
      <Reveal delay={80}><Videos /></Reveal>
      <Reveal><Trending /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal delay={60}><MediaKit /></Reveal>
      <Reveal><Packages onNavigate={onNavigate} /></Reveal>
      <Reveal delay={80}><Process /></Reveal>
      <Reveal><Brands /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal delay={60}><BookingCTA onNavigate={onNavigate} /></Reveal>
      <Reveal><Newsletter /></Reveal>
      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
