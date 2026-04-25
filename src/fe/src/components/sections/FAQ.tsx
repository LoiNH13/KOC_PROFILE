import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { useLang } from '@/hooks/useLang'
import { FAQS as FAQS_FALLBACK } from '@/data/koc-data'
import { fetchFaqs } from '@/lib/sheets'
import { useSheetData } from '@/hooks/useSheetData'

export function FAQ() {
  const { lang } = useLang()
  const FAQS = useSheetData('faqs', fetchFaqs, FAQS_FALLBACK)
  return (
    <section className="px-12 py-20">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-clay-lilac shadow-clay text-xs font-bold text-[#5B3A8C] uppercase tracking-widest mb-4">
            ❓ FAQ
          </div>
          <h2 className="font-display text-[52px] font-semibold tracking-[-1.8px] text-clay-ink leading-none">
            {lang === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently asked'}
          </h2>
        </div>
        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
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
