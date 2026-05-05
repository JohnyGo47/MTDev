'use client'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'

export function Footer() {
  const { lang } = useLanguage()

  const links = [
    { href: '/work',    label: t.nav.work[lang] },
    { href: '/about',   label: t.nav.about[lang] },
    { href: '/#process', label: t.nav.process[lang] },
    { href: '/contact', label: t.nav.contact[lang] },
  ]

  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', padding: '40px var(--gutter)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'start', gap: '40px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', letterSpacing: '0.08em', marginBottom: '8px' }}>MTDev</div>
          <div style={{ fontSize: '12px', color: 'var(--fg-2)' }}>{t.footer.tagline[lang]}</div>
        </div>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: '12px', color: 'var(--fg-2)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--fg-2)' }}>
          <div>{t.footer.copyright[lang]}</div>
          <div style={{ marginTop: '4px' }}>
            <Link href="/privacy" style={{ color: 'var(--fg-2)', textDecoration: 'none' }}>
              {t.footer.privacy[lang]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
