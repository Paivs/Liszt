'use client'
import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

function NotifierContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const msg = searchParams.get('msg')
    if (msg) {
      toast.warning(msg)
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('msg')
      router.replace(`${window.location.pathname}?${newParams.toString()}`, { replace: true })
    }
  }, [searchParams, router])

  return null
}

export default function Notifier() {
  return (
    <Suspense fallback={null}>
      <NotifierContent />
    </Suspense>
  )
}
