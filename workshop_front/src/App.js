import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./js/Login"; // นำเข้าหน้า Login
import Dashboard from "./js/dashboard"; // นำเข้าหน้า Dashboard
import Supervisor from "./js/Supervisor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/js/dashboard" element={<Dashboard />} />
        <Route path="/js/Supervisor" element={<Supervisor />} />
      </Routes>
    </Router>
  );
}

export default App;
