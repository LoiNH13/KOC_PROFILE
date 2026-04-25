import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface DarkCtx {
  dark: boolean
  toggle: () => void
}

const Ctx = createContext<DarkCtx>({ dark: false, toggle: () => {} })

export function DarkProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => localStorage.getItem('koc-dark') === '1')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('koc-dark', dark ? '1' : '0')
  }, [dark])

  return <Ctx.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>{children}</Ctx.Provider>
}

export function useDark() {
  return useContext(Ctx)
}
