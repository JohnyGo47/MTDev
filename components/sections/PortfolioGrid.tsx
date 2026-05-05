'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { projects } from '@/lib/projects'
import { WorkCard } from '@/components/work/WorkCard'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function PortfolioGrid() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: labelRef.current, start: 'top 85%' } }
      )
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(Array.from(cards),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const [p1, p2, p3] = projects

  return (
    <section
      ref={sectionRef}
      style={{ padding: 'var(--section-v) var(--gutter)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={labelRef}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', opacity: 0 }}
        >
          <SectionLabel>{t.portfolio.label[lang]}</SectionLabel>
          <Link href="/work" style={{ fontSize: '13px', color: 'var(--orange)', textDecoration: 'none' }}>
            {t.portfolio.seeAll[lang]}
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div ref={cardsRef}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', marginBottom: '3px' }}>
            <div style={{ opacity: 0 }}><WorkCard project={p1} lang={lang} /></div>
            <div style={{ opacity: 0 }}><WorkCard project={p2} lang={lang} /></div>
          </div>
          <div style={{ opacity: 0 }}>
            <WorkCard project={p3} lang={lang} wide />
          </div>
        </div>
      </div>
    </section>
  )
}
