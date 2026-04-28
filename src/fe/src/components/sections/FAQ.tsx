import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { useLang } from '@/hooks/useLang'
import { FAQS as FAQS_FALLBACK } from '@/data/koc-data'
import { fetchFaqs } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

export function FAQ() {
  const { lang } = useLang()
  const FAQS = useSheetData('faqs', fetchFaqs, FAQS_FALLBACK)
  if (FAQS.length === 0) return null
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 py-14 lg:py-20">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-block px-3 py-1.5 rounded-full bg-clay-lilac shadow-clay text-[11px] font-bold text-[#5B3A8C] uppercase tracking-widest mb-3 lg:mb-4">
            ❓ FAQ
          </div>
          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-1.5px] text-clay-ink leading-[1.05]">
            {lang === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently asked'}
          </h2>
        </div>
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q.en || faq.q.vi} value={faq.q.en || faq.q.vi}>
                <AccordionTrigger>{faq.q[lang]}</AccordionTrigger>
                <AccordionContent>{faq.a[lang]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
