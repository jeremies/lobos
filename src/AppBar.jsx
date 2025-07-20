import * as React from "react";
import AppBarMui from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import { Link } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import "./AppBar.css";

export default function AppBar() {
  const [anchorElOptions, setAnchorElOptions] = React.useState(null);
  const [title, setTitle] = React.useState("Lobos");
  const optionsOpen = Boolean(anchorElOptions);
  const handleClickOptions = (event) => {
    setAnchorElOptions(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorElOptions(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickOptions}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Menu
            anchorEl={anchorElOptions}
            open={optionsOpen}
            onClose={handleCloseOptions}
          >
            <MenuItem>
              <Link to="/" onClick={() => setTitle("Lobos")}>
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/help" onClick={() => setTitle("Help")}>
                Help
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
