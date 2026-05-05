'use client'
import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react'
import type { Lang } from '@/lib/i18n'

interface LanguageContextType {
  lang: Lang
  toggle: () => void
}

export const LanguageContext = createContext<LanguageContextType>({ lang: 'en', toggle: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang
    if (stored === 'en' || stored === 'ru') setLang(stored)
  }, [])

  const toggle = () => {
    const next = lang === 'en' ? 'ru' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return createElement(LanguageContext.Provider, { value: { lang, toggle } }, children)
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext)
}
