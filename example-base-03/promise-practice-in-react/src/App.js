import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { generateRoutes } from './utils/router-constants';

function App() {
  return (
    <Router>
      <Routes>{generateRoutes()}</Routes>
    </Router>
  );
};

export default App;
