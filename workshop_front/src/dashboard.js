import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './dashboard.css'; // นำเข้าไฟล์ CSS ที่ปรับให้ตรงตามดีไซน์
import { Drawer, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [payload, setPayload] = useState(null);
  const [userData, setUserData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              setEditedUserData(data.data[0]);
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
              setWarehouses(data); // ใช้ข้อมูลที่ได้รับจาก API
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

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData); // คืนค่าข้อมูลเดิม
  };

  const handleSaveClick = async () => {
    const userUpdateData = {
      userID: userData.userID,
      username: userData.username,
      firstname: editedUserData.firstname,
      lastname: editedUserData.lastname,
      email: editedUserData.email,
      phone: editedUserData.phone,
      address: editedUserData.address,
    };
  
    try {
      const response = await fetch(`https://localhost:7111/api/User/UpdateUser?Userid=${userUpdateData.userID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdateData),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData.data); // อัปเดต userData ด้วยข้อมูลที่ได้รับจากการอัปเดต
        setEditedUserData(updatedData.data); // อัปเดตค่า editedUserData ด้วยข้อมูลใหม่
        setIsEditing(false); // สลับกลับไปยังโหมดแสดงข้อมูลปกติ
      } else {
        const errorData = await response.json();
        console.error('Failed to update user data:', errorData);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };

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
        {isEditing ? (
          <>
            <p><strong>ชื่อ:</strong> <input type="text" name="firstname" value={editedUserData.firstname} onChange={handleChange} /></p>
            <p><strong>นามสกุล:</strong> <input type="text" name="lastname" value={editedUserData.lastname} onChange={handleChange} /></p>
            <p><strong>อีเมล:</strong> <input type="email" name="email" value={editedUserData.email} onChange={handleChange} /></p>
            <p><strong>เบอร์:</strong> <input type="text" name="phone" value={editedUserData.phone} onChange={handleChange} /></p>
            <p><strong>ที่อยู่:</strong> <input type="text" name="address" value={editedUserData.address} onChange={handleChange} /></p>
            <button className="save-button" onClick={handleSaveClick}>ยืนยัน</button>
            <button className="cancel-button" onClick={handleCancelClick}>ยกเลิก</button>
          </>
        ) : (
          <>
            <p><strong>ชื่อ:</strong> {userData?.firstname} {userData?.lastname}</p>
            <p><strong>อีเมล:</strong> {userData?.email}</p>
            <p><strong>เบอร์:</strong> {userData?.phone || 'ไม่ระบุ'}</p>
            <p><strong>ที่อยู่:</strong> {userData?.address || 'ไม่ระบุ'}</p>
            <button className="edit-button" onClick={handleEditClick}>แก้ไขข้อมูลส่วนตัว</button> {/* เพิ่มปุ่มแก้ไขข้อมูล */}
          </>
        )}
      </div>
      <button className="logout-button">ออกจากระบบ</button>
    </div>
  );

  return (
    <div className="dashboard-container"> 
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="button-container"> {/* แก้ไขการจัดวางปุ่ม */}
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
                    <td>{new Date(warehouse.date_rental_start).toLocaleDateString()} - {new Date(warehouse.date_rental_finish).toLocaleDateString()}</td>
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
