import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface State {
  loading: boolean
  error: boolean
  done: boolean
}

export function useFormSubmit(table: string, opts?: { ignoreErrorCodes?: string[] }) {
  const [state, setState] = useState<State>({ loading: false, error: false, done: false })

  async function submit(data: Record<string, unknown>) {
    if (!supabase) {
      // Supabase not configured — treat as success in dev
      setState({ loading: false, error: false, done: true })
      return
    }
    setState({ loading: true, error: false, done: false })
    const { error } = await supabase.from(table).insert(data)
    if (error && !opts?.ignoreErrorCodes?.includes(error.code)) {
      setState({ loading: false, error: true, done: false })
    } else {
      setState({ loading: false, error: false, done: true })
    }
  }

  return { ...state, submit }
}
