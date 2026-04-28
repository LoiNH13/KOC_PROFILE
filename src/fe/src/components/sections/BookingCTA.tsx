import { Sparkle, ClayCard } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import type { Page } from '@/types'

interface BookingCTAProps {
  onNavigate: (p: Page) => void
}

export function BookingCTA({ onNavigate }: BookingCTAProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <div
        className="max-w-[1100px] mx-auto rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-7 sm:p-10 lg:p-14 relative overflow-hidden shadow-clay-lg"
        style={{ background: 'linear-gradient(135deg, var(--color-clay-pink) 0%, var(--color-clay-butter) 50%, var(--color-clay-mint) 100%)' }}
      >
        <Sparkle size={28} color="#fff" className="hidden sm:block absolute top-8 right-12 opacity-80" />
        <Sparkle size={20} color="#fff" className="hidden sm:block absolute bottom-12 left-15 opacity-60" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-display text-[30px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.3px] lg:tracking-[-1.8px] text-clay-ink leading-[1.05] mb-4 lg:mb-5">
              {lang === 'vi' ? 'Kể câu chuyện brand' : "Let's tell your brand"}{' '}
              <em className="italic text-clay-accent-ink">{lang === 'vi' ? 'cùng mình ✨' : 'story ✨'}</em>
            </h2>
            <p className="text-[15px] lg:text-[17px] text-clay-ink/80 leading-relaxed mb-6 lg:mb-7 max-w-[480px] font-medium">
              {lang === 'vi'
                ? 'Từ gifting đến long-term — gửi brief để nhận rate card và lịch còn trống.'
                : 'From gifting to long-term — send a brief to get the rate card and open dates.'}
            </p>
            {(KOC_DATA.email || KOC_DATA.phone) && (
              <div className="inline-flex flex-wrap items-center gap-4 lg:gap-5 px-4 lg:px-5 py-3 lg:py-4 rounded-clay bg-clay-surface shadow-clay">
                <div>
                  <p className="text-[11px] text-clay-ink-soft mb-0.5 font-semibold">{lang === 'vi' ? 'Phản hồi' : 'Reply'}</p>
                  <p className="text-[20px] lg:text-[22px] font-display font-bold text-clay-ink">⚡ 24h</p>
                </div>
                {KOC_DATA.email && (
                  <>
                    <div className="hidden sm:block w-px h-9 bg-clay-border" />
                    <div>
                      <p className="text-[11px] text-clay-ink-soft mb-0.5 font-semibold">Email</p>
                      <p className="text-sm text-clay-ink font-bold break-all">{KOC_DATA.email}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <ClayCard bg="var(--color-clay-surface)" className="p-6">
            <p className="font-display text-base lg:text-[15px] font-bold text-clay-ink mb-1">
              💌 {lang === 'vi' ? 'Gửi brief — phản hồi 24h' : 'Send brief — reply in 24h'}
            </p>
            <p className="text-xs text-clay-ink-soft mb-4">
              {lang === 'vi'
                ? 'Mình sẽ trả lời với 2-3 ý tưởng concept + giá cụ thể.'
                : "I'll reply with 2-3 concept ideas + a concrete quote."}
            </p>
            <ul className="flex flex-col gap-2 mb-5 text-sm text-clay-ink/85">
              <li>✅ {lang === 'vi' ? 'Đọc brief trước khi nhận' : 'Read brief before accepting'}</li>
              <li>✅ {lang === 'vi' ? 'Concept riêng cho từng brand' : 'Original concept per brand'}</li>
              <li>✅ {lang === 'vi' ? '2 vòng chỉnh sửa' : '2 revision rounds'}</li>
              <li>✅ {lang === 'vi' ? 'Analytics report sau đăng' : 'Analytics report post-launch'}</li>
            </ul>
            <Button variant="clay" size="md" className="w-full" onClick={() => onNavigate('booking')}>
              💌 {lang === 'vi' ? 'Gửi brief' : 'Submit brief'}
            </Button>
          </ClayCard>
        </div>
      </div>
    </section>
  )
}
