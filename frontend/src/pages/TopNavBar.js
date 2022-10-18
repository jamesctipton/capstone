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
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    }
  }
});

const TopNavBar = () => {
  const [drawer, setDrawer] = React.useState(false);
  const [title, changeTitle] = React.useState('Home')
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => {
    changeTitle(title);
    toggleDrawer(!drawer);
  }
  
  return (
    <ThemeProvider theme={theme}>
    <div>

    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark color="primary">
        <Toolbar variant="dense" position='fixed'>
          <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Drawer
    open={drawer}
    onClose={toggleDrawer}
    >
      <List>
        <ListItem button component={Link} to="/" onClick={() => onItemClick('Home')}>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/login" onClick={() => onItemClick('Login')}>
          <ListItemText>Login</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/register" onClick={() => onItemClick('Register')}>
          <ListItemText>Register</ListItemText>
        </ListItem>
      </List>
    </Drawer>

    <Outlet />

    </div>
    </ThemeProvider>
  )
};

export default TopNavBar;