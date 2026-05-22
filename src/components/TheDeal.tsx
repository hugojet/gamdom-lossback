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

const HexIcon = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gamdom-teal/10 border border-gamdom-teal/30 text-gamdom-teal-light"
    style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
  >
    <span className="text-3xl">{children}</span>
  </div>
)

const steps = [
  {
    number: 1,
    title: 'Open the channel on Telegram',
    desc: 'Drop a short intro to @hugo_lossback_bot. Hugo handles intake personally — first reply typically inside two hours during business windows, never more than a single working day.',
    icon: '◊',
  },
  {
    number: 2,
    title: 'Quick volume snapshot',
    desc: 'No invasive KYC paperwork. Two or three screenshots of your Gamdom wagering panel confirm tier eligibility — that is the entire admin overhead before the desk activates the deal.',
    icon: '◎',
  },
  {
    number: 3,
    title: 'Lossback lands every Monday',
    desc: 'From the next Monday onward, your net losses are aggregated automatically. The negotiated percentage clears into your Gamdom wallet in your preferred cryptocurrency, on-chain tx hash included with the statement.',
    icon: '✦',
  },
]

const perks = [
  { icon: '⬡', title: 'Slot Battles & Crash priority', desc: 'Elite accounts receive elevated single-bet caps on Crash and direct entry into closed Slot Battles tournaments — events the public catalogue throttles or excludes entirely.' },
  { icon: '⚑', title: 'Sportsbook losses included', desc: 'Net losses across the sportsbook side (parlays, live, pre-match) blend into the same weekly lossback calculation as casino activity. Public reward structures usually exclude this.' },
  { icon: '◆', title: 'Closed-leaderboard seeding', desc: 'Direct seeding into invite-only leaderboard races and creator-partnership tournaments that never appear on the public promo grid.' },
  { icon: '↥', title: 'Cashier ceilings lifted', desc: 'Default per-transaction withdrawal caps are raised for verified Elite accounts on request. Especially valuable for players cycling significant weekly capital between Gamdom and external wallets.' },
  { icon: '◈', title: 'Monday breakdown statement', desc: 'Every Monday morning you receive a transparent breakdown: total wagered, total returned, net loss broken out by vertical, applied lossback rate, exact crypto amount, on-chain tx hash. Full transparency every cycle.' },
  { icon: '⛨', title: 'Account-level discretion', desc: 'Your tier, your negotiated rate and your wagering history stay strictly between you, Hugo and the Gamdom VIP desk. No leaderboard, no public profile, no creator rotation — Elite clients value privacy.' },
]

export default function TheDeal() {
  return (
    <section id="how-it-works" className="py-24 bg-gamdom-darker">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">Mechanics</span>
            <h2 className="section-heading mt-2">
              Three Steps To <span className="text-gam-gradient">Elite Activation</span>
              <br />Then Automatic Weekly Settlement
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Activation is fast. The first Telegram conversation is the only friction step;
              everything afterwards is automated by the Gamdom VIP desk on the back end.
            </p>
          </div>
        </ClipReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-20 relative">
          <div className="hidden md:block absolute top-20 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-gamdom-teal to-transparent opacity-40" aria-hidden="true" />
          {steps.map((step, i) => (
            <ClipReveal key={step.number} delay={i * 0.12}>
              <div className="card scale-card text-center relative">
                <HexIcon>{step.icon}</HexIcon>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-gamdom-teal to-gamdom-lime text-gamdom-darker text-sm font-black flex items-center justify-center shadow-teal-glow-sm font-display"
                     style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                {step.number < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gamdom-teal text-2xl z-10" aria-hidden="true">→</div>
                )}
              </div>
            </ClipReveal>
          ))}
        </div>

        <ClipReveal className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-8 font-display">
            Two tiers, set by sustained monthly volume
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card scale-card border border-gamdom-border relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gamdom-teal/8 blur-2xl" aria-hidden="true" />
              <div className="teal-badge mb-4">Tier 1</div>
              <h4 className="text-2xl font-extrabold text-white mb-2 font-display">Pro Tier</h4>
              <div className="num text-3xl font-extrabold text-gam-gradient mb-1">10%</div>
              <div className="text-slate-400 text-sm mb-6">Weekly net-loss lossback</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Monthly wager band</span>
                  <span className="text-white font-semibold num">$25k – $180k</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Sample monthly net loss</span>
                  <span className="text-white font-semibold num">$5,760</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Weekly lossback (avg)</span>
                  <span className="text-gamdom-teal-light font-bold num">~$133</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Annualised lossback</span>
                  <span className="text-gamdom-teal-light font-bold num">~$6,900</span>
                </div>
              </div>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full mt-6 justify-center text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
                Claim My Deal
              </a>
            </div>

            <div className="card scale-card border-2 border-gamdom-teal/60 relative overflow-hidden shadow-teal-glow">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gamdom-teal/12 blur-2xl" aria-hidden="true" />
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-gamdom-teal to-gamdom-lime text-gamdom-darker text-xs font-black px-2.5 py-1 rounded font-display tracking-wide uppercase">Elite</span>
              </div>
              <div className="teal-badge mb-4">Tier 2</div>
              <h4 className="text-2xl font-extrabold text-white mb-2 font-display">Elite Tier ⬡</h4>
              <div className="num text-3xl font-extrabold text-gam-gradient mb-1">Up to 20%</div>
              <div className="text-slate-400 text-sm mb-6">Weekly net-loss lossback</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Monthly wager band</span>
                  <span className="text-white font-semibold num">$180k+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Sample monthly net loss</span>
                  <span className="text-white font-semibold num">$9,360</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gamdom-border/50">
                  <span className="text-slate-400">Weekly lossback (avg)</span>
                  <span className="text-gamdom-teal-light font-bold num">~$432</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Annualised lossback</span>
                  <span className="text-gamdom-teal-light font-bold num">~$22,400</span>
                </div>
              </div>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-6 justify-center text-sm animate-teal-pulse">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
                Claim My Deal
              </a>
            </div>
          </div>
        </ClipReveal>

        <ClipReveal>
          <h3 className="text-2xl font-bold text-white text-center mb-8 font-display">
            What ships alongside the headline percentage
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.65, 0, 0.35, 1] }}
                viewport={{ once: true }}
                className="card scale-card flex gap-4"
              >
                <span className="text-2xl flex-shrink-0 text-gamdom-teal-light" aria-hidden="true">{perk.icon}</span>
                <div>
                  <h4 className="font-bold text-white mb-1 font-display">{perk.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
