'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function Hero() {
  const { lang } = useLanguage()
  const cardRef   = useRef<HTMLDivElement>(null)
  const topRef    = useRef<HTMLDivElement>(null)
  const hlRef     = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const mouse     = useRef({ x: 0, y: 0 })

  const headlineLines = t.hero.headline[lang].split('\n')
  const accentWord    = t.hero.headlineAccent[lang]

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 })
    tl.fromTo(cardRef.current,   { opacity: 0, y: 24 },      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
    tl.fromTo(topRef.current,    { opacity: 0 },              { opacity: 1, duration: 0.5, ease: 'power2.out' },      0.35)
    tl.fromTo(hlRef.current,     { opacity: 0, y: 32 },      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, 0.45)
    tl.fromTo(bottomRef.current, { opacity: 0, y: 16 },      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.65)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      mouse.current = { x: (e.clientX - cx) * 0.008, y: (e.clientY - cy) * 0.008 }
    }
    let rafId: number
    let cur = { x: 0, y: 0 }
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      cur.x += (mouse.current.x - cur.x) * 0.06
      cur.y += (mouse.current.y - cur.y) * 0.06
      if (hlRef.current) {
        hlRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    loop()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <section style={{ padding: 'var(--gutter)', paddingTop: 'calc(56px + var(--gutter))', position: 'relative', zIndex: 1 }}>
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 56px - var(--gutter) * 2)',
          border: '0.5px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          opacity: 0,
        }}
      >
        {/* ── Top bar ── */}
        <div
          ref={topRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 40px',
            borderBottom: '0.5px solid var(--border)',
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '16px', height: '1px', background: 'var(--orange)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              {t.hero.tag[lang]}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
            001 / 004
          </span>
        </div>

        {/* ── Main area — headline sits at bottom ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '48px 40px' }}>
          <div ref={hlRef} style={{ willChange: 'transform', opacity: 0 }}>
            {headlineLines.map((line, i) => {
              const hasAccent = line.endsWith(accentWord)
              const before    = hasAccent ? line.slice(0, line.length - accentWord.length) : line
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 'var(--text-hero)',
                    fontWeight: 700,
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: 'var(--fg)',
                    display: 'block',
                  }}
                >
                  {before}
                  {hasAccent && <span style={{ color: 'var(--orange)' }}>{accentWord}</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          ref={bottomRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '24px 40px',
            borderTop: '0.5px solid var(--border)',
            gap: '24px',
            opacity: 0,
          }}
        >
          <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--fg-2)', maxWidth: '400px' }}>
            {t.hero.sub[lang]}
          </p>

          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
            <Link
              href="/#process"
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-geist-mono), monospace',
                color: 'var(--fg-2)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color var(--dur-fast)',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--fg)' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--fg-2)' }}
            >
              {t.hero.ctaSecondary[lang]}
            </Link>
            <Link
              href="/work"
              data-cursor="view"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--orange)',
                color: '#fff',
                padding: '12px 26px',
                borderRadius: '6px',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                transition: 'opacity var(--dur-fast)',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              {t.hero.ctaPrimary[lang]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
