import { useState } from 'react'
import { motion } from 'motion/react'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { ClayCard, CursorGlow, Sparkle } from '@/components/primitives'
import { Nav } from '@/components/layout/Nav'
import { PageHero } from '@/components/layout/PageHero'
import { PageFooter } from '@/components/layout/PageFooter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLang } from '@/hooks/useLang'
import { useKocData } from '@/hooks/useKocData'
import { useSheetData } from '@/hooks/useSheetData'
import { fetchContactChannels } from '@/lib/sheets'
import type { Page, ContactChannel } from '@/types'

interface ContactPageProps { onNavigate: (p: Page) => void }

const BG_MAP: Record<string, string> = {
  pink:   'var(--color-clay-pink)',
  mint:   'var(--color-clay-mint)',
  butter: 'var(--color-clay-butter)',
  lilac:  'var(--color-clay-lilac)',
}

const HOURS = [
  { day: { vi: 'Thứ 2 – 5', en: 'Mon – Thu' }, time: '9:00 – 21:00' },
  { day: { vi: 'Thứ 6 – 7', en: 'Fri – Sat' }, time: '10:00 – 22:00' },
  { day: { vi: 'Chủ Nhật',  en: 'Sunday' },     time: { vi: 'Nghỉ (urgent: Zalo)', en: 'Rest (urgent: Zalo)' } },
]

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { lang } = useLang()
  const KOC_DATA = useKocData()
  const CHANNELS = useSheetData<ContactChannel[]>('contact_channels', fetchContactChannels, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const { submit, loading, done: sent } = useFormSubmit('contact_messages')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name && email && msg) await submit({ name, email, message: msg, lang })
  }

  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(200,180,255,0.25)" />
      <Nav page="contact" onNavigate={onNavigate} />
      <PageHero
        eyebrow={lang === 'vi' ? 'Liên hệ' : 'Contact'}
        title={lang === 'vi' ? 'Mình ở đây.' : "I'm here."}
        sub={lang === 'vi' ? 'Dù bạn là brand, bạn đọc, hay chỉ muốn nói chuyện — cứ nhắn.' : "Whether you're a brand, a reader, or just want to chat — just message."}
        tone="lilac"
      />

      {CHANNELS.length > 0 && (
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 lg:pb-16">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.tone}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ rotate: i % 2 === 0 ? -1.2 : 1.2 }}
                whileHover={{ rotate: 0, y: -6, transition: { type: 'spring', stiffness: 300 } }}
                className="block rounded-clay p-6 lg:p-7 shadow-clay no-underline cursor-pointer"
                style={{ background: BG_MAP[ch.tone] }}
              >
                <div className="text-[36px] lg:text-[44px] mb-3 lg:mb-4">{ch.icon}</div>
                <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1">{ch.label[lang]}</p>
                <p className="font-semibold text-clay-ink text-sm mb-2 break-all">{ch.value}</p>
                <p className="text-xs text-clay-ink/75">{ch.desc[lang]}</p>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 sm:px-6 md:px-8 lg:px-12 pb-20 lg:pb-24">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 lg:gap-12 items-start">

          <div>
            <div className="inline-block px-3 py-1.5 rounded-full bg-clay-butter shadow-clay text-[11px] font-bold text-[#7A5E00] uppercase tracking-widest mb-5 lg:mb-6">
              {lang === 'vi' ? '🕐 Giờ trực' : '🕐 Working hours'}
            </div>
            <h2 className="font-display text-[28px] sm:text-[32px] lg:text-[38px] font-medium tracking-[-1.2px] lg:tracking-[-1.5px] leading-[1.1] mb-6 lg:mb-8">
              {lang === 'vi' ? 'Khi nào mình có mặt?' : 'When am I around?'}
            </h2>
            <div className="space-y-3 mb-8 lg:mb-10">
              {HOURS.map((h) => (
                <div key={h.day.en} className="flex justify-between items-center px-4 lg:px-5 py-3 lg:py-4 rounded-2xl bg-clay-surface border border-clay-border">
                  <span className="text-sm font-bold text-clay-ink">{h.day[lang]}</span>
                  <span className="text-sm text-clay-ink-soft">
                    {typeof h.time === 'object' ? h.time[lang] : h.time}
                  </span>
                </div>
              ))}
            </div>

            <ClayCard bg="var(--color-clay-mint)" className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-2">
                {lang === 'vi' ? '💡 Lưu ý' : '💡 Note'}
              </p>
              <p className="text-sm text-clay-ink/80 leading-relaxed">
                {lang === 'vi'
                  ? 'Nếu cần gấp về collab, hãy nhắn Zalo — mình đọc và trả lời nhanh hơn email nhiều.'
                  : "If it's urgent about a collab, message on Zalo — I read and reply much faster than email."}
              </p>
            </ClayCard>

            {KOC_DATA.name && (
              <div className="relative mt-8 lg:mt-10 pl-6">
                <Sparkle size={28} color="var(--color-clay-accent)" className="absolute -top-2 -left-1" style={{ transform: 'rotate(10deg)' }} />
                <p className="text-[13px] text-clay-ink-soft italic leading-relaxed">
                  {lang === 'vi'
                    ? '"Mình cố gắng trả lời mọi tin nhắn — dù không hợp tác được. Cảm ơn bạn đã nhắn nhé."'
                    : '"I try to reply to every message — even if we can\'t collab. Thanks for reaching out."'}
                </p>
                <p className="text-xs font-bold text-clay-accent mt-2">— {KOC_DATA.name}</p>
              </div>
            )}
          </div>

          <ClayCard bg="var(--color-clay-surface)" className="p-6 sm:p-8">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 lg:py-12">
                <div className="text-4xl lg:text-5xl mb-4">💌</div>
                <h3 className="font-display text-[24px] lg:text-[28px] font-semibold tracking-tight mb-2">
                  {lang === 'vi' ? 'Gửi rồi!' : 'Sent!'}
                </h3>
                <p className="text-clay-ink-soft text-sm">
                  {lang === 'vi' ? 'Mình sẽ phản hồi trong 24h.' : "I'll reply within 24h."}
                </p>
              </motion.div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-5 lg:mb-6">
                  {lang === 'vi' ? '✉️ Gửi tin nhắn nhanh' : '✉️ Quick message'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                      {lang === 'vi' ? 'Tên bạn' : 'Your name'} *
                    </Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder={lang === 'vi' ? 'Tên của bạn' : 'Your name'} required />
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                      Email *
                    </Label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@domain.com" required />
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                      {lang === 'vi' ? 'Nội dung' : 'Message'} *
                    </Label>
                    <Textarea
                      rows={5}
                      value={msg}
                      onChange={e => setMsg(e.target.value)}
                      placeholder={lang === 'vi' ? 'Nhắn bất kỳ điều gì...' : 'Say anything...'}
                      required
                    />
                  </div>
                  <Button type="submit" variant="clay" size="md" className="w-full" disabled={loading}>
                    {loading ? '...' : lang === 'vi' ? 'Gửi →' : 'Send →'}
                  </Button>
                </form>
              </>
            )}
          </ClayCard>
        </div>
      </section>
      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
