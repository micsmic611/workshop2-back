import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './js/Login';
import Dashboard from './js/dashboard';
import Supervisor from './js/Supervisor';
import Rent from './js/Rent';
import WarehousePopup from './js/WarehousePopup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/js/dashboard" element={<Dashboard />} />
        <Route path="/js/Supervisor" element={<Supervisor />} />
        <Route path="/js/Rent" element={<Rent />} /> {/* ต้องมี Route ที่นี่ */}
      </Routes>
    </Router>
  );
}

export default App;
