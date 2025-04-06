import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Layout({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', handleStorageChange);
        setToken(localStorage.getItem('token'));
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'My Bookings', icon: <BookIcon />, path: '/my-bookings' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        { text: 'About', icon: <InfoIcon />, path: '/about' },
        { text: 'Help', icon: <HelpIcon />, path: '/help' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#1e3c72' }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: { xs: 1, sm: 2 } }}>
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
                    {token ? (
                        <Button color="inherit" onClick={handleLogout} sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, mr: 1 }}>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: { xs: 200, sm: 250 }, bgcolor: '#fff', height: '100%' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button key={item.text} component={Link} to={item.path} onClick={() => setDrawerOpen(false)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;