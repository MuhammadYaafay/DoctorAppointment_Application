// hooks/use-safe-auth.ts
'use client'

import { useAuth } from '@/context/authContext'
import { useEffect, useState } from 'react'

export function useSafeAuth() {
  const [isReady, setIsReady] = useState(false)
  const auth = useAuth()

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return {
      user: null,
      loading: true,
      login: async () => {},
      logout: async () => {},
      register: async () => {},
      refreshUser: async () => {},
    }
  }

  return auth
}