import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone'

const navLinks = [
  { label: 'Gallery', to: '/photos' },
  { label: 'Homework Brief', to: 'https://picsum.photos/' },
]

const AppLayout = () => {
  const location = useLocation()

  return (
    <Stack minHeight="100vh" bgcolor="background.default">
      <AppBar position="sticky" elevation={0} color="inherit">
        <Toolbar sx={{ gap: 2, py: 1 }}>
          <Button
            component={RouterLink}
            to="/photos"
            color="primary"
            startIcon={<PhotoLibraryTwoToneIcon />}
            sx={{ fontWeight: 700, fontSize: '1.125rem' }}
          >
            Picsum Gallery
          </Button>

          <Stack direction="row" gap={1} sx={{ ml: 'auto' }}>
            {navLinks.map((item) => {
              const isExternal = item.to.startsWith('http')
              const isActive = location.pathname.startsWith(item.to)

              return (
                <Button
                  key={item.label}
                  component={isExternal ? 'a' : RouterLink}
                  to={isExternal ? undefined : item.to}
                  href={isExternal ? item.to : undefined}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  variant={isActive ? 'contained' : 'text'}
                  color={isActive ? 'primary' : 'inherit'}
                >
                  {item.label}
                </Button>
              )
            })}
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" flex={1} py={{ xs: 3, md: 6 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" py={4} bgcolor="white" borderTop="1px solid #eee">
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            Built with ❤️ for the Lorem Picsum gallery homework –
            {` ${new Date().getFullYear()}`}
          </Typography>
        </Container>
      </Box>
    </Stack>
  )
}

export default AppLayout
