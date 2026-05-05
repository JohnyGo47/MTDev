'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Services } from '@/components/sections/Services'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const { lang } = useLanguage()
  const statRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
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
  }, [])

  const headlineLines = t.about.headline[lang].split('\n')

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      {/* Page header */}
      <section style={{ padding: 'var(--section-v) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionLabel>{t.about.label[lang]}</SectionLabel>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '32px' }}>
            {headlineLines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--fg-2)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '28px' }}>
            {t.about.paragraph[lang]}
          </p>
          <p style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {t.about.statement[lang]}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 var(--gutter) var(--section-v)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '0.5px solid var(--border)' }}>
            {t.about.stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => { if (el) statRefs.current[i] = el }}
                style={{
                  padding: '40px',
                  borderRight: i < t.about.stats.length - 1 ? '0.5px solid var(--border)' : 'none',
                }}
              >
                <div style={{ fontSize: '56px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
                  <span className="stat-number">{isNaN(parseInt(stat.value)) ? '' : '0'}</span>
                  {isNaN(parseInt(stat.value)) ? stat.value : ''}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{stat.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />
    </div>
  )
}
