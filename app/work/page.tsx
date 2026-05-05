'use client'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { WorkGrid } from '@/components/work/WorkGrid'

export default function WorkPage() {
  const { lang } = useLanguage()

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ padding: 'var(--section-v) var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            {t.work.label[lang]}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--fg-2)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '48px' }}>
            {t.work.subtext[lang]}
          </p>
          <WorkGrid />
        </div>
      </div>
    </div>
  )
}
