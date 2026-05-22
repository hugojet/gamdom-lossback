import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

function formatUSD(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${Math.round(n).toLocaleString()}`
}

/** Snap counter — values update instantly with a brief scale punch animation,
 *  distinct from spring/ticker/eased counters used elsewhere. */
function SnapValue({ value, className = '' }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.18, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`num ${className}`}
    >
      {formatUSD(value)}
    </motion.span>
  )
}

function SnapPct({ value, className = '' }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.15, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`num ${className}`}
    >
      {value.toFixed(2)}%
    </motion.span>
  )
}

type Tier = 'pro' | 'elite'

type Category = {
  id: 'originals' | 'slots' | 'live' | 'sports'
  label: string
  glyph: string
  edgePct: number
  hint: string
}

const categories: Category[] = [
  { id: 'originals', label: 'Originals',  glyph: '⬡', edgePct: 0.015, hint: 'Crash, Mines, Plinko, Cups — Gamdom\'s proprietary games. Lowest blended edge (~1.5%).' },
  { id: 'slots',     label: 'Slots',      glyph: '◆', edgePct: 0.038, hint: 'Pragmatic, Hacksaw, Nolimit City, Push, Relax — third-party slots, ~3.8% blended margin.' },
  { id: 'live',      label: 'Live Tables', glyph: '◈', edgePct: 0.024, hint: 'Evolution & Pragmatic live dealer — blackjack, roulette, baccarat. ~2.4% blended margin.' },
  { id: 'sports',    label: 'Sportsbook', glyph: '⚑', edgePct: 0.041, hint: 'Pre-match, live, parlays. ~4.1% effective margin across major leagues.' },
]

export default function Calculator() {
  const [monthlyWager, setMonthlyWager] = useState(100_000)
  const [category, setCategory] = useState<Category>(categories[1])
  const [tier, setTier] = useState<Tier>('pro')

  const compPct = tier === 'elite' ? 0.20 : 0.10

  const results = useMemo(() => {
    const monthlyLoss = monthlyWager * category.edgePct
    const monthlyComp = monthlyLoss * compPct
    const weeklyComp = monthlyComp / 4.33
    const annualComp = monthlyComp * 12
    const effectiveEdge = category.edgePct * (1 - compPct) * 100
    return { monthlyLoss, monthlyComp, weeklyComp, annualComp, effectiveEdge }
  }, [monthlyWager, category, compPct])

  return (
    <section id="calculator" className="py-24 bg-gamdom-card/15">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">Compute The Number</span>
            <h2 className="section-heading mt-2">
              Gamdom Lossback Calculator —{' '}
              <span className="text-gam-gradient">What Your Monday Wire Actually Looks Like</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Plug in your real monthly volume, select the game category you actually play,
              choose the tier you would land on. The figures below are statistical
              expectations of what the Monday-morning lossback wire clears.
            </p>
          </div>
        </ClipReveal>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <ClipReveal>
            <div className="card scale-card space-y-8">
              <h3 className="text-xl font-bold text-white font-display">Wager profile</h3>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="wager-slider" className="text-slate-300 font-medium">Monthly wager volume</label>
                  <span className="text-gamdom-teal-light font-bold text-lg num">{formatUSD(monthlyWager)}</span>
                </div>
                <input
                  id="wager-slider"
                  className="gam-range w-full"
                  type="range"
                  min={8000}
                  max={350000}
                  step={2000}
                  value={monthlyWager}
                  onChange={e => setMonthlyWager(Number(e.target.value))}
                  aria-valuemin={8000}
                  aria-valuemax={350000}
                  aria-valuenow={monthlyWager}
                  aria-label="Monthly wager volume in US dollars"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 num">
                  <span>$8k</span>
                  <span>$350k</span>
                </div>
              </div>

              <div>
                <p className="text-slate-300 font-medium mb-3">Game category</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c)}
                      className={`py-3 px-3 rounded-md border font-bold text-sm transition-all duration-200 ${
                        category.id === c.id
                          ? 'border-gamdom-teal bg-gamdom-teal/10 text-gamdom-teal-light shadow-teal-glow-sm'
                          : 'border-gamdom-border text-slate-400 hover:border-slate-500'
                      }`}
                      aria-pressed={category.id === c.id}
                    >
                      <span className="text-lg mr-1.5 text-gamdom-teal-light" aria-hidden="true">{c.glyph}</span>
                      <span className="font-display">{c.label}</span>
                      <div className="num text-[10px] font-normal mt-0.5 opacity-80">
                        ~{(c.edgePct * 100).toFixed(1)}% edge
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{category.hint}</p>
              </div>

              <div>
                <p className="text-slate-300 font-medium mb-3">Lossback tier</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTier('pro')}
                    className={`py-3 px-4 rounded-md border font-bold text-sm transition-all duration-200 font-display ${
                      tier === 'pro'
                        ? 'border-gamdom-teal bg-gamdom-teal/10 text-gamdom-teal-light'
                        : 'border-gamdom-border text-slate-400 hover:border-slate-500'
                    }`}
                    aria-pressed={tier === 'pro'}
                  >
                    Pro Tier
                    <div className="text-xs font-normal mt-0.5">10% rate</div>
                  </button>
                  <button
                    onClick={() => setTier('elite')}
                    className={`py-3 px-4 rounded-md border font-bold text-sm transition-all duration-200 font-display ${
                      tier === 'elite'
                        ? 'border-gamdom-teal bg-gamdom-teal/10 text-gamdom-teal-light'
                        : 'border-gamdom-border text-slate-400 hover:border-slate-500'
                    }`}
                    aria-pressed={tier === 'elite'}
                  >
                    Elite Tier ⬡
                    <div className="text-xs font-normal mt-0.5">20% rate</div>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                * Figures are statistical expectations using blended edge assumptions. Real
                weeks fluctuate around the mean — that variance is exactly why a
                percentage-of-net-loss structure makes mathematical sense.
              </p>
            </div>
          </ClipReveal>

          <ClipReveal>
            <div className="space-y-4">
              <div className="card scale-card border-2 border-gamdom-teal/50 bg-gamdom-teal/5">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display">
                  <span className="w-8 h-8 rounded-md bg-gamdom-teal/20 flex items-center justify-center text-gamdom-teal-light">⬡</span>
                  Lossback projection
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gamdom-border/40">
                    <span className="text-slate-400">Expected monthly net loss</span>
                    <SnapValue value={results.monthlyLoss} className="text-white font-bold text-lg" />
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gamdom-border/40">
                    <span className="text-slate-400">Weekly lossback ({(compPct * 100).toFixed(0)}%)</span>
                    <SnapValue value={results.weeklyComp} className="text-gamdom-teal-light font-extrabold text-xl" />
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gamdom-border/40">
                    <span className="text-slate-400">Monthly lossback total</span>
                    <SnapValue value={results.monthlyComp} className="text-gamdom-lime font-extrabold text-xl" />
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gamdom-border/40">
                    <span className="text-slate-400">Annual lossback projection</span>
                    <SnapValue value={results.annualComp} className="text-gamdom-teal-light font-extrabold text-2xl" />
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-400">Effective edge after lossback</span>
                    <span className="text-white font-bold text-lg num flex items-baseline gap-2">
                      <SnapPct value={results.effectiveEdge} />
                      <span className="text-xs text-gamdom-teal-light">(vs {(category.edgePct * 100).toFixed(1)}%)</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="card relative overflow-hidden text-center py-8">
                <div className="absolute inset-0 gam-sweep-bg opacity-30" aria-hidden="true" />
                <div className="relative">
                  <div className="text-5xl font-extrabold text-gam-gradient mb-2">
                    <SnapValue value={results.annualComp} />
                  </div>
                  <div className="text-slate-200 font-medium font-display">Projected yearly lossback</div>
                  <div className="mt-3 text-sm text-slate-300">
                    Roughly{' '}
                    <strong className="text-white num">{formatUSD(results.monthlyComp)}/month</strong>{' '}
                    landing back in your Gamdom wallet — in crypto, withdrawable on credit,
                    no take-back conditions.
                  </div>
                </div>
              </div>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
                Claim My Deal
              </a>
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  )
}
