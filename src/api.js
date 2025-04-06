import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movie-ticket-booking-backend-60e5.onrender.com/auth',
});

export const signup = (userData) => api.post('/signup', userData);
export const signin = (credentials) => api.post('/signin', credentials);
export const getMovies = (token) => axios.get('https://movie-ticket-booking-backend-60e5.onrender.com/movies', {
  headers: { Authorization: `Bearer ${token}` }
});