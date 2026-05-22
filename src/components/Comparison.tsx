import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TELEGRAM_URL } from '../seo/siteMeta'

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

type Milestone = {
  feature: string
  partner: string
  partnerNote: string
  publicPath: string
  publicNote: string
}

const milestones: Milestone[] = [
  {
    feature: 'Onboarding speed',
    partner: '48 hours',
    partnerNote: 'Hugo intake → volume snapshot → desk approval → live the following Monday.',
    publicPath: '8 – 14 weeks',
    publicNote: 'Grinding tier-by-tier through the public Reward Race before any meaningful rate unlocks.',
  },
  {
    feature: 'Compensation rate ceiling',
    partner: 'Up to 20%',
    partnerNote: 'Negotiated case-by-case with the Gamdom VIP desk based on sustained volume.',
    publicPath: '5% – 7% effective',
    publicNote: 'Hard plateau even at the top of the public Reward Race ladder.',
  },
  {
    feature: 'Rollover on compensation',
    partner: 'Zero',
    partnerNote: 'Cash credited as immediately-withdrawable balance, no rollover multiplier.',
    publicPath: '30× – 50× standard',
    publicNote: 'Public-tier bonuses come attached to wagering multipliers calibrated near zero EV.',
  },
  {
    feature: 'Sportsbook inclusion',
    partner: 'Yes, blended',
    partnerNote: 'Casino + sportsbook net losses combine into a single weekly figure at the same rate.',
    publicPath: 'No / partial',
    publicNote: 'Public structures typically keep casino and sportsbook on separate ledgers.',
  },
  {
    feature: 'Cashier ceiling',
    partner: 'Lifted on request',
    partnerNote: 'Per-tx withdrawal caps raised for Elite accounts via direct VIP desk approval.',
    publicPath: 'Fixed defaults',
    publicNote: 'Per-transaction withdrawal caps are non-negotiable through public channels.',
  },
  {
    feature: 'Issue escalation route',
    partner: 'VIP desk by name',
    partnerNote: 'Hugo pings the operations desk directly. Resolution measured in hours, not days.',
    publicPath: 'Standard support queue',
    publicNote: 'Shared ticket queue with millions of other accounts. Multi-day resolution windows.',
  },
  {
    feature: 'Event seeding',
    partner: 'Closed leaderboards',
    partnerNote: 'Invitations to closed Slot Battles tournaments and creator-collab events.',
    publicPath: 'Public-only events',
    publicNote: 'Standard accounts compete against the entire player base in open leaderboards.',
  },
  {
    feature: 'Account visibility',
    partner: 'Private partner book',
    partnerNote: 'Tier, rate and volume stay strictly between you, Hugo and the desk.',
    publicPath: 'Public leaderboard',
    publicNote: 'Default Reward Race standings appear on the public leaderboard visible to all players.',
  },
]

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 bg-gamdom-darker">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">Channel Comparison</span>
            <h2 className="section-heading mt-2">
              Partner Channel Vs. Public Path —{' '}
              <span className="text-gam-gradient">A Vertical Walkthrough</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Same casino, same cashier, same games. Two radically different commercial
              outcomes. Below is the eight-milestone walkthrough comparing the partner
              channel to the public path, one row at a time.
            </p>
          </div>
        </ClipReveal>

        {/* Vertical timeline with milestone markers — distinct from sibling layouts */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gamdom-teal/50 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                {/* Hex milestone marker on the timeline */}
                <div
                  className="absolute left-4 top-3 w-8 h-8 bg-gradient-to-br from-gamdom-teal to-gamdom-lime text-gamdom-darker text-xs font-black font-display flex items-center justify-center shadow-teal-glow-sm"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Feature title */}
                <h4 className="text-white font-bold font-display text-lg mb-3">{m.feature}</h4>

                {/* Two columns */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Partner card */}
                  <div className="rounded-lg border border-gamdom-teal/40 bg-gamdom-teal/8 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-gamdom-teal-light font-display font-bold mb-1">
                      Partner channel
                    </div>
                    <div className="text-gamdom-teal-light font-extrabold text-lg num mb-1.5">
                      {m.partner}
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.partnerNote}</p>
                  </div>

                  {/* Public card */}
                  <div className="rounded-lg border border-gamdom-border bg-gamdom-darker/40 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-display font-bold mb-1">
                      Public path
                    </div>
                    <div className="text-slate-300 font-bold text-lg num mb-1.5">
                      {m.publicPath}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{m.publicNote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <ClipReveal className="mt-12 text-center">
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Eight milestones, eight different outcomes. The platform stays the same — only
            the commercial paperwork changes. For an Elite-volume player, that paperwork is
            worth roughly four figures of recovered loss every single week.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg"
          >
            Open The Elite Conversation ↗
          </a>
        </ClipReveal>
      </div>
    </section>
  )
}
