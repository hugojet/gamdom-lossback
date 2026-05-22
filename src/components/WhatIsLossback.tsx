import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

function ClipReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
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

type CollapseRow = {
  title: string
  short: string
  full: string
}

const collapseRows: CollapseRow[] = [
  {
    title: 'How is "net loss" defined?',
    short: 'Total wagered minus total returned, over a seven-day window.',
    full: 'Net loss is the simple arithmetic difference between total wagered and total returned to the player across the settlement window. If you wagered $80,000 over a week and the cashier returned $74,500 in winnings, your net loss is $5,500. That figure — and nothing else — feeds the lossback calculation. Bonuses, free spins and any other operator-side credits do not enter the formula.',
  },
  {
    title: 'What is "effective edge"?',
    short: 'The operator margin minus the lossback share you reclaim.',
    full: 'Effective edge is the actual playing margin you experience once lossback is applied. If Gamdom\'s blended margin is 3.2% and you receive a 20% Elite lossback rate on net losses, the effective edge becomes 3.2% × (1 − 0.20) = 2.56%. It is the single most important number when comparing reward structures: lower is better, and lossback moves it more than any other Gamdom reward mechanism.',
  },
  {
    title: 'Is rollover the same thing as wagering requirements?',
    short: 'Yes. And the lossback deal has zero of either.',
    full: 'Rollover and wagering requirements are the same mechanism under two names: a multiplier (typically 30× to 50× of the bonus amount) that you must wager before the rewarded funds can be withdrawn. Standard deposit bonuses are engineered around rollover. Gamdom Elite lossback, in contrast, is paid as immediately-withdrawable cash balance with no rollover multiplier whatsoever.',
  },
  {
    title: 'What does "settlement window" mean?',
    short: 'A rolling Monday-to-Sunday cycle, paid the following Monday.',
    full: 'The settlement window is the seven-day period over which your net loss is tallied. Hugo\'s structure uses a Monday-00:00-to-Sunday-23:59 UTC window. The Monday following the window closing is when the lossback amount is calculated, statement issued and crypto wire executed. Cadence is automatic and never breaks once activated.',
  },
  {
    title: 'Are bonuses and lossback stackable?',
    short: 'Partially. Lossback always applies, regardless of bonus status.',
    full: 'The Elite lossback rate is calculated against your raw net loss, independent of any other reward credits or bonuses sitting in your account. Public-tier bonuses can run alongside lossback in many cases, but the lossback calculation only looks at the cash-vs-cash net loss figure — bonus credits and their associated wagering progress remain a separate ledger.',
  },
]

function CollapseRowItem({ row, index }: { row: CollapseRow; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="rounded-lg border border-gamdom-border bg-gamdom-card/40 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-gamdom-card/70 transition-colors"
        aria-expanded={open}
      >
        <span className="num text-xs text-gamdom-teal-light font-display tracking-wider mt-1 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <h4 className="text-white font-bold font-display mb-1">{row.title}</h4>
          <p className="text-slate-400 text-sm">{row.short}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gamdom-teal-light flex-shrink-0 mt-1"
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pl-14 text-slate-300 text-sm leading-relaxed border-t border-gamdom-border/50 pt-4">
              {row.full}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function WhatIsLossback() {
  return (
    <section id="what-is-lossback" className="py-24 bg-gamdom-dark">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">Lossback 101</span>
            <h2 className="section-heading mt-2">
              How A Gamdom Lossback Deal{' '}
              <span className="text-gam-gradient">Actually Works Under The Hood</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Four reward mechanics live on every crypto casino — only one of them is
              genuinely engineered to reward sustained volume. Here is the structural
              breakdown.
            </p>
          </div>
        </ClipReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ClipReveal>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                A <strong className="text-white">Gamdom lossback</strong> — internally called
                "the weekly lossback" — pays back a percentage of your net losses across
                a seven-day window. Settlement happens in crypto with zero rollover, no game
                restrictions, no minimum-odds requirement and no clawback against future
                weeks. It is the highest-EV reward instrument on the platform and lives
                permanently off the public promo grid.
              </p>
              <p>
                Four reward mechanics get conflated in casino conversations. Each behaves
                fundamentally differently from an expected-value standpoint:
              </p>
              <div className="space-y-4">
                <div className="card border-l-4 border-l-gamdom-teal">
                  <h3 className="font-bold text-white text-lg mb-2 font-display">Lossback (the deal)</h3>
                  <p>
                    Tracks net loss across the seven-day window and pays a fixed percentage
                    of that figure back to your wallet. If a week closes $40,000 wagered,
                    $35,000 returned and a net loss of $5,000, a 20% Elite lossback rate
                    wires{' '}
                    <strong className="text-white">$1,000 on Monday morning</strong>. No
                    rollover. No withdrawal hold. No carry-forward against next week.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-white text-lg mb-2 font-display">Rakeback</h3>
                  <p>
                    Pays a small slice of the operator's playing edge on every bet,
                    regardless of session outcome. Useful for very-high-frequency grinders,
                    but capped 1% to 4% of the actual margin and indifferent to whether your
                    week ended in profit or loss.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-white text-lg mb-2 font-display">Deposit / reload bonuses</h3>
                  <p>
                    Headline figures look generous — 100% match, free spins, deposit
                    multipliers — but every dollar carries a 30× to 50× rollover multiplier
                    engineered so the statistical expected withdrawable value lands at or
                    below zero. Acquisition tool, not a retention reward.
                  </p>
                </div>
                <div className="card">
                  <h3 className="font-bold text-white text-lg mb-2 font-display">Public reward race & loyalty</h3>
                  <p>
                    Gamdom's public Reward-Race system pays level-up bonuses, weekly drops
                    and a top-tier lossback of around 6%–7% effective. Fine for casual play
                    but plateaus far below what the partner channel can negotiate. The
                    effective ceiling is structural and unavoidable through the public
                    funnel.
                  </p>
                </div>
              </div>
              <p>
                The <strong className="text-white">Elite lossback rate</strong> Hugo
                negotiates short-circuits that ceiling. Authorised partners work directly
                with Gamdom's VIP operations desk, which means your rate is calibrated to
                your sustained volume — not to which loyalty colour you have climbed to. For
                a player processing $180,000+ per month, the gap between a 6% public ceiling
                and a 20% Elite rate works out to roughly{' '}
                <strong className="text-white">$1,700 to $2,600 of recovered net loss per
                week</strong>, applied directly to the bankroll.
              </p>
              <p>
                None of this changes single-session variance. A spiky Slot Battles run is
                still a spiky run. What it changes is the long-run{' '}
                <strong className="text-white">effective edge</strong>: a 3.2% statistical
                edge combined with a 20% lossback behaves like a 2.56% effective edge
                over the year. That delta, compounded over annual volume, is the entire
                reason the partner channel exists.
              </p>
            </div>
          </ClipReveal>

          <ClipReveal delay={0.1}>
            <div className="sticky top-8 space-y-8">
              <div className="card p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center font-display">
                  One lossback week, drawn as a hex flow
                </h3>
                {/* Hexagonal flow diagram — 5 hex nodes arranged in a "flower" + central hex */}
                <svg viewBox="0 0 400 400" className="w-full max-w-sm mx-auto" aria-label="Hexagonal Gamdom lossback flow diagram">
                  <defs>
                    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#bef264" />
                    </linearGradient>
                  </defs>

                  {/* Central hex — lossback amount */}
                  <polygon
                    points="200,140 250,170 250,230 200,260 150,230 150,170"
                    fill="url(#hexGrad)"
                    fillOpacity="0.18"
                    stroke="url(#hexGrad)"
                    strokeWidth="2.5"
                  />
                  <text x="200" y="195" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="Unbounded, sans-serif">$1,000</text>
                  <text x="200" y="216" textAnchor="middle" fill="#bef264" fontSize="11" fontWeight="600">COMPENSATION</text>
                  <text x="200" y="232" textAnchor="middle" fill="#94a3b8" fontSize="9">paid Monday morning</text>

                  {/* Surrounding hexes — five stages */}
                  {/* Top: Player */}
                  <polygon
                    points="200,30 240,50 240,90 200,110 160,90 160,50"
                    fill="#13302b"
                    stroke="#14b8a6"
                    strokeWidth="2"
                  />
                  <text x="200" y="68" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">YOU · ELITE</text>
                  <text x="200" y="86" textAnchor="middle" fill="#94a3b8" fontSize="10">$120k weekly wager</text>

                  {/* Right: Gamdom */}
                  <polygon
                    points="330,110 370,130 370,170 330,190 290,170 290,130"
                    fill="#13302b"
                    stroke="#2dd4bf"
                    strokeWidth="2"
                  />
                  <text x="330" y="148" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">GAMDOM</text>
                  <text x="330" y="164" textAnchor="middle" fill="#94a3b8" fontSize="10">~3.2% edge</text>

                  {/* Right-bottom: Settlement */}
                  <polygon
                    points="330,230 370,250 370,290 330,310 290,290 290,250"
                    fill="#13302b"
                    stroke="#bef264"
                    strokeWidth="2"
                  />
                  <text x="330" y="268" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">NET LOSS</text>
                  <text x="330" y="284" textAnchor="middle" fill="#94a3b8" fontSize="10">$5,000 wk</text>

                  {/* Bottom: Hugo */}
                  <polygon
                    points="200,290 240,310 240,350 200,370 160,350 160,310"
                    fill="#13302b"
                    stroke="#bef264"
                    strokeWidth="2"
                  />
                  <text x="200" y="328" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">HUGO</text>
                  <text x="200" y="346" textAnchor="middle" fill="#94a3b8" fontSize="10">desk negotiation</text>

                  {/* Left: 20% rate */}
                  <polygon
                    points="70,170 110,190 110,230 70,250 30,230 30,190"
                    fill="#13302b"
                    stroke="#2dd4bf"
                    strokeWidth="2"
                  />
                  <text x="70" y="208" textAnchor="middle" fill="#2dd4bf" fontSize="13" fontWeight="800">20%</text>
                  <text x="70" y="224" textAnchor="middle" fill="#94a3b8" fontSize="10">Elite rate</text>

                  {/* Connecting thin lines from outer hexes to central */}
                  <line x1="200" y1="110" x2="200" y2="140" stroke="#284c45" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="290" y1="150" x2="250" y2="170" stroke="#284c45" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="290" y1="250" x2="250" y2="230" stroke="#284c45" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="200" y1="290" x2="200" y2="260" stroke="#284c45" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="110" y1="200" x2="150" y2="200" stroke="#284c45" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '0×', label: 'Rollover on lossback' },
                  { value: '20%', label: 'Elite rate ceiling' },
                  { value: '7d', label: 'Settlement window' },
                  { value: 'Mon', label: 'Wire arrives' },
                ].map((stat) => (
                  <div key={stat.label} className="card text-center">
                    <div className="num text-2xl font-extrabold text-gam-gradient">{stat.value}</div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ClipReveal>
        </div>

        {/* Comparison — accordion-collapse layout, distinct from siblings' tables/cards/strips/splits */}
        <ClipReveal className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-2 text-center font-display">
            Frequently asked structural questions
          </h3>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Mechanical detail tends to land better as expandable rows than as a comparison
            table. Tap any row for the full answer.
          </p>
          <div className="max-w-3xl mx-auto space-y-3">
            {collapseRows.map((row, i) => (
              <CollapseRowItem key={row.title} row={row} index={i} />
            ))}
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
