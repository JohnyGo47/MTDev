'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { t } from '@/lib/i18n'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 9a6 6 0 01-7-7 6 6 0 100 14 6 6 0 007-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )
}

export function Nav() {
  const pathname = usePathname()
  const { lang, toggle: toggleLang } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()

  const links = [
    { href: '/work',    label: t.nav.work[lang] },
    { href: '/about',   label: t.nav.about[lang] },
    { href: '/#process', label: t.nav.process[lang] },
    { href: '/contact', label: t.nav.contact[lang] },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '0.5px solid var(--border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--gutter)',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ fontWeight: 600, fontSize: '14px', letterSpacing: '0.08em', color: 'var(--fg)', textDecoration: 'none', marginRight: 'auto' }}>
        MTDev
      </Link>

      {/* Center links */}
      <div style={{ display: 'flex', gap: '32px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        {links.map(({ href, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              data-cursor="view"
              style={{
                fontSize: '12px',
                fontWeight: active ? 500 : 400,
                letterSpacing: '0.06em',
                color: active ? 'var(--fg)' : 'var(--fg-2)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
        <button
          onClick={toggleLang}
          style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'var(--fg-2)', background: 'none', border: 'none', cursor: 'none', padding: '4px' }}
        >
          {lang.toUpperCase()}
        </button>

        <button
          onClick={(e) => toggleTheme(e.clientX, e.clientY)}
          style={{ display: 'flex', alignItems: 'center', color: 'var(--fg-2)', background: 'none', border: 'none', cursor: 'none', padding: '4px' }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <Link
          href="/contact"
          data-cursor="open"
          style={{
            border: '0.5px solid var(--orange)',
            color: 'var(--orange)',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '12px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--orange-10)' }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
        >
          {t.nav.cta[lang]}
        </Link>
      </div>
    </nav>
  )
}
