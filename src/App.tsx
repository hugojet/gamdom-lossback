import { Helmet } from 'react-helmet-async'
import { lazy, Suspense, useMemo } from 'react'
import Hero from './components/Hero'
import WhyHugo from './components/WhyHugo'
import AboutGamdom from './components/AboutGamdom'
import WhatIsLossback from './components/WhatIsLossback'
import Calculator from './components/Calculator'
import TheDeal from './components/TheDeal'
import Comparison from './components/Comparison'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { faqs } from './data/faqs'
import {
  KEYWORDS,
  META_DESCRIPTION,
  OG_DESCRIPTION,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TITLE,
  SITE_URL,
} from './seo/siteMeta'

const Charts = lazy(() => import('./components/Charts'))

export default function App() {
  const structuredData = useMemo(() => {
    const websiteId = `${SITE_ORIGIN}/#website`
    const webpageId = `${SITE_ORIGIN}/#webpage`
    const faqId = `${SITE_ORIGIN}/#faq`

    const faqMainEntity = faqs.map((f) => ({
      '@type': 'Question' as const,
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: f.a,
      },
    }))

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: SITE_ORIGIN,
          name: SITE_NAME,
          description: META_DESCRIPTION,
          inLanguage: 'en-US',
        },
        {
          '@type': 'WebPage',
          '@id': webpageId,
          url: SITE_URL,
          name: SITE_TITLE,
          description: META_DESCRIPTION,
          isPartOf: { '@id': websiteId },
          inLanguage: 'en-US',
        },
        {
          '@type': 'FAQPage',
          '@id': faqId,
          isPartOf: { '@id': webpageId },
          mainEntity: faqMainEntity,
        },
      ],
    }
  }, [])

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{SITE_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Gamdom Lossback" />
        <meta name="theme-color" content="#0a1f1c" />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={OG_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gamdom Lossback — up to 20% weekly compensation for Elite-tier players" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={OG_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <meta name="twitter:image:alt" content="Gamdom Lossback — Elite VIP compensation channel" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main>
        <Hero />
        <WhyHugo />
        <AboutGamdom />
        <WhatIsLossback />
        <Calculator />
        <TheDeal />
        <Suspense fallback={<div className="h-96 bg-gamdom-dark" aria-hidden="true" />}>
          <Charts />
        </Suspense>
        <Comparison />
        <FAQ />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
