import React from 'react';
import { Container, Typography, Paper, Box, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const username = token ? JSON.parse(atob(token.split('.')[1])).sub : 'Guest';

  if (!token) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="white">Please log in to view your profile.</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar sx={{ width: 100, height: 100, m: 'auto', bgcolor: '#ff5722' }}>{username[0]}</Avatar>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            {username}
          </Typography>
          <Typography color="textSecondary">Member since: March 2025</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/my-bookings')}>
            View My Bookings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;