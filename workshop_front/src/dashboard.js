import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './dashboard.css'; // นำเข้าไฟล์ CSS ที่ปรับให้ตรงตามดีไซน์
import { Drawer, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
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
            const response = await fetch('https://localhost:7111/api/Warehouse/warehouserental', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              setWarehouses(data);
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContents = (
    <div className="drawer-container">
      <div className="profile">
        <div className="avatar"></div>
        <div className="profile-info">
          <p className="username">{userData?.username || 'Username'}</p>
          <p className="role">Employee - Warehouse</p>
        </div>
      </div>
      <div className="personal-info">
        <h2>ข้อมูลส่วนตัว</h2>
        <p><strong>ชื่อ:</strong> {userData?.firstname} {userData?.lastname}</p>
        <p><strong>อีเมล:</strong> {userData?.email}</p>
        <p><strong>เบอร์:</strong> {userData?.phone || 'ไม่ระบุ'}</p>
        <p><strong>ที่อยู่:</strong> {userData?.address || 'ไม่ระบุ'}</p>
        <button className="logout-button">ออกจากระบบ</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container"> 
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <div className="navbar">
            <button className="nav-button">หน้าแรก</button>
            <button className="nav-button">ข้อมูลบริษัท</button>
            <button className="nav-button">รายงาน</button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContents}
      </Drawer>

      <div className="main-content">
        <div className="warehouse-list">
          <h2>โกดัง</h2>
          <table className="warehouse-table">
            <thead>
              <tr>
                <th>รหัสโกดัง</th>
                <th>ชื่อโกดัง</th>
                <th>ที่อยู่</th>
                <th>ขนาดพื้นที่</th>
                <th>สถานะ</th>
                <th>วันที่เช่า</th>
                <th>ดูข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.length > 0 ? (
                warehouses.map((warehouse) => (
                  <tr key={warehouse.rentalid}>
                    <td>{warehouse.warehouseid}</td>
                    <td>{warehouse.warehousename}</td>
                    <td>{warehouse.warehouseaddress}</td>
                    <td>{warehouse.warehousesize}</td>
                    <td className={warehouse.warehousestatus === 'Active' ? 'text-green' : warehouse.warehousestatus === 'Inactive' ? 'text-red' : 'text-orange'}>
                      {warehouse.warehousestatus}
                    </td>
                    <td>{new Date(warehouse.date_rental_start).toLocaleDateString()} - {new Date(warehouse.date_rental_end).toLocaleDateString()}</td>
                    <td><button className="view-button">ดู</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">ไม่พบข้อมูลโกดัง</td>
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
