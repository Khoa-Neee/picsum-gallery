import { Navigate, createBrowserRouter } from 'react-router-dom'
import AppLayout from './App'
import GalleryPage from './pages/GalleryPage'
import PhotoDetailsPage from './pages/PhotoDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

// Use Vite's BASE_URL as basename so routes work under /picsum-gallery/ on GitHub Pages
const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/photos" replace />,
      },
      {
        path: 'photos',
        element: <GalleryPage />,
      },
      {
        path: 'photos/:id',
        element: <PhotoDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
], { basename })

export default router



