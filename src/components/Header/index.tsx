import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Searchbar from "../Searchbar";

type Props = {
  filterApi: Shop.FilterAPI;
}

export default function Header({ filterApi }: Props) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: "flex-start" }, py: 1.5 }}
        >
          <Box sx={{ width: "15%", display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "10%", display: { xs: "none", md: "block" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 3, flexGrow: 1 }}
            >
              Logo
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "85%", sm: "80%" } }}>
            <Searchbar onSearch={filterApi.search} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
