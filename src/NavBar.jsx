import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;
function NavBar({ onToggleColorMode }) {
  const theme = useTheme();
  const location = useLocation();

  const routeTitle =
    location.pathname === "/notes"
      ? "Notes"
      : "Diary";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">{routeTitle}</Typography>
        <IconButton onClick={onToggleColorMode} size="small">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Divider />
      <List>
        <ListItemButton
          component={NavLink}
          to="/"
          end
          sx={{
            "&.active .MuiListItemText-primary": {
              fontWeight: "bold"
            }
          }}
        >
          <ListItemText primary="Diary" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/notes"
          sx={{
            "&.active .MuiListItemText-primary": {
              fontWeight: "bold"
            }
          }}
        >
          <ListItemText primary="Notes" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default NavBar;