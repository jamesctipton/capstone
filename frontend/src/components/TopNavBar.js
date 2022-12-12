import React from "react";
import { 
  Outlet, 
  Link, 
  useNavigate
} from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  Button,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Tooltip from '@mui/material/Tooltip';
import Cookies from 'universal-cookie';


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
  
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch {

  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    const cookies = new Cookies();
    cookies.remove('user')
    navigate('/')
    window.location.reload()
  }

  const navigate = useNavigate()
  const navigateToSearch = () => {
    navigate('/search')
  }
  const navigateToFavorites = () => {
    navigate('/Favorites')
  }
  const navigateToFriends = () => {
    navigate('/friends')
  }
  const navigateToProfile = () => {
    navigate('/profile')
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark color="secondary">
          <Toolbar variant="regular" position='fixed' sx={{justifyContent: 'space-between'}} >
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Tooltip title="Menu">
              <IconButton onClick={handleClick} edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>
              FRÍ
            </Typography>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
              <Tooltip title="Search">
                <IconButton aria-label='show/hide password' onClick={() => navigateToSearch()} onMouseDown={() => {}} edge="end" color="primary">
                  <SearchOutlinedIcon fontSize="large" color="primary"/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Favorites">
                <IconButton onClick={() => navigateToFavorites()} edge="end" color="primary" aria-label="Favorites">
                  <FavoriteBorderOutlinedIcon fontSize="large"/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Friends">
                <IconButton onClick={() => navigateToFriends()} edge="end" color="primary" aria-label="friends">
                  <PeopleAltOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              {(user) ? 
                <>
                  <Typography sx={{ color: "#CF7D30", textTransform: 'capitalize' }}> Welcome, {user.firstname}</Typography>
                  <Tooltip title="Profile">
                    <IconButton onClick={() => navigateToProfile()} edge="end" color="primary" aria-label="messages">
                      <PersonOutlineOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </>
                 : 
                <Button 
                  type='button'
                  variant="outlined"
                  sx={{m: 1, borderWidth: 3, borderRadius: 30, borderColor: 'primary', whiteSpace: 'nowrap', minWidth: 'maxcontent', '&:hover': { borderWidth: 3 } }}
                  size="large"
                  component={Link} to="/login"
                >Sign In</Button>
              }
              
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
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <Divider variant="middle" sx={{ width: '80%' }}></Divider>
          <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
          <Divider variant="middle" sx={{ width: '80%' }}></Divider>
          <MenuItem onClick={handleClose} component={Link} to="/join-create">Join/Create Group</MenuItem>
          <Divider variant="middle" sx={{ width: '80%' }}></Divider>
          <MenuItem onClick={() => {handleLogout()}} component={Link} to="/">Logout</MenuItem>
        </Menu>
      <Outlet />
    </ThemeProvider>
  )
};

export default TopNavBar;