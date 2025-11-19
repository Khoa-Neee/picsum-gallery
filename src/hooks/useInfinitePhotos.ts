import { useCallback, useEffect, useRef, useState } from 'react'
import type { PhotoSummary } from '../types/photos'
import { fetchPhotos } from '../api/picsum'

const PAGE_SIZE = 18

export const useInfinitePhotos = () => {
  const [photos, setPhotos] = useState<PhotoSummary[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const controllerRef = useRef<AbortController | null>(null)
  const isFetchingRef = useRef(false)

  const loadPage = useCallback(async (pageToLoad: number) => {
    if (isFetchingRef.current) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    isFetchingRef.current = true
    setError(null)

    try {
      const nextPhotos = await fetchPhotos(pageToLoad, PAGE_SIZE, controller.signal)
      setPhotos((prev) =>
        pageToLoad === 1 ? nextPhotos : [...prev, ...nextPhotos.filter((p) => !prev.some((item) => item.id === p.id))],
      )
      setHasMore(nextPhotos.length === PAGE_SIZE)
      setPage(pageToLoad)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError((err as Error).message || 'Đã xảy ra lỗi khi tải ảnh.')
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [])

  const loadMore = useCallback(() => {
    if (isFetchingRef.current || !hasMore) return
    void loadPage(page + 1)
  }, [hasMore, loadPage, page])

  const refresh = useCallback(() => {
    setHasMore(true)
    setPage(1)
    void loadPage(1)
  }, [loadPage])

  useEffect(() => {
    void loadPage(1)
    return () => controllerRef.current?.abort()
  }, [loadPage])

  return {
    photos,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  }
}

