import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Drawer, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Supervisor = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [companydata, setCompanyData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchCompanyName, setSearchCompanyName] = useState('');

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleSearch = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && searchCompanyName.trim() !== '') { // ตรวจสอบว่าชื่อบริษัทไม่ใช่ค่าว่าง
      fetchCompanyData(storedToken, true);
    } else {
      console.error("กรุณากรอกชื่อบริษัทเพื่อทำการค้นหา");
    }
  };

  const handleChange = (e) => {
    setSearchCompanyName(e.target.value);  // อัปเดตค่าชื่อบริษัทที่ค้นหา
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUserData({
      firstname: userData?.firstname || '',
      lastname: userData?.lastname || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || ''
    });
  };

  const fetchCompanyData = async (storedToken, search = false) => {
    try {
      let url = 'https://localhost:7111/api/Company/GetAllCompany';
      if (search && searchCompanyName) {
        // ตรวจสอบให้แน่ใจว่าค่าส่งใน query string ถูกต้อง
        url = `https://localhost:7111/api/Company/GetCompanyByName?Companyname=${searchCompanyName}`; 
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Company data:", data);
        setCompanyData(data.data);  // ดึงข้อมูลบริษัทที่ค้นหาได้
      } else {
        console.error("Failed to fetch Company data", response.status);
      }
    } catch (error) {
      console.error("Error fetching Company data:", error);
    }
  };

  const fetchUserData = async (storedToken) => {
    try {
      const decoded = jwtDecode(storedToken);
      const userId = decoded.userId;
      console.log("Decoded token:", decoded);

      const response = await fetch(`https://localhost:7111/api/User/GetUserbyUserId?userid=${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        setUserData(data.data[0]);
      } else {
        console.error("Failed to fetch user data", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
      const token = localStorage.getItem('token');
      const response = await fetch(`https://localhost:7111/api/User/UpdateUser?UserId=${userUpdateData.userID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdateData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User data updated successfully:', data);
        fetchUserData(token);
        setIsEditing(false);
      } else {
        const errorMessage = await response.text();
        console.error("Failed to save user data:", errorMessage);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      const fetchData = async () => {
        try {
          await fetchUserData(storedToken);



          await fetchCompanyData();
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      };

      fetchData();
    }
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="dashboard-container" >
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="navbar">
            <button className="nav-button">หน้าแรก</button>
            <button className="nav-button">ข้อมูลบริษัท</button>
            <button className="nav-button">พนักงาน</button>
            <button className="nav-button">อนุมัติ</button>
            <button className="nav-button">รายงาน</button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-container">
          <div className="profile">
            <div className="avatar"></div>
            <div className="profile-info">
              <p className="username">{userData?.username || 'Username'}</p>
              <p className="role">Supervisor - Warehouse</p>
            </div>
          </div>
          <div className="personal-info">
            <h2>ข้อมูลส่วนตัว</h2>
            {isEditing ? (
              <>
                <p><strong>ชื่อ:</strong> <input type="text" name="firstname" value={editedUserData.firstname} onChange={(e) => setEditedUserData({ ...editedUserData, firstname: e.target.value })} /></p>
                <p><strong>นามสกุล:</strong> <input type="text" name="lastname" value={editedUserData.lastname} onChange={(e) => setEditedUserData({ ...editedUserData, lastname: e.target.value })} /></p>
                <p><strong>อีเมล:</strong> <input type="email" name="email" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} /></p>
                <p><strong>เบอร์:</strong> <input type="text" name="phone" value={editedUserData.phone} onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })} /></p>
                <p><strong>ที่อยู่:</strong> <input type="text" name="address" value={editedUserData.address} onChange={(e) => setEditedUserData({ ...editedUserData, address: e.target.value })} /></p>
                <button className="save-button" onClick={handleSaveClick}>ยืนยัน</button>
                <button className="cancel-button" onClick={handleCancelClick}>ยกเลิก</button>
              </>
            ) : (
              <>
                <p><strong>ชื่อ:</strong> {userData?.firstname} {userData?.lastname}</p>
                <p><strong>อีเมล:</strong> {userData?.email}</p>
                <p><strong>เบอร์:</strong> {userData?.phone || 'ไม่ระบุ'}</p>
                <p><strong>ที่อยู่:</strong> {userData?.address || 'ไม่ระบุ'}</p>
                <button className="edit-button" onClick={handleEditClick}>แก้ไขข้อมูลส่วนตัว</button>
              </>
            )}
          </div>
          <button className="logout-button">ออกจากระบบ</button>
        </div>
      </Drawer>
      <div className="search-container">
        <h1>ค้นหาชื่อบริษัท</h1>
        <input
          type="text"
          name="company_name"
          placeholder="ชื่อบริษัท"
          value={searchCompanyName}
          onChange={handleChange}  // เรียกใช้ฟังก์ชัน handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
        <button className="search-button" onClick={handleSearch}>ค้นหา</button>
      </div>
      <div className="main-content">
        <div className="warehouse-list">
          <h2>รายชื่อบริษัท</h2>
          <table className="warehouse-table">
            <thead>
              <tr>
                <th>รหัสบริษัท</th>
                <th>ชื่อบริษัท</th>
                <th>อีเมล</th>
                <th>ชื่อผู้ติดต่อ</th>
                <th>ดูข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {companydata && companydata.length > 0 ? (
                companydata.map((company) => (
                  <tr key={company.company_id}>
                    <td>{company.company_id}</td>
                    <td>{company.company_name}</td>
                    <td>{company.company_email}</td>
                    <td>{company.company_phone}</td>
                    <td><button className="view-button">ดู</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">ไม่พบข้อมูลบริษัท</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Supervisor;
