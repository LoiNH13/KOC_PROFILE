import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ClayCard, CursorGlow } from '@/components/primitives'
import { Nav } from '@/components/layout/Nav'
import { PageHero } from '@/components/layout/PageHero'
import { PageFooter } from '@/components/layout/PageFooter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLang } from '@/hooks/useLang'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { PACKAGES } from '@/data/koc-data'
import type { Page } from '@/types'

interface BookingPageProps { onNavigate: (p: Page) => void }

const NICHES = [
  { key: 'Beauty',    vi: 'Mỹ phẩm',   en: 'Beauty' },
  { key: 'Fashion',   vi: 'Thời trang', en: 'Fashion' },
  { key: 'Food',      vi: 'Ẩm thực',   en: 'Food' },
  { key: 'Fitness',   vi: 'Sức khỏe',  en: 'Fitness' },
  { key: 'Lifestyle', vi: 'Lifestyle',  en: 'Lifestyle' },
  { key: 'Other',     vi: 'Khác',       en: 'Other' },
]

const BUDGETS = [
  { key: 'under500',  vi: 'Dưới 500K',     en: 'Under 500K' },
  { key: '500-1m',    vi: '500K – 1 triệu', en: '500K – 1M' },
  { key: '1m-2m',     vi: '1 – 2 triệu',   en: '1M – 2M' },
  { key: 'above2m',   vi: 'Trên 2 triệu',  en: 'Above 2M' },
]

const TIMELINES = [
  { key: '1w',  vi: '1 tuần',   en: '1 week' },
  { key: '2w',  vi: '2 tuần',   en: '2 weeks' },
  { key: '1m',  vi: '1 tháng',  en: '1 month' },
  { key: 'flex', vi: 'Linh hoạt', en: 'Flexible' },
]

export function BookingPage({ onNavigate }: BookingPageProps) {
  const { lang } = useLang()
  const [step, setStep] = useState(0)
  const { submit, loading: submitting, error: submitError, done: submitted } = useFormSubmit('booking_submissions')

  const [brand, setBrand] = useState('')
  const [contact, setContact] = useState('')
  const [role, setRole] = useState('')
  const [niche, setNiche] = useState('')
  const [pkg, setPkg] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [brief, setBrief] = useState('')

  const steps = [
    { vi: 'Bạn là ai?',       en: 'Who are you?' },
    { vi: 'Collab như nào?',  en: 'Collab vision?' },
    { vi: 'Brief chi tiết',   en: 'Brief details' },
  ]

  const canNext0 = brand.trim() && contact.trim()
  const canNext1 = niche && budget && timeline
  const canSubmit = brief.trim().length >= 20

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    await submit({ brand, contact, role, niche, package_id: pkg, budget, timeline, brief, lang })
  }

  return (
    <div className="relative bg-clay-bg text-clay-ink min-h-screen overflow-x-hidden">
      <CursorGlow size={500} color="rgba(163,230,206,0.25)" />
      <Nav page="booking" onNavigate={onNavigate} />
      <PageHero
        eyebrow={lang === 'vi' ? 'Đặt lịch hợp tác' : 'Book a collab'}
        title={lang === 'vi' ? 'Hãy kể mình nghe.' : "Tell me about it."}
        sub={lang === 'vi' ? 'Điền brief trong 3 bước — mình sẽ phản hồi trong 24h.' : 'Fill out a brief in 3 steps — I reply within 24h.'}
        tone="mint"
      />

      <section className="px-12 pb-24">
        <div className="max-w-[1240px] mx-auto grid grid-cols-[1fr_380px] gap-10 items-start">

          {/* Form card */}
          <ClayCard bg="var(--color-clay-surface)" className="p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-5">🎉</div>
                <h2 className="font-display text-[36px] font-semibold tracking-tight mb-3">
                  {lang === 'vi' ? 'Nhận được rồi!' : 'Got it!'}
                </h2>
                <p className="text-clay-ink-soft text-base leading-relaxed max-w-[380px] mx-auto mb-8">
                  {lang === 'vi'
                    ? 'Mình sẽ đọc brief và phản hồi trong 24 giờ. Check inbox nhé!'
                    : "I'll read your brief and get back to you within 24 hours. Check your inbox!"}
                </p>
                <Button variant="clay" size="md" onClick={() => onNavigate('landing')}>
                  {lang === 'vi' ? 'Về trang chủ' : 'Back to home'}
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Step indicators */}
                <div className="flex items-center gap-0 mb-10">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                      <button
                        onClick={() => i < step && setStep(i)}
                        className="flex items-center gap-2.5 group"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          i === step
                            ? 'bg-clay-accent text-white shadow-clay'
                            : i < step
                            ? 'bg-clay-mint text-clay-ink'
                            : 'bg-clay-bg-alt text-clay-ink-muted'
                        }`}>
                          {i < step ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs font-semibold hidden sm:inline ${i === step ? 'text-clay-ink' : 'text-clay-ink-muted'}`}>
                          {s[lang]}
                        </span>
                      </button>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-3 rounded ${i < step ? 'bg-clay-mint' : 'bg-clay-border'}`} />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                            {lang === 'vi' ? 'Tên brand / sản phẩm' : 'Brand / product name'} *
                          </Label>
                          <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder={lang === 'vi' ? 'vd: Hermosa Beauty' : 'e.g. Hermosa Beauty'} />
                        </div>
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                            {lang === 'vi' ? 'Email / Zalo liên hệ' : 'Email / contact'} *
                          </Label>
                          <Input value={contact} onChange={e => setContact(e.target.value)} placeholder="hello@brand.com" />
                        </div>
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                            {lang === 'vi' ? 'Vai trò của bạn' : 'Your role'}
                          </Label>
                          <Input value={role} onChange={e => setRole(e.target.value)} placeholder={lang === 'vi' ? 'vd: Marketing Manager' : 'e.g. Marketing Manager'} />
                        </div>
                        <div className="pt-2">
                          <Button type="button" variant="clay" size="md" disabled={!canNext0} onClick={() => setStep(1)}>
                            {lang === 'vi' ? 'Tiếp theo →' : 'Next →'}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-7">
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3 block">
                            {lang === 'vi' ? 'Ngách sản phẩm' : 'Product niche'} *
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {NICHES.map(n => (
                              <button key={n.key} type="button"
                                onClick={() => setNiche(n.key)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${niche === n.key ? 'bg-clay-accent text-white border-clay-accent shadow-clay' : 'bg-clay-bg-alt border-clay-border text-clay-ink hover:border-clay-accent'}`}>
                                {n[lang]}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3 block">
                            {lang === 'vi' ? 'Gói hợp tác mong muốn' : 'Preferred package'}
                          </Label>
                          <div className="grid grid-cols-3 gap-3">
                            {PACKAGES.map(p => (
                              <button key={p.id} type="button"
                                onClick={() => setPkg(p.id)}
                                className={`p-3.5 rounded-2xl border text-left transition-all ${pkg === p.id ? 'border-clay-accent bg-clay-pink shadow-clay' : 'border-clay-border bg-clay-bg-alt hover:border-clay-accent'}`}>
                                <p className="text-xs font-bold text-clay-accent uppercase tracking-wider mb-0.5">{p.name[lang]}</p>
                                <p className="text-sm font-semibold text-clay-ink">{p.price[lang]}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3 block">
                            {lang === 'vi' ? 'Ngân sách dự kiến' : 'Estimated budget'} *
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map(b => (
                              <button key={b.key} type="button"
                                onClick={() => setBudget(b.key)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${budget === b.key ? 'bg-clay-butter text-clay-ink border-clay-butter shadow-clay' : 'bg-clay-bg-alt border-clay-border text-clay-ink hover:border-clay-accent'}`}>
                                {b[lang]}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3 block">
                            {lang === 'vi' ? 'Timeline mong muốn' : 'Desired timeline'} *
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map(t => (
                              <button key={t.key} type="button"
                                onClick={() => setTimeline(t.key)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${timeline === t.key ? 'bg-clay-lilac text-clay-ink border-clay-lilac shadow-clay' : 'bg-clay-bg-alt border-clay-border text-clay-ink hover:border-clay-accent'}`}>
                                {t[lang]}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="button" variant="ghost" size="md" onClick={() => setStep(0)}>← {lang === 'vi' ? 'Quay lại' : 'Back'}</Button>
                          <Button type="button" variant="clay" size="md" disabled={!canNext1} onClick={() => setStep(2)}>
                            {lang === 'vi' ? 'Tiếp theo →' : 'Next →'}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div>
                          <Label className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-1.5 block">
                            {lang === 'vi' ? 'Brief chi tiết' : 'Detailed brief'} *
                          </Label>
                          <Textarea
                            rows={7}
                            value={brief}
                            onChange={e => setBrief(e.target.value)}
                            placeholder={lang === 'vi'
                              ? 'Kể mình nghe: sản phẩm cần review là gì, thông điệp chính, đối tượng mục tiêu, bạn kỳ vọng video sẽ truyền tải điều gì...'
                              : 'Tell me: what product needs reviewing, the key message, target audience, what you want the video to convey...'}
                          />
                          <p className="text-xs text-clay-ink-muted mt-1.5">{brief.length} / 20 {lang === 'vi' ? 'ký tự tối thiểu' : 'chars min'}</p>
                        </div>
                        {submitError && (
                          <p className="text-sm text-red-500">
                            {lang === 'vi' ? 'Có lỗi xảy ra. Thử lại hoặc email trực tiếp.' : 'Something went wrong. Try again or email directly.'}
                          </p>
                        )}
                        <div className="flex gap-3 pt-2">
                          <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>← {lang === 'vi' ? 'Quay lại' : 'Back'}</Button>
                          <Button type="submit" variant="clay" size="md" disabled={!canSubmit || submitting}>
                            {submitting ? '...' : lang === 'vi' ? '✉️ Gửi brief' : '✉️ Send brief'}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </>
            )}
          </ClayCard>

          {/* Sidebar */}
          <div className="space-y-5 sticky top-24">
            <ClayCard bg="var(--color-clay-mint)" className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3">
                {lang === 'vi' ? 'Lịch tháng này' : 'This month'}
              </p>
              <div className="space-y-2">
                {[
                  { date: 'T3 29/4', status: 'taken',  vi: 'Đã đặt',  en: 'Taken' },
                  { date: 'T6 2/5',  status: 'open',   vi: 'Còn chỗ', en: 'Open' },
                  { date: 'T3 6/5',  status: 'open',   vi: 'Còn chỗ', en: 'Open' },
                  { date: 'T6 9/5',  status: 'taken',  vi: 'Đã đặt',  en: 'Taken' },
                  { date: 'T3 13/5', status: 'open',   vi: 'Còn chỗ', en: 'Open' },
                ].map(slot => (
                  <div key={slot.date} className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-clay-ink">{slot.date}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${slot.status === 'open' ? 'bg-white/70 text-emerald-700' : 'bg-white/30 text-clay-ink-muted'}`}>
                      {slot[lang === 'vi' ? 'vi' : 'en']}
                    </span>
                  </div>
                ))}
              </div>
            </ClayCard>

            <ClayCard bg="var(--color-clay-butter)" className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-3">
                {lang === 'vi' ? 'Cam kết của mình' : 'My commitment'}
              </p>
              <ul className="space-y-2.5">
                {(lang === 'vi' ? [
                  '✅ Phản hồi trong 24h',
                  '✅ Đọc brief trước khi nhận',
                  '✅ Review thật, không đọc script',
                  '✅ Gửi file gốc sau đăng',
                ] : [
                  '✅ Reply within 24 hours',
                  '✅ Read brief before accepting',
                  '✅ Real review, no scripted reads',
                  '✅ Send raw files after posting',
                ]).map(line => (
                  <li key={line} className="text-sm text-clay-ink font-medium">{line}</li>
                ))}
              </ul>
            </ClayCard>

            <ClayCard bg="var(--color-clay-pink)" className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-clay-ink-muted mb-2">
                {lang === 'vi' ? 'Không nhận' : "Won't accept"}
              </p>
              <p className="text-sm text-clay-ink/80 leading-relaxed">
                {lang === 'vi'
                  ? 'Sản phẩm kém chất lượng, yêu cầu nói dối, hoặc nội dung sai sự thật.'
                  : 'Low-quality products, misleading claims, or dishonest content.'}
              </p>
            </ClayCard>
          </div>
        </div>
      </section>
      <PageFooter onNavigate={onNavigate} />
    </div>
  )
}
