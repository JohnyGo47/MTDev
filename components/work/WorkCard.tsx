'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Project } from '@/lib/projects'
import type { Lang } from '@/lib/i18n'

interface WorkCardProps {
  project: Project
  lang: Lang
  wide?: boolean
}

export function WorkCard({ project, lang, wide }: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / Placeholder */}
      <div
        style={{
          width: '100%',
          aspectRatio: wide ? '21/9' : '4/3',
          background: project.bgColor,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.65 : 0.55}) 0%, transparent 50%)`,
            zIndex: 1,
            transition: 'all 0.4s ease',
          }}
        />

        {/* Subtle inner image container with scale */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', userSelect: 'none' }}>
            {project.name}
          </div>
        </div>

        {/* Card info */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            zIndex: 2,
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'transform 0.4s ease',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', marginBottom: '6px' }}>
            {project.name}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Top-right arrow */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 2,
            color: '#fff',
            fontSize: '18px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          ↗
        </div>
      </div>
    </Link>
  )
}
