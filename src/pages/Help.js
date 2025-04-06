import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Help() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Help & Support
      </Typography>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', p: 3, borderRadius: 2 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I book a ticket?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Log in, browse movies on the home page, select your tickets, and click "Book Now".</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Can I cancel a booking?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Yes, go to "My Bookings" and click "Cancel" next to your booking.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default Help;