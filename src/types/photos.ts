export interface PicsumPhotoResponse {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface PhotoSummary {
  id: string
  author: string
  width: number
  height: number
  originalUrl: string
  downloadUrl: string
  thumbnailUrl: string
}

export interface PhotoDetail extends PhotoSummary {
  description: string
  sourcePage: string
}



