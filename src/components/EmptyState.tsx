import { Box, Button, Typography } from '@mui/material'
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone'

interface EmptyStateProps {
  title: string
  description: string
  onRetry?: () => void
}

const EmptyState = ({ title, description, onRetry }: EmptyStateProps) => {
  return (
    <Box
      textAlign="center"
      border="1px dashed"
      borderColor="divider"
      borderRadius={3}
      p={4}
      bgcolor="background.paper"
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {description}
      </Typography>
      {onRetry && (
        <Button variant="contained" startIcon={<RefreshTwoToneIcon />} onClick={onRetry}>
          Thử tải lại
        </Button>
      )}
    </Box>
  )
}

export default EmptyState



