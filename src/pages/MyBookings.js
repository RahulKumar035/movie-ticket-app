import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchBookings = useCallback(async () => {
    try {
      console.log('Fetching bookings with token:', token);
      const response = await axios.get('https://movie-ticket-booking-backend-60e5.onrender.com/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Bookings response:', response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
    }
  }, [token]); // 'token' as dependency

  useEffect(() => {
    if (token) fetchBookings();
  }, [token, fetchBookings]); // Include both dependencies

  const handleCancel = async (id) => {
    try {
      await axios.delete(`https://movie-ticket-booking-backend-60e5.onrender.com/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings(); // Refresh after cancel
    } catch (error) {
      alert('Cancel failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  if (!token) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="white">Please log in to view your bookings.</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        My Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography color="white">No bookings yet.</Typography>
      ) : (
        <List sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, p: 2 }}>
          {bookings.map((booking) => (
            <ListItem
              key={booking.id}
              secondaryAction={
                <Button variant="outlined" color="secondary" onClick={() => handleCancel(booking.id)}>
                  Cancel
                </Button>
              }
              sx={{ mb: 1, bgcolor: '#fff', borderRadius: 1 }}
            >
              <ListItemText
                primary={`${booking.movie.title} - ${booking.numberOfTickets} ticket(s)`}
                secondary={`Booked by: ${booking.customerName}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default MyBookings;