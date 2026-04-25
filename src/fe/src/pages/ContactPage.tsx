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
import { KOC_DATA } from '@/data/koc-data'
import type { Page } from '@/types'

interface ContactPageProps { onNavigate: (p: Page) => void }

const CHANNELS = [
  {
    icon: '✉️',
    label: { vi: 'Email',   en: 'Email' },
    value: KOC_DATA.email,
    desc:  { vi: 'Phản hồi trong 24h',     en: 'Reply within 24h' },
    tone: 'pink' as const,
    href: `mailto:${KOC_DATA.email}`,
  },
  {
    icon: '💬',
    label: { vi: 'Zalo',    en: 'Zalo' },
    value: KOC_DATA.phone,
    desc:  { vi: 'Nhanh nhất — phản hồi ngay', en: 'Fastest — reply instantly' },
    tone: 'mint' as const,
    href: `tel:${KOC_DATA.phone}`,
  },
  {
    icon: '📸',
    label: { vi: 'TikTok',  en: 'TikTok' },
    value: KOC_DATA.handle,
    desc:  { vi: 'DM qua TikTok',           en: 'DM on TikTok' },
    tone: 'butter' as const,
    href: `https://tiktok.com/${KOC_DATA.handle}`,
  },
  {
    icon: '📷',
    label: { vi: 'Instagram', en: 'Instagram' },
    value: KOC_DATA.handle,
    desc:  { vi: 'DM qua Instagram',        en: 'DM on Instagram' },
    tone: 'lilac' as const,
    href: `https://instagram.com/${KOC_DATA.handle}`,
  },
]

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

      {/* Channel cards */}
      <section className="px-12 pb-16">
        <div className="max-w-[1240px] mx-auto grid grid-cols-4 gap-5">
          {CHANNELS.map((ch, i) => (
            <motion.a
              key={ch.tone}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ rotate: i % 2 === 0 ? -1.2 : 1.2 }}
              whileHover={{ rotate: 0, y: -6, transition: { type: 'spring', stiffness: 300 } }}
              className="block rounded-clay p-7 shadow-clay no-underline cursor-pointer"
              style={{ background: BG_MAP[ch.tone] }}
            >
              <div className="text-[44px] mb-4">{ch.icon}</div>
              <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1">{ch.label[lang]}</p>
              <p className="font-semibold text-clay-ink text-sm mb-2">{ch.value}</p>
              <p className="text-xs text-clay-ink/75">{ch.desc[lang]}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Hours + Form */}
      <section className="px-12 pb-24">
        <div className="max-w-[1240px] mx-auto grid grid-cols-[1fr_480px] gap-12 items-start">

          {/* Hours + note */}
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-butter shadow-clay text-xs font-bold text-[#7A5E00] uppercase tracking-widest mb-6">
              {lang === 'vi' ? '🕐 Giờ trực' : '🕐 Working hours'}
            </div>
            <h2 className="font-display text-[38px] font-medium tracking-[-1.5px] leading-[1.1] mb-8">
              {lang === 'vi' ? 'Khi nào mình có mặt?' : 'When am I around?'}
            </h2>
            <div className="space-y-3 mb-10">
              {HOURS.map((h, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-4 rounded-2xl bg-clay-surface border border-clay-border">
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

            <div className="relative mt-10 pl-6">
              <Sparkle size={28} color="var(--color-clay-accent)" className="absolute -top-2 -left-1" style={{ transform: 'rotate(10deg)' }} />
              <p className="text-[13px] text-clay-ink-soft italic leading-relaxed">
                {lang === 'vi'
                  ? '"Mình cố gắng trả lời mọi tin nhắn — dù không hợp tác được. Cảm ơn bạn đã nhắn nhé."'
                  : '"I try to reply to every message — even if we can\'t collab. Thanks for reaching out."'}
              </p>
              <p className="text-xs font-bold text-clay-accent mt-2">— Linh Chi</p>
            </div>
          </div>

          {/* Quick message form */}
          <ClayCard bg="var(--color-clay-surface)" className="p-8">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="text-5xl mb-4">💌</div>
                <h3 className="font-display text-[28px] font-semibold tracking-tight mb-2">
                  {lang === 'vi' ? 'Gửi rồi!' : 'Sent!'}
                </h3>
                <p className="text-clay-ink-soft text-sm">
                  {lang === 'vi' ? 'Mình sẽ phản hồi trong 24h.' : "I'll reply within 24h."}
                </p>
              </motion.div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-6">
                  {lang === 'vi' ? '✉️ Gửi tin nhắn nhanh' : '✉️ Quick message'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                      {lang === 'vi' ? 'Tên bạn' : 'Your name'} *
                    </Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'Jane Smith'} required />
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                      Email *
                    </Label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
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
