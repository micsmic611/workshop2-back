import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./js/Login"; // นำเข้าหน้า Login
import Dashboard from "./js/dashboard"; // นำเข้าหน้า Dashboard
import Employee from "./js/SupervisorEmployee";
import Supervisor from "./js/SupervisorCompany";
import Rent from './js/Rent';
import WarehousePopup from './js/WarehousePopup';
import Admin from "./js/Supervisor"; // สมมุติว่า Supervisor คือคอมโพเนนต์ Admin
import Report from './js/Report';
import MainCompany from "./js/Employee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Dashboard />} />
        <Route path="/supervisor/company" element={<Supervisor />} />
        <Route path="/supervisor/employee" element={<Employee />} />
        <Route path="/js/Rent" element={<Rent />} /> {/* ต้องมี Route ที่นี่ */}
        <Route path="/supervisor" element={<Admin />} />
        <Route path="/report" element={<Report />} />
        <Route path="/js/Employee" element={<MainCompany />} />

      </Routes>
    </Router>
  );
}

export default App;
