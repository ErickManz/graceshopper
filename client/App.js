import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Container from '@mui/material/Container'

const App = () => {
  return (
    <Container>
      <Navbar />
        <Routes />
    </Container>
  );
};

export default App;
