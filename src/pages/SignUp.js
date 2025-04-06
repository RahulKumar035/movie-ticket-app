import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { signup } from '../api'; // Import from api.js
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({
                username,
                email,
                password,
                role: 'USER'
            });
            alert('Sign up successful! Please log in.');
            navigate('/login');
        } catch (error) {
            alert('Sign up failed: ' + (error.response?.data || 'Unknown error'));
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', p: 4, borderRadius: 2 }}>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Sign Up
                </Button>
                <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/login')}>
                    Already have an account? Log in
                </Button>
            </Box>
        </Container>
    );
}

export default SignUp;