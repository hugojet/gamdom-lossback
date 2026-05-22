import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../seo/siteMeta'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="claim" className="py-24 relative overflow-hidden bg-gamdom-darker">
      <div className="absolute inset-0 gam-sweep-bg opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gamdom-teal-glow opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 gam-hex-bg opacity-50" aria-hidden="true" />

      <div className="relative z-10 section-container text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={inView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-gamdom-teal/15 border border-gamdom-teal/40 text-gamdom-teal-light px-5 py-2 rounded-md text-sm font-bold font-display tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-gamdom-teal animate-pulse" aria-hidden="true" />
              Elite whitelist accepting four new clients this week
            </span>
          </div>

          <h2 className="section-heading mb-6">
            One Telegram Channel With Hugo And{' '}
            <span className="text-gam-gradient">The Lossback Wires Monday</span>
          </h2>

          <p className="text-slate-200 text-lg leading-relaxed mb-8">
            If you are already processing $25,000+ of monthly wager on Gamdom.com across
            Crash, Mines, Slot Battles, slots, live tables or the sportsbook, every week
            without a partner-channel lossback deal is a week of recoverable net loss
            written off entirely. The arithmetic stays the same regardless of whether the
            first DM has been sent.
          </p>
          <p className="text-slate-200 text-lg leading-relaxed mb-10">
            Hugo's partner channel returns up to 20% of weekly net losses straight back into
            your Gamdom wallet — paid in crypto, with zero rollover, no take-back conditions
            and no game restrictions. Add a named VIP-desk relationship, cashier-ceiling
            lifts, closed-leaderboard seeding and a transparent Monday-morning breakdown
            statement, and you have the cleanest commercial structure available to a
            sustained Gamdom player. Activation in under forty-eight hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xl px-10 py-5 animate-teal-pulse"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              Claim My Deal
            </a>
          </div>

          <p className="text-slate-300 text-sm">
            Want to clarify something first?{' '}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gamdom-teal-light hover:text-gamdom-lime underline transition-colors font-semibold"
            >
              Send Hugo a direct message at {TELEGRAM_HANDLE}
            </a>
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-12 text-sm text-slate-300">
            {[
              '⬡ Zero rollover, ever',
              '⬡ Account-level discretion',
              '⬡ Live by next Monday',
              '⬡ Crypto-only weekly wire',
            ].map(item => (
              <span key={item} className="font-display tracking-wide">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
