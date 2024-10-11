import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './dashboard.css'; // นำเข้าไฟล์ CSS ที่ปรับให้ตรงตามดีไซน์

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [payload, setPayload] = useState(null);
  const [userData, setUserData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);

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
              setUserData(data.data[0]);
            } else {
              console.error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        const fetchWarehouseData = async () => {
          try {
            const response = await fetch('https://localhost:7111/api/Warehouse/GetAllWarehouse', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              setWarehouses(data.data);
            } else {
              console.error("Failed to fetch warehouse data");
            }
          } catch (error) {
            console.error("Error fetching warehouse data:", error);
          }
        };

        fetchUserData();
        fetchWarehouseData();

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile">
          <div className="avatar"></div>
          <div className="profile-info">
            <p className="username">{userData ? `${userData.firstname} ${userData.lastname}` : 'Username'}</p>
            <p className="role">Employee - Warehouse</p>
          </div>
        </div>
        <div className="personal-info">
          <h2>ข้อมูลส่วนตัว</h2>
          {userData ? (
            <>
              <p><strong>ชื่อ:</strong> {userData.firstname} {userData.lastname}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
              <p><strong>เบอร์:</strong> {userData.phone || 'ไม่ระบุ'}</p>
              <p><strong>ที่อยู่:</strong> {userData.address || 'ไม่ระบุ'}</p>
              <button className="edit-button">แก้ไขข้อมูลส่วนตัว</button>
            </>
          ) : (
            <p className="no-data">ไม่มีข้อมูลผู้ใช้</p>
          )}
        </div>
        <button className="logout-button">ออกจากระบบ</button>
      </div>
  
      <div className="main-content">
        <div className="navbar">
          <button className="nav-button">หน้าแรก</button>
          <button className="nav-button">ข้อมูลบริษัท</button>
          <button className="nav-button">รายงาน</button>
        </div>
  
        <div className="warehouse-search">
          <input type="text" placeholder="ชื่อโกดัง" />
          <input type="date" />
          <div className="status-filter">
            <label>
              <input type="radio" name="status" value="ว่าง" /> ว่าง
            </label>
            <label>
              <input type="radio" name="status" value="ไม่ว่าง" /> ไม่ว่าง
            </label>
          </div>
          <button className="search-button">ค้นหา</button>
        </div>
  
        <div className="warehouse-list">
          <h2>โกดัง</h2>
          <table className="warehouse-table">
            <thead>
              <tr>
                <th>รหัสโกดัง</th>
                <th>ชื่อโกดัง</th>
                <th>ขนาดพื้นที่</th>
                <th>สถานะ</th>
                <th>วันที่เข้า</th>
                <th>ดูข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.length > 0 ? (
                warehouses.map((warehouse) => (
                  <tr key={warehouse.warehouseid}>
                    <td>{warehouse.warehouseid}</td>
                    <td>{warehouse.warehousename}</td>
                    <td>{warehouse.warehousesize}</td>
                    <td className={warehouse.warehousestatus === 'ว่าง' ? 'text-green' : 'text-red'}>
                      {warehouse.warehousestatus}
                    </td>
                    <td>{warehouse.date || '-'}</td>
                    <td>
                      <button className="view-button">🔍</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">ไม่มีข้อมูลโกดัง</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
