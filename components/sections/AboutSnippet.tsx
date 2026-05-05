'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function AboutSnippet() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      t.about.stats.forEach((stat, i) => {
        const el = statRefs.current[i]
        if (!el || isNaN(parseInt(stat.value))) return
        const endVal = parseInt(stat.value)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: endVal,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            const span = el.querySelector('.stat-number')
            if (span) span.textContent = String(Math.round(obj.val))
          },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const headlineLines = t.about.headline[lang].split('\n')

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: 'var(--section-v) var(--gutter)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '80px', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <SectionLabel>{t.about.label[lang]}</SectionLabel>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '28px' }}>
            {headlineLines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.65, maxWidth: '480px', marginBottom: '24px' }}>
            {t.about.paragraph[lang]}
          </p>
          <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '28px' }}>
            {t.about.statement[lang]}
          </p>
          <Link
            href="/about"
            style={{ fontSize: '13px', color: 'var(--orange)', textDecoration: 'none' }}
          >
            {t.about.learnMore[lang]}
          </Link>
        </div>

        {/* Right – stats */}
        <div>
          {t.about.stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { if (el) statRefs.current[i] = el }}
              style={{
                padding: '28px 0',
                borderTop: '0.5px solid var(--border)',
                borderBottom: i === t.about.stats.length - 1 ? '0.5px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>
                <span className="stat-number">{isNaN(parseInt(stat.value)) ? '' : '0'}</span>
                {isNaN(parseInt(stat.value)) ? stat.value : ''}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{stat.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
