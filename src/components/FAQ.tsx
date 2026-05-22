import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { faqs, type FaqItem } from '../data/faqs'

function ClipReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={inView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const HexBadge = ({ children, open }: { children: React.ReactNode; open: boolean }) => (
  <motion.div
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
    className={`flex items-center justify-center w-10 h-10 font-display text-xs font-bold transition-colors flex-shrink-0 ${
      open ? 'bg-gamdom-teal text-gamdom-darker shadow-teal-glow-sm' : 'bg-gamdom-card-light text-gamdom-teal-light border border-gamdom-border'
    }`}
    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
    aria-hidden="true"
  >
    {children}
  </motion.div>
)

function FAQItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      viewport={{ once: true }}
      className={`rounded-lg overflow-hidden transition-colors duration-300 border bg-gamdom-card/40 ${
        open ? 'border-gamdom-teal/50' : 'border-gamdom-border'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-gamdom-card/70 transition-colors duration-200"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="num text-xs text-gamdom-teal-light/70 font-display tracking-wider flex-shrink-0 mt-2 w-8">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-semibold text-white font-display pt-1">{faq.q}</span>
        <HexBadge open={open}>{open ? '−' : '+'}</HexBadge>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="region"
          >
            <div className="px-5 pl-16 pb-5 text-slate-300 leading-relaxed border-t border-gamdom-border/50 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gamdom-card/15">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">FAQ</span>
            <h2 className="section-heading mt-2">
              Eleven Structural Questions{' '}
              <span className="text-gam-gradient">Elite Players Always Send In Their First Message</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              The questions Hugo's inbox receives most frequently — rate-setting,
              eligibility, payout mechanics, sportsbook coverage, account discretion.
              Pre-answered below so the first DM can skip straight to your specific
              situation.
            </p>
          </div>
        </ClipReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
