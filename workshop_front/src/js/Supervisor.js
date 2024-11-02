import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 
import '../css/supervisor.css'; 
import { Drawer, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import WarehousePopup from './WarehousePopup'; // นำเข้า WarehousePopup
import AddWarehouse from './AddWarehouse';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [searchParams, setSearchParams] = useState({
    warehouseId: '',
    rentalDateStart: '',
    rentalstatus: ''
  });
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false); 
  const [selectedWarehouse, setSelectedWarehouse] = useState(null); 
  const [roleId, setRoleId] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      console.log('Decoded token:', decoded); // ดีบักค่า decoded
      if (decoded.roleId) {
        setRoleId(decoded.roleId); // ตั้งค่า roleId ใน state
        console.log('Setting roleId:', decoded.roleId);
      }
      fetchUserData(storedToken);
      fetchWarehouseData(storedToken);
    }
  }, []);
  useEffect(() => {
    // ตรวจสอบ roleId หลังจากที่ถูกอัปเดต
    if (roleId !== null) {
        console.log("Updated state roleId:", roleId);

        // ฟังก์ชันหรือการตั้งค่าที่จำเป็นต้องใช้งาน roleId สามารถเรียกใช้ตรงนี้ได้
        if (roleId === 2) {
            // ทำให้ปุ่มเพิ่มโกดังแสดงหรือกำหนดค่าอื่น ๆ
            setShowPopup(true);  // หรือฟังก์ชันที่ใช้งานตาม roleId
        }
    }
}, [roleId]);
  const fetchUserData = async (storedToken) => {
    try {
      const decoded = jwtDecode(storedToken);
      const userId = decoded.userId;

      const response = await fetch(`https://localhost:7111/api/User/GetUserbyUserId?userid=${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });
    //<img src="";
      if (response.ok) {
        const data = await response.json();
        setUserData(data.data[0]);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const fetchWarehouseData = async (storedToken, isSearch = false) => {
    // ...
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
            let filteredData = data;

            if (isSearch) {
                const warehouseIdParam = searchParams.warehouseId ? Number(searchParams.warehouseId) : null;
                const rentalDateStart = searchParams.rentalDateStart; // '10/1/2024'
                const rentalstatus = searchParams.rentalstatus;

                // แปลงวันที่จาก 'MM/DD/YYYY' เป็น 'YYYY-MM-DD'
                const rentalDateStartFormatted = rentalDateStart ? 
                    new Date(rentalDateStart).toISOString().slice(0, 10) : null;

                filteredData = data.filter(warehouse => {
                    const matchesWarehouseId = warehouseIdParam ? warehouse.warehouseid === warehouseIdParam : true;
                    const matchesRentalDateStart = rentalDateStartFormatted ? 
                        (warehouse.date_rental_start && warehouse.date_rental_start.slice(0, 10) === rentalDateStartFormatted) : true;
                        const matchesRentalStatus = rentalstatus ? 
                        (warehouse.rentalstatus === rentalstatus || (rentalstatus === 'active' && (warehouse.rentalstatus === null || warehouse.rentalstatus === ''))) : true;

                    return matchesWarehouseId && matchesRentalDateStart && matchesRentalStatus;

                });
            }
            
            setWarehouses(filteredData);
        } else {
            const errorMessage = await response.text();
            console.error("Failed to fetch warehouse data:", errorMessage);
        }
    } catch (error) {
        console.error("Error fetching warehouse data:", error);
    }
};


const handleSearch = () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
      // เคลียร์ข้อมูลในตารางก่อนค้นหา
      setWarehouses([]); 

      // เรียก API ค้นหาโกดัง
      fetchWarehouseData(storedToken, true); 

      // เคลียร์ค่าช่องกรอกข้อมูลให้กลับไปเป็นค่าเริ่มต้น
      setSearchParams({
          warehouseId: '', // รหัสโกดัง
          rentalDateStart: '', // วันที่เริ่มเช่า
          rentalstatus: '' // สถานะการเช่า (ตั้งเป็นค่าว่างถ้าไม่ต้องการค่าเริ่มต้น)
      });
  } else {
      console.error("Token not found in localStorage.");
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
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
        const token = localStorage.getItem('token'); // ตรวจสอบการนำเข้า token
        const response = await fetch(`https://localhost:7111/api/User/UpdateUser?UserId=${userUpdateData.userID}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdateData), // ส่งข้อมูลที่ต้องการอัปเดต
        });
        if (response.ok) {
            const data = await response.json();
            console.log('User data updated successfully:', data);
            // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ใหม่
            fetchUserData(token); // อัปเดตข้อมูลผู้ใช้ใหม่
            setIsEditing(false); // ปิดโหมดแก้ไข
        } else {
            const errorMessage = await response.text();
            console.error("Failed to save user data:", errorMessage);
        }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };


  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };
  const toggleDrawer = (open) => () => {
    if (!isEditing) {
      setDrawerOpen(open);
    }
  };

  const handleViewClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedWarehouse(null);
  };

  const handleAddWarehouse = () => {
    setShowPopup(true); // เปิด popup
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก local storage
    navigate("/"); // นำทางไปที่หน้า login
  };

  return (
    <div className="dashboard-container">
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="button-container">
            <button className="nav-button">หน้าแรก</button>
            <button className="nav-button"onClick={() => navigate('/supervisor/company')}>ข้อมูลบริษัท</button>
            <button className="nav-button"onClick={() => navigate('/supervisor/employee')}>พนักงาน</button>
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
              <p className="role">Employee - Warehouse</p>
            </div>
          </div>
          <div className="personal-info">
            <h3>ข้อมูลส่วนตัว</h3>
            {isEditing ? (
              <>
                <p><strong>ชื่อ</strong> <input type="text" name="firstname" value={editedUserData.firstname} onChange={(e) => setEditedUserData({ ...editedUserData, firstname: e.target.value })} /></p>
                <p><strong>นามสกุล</strong> <input type="text" name="lastname" value={editedUserData.lastname} onChange={(e) => setEditedUserData({ ...editedUserData, lastname: e.target.value })} /></p>
                <p><strong>อีเมล</strong> <input type="email" name="email" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} /></p>
                <p><strong>เบอร์</strong> <input type="text" name="phone" value={editedUserData.phone} onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })} /></p>
                <p><strong>ที่อยู่</strong> <input type="text" name="address" value={editedUserData.address} onChange={(e) => setEditedUserData({ ...editedUserData, address: e.target.value })} /></p>
                <button className="save-button" onClick={handleSaveClick}>ยืนยัน</button>
                <button className="cancel-button" onClick={handleCancelClick}>ยกเลิก</button>
              </>
            ) : (
              <>
                <p><strong>ชื่อ:</strong> {userData?.firstname} {userData?.lastname}</p>
                <p><strong>อีเมล:</strong> {userData?.email}</p>
                <p><strong>เบอร์:</strong> {userData?.phone || 'ไม่ระบุ'}</p>
                <p><strong>ที่อยู่:</strong> {userData?.address || 'ไม่ระบุ'}</p>
                <button className="edit-button" onClick={handleEditClick}>แก้ไขข้อมูล</button>
              </>
            )}
          </div>
          <button onClick={handleLogout} className="logout-button">ออกจากระบบ</button>
        </div>
      </Drawer>

          <div className="search-container">
      <h1>ค้นหาโกดัง</h1>
      <input 
          type="text" 
          name="warehouseId" 
          placeholder="รหัสโกดัง" 
          value={searchParams.warehouseId} 
          onChange={handleChange} 
      />
      <input 
          type="date" 
          name="rentalDateStart" 
          value={searchParams.rentalDateStart} 
          onChange={handleChange} 
      />
      <label>
          <input 
              type="radio" 
              name="rentalstatus" 
              value="active" 
              checked={searchParams.rentalstatus === 'active'} 
              onChange={handleChange} 
          />
          ว่าง
      </label>
      <label>
          <input 
              type="radio" 
              name="rentalstatus" 
              value="inactive" 
              checked={searchParams.rentalstatus === 'inactive'} 
              onChange={handleChange} 
          />
          ไม่ว่าง
      </label>
      <button className="search-button" onClick={handleSearch}>ค้นหา</button>
      <div>
  {/* ปุ่มเพิ่มโกดัง */}
  {roleId === '2' && (
    <button onClick={() => setPopupOpen(true)} className="addrental-button" >เพิ่มโกดัง</button>
  )}

  {/* ส่วนอื่น ๆ ของ Dashboard */}
  {popupOpen && (
    <AddWarehouse onClose={() => setPopupOpen(false)} />
  )}
</div>
    </div>

      <div className="warehouse-container">
        <h2>โกดังที่เช่า</h2>
        <div className="table-container">
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
                    <td className={
                      warehouse.rentalstatus === 'active' || !warehouse.rentalstatus ? 'text-green' : 'text-red'
                  }>
                      {warehouse.rentalstatus || 'active'}
                  </td>
                  <td>
                  {warehouse.date_rental_start && warehouse.date_rental_end 
                      ? `${new Date(warehouse.date_rental_start).toLocaleDateString()} - ${new Date(warehouse.date_rental_end).toLocaleDateString()}` 
                      : 'ไม่มีคนเช่า'}
                  </td>
                    <td>
                      <button className="view-button" onClick={() => handleViewClick(warehouse)}>ดู</button>
                    </td>
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

      {/* Popup Dialog สำหรับแสดงรายละเอียดโกดัง */}
      <WarehousePopup open={popupOpen} onClose={handleClosePopup} warehouse={selectedWarehouse} /> {/* ใช้ WarehousePopup */}
    </div>
  );
};

export default Dashboard;