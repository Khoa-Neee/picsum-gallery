import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { PhotoSummary } from '../types/photos'

interface PhotoCardProps {
  photo: PhotoSummary
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/photos/${photo.id}`}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignSelf: 'stretch' }}
      >
        <CardMedia
          component="img"
          image={photo.thumbnailUrl}
          alt={`Ảnh của ${photo.author}`}
          loading="lazy"
          sx={{ aspectRatio: '3 / 2', width: '100%' }}
        />

        <CardContent sx={{ width: '100%' }}>
          <Stack spacing={1}>
            <Typography variant="h6" fontSize="1rem">
              Ảnh #{photo.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              Tác giả: {photo.author}
            </Typography>
            <Box>
              <Chip
                size="small"
                label={`${photo.width}×${photo.height}`}
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PhotoCard

