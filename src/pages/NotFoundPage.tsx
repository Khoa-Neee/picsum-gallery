import { Box, Button, Stack, Typography } from '@mui/material'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import { Link as RouterLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Box
      minHeight="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight={700}>
          404
        </Typography>
        <Typography color="text.secondary">
          Trang bạn tìm kiếm không tồn tại. Hãy quay lại danh sách ảnh để tiếp tục khám phá.
        </Typography>
        <Button
          component={RouterLink}
          to="/photos"
          variant="contained"
          size="large"
          startIcon={<HomeTwoToneIcon />}
        >
          Về trang chính
        </Button>
      </Stack>
    </Box>
  )
}

export default NotFoundPage



