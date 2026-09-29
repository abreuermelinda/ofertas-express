'use client'

import { useEffect, useState } from 'react'

let mockingPromise: Promise<unknown> | null = null

function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve()
  }

  if (!mockingPromise) {
    mockingPromise = import('./browser').then(async ({ worker }) => {
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
    })
  }

  return mockingPromise
}

export function MSWProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isReady, setIsReady] = useState(
    process.env.NODE_ENV !== 'development',
  )

  useEffect(() => {
    enableMocking().then(() => {
      setIsReady(true)
    })
  }, [])

  if (!isReady) {
    return null
  }

  return children
}