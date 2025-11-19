import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone'
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone'
import { useMemo } from 'react'
import PhotoGrid from '../components/PhotoGrid'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorBanner from '../components/ErrorBanner'
import InfiniteScrollSentinel from '../components/InfiniteScrollSentinel'
import { useInfinitePhotos } from '../hooks/useInfinitePhotos'

const GalleryPage = () => {
  const { photos, loading, error, hasMore, loadMore, refresh } = useInfinitePhotos()

  const heroSubtitle = useMemo(
    () =>
      `Ứng dụng tải ảnh trực tiếp từ Lorem Picsum (API công khai) và hỗ trợ cuộn vô hạn để bạn luôn có nội dung mới.`,
    [],
  )

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PhotoLibraryTwoToneIcon color="primary" />
          <Typography variant="h4" fontWeight={700}>
            Bộ sưu tập ảnh
          </Typography>
        </Stack>
        <Typography color="text.secondary">{heroSubtitle}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Cuộn vô hạn" color="primary" variant="outlined" />
          <Chip label="React Router" color="primary" variant="outlined" />
          <Chip label="Material UI" color="primary" variant="outlined" />
        </Stack>
      </Stack>

      {error && <ErrorBanner message={error} onRetry={refresh} />}

      {!photos.length && !loading && !error ? (
        <EmptyState
          title="Chưa có ảnh nào"
          description="Hãy nhấn vào nút bên dưới để tải dữ liệu mới nhất từ Lorem Picsum."
          onRetry={refresh}
        />
      ) : (
        <PhotoGrid photos={photos} />
      )}

      {loading && <LoadingState message="Đang tải thêm ảnh..." />}

      {!hasMore && !!photos.length && (
        <Alert icon={<AutoAwesomeTwoToneIcon fontSize="inherit" />} severity="success" sx={{ borderRadius: 3 }}>
          <AlertTitle>Đã hiển thị toàn bộ ảnh hiện có</AlertTitle>
          Bạn đã cuộn tới cuối danh sách. Chúc bạn có trải nghiệm thư giãn với thư viện ảnh từ Lorem Picsum!
        </Alert>
      )}

      <Box>
        <InfiniteScrollSentinel onIntersect={loadMore} disabled={!hasMore || loading} />
      </Box>
    </Stack>
  )
}

export default GalleryPage



