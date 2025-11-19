import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingStateProps {
  message?: string
  compact?: boolean
}

const LoadingState = ({ message = 'Đang tải dữ liệu...', compact = false }: LoadingStateProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      py={compact ? 2 : 6}
      gap={2}
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingState



