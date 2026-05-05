'use client'
import type { Project } from '@/lib/projects'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

interface CaseHeroProps {
  project: Project
  lang: Lang
}

export function CaseHero({ project, lang }: CaseHeroProps) {
  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
        background: project.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 var(--gutter)' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: '16px',
          }}
        >
          {project.name}
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.65 }}>
          {project.oneLiner[lang]}
        </p>
        {project.url !== '#' && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '14px', color: 'var(--orange)', textDecoration: 'none' }}
          >
            {t.case.visitSite[lang]}
          </a>
        )}
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
          {t.case.scrollHint[lang]}
        </span>
      </div>
    </div>
  )
}
