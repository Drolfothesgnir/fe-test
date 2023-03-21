import { useState } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Searchbar from "../Searchbar";
import { FilterAPI } from "../../utils/filterApi/filterApi";

interface Props {
  filterApi: FilterAPI
}

export default function Header({filterApi}: Props) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: {xs: "flex-start", }, py: 1.5 }}
        >
          <Box sx={{ width: "15%", display: { xs: "block", sm: "none" } }}>
            <IconButton size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "10%", display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 3, flexGrow: 1 }}
            >
              Logo
            </Typography>
          </Box>
          <Box sx={{ width: {xs: "85%", sm: "80%"} }}>
            <Searchbar onSearch={filterApi.search} />
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
