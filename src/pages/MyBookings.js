import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, [token, fetchBookings]); // Added fetchBookings to dependencies

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
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