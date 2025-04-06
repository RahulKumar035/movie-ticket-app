import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import About from './pages/About';
import Help from './pages/Help';
import Admin from './pages/Admin';

const theme = createTheme({
    palette: {
        primary: { main: '#ff5722' }, // Vibrant orange
        secondary: { main: '#03a9f4' }, // Bright blue
        background: { default: '#f5f5f5' },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h6: { fontWeight: 500 },
    },
    components: {
        MuiAppBar: {
            styleOverrides: { root: { boxShadow: '0 2px 10px rgba(0,0,0,0.2)' } }
        },
        MuiButton: {
            styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } }
        },
        MuiCard: {
            styleOverrides: { root: { boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;