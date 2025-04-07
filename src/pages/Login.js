import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://movie-ticket-booking-backend-60e5.onrender.com/auth/signin', {
            username,
            password,
          });
          localStorage.setItem('token', response.data.token);
          console.log('Login token:', response.data.token); // Debug in console
          alert('Login successful!');
          navigate('/');
        } catch (error) {
          alert('Login failed: ' + (error.response?.data || 'Unknown error'));
        }
      };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', p: 4, borderRadius: 2 }}>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;