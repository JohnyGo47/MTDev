'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLSpanElement[]>([])
  const numbersRef = useRef<HTMLDivElement[]>([])
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, i) => {
        gsap.fromTo(line,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: line, start: 'top 85%' },
          }
        )
      })

      numbersRef.current.forEach((num, i) => {
        const endVal = i + 1
        const obj = { val: 0 }
        gsap.to(obj, {
          val: endVal,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.1,
          onUpdate: () => { if (num) num.textContent = String(Math.round(obj.val)).padStart(2, '0') },
          scrollTrigger: { trigger: num, start: 'top 85%' },
        })
      })

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.1,
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
      id="process"
      style={{ padding: 'var(--section-v) var(--gutter)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <SectionLabel>{t.process.label[lang]}</SectionLabel>
        <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '64px' }}>
          {t.process.headline[lang]}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {t.process.steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              style={{ paddingLeft: i === 0 ? '0' : '20px', paddingRight: '20px', position: 'relative', opacity: 0 }}
            >
              {/* Vertical line */}
              <span
                ref={(el) => { if (el) linesRef.current[i] = el }}
                style={{
                  position: 'absolute',
                  left: i === 0 ? '0' : '20px',
                  top: 0,
                  bottom: 0,
                  width: '0.5px',
                  background: 'var(--border)',
                  transform: 'scaleY(0)',
                  transformOrigin: 'top',
                }}
              />
              <div
                ref={(el) => { if (el) numbersRef.current[i] = el }}
                style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '48px', fontWeight: 700, color: 'var(--fg-3)', lineHeight: 1, marginBottom: '20px' }}
              >
                0{i + 1}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '10px' }}>
                {step[lang].label}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.65 }}>
                {step[lang].desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
