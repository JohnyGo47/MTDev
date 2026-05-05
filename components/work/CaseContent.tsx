'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/lib/projects'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

interface CaseContentProps {
  project: Project
  lang: Lang
}

export function CaseContent({ project, lang }: CaseContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll('[data-section]')
      sections?.forEach((section, i) => {
        gsap.fromTo(section,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: section, start: 'top 80%' },
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-geist-mono), monospace',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'var(--orange)',
    display: 'block',
    marginBottom: '12px',
  }

  const bodyStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: 1.75,
    color: 'var(--fg)',
  }

  return (
    <div
      ref={containerRef}
      style={{ maxWidth: '760px', margin: '0 auto', padding: '100px var(--gutter)' }}
    >
      {/* Tags */}
      <div data-section style={{ display: 'flex', gap: '12px', marginBottom: '64px', flexWrap: 'wrap' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{ border: '0.5px solid var(--border)', borderRadius: '2px', padding: '4px 10px', fontSize: '11px', fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.1em', color: 'var(--fg-2)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div data-section style={{ marginBottom: '52px' }}>
        <span style={labelStyle}>{t.case.challenge[lang]}</span>
        <p style={bodyStyle}>{project.challenge[lang]}</p>
      </div>

      <div data-section style={{ marginBottom: '52px' }}>
        <span style={labelStyle}>{t.case.solution[lang]}</span>
        <p style={bodyStyle}>{project.solution[lang]}</p>
      </div>

      <div data-section style={{ marginBottom: '52px' }}>
        <span style={labelStyle}>{t.case.result[lang]}</span>
        <p style={bodyStyle}>{project.result[lang]}</p>
      </div>

      {project.url !== '#' && (
        <div data-section>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--orange)', fontSize: '15px', textDecoration: 'none' }}
          >
            {t.case.visitSite[lang]}
          </a>
        </div>
      )}
    </div>
  )
}
