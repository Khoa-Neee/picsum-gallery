import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone'
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { PhotoDetail } from '../types/photos'
import { fetchPhotoById } from '../api/picsum'

const PhotoDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [photo, setPhoto] = useState<PhotoDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchPhotoById(id, controller.signal)
      .then((data) => setPhoto(data))
      .catch((err) => {
        const e = err as Error & { code?: number; name?: string }
        if (e?.name === 'AbortError' || e?.code === 20) return
        setError(e?.message || 'Đã xảy ra lỗi khi tải ảnh.')
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [id])

  if (!id) {
    return (
      <Alert severity="error">
        Không tìm thấy mã ảnh hợp lệ. Vui lòng quay lại trang danh sách và thử lại.
      </Alert>
    )
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/photos">
            Photos
          </Link>
          <Typography color="text.primary">#{id}</Typography>
        </Breadcrumbs>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Typography variant="h4" fontWeight={700}>
            {photo ? `Ảnh #${photo.id}` : 'Đang tải ảnh...'}
          </Typography>
          <Button
            component={RouterLink}
            to="/photos"
            variant="outlined"
            startIcon={<ArrowBackTwoToneIcon />}
          >
            Quay lại bộ sưu tập
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error">
          {error} –{' '}
          <Link component="button" onClick={() => window.location.reload()} underline="hover">
            Thử tải lại
          </Link>
        </Alert>
      )}

      <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        {loading ? (
          <Skeleton variant="rectangular" height={420} sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
        ) : (
          <CardMedia
            component="img"
            image={photo?.downloadUrl}
            sx={{ maxHeight: 520, objectFit: 'cover' }}
            alt={photo?.author}
          />
        )}
        <CardContent>
          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Tác giả
                </Typography>
                <Typography variant="h6">{photo?.author}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Giới thiệu
                </Typography>
                <Typography variant="body1">{photo?.description}</Typography>
              </Box>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component="a"
                  href={photo?.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<DownloadTwoToneIcon />}
                >
                  Tải ảnh gốc
                </Button>
                <Button
                  component="a"
                  href={photo?.sourcePage}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<OpenInNewTwoToneIcon />}
                >
                  Xem trang gốc
                </Button>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Kích thước gốc: {photo?.width} × {photo?.height}px
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}

export default PhotoDetailsPage

