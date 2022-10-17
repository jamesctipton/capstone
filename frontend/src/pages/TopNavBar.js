import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from "@mui/material";
import { Button } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const TopNavBar = () => {
  return (
    <div>

    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark color="primary">
        <Toolbar variant="dense" position='fixed'>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
    </div>
  )
};

export default TopNavBar;