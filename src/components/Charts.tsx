import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Treemap, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, LabelList,
} from 'recharts'

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

/* Treemap: weekly compensation distribution across player profiles.
   Each block sized by the annual compensation amount. */
type TreemapBlock = {
  name: string
  size: number
  tier: 'Pro' | 'Elite'
  fill: string
  detail: string
}

const treemapData: TreemapBlock[] = [
  { name: 'Pro · $40k mo',  size: 40_000  * 0.032 * 0.10 * 12, tier: 'Pro',   fill: '#0f766e', detail: '$40k monthly · 10% rate' },
  { name: 'Pro · $90k mo',  size: 90_000  * 0.032 * 0.10 * 12, tier: 'Pro',   fill: '#14b8a6', detail: '$90k monthly · 10% rate' },
  { name: 'Pro · $150k mo', size: 150_000 * 0.032 * 0.10 * 12, tier: 'Pro',   fill: '#2dd4bf', detail: '$150k monthly · 10% rate' },
  { name: 'Elite · $200k mo', size: 200_000 * 0.032 * 0.20 * 12, tier: 'Elite', fill: '#84cc16', detail: '$200k monthly · 20% rate' },
  { name: 'Elite · $320k mo', size: 320_000 * 0.032 * 0.20 * 12, tier: 'Elite', fill: '#bef264', detail: '$320k monthly · 20% rate' },
  { name: 'Elite · $480k mo', size: 480_000 * 0.032 * 0.20 * 12, tier: 'Elite', fill: '#d9f99d', detail: '$480k monthly · 20% rate' },
]

const wrapped: { name: string; children: TreemapBlock[] } = {
  name: 'Annual compensation by profile',
  children: treemapData,
}

/* Horizontal stacked bar: effective edge breakdown by reward path */
type EdgeRow = {
  name: string
  retained: number
  reclaimed: number
  fill: string
  fillLight: string
  rate: string
}

const edgeRows: EdgeRow[] = [
  { name: 'No deal',                    retained: 3.20, reclaimed: 0.00, fill: '#475569', fillLight: '#1e293b', rate: 'public sign-up' },
  { name: 'Public Reward Race (mid)',   retained: 3.04, reclaimed: 0.16, fill: '#64748b', fillLight: '#94a3b8', rate: '~5% effective' },
  { name: 'Public Reward Race (top)',   retained: 2.96, reclaimed: 0.24, fill: '#84cc16', fillLight: '#a3e635', rate: '~7.5% effective' },
  { name: 'Pro Tier (10%)',             retained: 2.88, reclaimed: 0.32, fill: '#14b8a6', fillLight: '#2dd4bf', rate: 'partner 10%' },
  { name: 'Elite Tier (20%)',           retained: 2.56, reclaimed: 0.64, fill: '#0f766e', fillLight: '#bef264', rate: 'partner 20%' },
]

type TreemapPayload = { payload?: TreemapBlock & { children?: unknown } }
const TreemapTooltip = ({ active, payload }: { active?: boolean; payload?: TreemapPayload[] }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload
    if (!p || p.children !== undefined || !p.detail) return null
    return (
      <div className="bg-gamdom-card border border-gamdom-border rounded-lg p-3 shadow-card text-sm">
        <p className="text-white font-bold font-display">{p.name}</p>
        <p className="text-slate-400 text-xs">{p.detail}</p>
        <p className="text-gamdom-teal-light num mt-1">~${Math.round(p.size).toLocaleString()} annual compensation</p>
      </div>
    )
  }
  return null
}

const BarTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: EdgeRow }[] }) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload
    return (
      <div className="bg-gamdom-card border border-gamdom-border rounded-lg p-3 shadow-card text-sm">
        <p className="text-white font-bold font-display">{p.name}</p>
        <p className="text-slate-400 text-xs mb-1">{p.rate}</p>
        <p className="text-slate-300 num">Retained edge: {p.retained.toFixed(2)}%</p>
        <p className="text-gamdom-teal-light num">Reclaimed: {p.reclaimed.toFixed(2)}%</p>
      </div>
    )
  }
  return null
}

type ContentProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  name?: string
  fill?: string
  size?: number
  depth?: number
}

const TreemapContent = (props: ContentProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name, fill, depth } = props
  if (depth === 0) return null
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fill || '#14b8a6',
          stroke: '#03110e',
          strokeWidth: 2,
        }}
      />
      {width > 80 && height > 50 && name ? (
        <text
          x={x + 12}
          y={y + 24}
          fill="#03110e"
          fontSize={12}
          fontFamily="Unbounded, sans-serif"
          fontWeight={700}
        >
          {name}
        </text>
      ) : null}
    </g>
  )
}

export default function Charts() {
  return (
    <section id="the-math" className="py-24 bg-gamdom-card/15">
      <div className="section-container">
        <ClipReveal>
          <div className="text-center mb-16">
            <span className="teal-badge mb-4">The Maths</span>
            <h2 className="section-heading mt-2">
              Long-Run Effect Of A Compensation Channel —{' '}
              <span className="text-gam-gradient">Two Visuals, Same Underlying Maths</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Variance never disappears at the session level. What changes is the
              year-over-year expected playing edge. Below is that effect drawn two different
              ways.
            </p>
          </div>
        </ClipReveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <ClipReveal>
            <div className="card scale-card h-full">
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Annual compensation distribution by profile
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Each block represents a representative player profile. Block size is
                proportional to the annualised compensation amount. The lime-coloured blocks
                are Elite-tier, the teal ones are Pro-tier.
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={[wrapped] as never}
                    dataKey="size"
                    nameKey="name"
                    stroke="#03110e"
                    fill="#14b8a6"
                    content={<TreemapContent />}
                  >
                    <Tooltip content={<TreemapTooltip />} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#14b8a6' }} />
                  Pro Tier (10%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#bef264' }} />
                  Elite Tier (20%)
                </span>
              </div>
            </div>
          </ClipReveal>

          <ClipReveal delay={0.12}>
            <div className="card scale-card h-full">
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Effective edge after compensation, by reward path
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Lower is better. Bars show what Gamdom's 3.2% blended playing edge translates
                to once each reward structure is applied. Elite Tier compensation moves the
                effective edge the most.
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={edgeRows}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#284c45" horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[2.0, 3.4]}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      tickFormatter={v => `${v.toFixed(2)}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: '#cbd5e1', fontSize: 11 }}
                      width={160}
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(20,184,166,0.05)' }} />
                    <Bar dataKey="retained" radius={[0, 6, 6, 0]}>
                      {edgeRows.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                      <LabelList
                        dataKey="retained"
                        position="right"
                        formatter={(value: number) => `${value.toFixed(2)}%`}
                        style={{ fill: '#ffffff', fontSize: 11, fontFamily: 'Roboto Mono, monospace' }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ClipReveal>
        </div>

        <ClipReveal>
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 font-display">
              Why Elite compensation beats every other Gamdom reward path mathematically
            </h3>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Begin with a standard deposit bonus. A 100% match advertised at $1,000
                attached to a 40× wagering requirement obliges you to wager $40,000 on
                eligible games before any portion of the bonus becomes withdrawable. At a
                3.2% blended playing edge, your expected loss while clearing that wagering is
                roughly $1,280 — more than the bonus is worth. Standard bonuses are
                acquisition mechanics, calibrated to convert curious depositors; they are not
                retention rewards for players already producing sustained volume.
              </p>
              <p>
                Compensation inverts the structure entirely. Suppose your sustained monthly
                wager on Gamdom sits at $180,000 across a mixed book at ~3.2% blended edge:
                your statistical net loss expectation lands around $5,760 per month. A 20%
                Elite compensation rate clears roughly $1,152 of that figure, unconditionally
                and immediately withdrawable. The economic effect is a permanent shift from a
                3.20% playing edge down to a{' '}
                <strong className="text-white num">2.56% effective edge</strong>, applied to
                every dollar of wager you put through Gamdom from that point forward.
              </p>
              <p>
                Compounded across a calendar year of sustained volume, the gap between "no
                compensation" and "20% Elite compensation" on a $320,000/month book
                accumulates to roughly{' '}
                <strong className="text-gamdom-teal-light num">$24,500 of recovered net
                loss</strong>. The treemap above visualises that distribution — the
                lime-coloured Elite blocks dwarf the public-path equivalents because
                compensation scales linearly with both volume and rate.
              </p>
              <p>
                Variance is unchanged. A wild Crash or Slot Battles run is still a wild run.
                What compensation changes is the long-run expected value of every dollar of
                wager you put through Gamdom — and for sustained Elite-volume players, that
                expectancy shift is the only metric that meaningfully affects year-end
                outcomes.
              </p>
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
