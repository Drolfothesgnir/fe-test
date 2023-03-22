import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';

type Props = {
  filterApi: Shop.FilterAPI;
  toggleDrawer(): void;
};

export default function Header({ filterApi, toggleDrawer }: Props) {
  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: { xs: 'space-between', md: 'flex-start' },
            py: 1.5,
          }}
        >
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: { xs: '10%', md: '20%' },
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Typography variant='h6' component='div' align='center' sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
          </Box>
          <Box sx={{ width: { md: '60%' }, flexGrow: { xs: 1, md: 0 } }}>
            <Searchbar currentValue={filterApi.state.search} onSearch={filterApi.search} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
