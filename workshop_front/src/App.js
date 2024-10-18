import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./js/Login"; // นำเข้าหน้า Login
import Dashboard from "./js/dashboard"; // นำเข้าหน้า Dashboard
import Supervisor from "./js/SupervisorCompany";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Dashboard />} />
        <Route path="/supervisor/company" element={<Supervisor />} />
      </Routes>
    </Router>
  );
}

export default App;
