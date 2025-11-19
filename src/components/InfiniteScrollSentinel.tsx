import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'

interface InfiniteScrollSentinelProps {
  onIntersect: () => void
  disabled?: boolean
}

const InfiniteScrollSentinel = ({ onIntersect, disabled = false }: InfiniteScrollSentinelProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect()
          }
        })
      },
      // Trigger the load a bit before the sentinel reaches the viewport bottom
      // to avoid hitting the hard page end which can cause visible jank.
      { rootMargin: '0px 0px 600px 0px' },
    )

    const target = ref.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
      observer.disconnect()
    }
  }, [disabled, onIntersect])

  // Prevent the browser's scroll anchoring from picking this element,
  // which can cause the viewport to jump when new items are appended.
  return <Box ref={ref} sx={{ width: '100%', height: 12, overflowAnchor: 'none' }} />
}

export default InfiniteScrollSentinel



