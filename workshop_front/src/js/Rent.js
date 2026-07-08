import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const Rent = ({ open, onClose, warehouse }) => {
  const [rentalData, setRentalData] = useState({
    warehouseid: warehouse ? warehouse.warehouseid : '',
    warehousename: warehouse ? warehouse.warehousename : '',
    warehouseaddress: warehouse ? warehouse.warehouseaddress : '',
    warehousesize: warehouse ? warehouse.warehousesize : '',
    description: '',
    rentalStartDate: '',
    rentalEndDate: '',
    companyId: '',
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/companies', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        if (data.data) {
          setCompanies(data.data);
        } else {
          console.error('Error fetching companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRent = async () => {
    const token = localStorage.getItem('token'); // ดึง token จาก local storage
    const decodedToken = jwtDecode(token); // ใช้ jwtDecode เพื่อถอดรหัส token
    const userId = decodedToken.userId; // ดึง userId

    const rentalPayload = {
      warehouse_id: rentalData.warehouseid,
      user_id: userId,
      company_id: rentalData.companyId,
      date_rental_start: rentalData.rentalStartDate,
      date_rental_end: rentalData.rentalEndDate,
      rental_status: 'inactive',
      description: rentalData.description
    };
    

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(rentalPayload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('การเช่าประสบความสำเร็จ:', data);
        onClose(); // ปิด popup หลังจากเช่าเสร็จ
      } else {
        const errorData = await response.json();
        console.error('เกิดข้อผิดพลาดในการเช่า:', errorData);
      }
    } catch (error) {
      console.error('ข้อผิดพลาดในการส่งข้อมูล:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="rent-popup">
      <DialogTitle>📦 การเช่าโกดัง</DialogTitle>
      <DialogContent>
        <div className="popup-content">
          <TextField
            label="วันที่เริ่มเช่า"
            type="date"
            name="rentalStartDate"
            value={rentalData.rentalStartDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="วันที่สิ้นสุดการเช่า"
            type="date"
            name="rentalEndDate"
            value={rentalData.rentalEndDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="description"
            label="รายละเอียด"
            value={rentalData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="companyId"
            label="เลือกบริษัท"
            value={rentalData.companyId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">เลือกบริษัท</option>
            {companies.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleRent}>
          ยืนยันการเช่า
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Rent;
