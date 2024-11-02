import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Drawer, AppBar, Toolbar, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



const Supervisor = () => {
 
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [companydata, setCompanyData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchCompanyName, setSearchCompanyName] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    company_name: '',
    company_address: '',
    company_email: '',
    company_phone: '',
    company_firstname: '',
    company_lastname: '',
  });
  const navigate = useNavigate();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [companyDetail, setCompanyDetail] = useState(null);
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [editedCompanyData, setEditedCompanyData] = useState({});


  const handleEditDetailClick = () => {
    setIsEditingDetail(true);
    setEditedCompanyData({
      company_name: companyDetail.company_name,
      company_address: companyDetail.company_address,
      company_email: companyDetail.company_email,
      company_phone: companyDetail.company_phone,
      company_firstname: companyDetail.company_firstname,
      company_lastname: companyDetail.company_lastname,
    });
  };

  const handleSaveCompanyChanges = async () => {
    try {
      const response = await fetch(`https://localhost:7111/api/Company/UpdateCompany?companyid=${companyDetail.company_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCompanyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('อัปเดตข้อมูลบริษัทเรียบร้อย:', data);
        // รีเฟรชข้อมูลบริษัท
        fetchCompanyData(token);
        handleDetailDialogClose(); // ปิด dialog
      } else {
        console.error("ไม่สามารถบันทึกการเปลี่ยนแปลงได้", response.status);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกการเปลี่ยนแปลง:", error);
    }
  };

  const handleCompanyDetailChange = (e) => {
    const { name, value } = e.target;
    setEditedCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleSearch = () => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      if (searchCompanyName.trim() === '') {
        // ถ้า searchCompanyName เป็นค่าว่าง ให้เรียกข้อมูลทั้งหมด
        fetchCompanyData(storedToken); // ดึงข้อมูลทั้งหมด
      } else {
        // ถ้ามีชื่อบริษัทให้ค้นหา
        fetchCompanyData(storedToken, true);
      }
    } else {
      console.error("กรุณาเข้าสู่ระบบ");
    }
  };

  const handleAddCompanyClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddCompanyClose = () => {
    setAddDialogOpen(false);
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
      
      if (search && searchCompanyName && searchCompanyName.trim() !== '') {
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
  const handleAddCompanySave = async () => {
    try {
      const response = await fetch('https://localhost:7111/api/Company/AddCompany', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompanyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Company added:", data);
        fetchCompanyData(token); // อัปเดตข้อมูลบริษัท
        setAddDialogOpen(false);
      } else {
        console.error("Failed to add company", response.status);
      }
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleViewClick = async (company_id) => {
    try {
      const response = await fetch(`https://localhost:7111/api/Company/GetCompanyDetailByID?Companyid=${company_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanyDetail(data.data[0]); // Assuming data is in an array
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
    setCompanyDetail(null);
  };

  const handleDetailUpdate = async (companyId, companyData) => {
    try {
      const response = await fetch(`https://localhost:7111/api/Company/UpdateCompany?companyid=${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Company updated successfully:', data);
      // คุณสามารถทำการอัปเดต UI ได้ที่นี่
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompanyData((prevData) => ({ ...prevData, [name]: value }));
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
            <button className="nav-button"onClick={() => navigate('/supervisor')}>หน้าแรก</button>
            <button className="nav-button"onClick={() => navigate('/supervisor/company')}>ข้อมูลบริษัท</button>
            <button className="nav-button" onClick={() => navigate('/supervisor/employee')}>พนักงาน</button>
            <button className="nav-button"onClick={() => navigate('/report')}>รายงาน</button>
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
        <h1>ค้นหาชื่อบริษัท</h1>
        <input
          type="text"
          name="company_name"
          placeholder="ชื่อบริษัท"
          value={searchCompanyName}
          onChange={handleChange}  // เรียกใช้ฟังก์ชัน handleChange เมื่อมีการเปลี่ยนแปลงค่า
        />
        <button className="search-button" onClick={handleSearch}>ค้นหา</button>
        <button className="add-button" onClick={handleAddCompanyClick}>เพิ่มข้อมูลบริษัท</button>
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
                    <td>
                      <button onClick={() => handleViewClick(company.company_id)}>ดู</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">ไม่พบข้อมูลบริษัท</td>
                </tr>
              )}
            </tbody>
          </table>
          <Dialog open={addDialogOpen} onClose={handleAddCompanyClose}>
            <DialogTitle>เพิ่มข้อมูลบริษัท</DialogTitle>
            <DialogContent>
              <TextField
                label="ชื่อบริษัท"
                name="company_name"
                value={newCompanyData.company_name}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="ที่อยู่บริษัท"
                name="company_address"
                value={newCompanyData.company_address}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
                variant="outlined"
              />
              <TextField
                label="อีเมลบริษัท"
                name="company_email"
                value={newCompanyData.company_email}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="เบอร์โทรบริษัท"
                name="company_phone"
                value={newCompanyData.company_phone}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="ชื่อผู้ติดต่อ"
                name="company_firstname"
                value={newCompanyData.company_firstname}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
                variant="outlined"
              />
              <TextField
                label="นามสกุลผู้ติดต่อ"
                name="company_lastname"
                value={newCompanyData.company_lastname}
                onChange={handleNewCompanyChange}
                fullWidth
                margin="dense"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCompanyClose} color="secondary">ยกเลิก</Button>
              <Button onClick={handleAddCompanySave} color="primary">บันทึก</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={detailDialogOpen} onClose={handleDetailDialogClose}>
            <DialogTitle>รายละเอียดบริษัท</DialogTitle>
            <DialogContent>
              {companyDetail ? (
                <>
                  {isEditingDetail ? (
                    <>
                      <TextField
                        label="ชื่อบริษัท"
                        name="company_name"
                        value={editedCompanyData.company_name}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                      <TextField
                        label="ที่อยู่"
                        name="company_address"
                        value={editedCompanyData.company_address}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                      <TextField
                        label="อีเมล"
                        name="company_email"
                        value={editedCompanyData.company_email}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                      <TextField
                        label="เบอร์โทร"
                        name="company_phone"
                        value={editedCompanyData.company_phone}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                      <TextField
                        label="ผู้ติดต่อ"
                        name="company_firstname"
                        value={editedCompanyData.company_firstname}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                      <TextField
                        label="นามสกุลผู้ติดต่อ"
                        name="company_lastname"
                        value={editedCompanyData.company_lastname}
                        onChange={handleCompanyDetailChange}
                        fullWidth
                                        margin="dense"
                variant="outlined"
                      />
                    </>
                  ) : (
                    <>
                      <Typography>ชื่อบริษัท: {companyDetail.company_name}</Typography>
                      <Typography>ที่อยู่: {companyDetail.company_address}</Typography>
                      <Typography>อีเมล: {companyDetail.company_email}</Typography>
                      <Typography>เบอร์โทร: {companyDetail.company_phone}</Typography>
                      <Typography>ผู้ติดต่อ: {companyDetail.company_firstname} {companyDetail.company_lastname}</Typography>
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
                  <Button className="save-button" onClick={handleSaveCompanyChanges}>บันทึกข้อมูล</Button>
                  <Button onClick={() => setIsEditingDetail(false)} color="primary">ยกเลิก</Button>
                </>
              ) : (
                <>
                  <Button className="edit-button" onClick={handleEditDetailClick}>แก้ไขข้อมูล</Button>
                  <Button onClick={() => setDetailDialogOpen(false)} color="primary">ยกเลิก</Button>

                </>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Supervisor;