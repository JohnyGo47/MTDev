'use client'
import { useLanguage } from '@/hooks/useLanguage'
import { projects } from '@/lib/projects'
import { WorkCard } from '@/components/work/WorkCard'

export function WorkGrid() {
  const { lang } = useLanguage()
  const [p1, p2, p3] = projects

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', marginBottom: '3px' }}>
        <WorkCard project={p1} lang={lang} />
        <WorkCard project={p2} lang={lang} />
      </div>
      <WorkCard project={p3} lang={lang} wide />
    </div>
  )
}
