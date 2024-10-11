import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 
import './dashboard.css'; // นำเข้าไฟล์ CSS

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [payload, setPayload] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken);
        setPayload(decoded);

        const userId = decoded.userId;

        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://localhost:7111/api/User/GetUserbyUserId?userid=${userId}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              setUserData(data.data[0]); // เข้าถึงข้อมูลผู้ใช้จาก array
            } else {
              console.error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData();

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {userData ? (
        <div className="user-info">
          <h2>ข้อมูลส่วนตัว</h2>
          <p><strong>ชื่อ:</strong> {userData.firstname} {userData.lastname}</p>
          <p><strong>อีเมล:</strong> {userData.email}</p>
          <p><strong>เบอร์โทร:</strong> {userData.phone || 'ไม่ระบุ'}</p>
          <p><strong>ที่อยู่:</strong> {userData.address || 'ไม่ระบุ'}</p>
          <button className="edit-button">แก้ไขข้อมูลส่วนตัว</button>
        </div>
      ) : (
        <p className="no-data">No user data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
