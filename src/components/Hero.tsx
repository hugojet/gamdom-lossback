import { motion } from 'framer-motion'
import { TELEGRAM_URL, TELEGRAM_HANDLE } from '../seo/siteMeta'

function FloatingTokens() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Hexagon */}
      <svg
        className="token animate-token-float-a"
        style={{ top: '15%', left: '8%', width: 110, height: 110 }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,4 92,28 92,72 50,96 8,72 8,28"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="50,18 80,35 80,65 50,82 20,65 20,35"
          fill="#14b8a6"
          fillOpacity="0.10"
        />
      </svg>

      {/* Diamond / rotated square */}
      <svg
        className="token animate-token-float-b"
        style={{ top: '22%', right: '12%', width: 80, height: 80 }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,8 92,50 50,92 8,50"
          fill="none"
          stroke="#bef264"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="50,28 72,50 50,72 28,50"
          fill="#bef264"
          fillOpacity="0.18"
        />
      </svg>

      {/* Triangle */}
      <svg
        className="token animate-token-float-c"
        style={{ bottom: '20%', left: '18%', width: 90, height: 90 }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,8 92,86 8,86"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Small square */}
      <svg
        className="token animate-token-float-a"
        style={{ bottom: '18%', right: '20%', width: 65, height: 65 }}
        viewBox="0 0 100 100"
      >
        <rect x="14" y="14" width="72" height="72" rx="6" fill="none" stroke="#14b8a6" strokeWidth="2" />
        <rect x="34" y="34" width="32" height="32" rx="3" fill="#bef264" fillOpacity="0.22" />
      </svg>

      {/* Outline circle */}
      <svg
        className="token animate-token-float-b"
        style={{ top: '50%', left: '46%', width: 70, height: 70 }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#bef264" strokeWidth="2" strokeDasharray="6 4" />
      </svg>
    </div>
  )
}

const trustBadges = [
  { icon: '⬡', label: 'Curacao Licensed' },
  { icon: '◆', label: '$3B+ Wagered' },
  { icon: '⚡', label: 'Crypto Cashier 24/7' },
  { icon: '◈', label: 'Provably Fair Originals' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gamdom-darker"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gamdom-hero" />
      <div className="absolute inset-0 gam-hex-bg" aria-hidden="true" />
      <FloatingTokens />

      <div className="relative z-10 section-container py-24 sm:py-32 text-center">
        {/* Clip-path reveal animation — unique to Gamdom */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.65, 0, 0.35, 1] }}
          className="mb-6 flex justify-center"
        >
          <span className="teal-badge text-sm px-4 py-2">
            ⬡ Gamdom VIP Lossback · Elite Whitelist Live
          </span>
        </motion.div>

        <motion.h1
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] font-display"
        >
          Up to{' '}
          <span className="text-gam-gradient">20% Weekly Lossback</span>
          <br />
          on Gamdom —
          <br />
          <span className="text-gam-gradient">Exclusive VIP Deal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Elite-volume players on Gamdom.com can plug into a private VIP lossback channel
          and get up to{' '}
          <strong className="text-white">20% lossback on their net weekly losses</strong> —
          settled in crypto every Monday morning, with zero rollover and no take-back
          conditions. Off-menu, partner-introduction only.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg animate-teal-pulse w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
            </svg>
            Claim My Deal
          </a>
          <a
            href="#how-it-works"
            className="btn-secondary text-lg w-full sm:w-auto justify-center"
          >
            See The Mechanics ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 bg-gamdom-card/65 border border-gamdom-border px-4 py-2 rounded-md text-sm text-slate-300 backdrop-blur-sm"
            >
              <span className="text-gamdom-teal-light" aria-hidden="true">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.85 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative rounded-lg overflow-hidden border border-gamdom-border shadow-[0_0_60px_rgba(20,184,166,0.18)]">
            <div className="aspect-video bg-gamdom-card flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/rC31cbG2lH4?autoplay=0&mute=1&controls=1&rel=0"
                title="Gamdom Casino — featured clip"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500 text-center">
            Gamdom.com — long-established crypto casino with originals, slots, sportsbook on one wallet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 1.6, delay: 1.1, repeat: Infinity }}
          className="mt-16 flex justify-center"
          aria-hidden="true"
        >
          <svg className="w-6 h-6 text-gamdom-teal glow-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>

        <p className="sr-only">
          Contact Hugo, Gamdom VIP liaison, on Telegram: {TELEGRAM_HANDLE}
        </p>
      </div>
    </section>
  )
}
