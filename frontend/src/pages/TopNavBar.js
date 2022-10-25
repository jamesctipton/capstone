import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { InputAdornment, OutlinedInput, InputLabel } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ThemeProvider, createTheme, Button, Icon } from "@mui/material";
import { Divider } from "@material-ui/core";
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    },
    secondary: {
      main: '#00000'
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <ThemeProvider theme={theme}>
    <div>

    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark color="secondary">
        <Toolbar variant="regular" position='fixed' sx={{justifyContent: 'space-between'}} >
          <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <IconButton onClick={handleClick} edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon fontSize="large"/>
          </IconButton>
          <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>
            FRÍ
          </Typography>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
            <FormControl fullWidth>
            <OutlinedInput
                placeholder="Search Locations, Hotels, or Flights"
                variant="outlined"
                sx={{borderWidth: 3, borderRadius: 30, whiteSpace: 'nowrap', minWidth: 310}}
                fullWidth
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='show/hide password'
                            onClick={() => {}}
                            onMouseDown={() => {}}
                            edge="end"
                        >
                            <SearchOutlinedIcon fontSize="large" color="primary"/>
                        </IconButton>
                    </InputAdornment>
                }
            >Search</OutlinedInput>
            </FormControl>
            <IconButton onClick={() => {}} edge="end" color="primary" aria-label="favorites">
              <FavoriteBorderOutlinedIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={() => {}} edge="end" color="primary" aria-label="groups">
              <PeopleAltOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => {}} edge="end" color="primary" aria-label="messages">
              <TextsmsOutlinedIcon fontSize="large" />
            </IconButton>
            <Button 
                type='button'
                variant="outlined"
                sx={{m: 1, borderWidth: 3, borderRadius: 30, borderColor: 'primary', whiteSpace: 'nowrap', minWidth: 'maxcontent'}}
                size="large"
                onClick={() => {}}
                component={Link} to="/login"
              >Sign In</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{marginTop: 2}}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

    <Outlet />
    </div>
    </ThemeProvider>
  )
};

export default TopNavBar;