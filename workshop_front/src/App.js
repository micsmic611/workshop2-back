import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./js/Login"; // นำเข้าหน้า Login
import Dashboard from "./js/dashboard"; // นำเข้าหน้า Dashboard
import Employee from "./js/Employee";
import Supervisor from "./js/SupervisorCompany";
import Rent from './js/Rent';
import WarehousePopup from './js/WarehousePopup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Dashboard />} />
        <Route path="/supervisor/company" element={<Supervisor />} />
        <Route path="/supervisor/employee" element={<Employee />} />
        <Route path="/js/Rent" element={<Rent />} /> {/* ต้องมี Route ที่นี่ */}
      </Routes>
    </Router>
  );
}

export default App;
