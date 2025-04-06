import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

function Admin() {
    const [movies, setMovies] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        if (token) fetchMovies();
    }, [token]);

    if (!token) {
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: '#fff' }}>
                Please log in to access this page.
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 4, pb: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                color="white"
                sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
                Admin Dashboard - Manage Movies
            </Typography>
            <Grid container spacing={3}>
                {movies.map((movie) => {
                    const bookedTickets = movie.bookings.reduce((sum, b) => sum + b.numberOfTickets, 0);
                    const remainingTickets = movie.totalTickets - bookedTickets;
                    const posterUrl = `https://image.tmdb.org/t/p/w300${movie.posterPath}`;
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <Card sx={{ bgcolor: '#fff', borderRadius: 2, height: '100%' }}>
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    style={{ width: '100%', height: '350px', objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                />
                                <CardContent>
                                    <Typography variant="h6" noWrap>{movie.title}</Typography>
                                    <Typography color="textSecondary" sx={{ fontSize: '0.9rem' }}>
                                        Genre: {movie.genre}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>
                                        Available: {remainingTickets}/{movie.totalTickets}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

export default Admin;