import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./js/Login"; // นำเข้าหน้า Login
import Dashboard from "./js/dashboard"; // นำเข้าหน้า Dashboard
import Admin from "./js/admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/js/dashboard" element={<Dashboard />} />
        <Route path="/js/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
