import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { jwtDecode } from "jwt-decode"; 
import '../css/report.css'; 
const SomeComponent = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [warehouses, setWarehouses] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const [companies, setCompanies] = useState([]);
    const [User1, setUser1] = useState([]);
    const [Emp, setEmp] = useState([]);
    //const [rental, setrental] = useState([]);
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
          if (decoded.roleId) {
            setRoleId(decoded.roleId);
            // เรียกใช้ฟังก์ชันดึงข้อมูลโกดังที่นี่
            fetchWarehouseData(storedToken); 
          }
          fetchUserData(storedToken);
          fetchCompanyData(storedToken); // Fetch company data here
          fetchEmpData(storedToken);
          fetchUSer1Data(storedToken);
          //fetchrental(storedToken);

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
    
      const fetchWarehouseData = async (storedToken) => {
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
                setWarehouses(data.data); // Store warehouse data in state
            } else {
                console.error("Failed to fetch warehouse data");
            }
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        }
    };
    const fetchCompanyData = async (storedToken) => {
        try {
            const response = await fetch('https://localhost:7111/api/Company/GetAllCompany', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCompanies(data.data); // Store company data in state
                console.log(`Total companies: ${data.data.length}`); // Log the total count of companies
            } else {
                console.error("Failed to fetch company data");
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };
    const fetchEmpData = async (storedToken) => {
        try {
            const response = await fetch('https://localhost:7111/api/Employee/GetAllEmp', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setEmp(data.data); // Store company data in state
                console.log(`Total employee: ${data.data.length}`); // Log the total count of companies
            } else {
                console.error("Failed to fetch employee data");
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };
    const fetchUSer1Data = async (storedToken) => {
        try {
            const response = await fetch('https://localhost:7111/api/Employee/GetAllUser1', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser1(data.data); // Store company data in state
                console.log(`Total User: ${data.data.length}`); // Log the total count of companies
            } else {
                console.error("Failed to fetch User data");
            }
        } catch (error) {
            console.error('Error fetching User data:', error);
        }
    };
    // const fetchrental = async (storedToken) => {
    //     try {
    //         const response = await fetch('https://localhost:7111/api/Warehouse/warehouserental', {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${storedToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setrental(data.data); // Store company data in state
    //             console.log(`Total rental: ${data.data.length}`); // Log the total count of companies
    //         } else {
    //             console.error("Failed to fetch Rental data");
    //         }
    //     } catch (error) {
    //         console.error('Error fetching Rental data:', error);
    //     }
    // };
    // const rentalactiveCount = rental.filter(rental => rental.rentalstatus.toLowerCase() === 'active'||'').length;
    //const rentalinactiveCount = rental.filter(warehouse => rental.rentalstatus.toLowerCase() === 'inactive'||'').length;
    const totalWarehouses = warehouses.length;
    const activeCount = warehouses.filter(warehouse => warehouse.warehousestatus.toLowerCase() === 'active').length;
    const inactiveCount = warehouses.filter(warehouse => warehouse.warehousestatus.toLowerCase() === 'inactive').length;
    return (
        <div className="dashboard-container">
      <AppBar position="static" className="custom-appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className="button-container">
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
              <p className="role">Employee - Warehouse</p>
            </div>
          </div>
          <div className="personal-info">
            <h3>ข้อมูลส่วนตัว</h3>
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
                <button className="edit-button" onClick={handleEditClick}>แก้ไขข้อมูล</button>
              </>
            )}
          </div>
          <button className="logout-button">ออกจากระบบ</button>
        </div>
      </Drawer>
      <div className="report">
        <h1>Report</h1>
      </div>
      <div className="info-container">
    <div className="personal-info">
        <h3>ข้อมูลโกดัง</h3>
        <p>มีโกดังทั้งหมด: {totalWarehouses} แห่ง</p>                
    </div>
    <div className="personal-info">
        <h3>ข้อมูลโกดังสถานะ Active</h3>
        <p>มีโกดังสถานะ Active: {activeCount} แห่ง</p>              
    </div>
    <div className="personal-info">   
        <h3>ข้อมูลโกดังสถานะ Inactive</h3>
        <p>มีโกดังสถานะ Inactive: {inactiveCount} แห่ง</p>
    </div>
    <div className="personal-info">   
        <h3>ข้อมูลบริษัท</h3> 
        <p>มีข้อมูลบริษัททั้งหมด: {companies.length}</p> {/* Display total count of companies */}
    </div>
    <div className="personal-info">   
        <h3>ข้อมูลหัวหน้า</h3> 
        <p>มีข้อมูลหัวหน้าทั้งหมด: {Emp.length}</p> {/* Display total count of companies */}
    </div>
</div>

      {/*<div className="personal-info">   
      <p>โกดังที่ถูกทั้งหมด: {rentalactiveCount}</p> {/* Display total count of companies */}
      {/* </div> */}
      
      </div>
      
    );
};

export default SomeComponent;
