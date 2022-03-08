import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const App = () => {
  return (
    <Container>
      <Navbar />
  {/* Box saves content from being hidden by navbar*/}
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        ></Box>
        <Routes />
    </Container>
  );
};

export default App;
