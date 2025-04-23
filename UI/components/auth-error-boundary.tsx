'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthErrorBoundary({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message.includes('useAuth must be used within an AuthProvider')) {
        router.refresh() // Try refreshing the page
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [router])

  return <>{children}</>
}