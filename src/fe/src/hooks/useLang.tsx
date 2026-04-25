import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/types'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({ lang: 'vi', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem('koc-lang') as Lang) ?? 'vi' } catch { return 'vi' }
  })

  useEffect(() => {
    try { localStorage.setItem('koc-lang', lang) } catch {}
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang: setLangState }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
