import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TELEGRAM_URL } from '../seo/siteMeta'

function ClipReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={inView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const advantages = [
  { glyph: '⬡', title: 'Direct line to the Gamdom VIP desk', desc: 'Hugo holds a named partner account with Gamdom\'s VIP operations team. Lossback rates, cashier escalations and tournament seeding go through one trusted inbox, not a multi-day support queue.' },
  { glyph: '◈', title: 'Authorised partner standing', desc: 'This is not a recycled affiliate referral. Hugo runs a formal Gamdom partner book — the prerequisite for negotiating bespoke lossback deals on behalf of managed Elite accounts.' },
  { glyph: '⚡', title: 'Lossback live within 48 hours', desc: 'No grinding the public loyalty system for weeks. Once Hugo verifies your volume snapshot, your lossback deal activates the very next Monday for the upcoming weekly window.' },
  { glyph: '◆', title: 'Deal calibrated to your style', desc: 'A Crash-and-Mines player and a slots-heavy player need different lossback mechanics. Hugo negotiates the rate, the verticals covered and the bet caps to fit the way you actually play.' },
  { glyph: '↥', title: 'Cashier caps lifted on request', desc: 'Default per-transaction withdrawal ceilings get raised for verified Elite accounts working through Hugo. For players moving meaningful weekly capital, this can matter as much as the headline percentage.' },
  { glyph: '↻', title: 'Quarterly rate re-negotiation', desc: 'Volume curves shift. Every quarter Hugo re-opens the rate conversation with the Gamdom desk based on your sustained trajectory — long-term clients regularly move from Pro tier into mid-Elite brackets.' },
]

export default function WhyHugo() {
  return (
    <section id="why-hugo" className="py-24 bg-gamdom-card/15">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">The Liaison</span>
            <h2 className="section-heading mt-2">
              Why The Lossback Flows Through{' '}
              <span className="text-gam-gradient">A Named VIP Partner</span>
              <br />Rather Than A Sign-Up Page
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Public sign-ups are calibrated to convert deposits, not to reward sustained
              volume. A partner channel is the only path where the rate-setting conversation
              actually happens.
            </p>
          </div>
        </ClipReveal>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <ClipReveal className="lg:col-span-1">
            <div className="card scale-card border-2 border-gamdom-teal/40 text-center sticky top-8 shadow-teal-glow-sm">
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gamdom-teal/30 to-gamdom-lime/25 border-2 border-gamdom-teal/40 flex items-center justify-center mx-auto mb-4">
                <svg className="w-14 h-14 text-gamdom-teal glow-teal" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1 font-display">Hugo</h3>
              <div className="teal-badge mb-4 mx-auto w-fit">Gamdom VIP Liaison</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Authorised Gamdom.com partner with a direct working relationship to the VIP
                operations desk. Specialises in onboarding Elite-volume players under bespoke
                weekly lossback and cashier-lift agreements.
              </p>
              <div className="space-y-3 text-sm text-left">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-gamdom-teal-light">⬡</span>
                  Authorised Gamdom partner book
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-gamdom-teal-light">⬡</span>
                  70+ Elite players actively managed
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-gamdom-teal-light">⬡</span>
                  Avg first-reply under 2 hours
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-gamdom-teal-light">⬡</span>
                  English / French / Spanish / Italian
                </div>
              </div>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-6 justify-center"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
                Claim My Deal
              </a>
            </div>
          </ClipReveal>

          <div className="lg:col-span-2 space-y-6">
            <ClipReveal className="text-slate-300 leading-relaxed space-y-4">
              <p className="text-lg">
                A generic Gamdom sign-up link drops you into the public onboarding pipeline:
                whatever welcome incentive happens to be running this month, the standard
                Reward-Race system, default cashier ceilings, and a support inbox shared with
                every other account. There is no human reviewing your behaviour and no one
                negotiating on your behalf — meaningful lossback rates remain entirely
                out of reach.
              </p>
              <p>
                An <strong className="text-white">authorised partner</strong> sits one tier
                up the commercial stack. The partner book is a B2B layer above standard
                referral — Hugo's relationship is directly with Gamdom's VIP operations desk,
                the same desk that signs off lossback ceilings, cashier-cap lifts, and
                discretionary tournament seeding. When Hugo presents your volume case, you
                stop being one account in a queue and become a named player in a managed book.
              </p>
              <p>
                For a player running $180,000+ of monthly wager across Crash, Mines, slots
                and the sportsbook, the gap between the public top-tier lossback rate
                (effectively a 5%–7% blended figure at the peak of the public ladder) and a
                negotiated 20% Elite lossback rate works out to roughly{' '}
                <strong className="text-white">$1,700 to $2,600 of recovered net loss per
                week</strong>. Annualised, that figure becomes a material component of any
                serious crypto-gambling bankroll.
              </p>
              <p>
                What the partner channel ultimately delivers, beyond the headline percentage,
                is <strong className="text-white">operational continuity</strong>: a Monday
                statement appearing in chat without you needing to chase it, cashier
                escalation handled before tickets ever fire, rate reviews scheduled
                quarterly. None of this is reproducible through a referral link.
              </p>
            </ClipReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((adv, i) => (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
                  viewport={{ once: true }}
                  className="card scale-card"
                >
                  <div className="flex gap-3">
                    <span className="text-2xl flex-shrink-0 text-gamdom-teal-light" aria-hidden="true">{adv.glyph}</span>
                    <div>
                      <h4 className="font-bold text-white mb-1 font-display">{adv.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
