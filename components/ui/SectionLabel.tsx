interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-2)]">
      {children}
    </span>
  )
}
