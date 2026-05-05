'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function Hero() {
  const { lang } = useLanguage()
  const tagRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  const headlineLines = t.hero.headline[lang].split('\n')
  const accentWord = t.hero.headlineAccent[lang]

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(tagRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
    tl.fromTo(line1Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.1)
    tl.fromTo(line2Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.25)
    tl.fromTo(subRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4)
    tl.fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.55)
    tl.fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.65)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouse.current = { x: (e.clientX - cx) * 0.015, y: (e.clientY - cy) * 0.015 }
    }
    let rafId: number
    let cur = { x: 0, y: 0 }
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      cur.x += (mouse.current.x - cur.x) * 0.05
      cur.y += (mouse.current.y - cur.y) * 0.05
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    loop()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  const renderHeadlineLine = (line: string) => {
    if (line.endsWith(accentWord)) {
      const before = line.slice(0, line.length - accentWord.length)
      return (
        <>
          {before}
          <span style={{ color: 'var(--orange)' }}>{accentWord}</span>
        </>
      )
    }
    return line
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--gutter)',
        paddingTop: '56px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', width: '100%' }}>
        {/* Tag */}
        <div
          ref={tagRef}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', opacity: 0 }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--orange)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            {t.hero.tag[lang]}
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ willChange: 'transform' }}>
          <div
            ref={line1Ref}
            style={{ fontSize: 'var(--text-hero)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fg)', opacity: 0 }}
          >
            {renderHeadlineLine(headlineLines[0])}
          </div>
          {headlineLines[1] && (
            <div
              ref={line2Ref}
              style={{ fontSize: 'var(--text-hero)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fg)', opacity: 0, marginTop: '4px' }}
            >
              {renderHeadlineLine(headlineLines[1])}
            </div>
          )}
        </div>

        {/* Subheadline */}
        <div
          ref={subRef}
          style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: '380px', marginTop: '28px', opacity: 0 }}
        >
          {t.hero.sub[lang]}
        </div>

        {/* CTA row */}
        <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '44px', opacity: 0 }}>
          <Link
            href="/work"
            data-cursor="view"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--orange)',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: '4px',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            {t.hero.ctaPrimary[lang]}
          </Link>
          <Link
            href="/#process"
            style={{ fontSize: '12px', color: 'var(--fg-2)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--fg)' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--fg-2)' }}
          >
            {t.hero.ctaSecondary[lang]}
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: 'var(--gutter)',
          right: 'var(--gutter)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          opacity: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '0.5px', height: '28px', background: 'var(--fg-3)' }} />
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.1em' }}>
            {t.hero.scrollHint[lang]}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '10px', color: 'var(--fg-3)' }}>
          {t.hero.counter[lang]}
        </span>
      </div>
    </section>
  )
}
