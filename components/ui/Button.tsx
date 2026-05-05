import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  external?: boolean
  dataCursor?: string
  className?: string
}

export function Button({ children, href, onClick, variant = 'primary', external, dataCursor, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center transition-all'
  const styles = variant === 'primary'
    ? 'bg-[var(--orange)] text-white px-7 py-3 rounded-[4px] font-mono text-[11px] uppercase tracking-[0.12em] hover:opacity-90'
    : 'text-[var(--fg-2)] text-[12px] hover:text-[var(--fg)] transition-colors duration-200'

  if (href) {
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-cursor={dataCursor}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      data-cursor={dataCursor}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
