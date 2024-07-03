import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { generateRoutes } from './utils/router-constants';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Parent />} >
          <Route path="child1" element={<Child1 />} />
          <Route path="child2" element={<Child2 />} />
        </Route> */}
        {generateRoutes()}
      </Routes>
    </Router>
  );
};

export default App;
