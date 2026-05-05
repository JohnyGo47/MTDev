'use client'
import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react'

interface ThemeContextType {
  theme: 'dark' | 'light'
  toggle: (originX: number, originY: number) => void
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light'
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  const toggle = (originX: number, originY: number) => {
    const next = theme === 'dark' ? 'light' : 'dark'

    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    )

    const apply = () => {
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
      localStorage.setItem('theme', next)
    }

    if ('startViewTransition' in document) {
      const transition = (document as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(apply)
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${originX}px ${originY}px)`, `circle(${maxRadius}px at ${originX}px ${originY}px)`] },
          { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
        )
      })
    } else {
      apply()
    }
  }

  return createElement(ThemeContext.Provider, { value: { theme, toggle } }, children)
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext)
}
