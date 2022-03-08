import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes />
      </main>
    </div>
  );
};

export default App;
