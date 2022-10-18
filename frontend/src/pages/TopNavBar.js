import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from "@mui/material";
import { Divider } from "@material-ui/core";
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
          <HomeIcon />
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/login" onClick={() => onItemClick('Login')}>
          <ListItemText>Login</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/register" onClick={() => onItemClick('Register')}>
          <ListItemText>Register</ListItemText>
        </ListItem>
        
        <Divider></Divider>

        <ListItem button component={Link} to='/login'>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </Drawer>

    <Outlet />

    </div>
    </ThemeProvider>
  )
};

export default TopNavBar;