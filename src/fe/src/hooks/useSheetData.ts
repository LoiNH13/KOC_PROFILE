import { useState, useEffect, useRef } from 'react'

export function useSheetData<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  fallback: T,
  ttlMs = 15 * 60 * 1000,
): T {
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const [data, setData] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(`sd_${cacheKey}`)
      if (raw) {
        const { v, ts } = JSON.parse(raw) as { v: T; ts: number }
        if (Date.now() - ts < ttlMs) return v
      }
    } catch { /* ignore */ }
    return fallback
  })

  useEffect(() => {
    let cancelled = false
    fetcherRef.current()
      .then(fresh => {
        if (cancelled) return
        setData(fresh)
        localStorage.setItem(`sd_${cacheKey}`, JSON.stringify({ v: fresh, ts: Date.now() }))
      })
      .catch(() => { /* silently use fallback/stale cache */ })
    return () => { cancelled = true }
  }, [cacheKey, ttlMs])

  return data
}
