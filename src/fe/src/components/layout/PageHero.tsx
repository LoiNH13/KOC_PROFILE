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
    <section className="relative px-12 pt-12 pb-8 overflow-hidden">
      <Blob color={blobColor} size={360} top={-40} left={-80} />
      <Blob color="var(--color-clay-butter)" size={280} top={40} right={-60} delay={4} />
      <div className="relative max-w-[1240px] mx-auto">
        <p className="text-xs font-extrabold text-clay-accent-ink uppercase tracking-[0.15em] mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display text-[64px] leading-[1.02] font-medium tracking-[-2px] max-w-[900px]">
          {title}
        </h1>
        {sub && (
          <p className="text-lg text-clay-ink-soft max-w-[640px] mt-5 leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
