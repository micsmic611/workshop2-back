import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Drawer, AppBar, Toolbar, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


function EmployeePage() {
  const navigate = useNavigate();


  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [employeedata, setEmployeeData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    status: '',
  });
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [editedEmployeeData, setEditedEmployeeData] = useState({});
  const toggleDrawer = (isOpen) => () => {
    setDrawerOpen(isOpen);
  };
  const handleEditDetailClick = () => {
    setIsEditingDetail(true);
    setEditedEmployeeData({
      firstname: employeeDetail.firstname,
      lastname: employeeDetail.lastname,
      email: employeeDetail.email,
      phone: employeeDetail.phone,
      address: employeeDetail.address,
      status: employeeDetail.status,
    });
  };

  const handleSaveEmployeeChanges = async () => {
    try {
      const response = await fetch(`https://localhost:7111/api/Employee/UpdateEmp?Userid=${employeeDetail.userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployeeData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('อัปเดตข้อมูลบริษัทเรียบร้อย:', data);
        // รีเฟรชข้อมูลบริษัท
        fetchEmployeeData(token);
        setIsEditingDetail(false)
        handleDetailDialogClose(); // ปิด dialog
      } else {
        console.error("ไม่สามารถบันทึกการเปลี่ยนแปลงได้", response.status);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกการเปลี่ยนแปลง:", error);
    }
  };

  const handleEmployeeDetailChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleSearch = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && searchEmployeeName.trim() !== '') { // ตรวจสอบว่าชื่อบริษัทไม่ใช่ค่าว่าง
      fetchEmployeeData(storedToken, true);
    } else {
      console.error("กรุณากรอกชื่อบริษัทเพื่อทำการค้นหา");
    }
  };

  const handleAddEmployeeClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddEmployeeClose = () => {
    setAddDialogOpen(false);
  };

  const handleChange = (e) => {
    setSearchEmployeeName(e.target.value);  // อัปเดตค่าชื่อบริษัทที่ค้นหา
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

  const fetchEmployeeData = async (storedToken, search = false) => {
    try {
      let url = 'https://localhost:7111/api/Employee/GetAllEmp';
      if (search && searchEmployeeName) {
        // ตรวจสอบให้แน่ใจว่าค่าส่งใน query string ถูกต้อง
        url = `https://localhost:7111/api/Employee/GetEmpByName?Username=${searchEmployeeName}`;
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
        setEmployeeData(data.data);  // ดึงข้อมูลบริษัทที่ค้นหาได้
      } else {
        console.error("Failed to fetch Company data", response.status);
      }
    } catch (error) {
      console.error("Error fetching Company data:", error);
    }
  };

  const handleAddEmployeeSave = async () => {
    try {
      const response = await fetch('https://localhost:7111/api/Employee/AddEmp', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employee added:", data);
        fetchEmployeeData(token); // อัปเดตข้อมูลบริษัท
        setAddDialogOpen(false);
      } else {
        console.error("Failed to add company", response.status);
      }
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleViewClick = async (username) => {
    try {
      const response = await fetch(`https://localhost:7111/api/Employee/GetEmpByName?Username=${username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployeeDetail(data.data[0]); // Assuming data is in an array
        setDetailDialogOpen(true);
      } else {
        console.error("Failed to fetch company details", response.status);
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
    setEmployeeDetail(null);
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData((prevData) => ({ ...prevData, [name]: value }));
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
          await fetchEmployeeData();
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      };

      fetchData();
    }
  }, []);
  const handleUpdateClick = async (userID) => {
    try {
      const response = await fetch('https://localhost:7111/api/User/UpdateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }),
      });

      if (response.ok) {
        alert('พักงานสำเร็จ');
      } else {
        alert('ไม่สามารถพักงานได้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('ไม่สามารถพักงานได้');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก local storage
    navigate("/"); // นำทางไปที่หน้า login
  };

  return (
    <div className="dashboard-container" >
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="navbar">
            <button className="nav-button" onClick={() => navigate('/supervisor')}>หน้าแรก</button>
            <button className="nav-button" onClick={() => navigate('/supervisor/company')}>ข้อมูลบริษัท</button>
            <button className="nav-button" onClick={() => navigate('/supervisor/employee')}>พนักงาน</button>
            <button className="nav-button" onClick={() => navigate('/report')}>รายงาน</button>
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
          <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button>
        </div>
      </Drawer>
      <div className="search-container">
        <h1>ค้นหาชื่อพนักงาน</h1>
        <input
          type="text"
          name="company_name"
          placeholder="ชื่อพนักงาน"
          value={searchEmployeeName}
          onChange={handleChange}  // เรียกใช้ฟังก์ชัน handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
        <button className="search-button" onClick={handleSearch}>ค้นหา</button>
        <button className="add-button" onClick={handleAddEmployeeClick}>เพิ่มข้อมูลพนักงาน</button>
      </div>

      <div className="main-content">
        <div className="warehouse-list">
          <h2>รายชื่อพนักงาน</h2>
          <table className="warehouse-table">
            <thead>
              <tr>
                <th>รหัสพนักงาน</th>
                <th>ชื่อผู้ติดต่อ</th>
                <th>อีเมล</th>
                <th>เบอร์โทร</th>
                <th>ดูข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              {employeedata && employeedata.length > 0 ? (
                employeedata.map((employee) => (
                  <tr key={employee.userID}>
                    <td>{employee.userID}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <button className="view-button" onClick={() => handleViewClick(employee.firstname)}>
                        <SearchIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">ไม่พบข้อมูลพนักงาน</td>
                </tr>
              )}
            </tbody>
          </table>
          <Dialog open={addDialogOpen} onClose={handleAddEmployeeClose}>
            <DialogTitle>เพิ่มข้อมูลพนักงาน</DialogTitle>
            <DialogContent>
              <TextField
                label="ชื่อจริง"
                name="firstname"
                value={newEmployeeData.firstname}
                onChange={handleNewEmployeeChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="นามสกุล"
                name="lastname"
                value={newEmployeeData.lastname}
                onChange={handleNewEmployeeChange}
                fullWidth
                margin="dense"
                variant="outlined"
              />
              <TextField
                label="อีเมล"
                name="email"
                value={newEmployeeData.email}
                onChange={handleNewEmployeeChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="เบอร์โทร"
                name="phone"
                value={newEmployeeData.phone}
                onChange={handleNewEmployeeChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="ที่อยู่"
                name="address"
                value={newEmployeeData.address}
                onChange={handleNewEmployeeChange}
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAddEmployeeSave} className="MuiButton-textprimary">บันทึก</Button>
            <Button onClick={handleAddEmployeeClose} color="secondary">ยกเลิก</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={detailDialogOpen} onClose={handleDetailDialogClose}>
            <DialogTitle>รายละเอียดพนักงาน</DialogTitle>
            <DialogContent>
              {employeeDetail ? (
                <>
                  {isEditingDetail ? (
                    <>
                      <TextField
                        label="ชื่อจริง"
                        name="firstname"
                        value={editedEmployeeData.firstname}
                        onChange={handleEmployeeDetailChange}
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="นามสกุล"
                        name="lastname"
                        value={editedEmployeeData.lastname}
                        onChange={handleEmployeeDetailChange}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                      />
                      <TextField
                        label="อีเมล"
                        name="email"
                        value={editedEmployeeData.email}
                        onChange={handleEmployeeDetailChange}
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="เบอร์โทร"
                        name="phone"
                        value={editedEmployeeData.phone}
                        onChange={handleEmployeeDetailChange}
                        fullWidth
                        margin="dense"
                      />
                      <TextField
                        label="ที่อยู่"
                        name="address"
                        value={editedEmployeeData.address}
                        onChange={handleEmployeeDetailChange}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                      />
                    </>
                  ) : (
                    <>
                      <Typography>ชื่อจริง: {employeeDetail.firstname}</Typography>
                      <Typography>นามสกุล: {employeeDetail.lastname}</Typography>
                      <Typography>อีเมล: {employeeDetail.email}</Typography>
                      <Typography>ที่อยู่: {employeeDetail.address}</Typography>
                      <Typography>เบอร์โทร: {employeeDetail.phone}</Typography>
                    </>
                  )}
                </>
              ) : (
                <Typography>กำลังโหลด...</Typography>
              )}
            </DialogContent>
            <DialogActions>
              {isEditingDetail ? (
                <>
                  <Button className="MuiButton-textprimary" onClick={handleSaveEmployeeChanges}>บันทึกข้อมูล</Button>
                  <Button onClick={() => setIsEditingDetail(false)} >ยกเลิก</Button>
                </>
              ) : (
                <>
                  <button className="stopjob-button" onClick={() => handleUpdateClick(employeeDetail.userID)}>พักงาน</button>
                  <Button className="custom-button" onClick={handleEditDetailClick}>แก้ไขข้อมูล</Button>
                  <Button onClick={() => setDetailDialogOpen(false)} className="MuiButton-outlinedSecondary">ยกเลิก</Button>
                </>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
