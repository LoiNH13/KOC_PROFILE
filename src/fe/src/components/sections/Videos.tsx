import { motion } from 'motion/react'
import { Blob } from '@/components/primitives'
import { useLang } from '@/hooks/useLang'
import { VIDEOS as VIDEOS_FALLBACK } from '@/data/koc-data'
import { fetchVideos } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'
import { TONE_GRADIENT } from '@/lib/utils'

export function Videos() {
  const { lang } = useLang()
  const VIDEOS = useSheetData('videos', fetchVideos, VIDEOS_FALLBACK)
  if (VIDEOS.length === 0) return null
  return (
    <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <Blob color="var(--color-clay-mint)" size={400} bottom={0} left={-60} />
      <div className="relative max-w-[1240px] mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-mint shadow-clay text-[11px] font-bold text-[#1F6B47] uppercase tracking-widest mb-3 lg:mb-4">
            🎥 {lang === 'vi' ? 'Video hot' : 'Hot videos'}
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
            {lang === 'vi' ? 'Đang viral' : 'Going viral'}{' '}
            <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'tuần này' : 'this week'}</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {VIDEOS.map((v, i) => {
            const rotate = (i % 2 === 0 ? -1 : 1) * 1.2
            const CardInner = (
              <div
                className="relative rounded-clay-lg shadow-clay overflow-hidden mb-3.5"
                style={{ aspectRatio: '9/16', background: TONE_GRADIENT[v.tone] }}
              >
                {v.imageUrl && (
                  <img src={v.imageUrl} alt={v.title[lang]} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[56px] h-[56px] lg:w-[72px] lg:h-[72px] rounded-full bg-clay-surface shadow-clay flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 16 16" fill="var(--color-clay-ink)">
                      <path d="M4 2l10 6-10 6V2z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-clay-ink text-white rounded-full text-[11px] font-bold">
                  {v.duration}
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-clay-surface rounded-full text-[11px] font-bold text-clay-ink shadow-sm">
                  ▶ {v.views}
                </div>
              </div>
            )
            return (
              <motion.div
                key={v.id}
                initial={{ rotate }}
                whileHover={{ rotate: 0, y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                className="cursor-pointer"
              >
                {v.link
                  ? <a href={v.link} target="_blank" rel="noopener noreferrer" className="block no-underline">{CardInner}</a>
                  : CardInner
                }
                <p className="font-display text-[15px] font-bold text-clay-ink mb-1 leading-snug">
                  {v.title[lang]}
                </p>
                <p className="text-xs text-clay-ink-soft font-semibold">♥ {v.likes} likes</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}