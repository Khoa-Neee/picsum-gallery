import type { PicsumPhotoResponse, PhotoDetail, PhotoSummary } from '../types/photos'

const BASE_URL = 'https://picsum.photos'

const mapPhoto = (payload: PicsumPhotoResponse): PhotoSummary => {
  const { id, author, width, height, download_url: downloadUrl, url } = payload
  const thumbnailUrl = `${BASE_URL}/id/${id}/600/400`

  return {
    id,
    author,
    width,
    height,
    originalUrl: url,
    downloadUrl,
    thumbnailUrl,
  }
}

export const fetchPhotos = async (
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PhotoSummary[]> => {
  const endpoint = `${BASE_URL}/v2/list?page=${page}&limit=${limit}`
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error('Không thể tải danh sách ảnh. Hãy thử lại sau.')
  }

  const data = (await response.json()) as PicsumPhotoResponse[]
  return data.map(mapPhoto)
}

export const fetchPhotoById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PhotoDetail> => {
  const endpoint = `${BASE_URL}/id/${id}/info`
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error('Không tìm thấy ảnh với mã đã chọn.')
  }

  const payload = (await response.json()) as PicsumPhotoResponse
  const summary = mapPhoto(payload)

  return {
    ...summary,
    description:
      'Lorem Picsum không cung cấp mô tả sẵn nên đây là phần mô tả bổ sung giúp bạn hiểu rõ hơn về bức ảnh.',
    sourcePage: payload.url,
  }
}

