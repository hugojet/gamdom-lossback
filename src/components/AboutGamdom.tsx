import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5)
}

function useCounter(target: number, inView: boolean, duration = 2200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setCount(Math.floor(target * easeOutQuint(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setCount(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return count
}

function StatTile({ value, prefix = '', suffix, label }: { value: number; prefix?: string; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, inView)
  return (
    <div ref={ref} className="card scale-card text-center py-8">
      <div className="num text-4xl font-extrabold text-gam-gradient">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-400 mt-2 font-medium">{label}</div>
    </div>
  )
}

const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { name: 'Tether', symbol: 'USDT', color: '#26A17B' },
  { name: 'USD Coin', symbol: 'USDC', color: '#2775CA' },
  { name: 'Litecoin', symbol: 'LTC', color: '#BFBBBB' },
  { name: 'Bitcoin Cash', symbol: 'BCH', color: '#8DC351' },
  { name: 'Dogecoin', symbol: 'DOGE', color: '#C2A633' },
  { name: 'Tron', symbol: 'TRX', color: '#EF0027' },
  { name: 'Cardano', symbol: 'ADA', color: '#0033AD' },
]

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

export default function AboutGamdom() {
  return (
    <section id="about-gamdom" className="py-24 bg-gamdom-darker">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">The Operator</span>
            <h2 className="section-heading mt-2">
              Gamdom.com Is The <span className="text-gam-gradient">Long-Established Crypto Casino</span>
              <br />Built On Originals, Streamer Culture & A Crypto-Native Cashier
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Gamdom has been operating since 2016 — long enough to have accumulated the
              kind of player base, originals catalogue and sportsbook depth that supports a
              meaningful VIP compensation programme. Here is the platform context behind the
              channel.
            </p>
          </div>
        </ClipReveal>

        <ClipReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <StatTile value={2016} suffix="" label="Year Gamdom went live" />
          <StatTile value={3} prefix="$" suffix="B+" label="Wagered since launch" />
          <StatTile value={1200000} suffix="+" label="Registered players" />
          <StatTile value={4500} suffix="+" label="Casino games & live tables" />
        </ClipReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <ClipReveal>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                <strong className="text-white">Gamdom.com</strong> launched in 2016 under
                Hollycorn N.V. and is one of the longer-running crypto casinos in the
                segment — predating most of the operators dominating Twitch and Kick
                broadcasts today. The platform built its early reputation on{' '}
                <strong className="text-white">skin-economy gambling</strong> and then
                pivoted decisively into a full crypto-native casino with its own originals
                catalogue, third-party slot library, sportsbook and a deep VIP rewards
                programme.
              </p>
              <p>
                The platform operates under a Curacao gaming licence and runs deposits and
                withdrawals through Bitcoin, Ethereum, USDT, USDC, Litecoin, Bitcoin Cash,
                Dogecoin, Tron, Cardano and a handful of additional chains. The cashier is
                tuned for high-volume players — verified Elite accounts working through Hugo
                see most withdrawals clear in{' '}
                <strong className="text-white">under fifteen minutes</strong> across major
                coins, which is competitive with the fastest cashiers in the segment.
              </p>
              <p>
                The originals layer is where Gamdom distinguishes itself. Crash, Mines,
                Plinko, Cups, Roulette and the platform's signature{' '}
                <strong className="text-white">Slot Battles</strong> are all{' '}
                <strong className="text-white">provably fair</strong> — each round publishes
                a verifiable seed pair so any outcome can be independently audited.
                Alongside these, the third-party slot library covers thousands of titles from
                Pragmatic Play, Hacksaw Gaming, Nolimit City, Push Gaming and Relax, plus
                Evolution Live and Pragmatic Live for the live-dealer side.
              </p>
              <p>
                The sportsbook brings the rest of the wallet to life. Pre-match, live and
                parlay flows all share the same balance with the casino — which is exactly
                what allows the Elite compensation channel to net losses across both
                verticals into a single weekly figure rather than treating them as separate
                ledgers. For a multi-vertical player that single-wallet detail is a
                meaningful structural advantage.
              </p>
              <p>
                For sustained high-volume players, Gamdom's combination of{' '}
                <strong className="text-white">a mature originals catalogue, fast crypto
                rails, deep third-party slot coverage and a unified casino + sportsbook
                wallet</strong> is exactly the kind of platform context where a negotiated
                compensation deal compounds cleanly. The deal Hugo brokers takes an already
                solid operator and turns the long-run economics noticeably in the player's
                favour.
              </p>
            </div>
          </ClipReveal>

          <ClipReveal delay={0.15} className="space-y-6">
            {[
              { glyph: '⬡', title: 'Provably fair originals', desc: 'Crash, Mines, Plinko, Cups, Slot Battles, Roulette — each round publishes a verifiable server- and client-seed pair, every outcome independently auditable.' },
              { glyph: '◆', title: 'Sub-15-minute crypto cashier', desc: 'BTC, ETH, USDT, USDC, LTC, BCH, DOGE, TRX, ADA — most coins clear external withdrawals in under fifteen minutes on Elite-tier accounts.' },
              { glyph: '◈', title: 'Casino + sportsbook unified', desc: '4,500+ casino titles plus a deep sportsbook share a single wallet. Losses across both verticals net into a single weekly compensation calculation.' },
              { glyph: '⛨', title: 'Curacao licensed operator', desc: 'Operated by Hollycorn N.V. under Curacao gaming licence. Built-in responsible-play controls, session limits, deposit caps and self-exclusion available across all accounts.' },
            ].map((feature) => (
              <div key={feature.title} className="card scale-card flex gap-4">
                <span className="text-3xl flex-shrink-0 text-gamdom-teal-light" aria-hidden="true">{feature.glyph}</span>
                <div>
                  <h3 className="font-bold text-white mb-1 font-display">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-lg overflow-hidden border border-gamdom-border">
              <div className="aspect-video bg-gamdom-card">
                <iframe
                  src="https://www.youtube.com/embed/QY6V8K_oH7M?rel=0&modestbranding=1"
                  title="Gamdom Platform Walkthrough"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="bg-gamdom-card p-3 text-center text-sm text-slate-500">
                Gamdom.com — platform tour
              </div>
            </div>
          </ClipReveal>
        </div>

        <ClipReveal>
          <h3 className="text-center text-lg font-semibold text-slate-300 mb-6 font-display tracking-wide uppercase">
            Crypto rails settled in every compensation payout
          </h3>
          {/* Chip-grid (3-column flex grid wrapping) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {cryptos.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex items-center gap-3 bg-gamdom-card border border-gamdom-border px-4 py-3 rounded-lg scale-card"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs font-black"
                  style={{
                    backgroundColor: crypto.color + '33',
                    color: crypto.color,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                  aria-hidden="true"
                >
                  {crypto.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{crypto.symbol}</div>
                  <div className="text-slate-500 text-xs">{crypto.name}</div>
                </div>
              </div>
            ))}
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
