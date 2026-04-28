import { createContext, useContext } from 'react'
import { useSheetData } from './useSheetData'
import { fetchKocData } from '@/lib/sheets'
import { KOC_DATA } from '@/data/koc-data'
import type { KocData } from '@/types'

const KocDataContext = createContext<KocData>(KOC_DATA)

export function KocDataProvider({ children }: { children: React.ReactNode }) {
  const profile = useSheetData('koc_profile', fetchKocData, KOC_DATA)
  return <KocDataContext.Provider value={profile}>{children}</KocDataContext.Provider>
}

export function useKocData(): KocData {
  return useContext(KocDataContext)
}
