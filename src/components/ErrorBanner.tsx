import { Alert, AlertTitle, Button, Stack } from '@mui/material'
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'

interface ErrorBannerProps {
  message: string
  onRetry?: () => void
}

const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" startIcon={<RefreshTwoToneIcon />} onClick={onRetry}>
            Thử lại
          </Button>
        ) : undefined
      }
    >
      <Stack spacing={0.5}>
        <AlertTitle>Không thể tải dữ liệu</AlertTitle>
        {message}
      </Stack>
    </Alert>
  )
}

export default ErrorBanner



