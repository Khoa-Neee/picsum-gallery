import { Box } from '@mui/material'
import type { PhotoSummary } from '../types/photos'
import PhotoCard from './PhotoCard'

interface PhotoGridProps {
  photos: PhotoSummary[]
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
      gap={3}
    >
      {photos.map((photo) => (
        <Box key={photo.id} height="100%">
          <PhotoCard photo={photo} />
        </Box>
      ))}
    </Box>
  )
}

export default PhotoGrid

