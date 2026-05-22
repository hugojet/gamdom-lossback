/** Single source of truth: visible FAQ + JSON-LD must match. */
export const faqs = [
  {
    q: 'How does the Gamdom compensation rate actually get decided?',
    a: `The rate is negotiated case-by-case between Hugo and Gamdom's VIP operations desk, based primarily on your sustained monthly wager and the game-category mix (originals, slots, live tables and sportsbook each carry different blended playing edges). The Pro Tier sits at a 10% weekly compensation rate and corresponds to sustained monthly volume between $25,000 and $180,000. Above $180,000 of sustained monthly wager the conversation opens up to Elite Tier, where the rate is negotiable up to 20%. Hugo presents the volume case to the desk directly — you never have to argue your own number.`,
  },
  {
    q: 'Are my Gamdom sportsbook losses included in the calculation?',
    a: `Yes — this is one of the specific structural points Hugo negotiates upfront for managed Elite accounts. Gamdom runs casino and sportsbook on a unified wallet, which makes it operationally clean to blend losses from both verticals into a single weekly compensation calculation at the same headline percentage. Most public Gamdom reward structures keep these verticals on separate ledgers, so a single shared compensation rate across both is one of the meaningful structural upgrades the partner channel delivers — particularly for players running heavy parlay or live-betting volume.`,
  },
  {
    q: 'Do Gamdom originals (Crash, Mines, Plinko, Cups, Slot Battles) count?',
    a: `Yes. All Gamdom-proprietary originals count toward the net-loss calculation by default — Crash, Mines, Plinko, Cups, Slot Battles, Roulette and the rest. These tend to be where Elite clients concentrate the bulk of their volume because the playing edges are low and the round frequency is high, which produces an extremely clean net-loss curve over the weekly window. The provably-fair seed pairs Gamdom publishes after each round also mean the underlying numbers feeding the compensation calculation are independently auditable.`,
  },
  {
    q: 'What sustained volume does Elite Tier actually require?',
    a: `As a working threshold, sustained $180,000+ per month of wager opens the Elite Tier conversation, with the negotiated rate scaling toward the 20% maximum based on consistency rather than raw size. Hugo is candid about borderline cases: a player closer to the $120k–$180k band with a strong sustained history can sometimes be onboarded on an entry-Elite rate slightly below the full headline ceiling. The fastest way to know exactly where you sit is to send a brief volume snapshot through Telegram — Hugo replies with a clear yes/no within hours.`,
  },
  {
    q: 'Why is this called "lossback" rather than rakeback?',
    a: `Rakeback and lossback are structurally different mechanics. Rakeback pays a small slice of the operator's playing edge on every individual bet — typically 1% to 4% — regardless of whether the session closes in profit or loss. Lossback (the compensation) tracks net loss across the seven-day settlement window and returns a percentage of that figure as immediately-withdrawable balance. The practical effect is asymmetric: a winning week pays zero compensation, a losing week pays back a meaningful share of the damage. For sustained Elite-volume players cycling six-figure monthly wager, that asymmetry is what makes the structure mathematically valuable over a multi-quarter horizon.`,
  },
  {
    q: 'Is Hugo officially recognised by Gamdom.com?',
    a: `Hugo operates an authorised partner account inside Gamdom's partner programme — a B2B partnership tier that sits above standard affiliate referral. Authorised partners have a direct working relationship with Gamdom's VIP operations desk and are formally permitted to negotiate bespoke compensation structures, cashier-cap lifts and tournament seeding on behalf of the players in their book. Hugo's authorisation can be verified directly: message @hugo_lossback_bot on Telegram and ask for partner confirmation details before sharing any account-level information.`,
  },
  {
    q: 'How and when does the compensation clear into my wallet?',
    a: `Settlement happens every Monday morning, covering the previous Monday-to-Sunday window in UTC. The compensation amount lands directly into your Gamdom.com wallet in the cryptocurrency you nominate — Gamdom settles Bitcoin, Ethereum, USDT, USDC, Litecoin, Bitcoin Cash, Dogecoin, Tron, Cardano and a few additional networks natively. Once the amount hits your Gamdom balance you can withdraw to any compatible external wallet immediately at standard Elite-tier cashier speeds, which typically clear external withdrawals within fifteen minutes for major coins.`,
  },
  {
    q: 'Is there any rollover, hold or clawback applied to the compensation amount?',
    a: `None. This is the core structural difference between a compensation deal and a public-tier promotional bonus. The compensation credit is treated as immediately-withdrawable cash balance — no rollover multiplier, no minimum-odds requirement, no eligible-games whitelist, no time decay, no take-back conditions against future weeks. The amount is yours from the moment it lands. You can withdraw it on Monday, redeploy it as new wager volume, or simply hold it. The structure is engineered to be clean precisely because that is what makes it valuable to high-volume players.`,
  },
  {
    q: 'Is the deal available in my country?',
    a: `If you can legally hold a Gamdom.com account in your country, you can be onboarded into the partner compensation channel. Gamdom operates in most jurisdictions globally except a handful of restricted territories — notably the United States, the United Kingdom, France, Spain, the Netherlands, Belgium and Australia, where local gambling licensing prevents Gamdom from accepting accounts. Hugo currently has active Elite clients across continental Europe, the Middle East, LATAM, parts of Asia, Sub-Saharan Africa and Oceania (ex-Australia). If your jurisdiction is on the borderline, mention it explicitly in your first Telegram message and Hugo will give a definitive answer.`,
  },
  {
    q: 'Does joining this channel make my account visible in any way?',
    a: `No. The partner book operates with strict client confidentiality. Your Elite tier, your negotiated rate, your wagering history and your Monday statements stay between you, Hugo and the Gamdom VIP operations desk. There is no public leaderboard entry, no public profile, no community channel, no content-creator rotation. Many of Hugo's Elite clients specifically value the discretion of running a serious bankroll without their volume appearing on any public-facing dashboard — the partner channel is structurally designed to respect that.`,
  },
  {
    q: 'What happens if I have a strong winning week — do I owe anything?',
    a: `Nothing. The asymmetry is by design. If your week closes net-positive, your net loss is zero or negative, and the compensation for that week is simply zero. There is no clawback against your winnings, no offset rolled into the following week's calculation, and no penalty mechanism. The next Monday begins with a fresh net-loss tally starting at zero. The whole structure is built to soften losing weeks without ever taxing winning ones — which is precisely why it pencils out for sustained players over a multi-quarter horizon.`,
  },
]

export type FaqItem = { q: string; a: string }
