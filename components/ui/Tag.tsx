interface TagProps {
  children: React.ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/50">
      {children}
    </span>
  )
}
