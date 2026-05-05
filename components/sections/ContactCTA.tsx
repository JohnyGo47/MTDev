'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export function ContactCTA() {
  const { lang } = useLanguage()
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'var(--section-v) var(--gutter)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <h2
          ref={headlineRef}
          style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '20px', clipPath: 'inset(0 100% 0 0)' }}
        >
          {t.contact.headline[lang]}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--fg-2)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
          {t.contact.sub[lang]}
        </p>
        <Link
          href="/contact"
          data-cursor="open"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--orange)',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '4px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          {t.nav.cta[lang]}
        </Link>
      </div>
    </section>
  )
}
