import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                About MovieMagic
            </Typography>
            <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.95)', p: 4, borderRadius: 2 }}>
                <Typography variant="h6" paragraph>
                    Welcome to MovieMagic!
                </Typography>
                <Typography paragraph>
                    MovieMagic is your one-stop platform for booking movie tickets online. Whether you’re a fan of action-packed blockbusters, mind-bending sci-fi, or heartwarming animations, we’ve got you covered with a seamless and enjoyable booking experience.
                </Typography>
                <Typography paragraph>
                    Our mission is to make movie-going effortless and fun. Sign up, explore our movie listings, book your tickets with ease, and manage your bookings—all in one place. We’re committed to bringing the magic of cinema right to your fingertips!
                </Typography>
                <Typography paragraph>
                    Created by a passionate team of developers, MovieMagic leverages cutting-edge technology to ensure a smooth user experience. Stay tuned for more features, including enhanced payment options and personalized recommendations.
                </Typography>
                <Typography>
                    Questions? Reach out via our <a href="/help" style={{ color: '#ff5722' }}>Help</a> page!
                </Typography>

                <Typography>

                  Built with Love by Rahul.
                  
                </Typography>
            </Box>
        </Container>
    );
}

export default About;