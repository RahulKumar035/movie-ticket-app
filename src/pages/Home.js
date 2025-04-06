import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import axios from 'axios';

function SeatSelectionDialog({ open, onClose, maxSeats, onConfirm, bookedSeats, movieId }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const totalSeats = 20; // Mock total seats per movie
    const rows = ['A', 'B', 'C', 'D'];
    const seatsPerRow = 5;

    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) return; // Can't select booked seats
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else if (selectedSeats.length < maxSeats) {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const seats = [];
    for (let row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
            seats.push(`${row}${i}`);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Your Seats (Max {maxSeats})</DialogTitle>
            <DialogContent>
                <Box display="grid" gridTemplateColumns="repeat(5, 40px)" gap={1}>
                    {seats.map(seat => (
                        <Button
                            key={seat}
                            variant={selectedSeats.includes(seat) ? 'contained' : 'outlined'}
                            color={bookedSeats.includes(seat) ? 'secondary' : 'primary'}
                            onClick={() => handleSeatClick(seat)}
                            disabled={bookedSeats.includes(seat) || (selectedSeats.length >= maxSeats && !selectedSeats.includes(seat))}
                            sx={{ minWidth: 'unset', padding: '5px' }}
                        >
                            {seat}
                        </Button>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => onConfirm(selectedSeats, movieId)}
                    variant="contained"
                    disabled={selectedSeats.length === 0}
                >
                    Confirm {selectedSeats.length} Seat(s)
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function Home() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [tickets, setTickets] = useState({});
    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [openSeatDialog, setOpenSeatDialog] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [bookedSeatsByMovie, setBookedSeatsByMovie] = useState({}); // Track booked seats per movie
    const token = localStorage.getItem('token');

    const fetchMovies = useCallback(async () => {
        try {
            const response = await axios.get('https://movie-ticket-booking-backend-60e5.onrender.com/movies', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Fetched movies:', response.data);
            setMovies(response.data);
            setFilteredMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchMovies();
    }, [token, fetchMovies]);

    useEffect(() => {
        let result = movies;
        if (searchQuery) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (category !== 'All') {
            result = result.filter(movie => movie.genre === category);
        }
        setFilteredMovies(result);
    }, [searchQuery, category, movies]);

    const handleBook = (movieId) => {
        setSelectedMovieId(movieId);
        setOpenSeatDialog(true);
    };

    const handleSeatConfirm = async (selectedSeats, movieId) => {
        setOpenSeatDialog(false);
        const numberOfTickets = selectedSeats.length;
        const ticketPrice = 10; // Mock price: $10 per ticket
        const totalCost = numberOfTickets * ticketPrice;

        const paymentConfirmed = window.confirm(`Booking ${numberOfTickets} ticket(s) for $${totalCost}. Proceed?`);
        if (paymentConfirmed) {
            try {
                await axios.post(
                    'https://movie-ticket-booking-backend-60e5.onrender.com/bookings', // Updated URL
                    { movieId, numberOfTickets },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBookedSeatsByMovie(prev => ({
                    ...prev,
                    [movieId]: [...(prev[movieId] || []), ...selectedSeats]
                }));
                alert('Booking confirmed!');
                fetchMovies();
            } catch (error) {
                alert('Booking failed: ' + (error.response?.data?.message || 'Unknown error'));
            }
        } else {
            alert('Payment cancelled. Booking not completed.');
        }
    };

    const categories = ['All', 'Action', 'Sci-Fi', 'Animation'];

    if (!token) {
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: '#fff' }}>
                Please log in to view movies.
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 4, pb: 4 }}>
            <Typography
                variant="h3"
                gutterBottom
                color="white"
                sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            >
                Explore Movies
            </Typography>
            <TextField
                label="Search Movies"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 4, bgcolor: '#fff', borderRadius: 1 }}
            />
            <Tabs
                value={category}
                onChange={(e, val) => setCategory(val)}
                sx={{ mb: 4 }}
                centered
                variant="scrollable"
                scrollButtons="auto"
            >
                {categories.map(cat => (
                    <Tab
                        key={cat}
                        label={cat}
                        value={cat}
                        sx={{ color: '#fff', '&.Mui-selected': { color: '#ff5722' }, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    />
                ))}
            </Tabs>
            <Grid container spacing={3}>
            {filteredMovies.map((movie) => {
    const bookedTickets = movie.bookings ? movie.bookings.reduce((sum, b) => sum + b.numberOfTickets, 0) : 0;
    const remainingTickets = movie.totalTickets - bookedTickets;
    const posterUrl = `https://image.tmdb.org/t/p/w300${movie.posterPath}`;
    console.log('Poster URL:', posterUrl);
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card sx={{ bgcolor: '#fff', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' }, height: '100%' }}>
                <img
                    src={posterUrl}
                    alt={movie.title}
                    style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}
                    onError={(e) => console.error(`Failed to load poster for ${movie.title}: ${posterUrl}`)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
    <Typography variant="h6" noWrap>{movie.title}</Typography>
    <Typography color="textSecondary" sx={{ fontSize: '0.9rem' }}>Genre: {movie.genre}</Typography>
    <Typography sx={{ fontSize: '0.9rem' }}>Available: {remainingTickets}/{movie.totalTickets}</Typography>
    <TextField
        label="Tickets"
        type="number"
        inputProps={{ min: 1, max: remainingTickets }}
        value={tickets[movie.id] || ''}
        onChange={(e) => setTickets({ ...tickets, [movie.id]: parseInt(e.target.value) || 1 })}
        size="small"
        sx={{ mt: 2, width: '100%' }}
    />
    <Button
        variant="contained"
        color="primary"
        onClick={() => handleBook(movie.id)}
        disabled={remainingTickets === 0}
        fullWidth
        sx={{ mt: 2 }}
    >
        Book Now
    </Button>
</CardContent>
            </Card>
        </Grid>
    );
})}
            </Grid>
            <SeatSelectionDialog
                open={openSeatDialog}
                onClose={() => setOpenSeatDialog(false)}
                maxSeats={tickets[selectedMovieId] || 1}
                onConfirm={handleSeatConfirm}
                bookedSeats={bookedSeatsByMovie[selectedMovieId] || []}
                movieId={selectedMovieId}
            />
        </Container>
    );
}

export default Home;