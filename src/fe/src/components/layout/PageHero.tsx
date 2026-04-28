import { Blob } from '@/components/primitives'
import type { Tone } from '@/types'

interface PageHeroProps {
  eyebrow: string
  title: string
  sub?: string
  tone?: Tone
}

export function PageHero({ eyebrow, title, sub, tone = 'pink' }: PageHeroProps) {
  const blobColor = `var(--color-clay-${tone})`
  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-8 lg:pt-12 pb-6 lg:pb-8 overflow-hidden">
      <Blob color={blobColor} size={360} top={-40} left={-80} />
      <Blob color="var(--color-clay-butter)" size={280} top={40} right={-60} delay={4} />
      <div className="relative max-w-[1240px] mx-auto">
        <p className="text-[11px] lg:text-xs font-extrabold text-clay-accent-ink uppercase tracking-[0.15em] mb-3 lg:mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.04] lg:leading-[1.02] font-medium tracking-[-1.2px] lg:tracking-[-2px] max-w-[900px]">
          {title}
        </h1>
        {sub && (
          <p className="text-[15px] lg:text-lg text-clay-ink-soft max-w-[640px] mt-4 lg:mt-5 leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
