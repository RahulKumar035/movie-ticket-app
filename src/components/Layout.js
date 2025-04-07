import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

function Layout({ children }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');
  console.log('Layout token:', token);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'My Bookings', icon: <BookIcon />, path: '/my-bookings' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Help', icon: <HelpIcon />, path: '/help' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
      <AppBar position="fixed" sx={{ bgcolor: '#1e3c72', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'block', sm: 'none' }, mr: 1 }} // Show menu icon only on mobile
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            MovieMagic
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}> {/* Hide buttons on mobile */}
            {token ? (
              <Button color="inherit" onClick={handleLogout} sx={{ fontSize: { sm: '1rem' } }}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ fontSize: { sm: '1rem' }, mr: 1 }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup" sx={{ fontSize: { sm: '1rem' } }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
          {token && (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ display: { xs: 'block', sm: 'none' }, fontSize: '0.8rem' }} // Logout on mobile
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }} // Drawer only on mobile
      >
        <Box sx={{ width: '70vw', maxWidth: 250, bgcolor: '#fff', height: '100%' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} onClick={() => setDrawerOpen(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {!token && (
              <>
                <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/signup" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, mt: { xs: 7, sm: 8 } }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;