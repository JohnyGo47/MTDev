'use client'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { projects } from '@/lib/projects'
import { useLanguage } from '@/hooks/useLanguage'
import { CaseHero } from '@/components/work/CaseHero'
import { CaseContent } from '@/components/work/CaseContent'

export default function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const { lang } = useLanguage()

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh' }}>
      <CaseHero project={project} lang={lang} />
      <CaseContent project={project} lang={lang} />
    </div>
  )
}
