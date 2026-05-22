import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

type Testimonial = {
  quote: string
  short: string
  username: string
  location: string
  flag: string
  tier: 'Pro Tier' | 'Elite Tier'
  game: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    short: 'Onboarding was the fastest part — under 24 hours from intro to live deal.',
    quote: `I had read a fair bit about partner channels before reaching out. What surprised me was how fast the onboarding actually moved — DM at 11am Sofia time on a Tuesday, volume snapshot reviewed by mid-afternoon, desk approval the same evening, deal active the following Monday. Now five months in, the Monday wire arrives in USDT like clockwork at roughly 09:30 UTC. No drama, no chasing.`,
    username: 'I.D.',
    location: 'Sofia, Bulgaria',
    flag: '🇧🇬',
    tier: 'Pro Tier',
    game: 'Crash + Slot Battles',
    stars: 5,
  },
  {
    short: 'Sportsbook inclusion changed my year — Hugo built that in upfront.',
    quote: `My book is roughly two-thirds sportsbook, one-third casino. Nearly every "VIP deal" I had been pitched previously either excluded sportsbook entirely or applied a much lower rate to it. Hugo set up my Elite structure to blend both sides at the same 20% headline rate. That single design choice meant my first six months recovered roughly 18% more than what I would have gotten on any other operator's public top tier.`,
    username: 'A.W.',
    location: 'Jakarta, Indonesia',
    flag: '🇮🇩',
    tier: 'Elite Tier',
    game: 'Sportsbook + Slots',
    stars: 5,
  },
  {
    short: 'The Monday statement is what I value most — full transparency every cycle.',
    quote: `What kept me on the channel long-term is the Monday breakdown. Every week at 10am UTC I receive a clean PDF: total wagered, total returned, net loss split by vertical, applied compensation rate, exact crypto amount, on-chain tx hash. Eight months in, the cumulative recovered amount is within 1.2% of what Hugo originally projected. That kind of forecast accuracy is genuinely rare in this industry.`,
    username: 'C.O.',
    location: 'Cork, Ireland',
    flag: '🇮🇪',
    tier: 'Elite Tier',
    game: 'Mixed (Originals + Live)',
    stars: 5,
  },
  {
    short: 'Discretion is built in — no public leaderboard, no creator content rotation.',
    quote: `Privacy was non-negotiable for me. Hugo runs a closed partner book — no profile listings, no community channels, no creator-collab features. My tier, rate and volume sit between me and the desk. I asked specifically before signing up, and seven months later the channel has operated exactly as described. For someone running a serious bankroll, that operational discretion is worth a meaningful premium on its own.`,
    username: 'F.M.',
    location: 'Santiago, Chile',
    flag: '🇨🇱',
    tier: 'Elite Tier',
    game: 'Originals + Sportsbook',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-gamdom-lime' : 'text-slate-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

function FlipCard({ t, delay }: { t: Testimonial; delay: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.55, delay, ease: [0.65, 0, 0.35, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="relative h-full"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT */}
        <div
          className="card scale-card p-7 h-full flex flex-col absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gamdom-teal/10 border border-gamdom-teal/30 flex items-center justify-center text-2xl"
                 style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                 aria-hidden="true">
              {t.flag}
            </div>
            <div className="flex-1">
              <div className="text-white font-bold font-display text-sm">{t.username}</div>
              <div className="text-slate-500 text-xs">{t.location}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StarRating count={t.stars} />
              <span className="text-[10px] uppercase tracking-wider font-display text-gamdom-teal-light">
                {t.tier}
              </span>
            </div>
          </div>
          <p className="text-slate-200 font-medium font-display text-lg leading-relaxed flex-1">
            "{t.short}"
          </p>
          <div className="mt-4 pt-4 border-t border-gamdom-border/50 flex items-center justify-between text-xs">
            <span className="text-slate-500">{t.game}</span>
            <span className="text-gamdom-teal-light font-display uppercase tracking-wider flex items-center gap-1">
              Hover for full quote →
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="card scale-card p-7 h-full flex flex-col absolute inset-0 bg-gamdom-teal/8 border-gamdom-teal/50"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-4xl text-gamdom-teal/40 font-serif leading-none mb-2" aria-hidden="true">"</div>
          <blockquote className="text-slate-100 leading-relaxed text-sm flex-1">
            {t.quote}
          </blockquote>
          <div className="mt-4 pt-4 border-t border-gamdom-teal/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">{t.flag}</span>
              <span className="text-white font-bold font-display">{t.username}</span>
              <span className="text-slate-500">· {t.location}</span>
            </div>
            <span className="text-gamdom-teal-light font-display uppercase tracking-wider">
              {t.tier}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gamdom-darker">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">Field Reports</span>
            <h2 className="section-heading mt-2">
              What Active Elite & Pro Clients Say{' '}
              <span className="text-gam-gradient">After Five+ Months In The Channel</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Hover any card for the full quote. Names and exact wager numbers abbreviated
              at each client's explicit request — discretion is part of the deal.
            </p>
          </div>
        </ClipReveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={t.username} className="min-h-[280px]">
              <FlipCard t={t} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
