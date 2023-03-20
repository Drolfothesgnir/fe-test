import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

export default function Header() {
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            Logo
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}