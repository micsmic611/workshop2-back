import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import { jwtDecode } from "jwt-decode"; // นำเข้า jwtDecode
import '../css/Login.css'; // นำเข้าไฟล์ CSS

import image1 from '../images/image 1.png';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // เพิ่ม state สำหรับข้อผิดพลาด
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const handleLogin = async () => {
    const response = await fetch("https://localhost:7111/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log("Received token:", data.token); // ตรวจสอบโทเคนที่ได้รับ
  
      // ตรวจสอบว่าโทเคนมีค่าที่ถูกต้องหรือไม่
      if (data.token && data.token.split('.').length === 3) {
        // บันทึกโทเคนลงใน localStorage
        localStorage.setItem("token", data.token);
        
        try {
          const decodedToken = jwtDecode(data.token); // แปลง token
          const userId = decodedToken.userId;
          const roleId = decodedToken.roleId;
  
          // เก็บค่า userId และ roleId ใน state หรือ local storage
          console.log("User ID:", userId);
          console.log("Role ID:", roleId);
  
          // นำทางไปยัง Dashboard
          if (roleId === "1") {
            navigate("/dashboard"); // ถ้า roleId เป็น 1 ไปหน้า dashboard
          } else if (roleId === "2") {
            navigate("/supervisor"); // ถ้า roleId เป็น 2 ไปอีกหน้านึง
          } else {
            console.error("Unknown roleId.");
          }
        } catch (error) {
          console.error("Failed to decode token:", error); // จัดการข้อผิดพลาดการ decode
        }
      } else {
        console.error("Invalid token format.");
      }
    } else {
      console.error("Login failed");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src={image1} alt="Warehouse" />
        </div>
        <div className="login-form">
          <h2>Log in</h2>
          <p>Hi! Let's get started </p>
          <p>in Warehouse management</p>
          {error && <p className="error-message">{error}</p>} {/* แสดงข้อความข้อผิดพลาด */}
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // เพิ่มการจัดการการเปลี่ยนแปลง
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // เพิ่มการจัดการการเปลี่ยนแปลง
          />
          <button className="login-button" onClick={handleLogin}>Log in</button>
          <div className="login-footer">
            <p>Forgot Password <a href="/reset-password" className="reset-link"> Reset</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
