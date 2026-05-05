'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const bordersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate top borders drawing in
      bordersRef.current.forEach((border, i) => {
        gsap.fromTo(border,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: border, start: 'top 85%' },
          }
        )
      })
      // Animate items fading in
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: item, start: 'top 85%' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ padding: 'var(--section-v) var(--gutter)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <SectionLabel>{t.services.label[lang]}</SectionLabel>
        <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '64px', maxWidth: '600px' }}>
          {t.services.headline[lang]}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0' }}>
          {t.services.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              style={{
                padding: '24px 20px 24px 0',
                borderRight: i < t.services.items.length - 1 ? '0.5px solid var(--border)' : 'none',
                paddingRight: '20px',
                paddingLeft: i > 0 ? '20px' : '0',
                transition: 'background 0.2s',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--orange-10)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span
                ref={(el) => { if (el) bordersRef.current[i] = el }}
                style={{
                  display: 'block',
                  height: '0.5px',
                  background: 'var(--border)',
                  marginBottom: '20px',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />
              <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'var(--orange)', marginBottom: '12px' }}>
                0{i + 1}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '10px' }}>
                {item[lang].title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.6 }}>
                {item[lang].desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
