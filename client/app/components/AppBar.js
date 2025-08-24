import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CodeIcon from '@mui/icons-material/Code';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import axios from 'axios';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const pages = ['Home', 'Tournaments', 'Leaderboard', 'Friends'];
const pageLinks = {
  'Home': '/leetcode',
  'Tournaments': '/tournaments',
  'Leaderboard': '/leaderboard',
  'Friends': '/friends',
};
const settings = ['Profile', 'Account', 'Dashboard'];

function ResponsiveAppBar({ selectedTab, handleTabChange }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInitial, setUserInitial] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserInitial(response.data.username.charAt(0).toUpperCase());
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
      });
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pageIndex) => {
    setAnchorElNav(null);
    handleTabChange(pageIndex);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserInitial('');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Jost, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <Link href={pageLinks[page]} key={page} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={() => handleCloseNavMenu(index)}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <CodeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Jost, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ace
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link href={pageLinks[page]} key={page} passHref style={{ textDecoration: 'none', color: 'white' }}>
                <Button
                  onClick={() => handleTabChange(index)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{userInitial}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link href="/profile" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem key="profile" onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                  </MenuItem>
                </Link>
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={handleOpenLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={handleOpenRegister}>
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <LoginModal open={openLogin} handleClose={handleCloseLogin} />
      <RegisterModal open={openRegister} handleClose={handleCloseRegister} />
    </AppBar>
  );
}
export default ResponsiveAppBar;
