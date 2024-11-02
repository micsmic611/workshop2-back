import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button ,TextField  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rent from './Rent'; // Import the Rent dialog component
import '../css/warehousePopup.css';

const WarehousePopup = ({ open, onClose, warehouse }) => {
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [description, setDescription] = useState(''); // State สำหรับ description

  const openRentDialog = () => setRentDialogOpen(true);
  const closeRentDialog = () => setRentDialogOpen(false);
  const openCancelDialog = () => setCancelDialogOpen(true);
  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setDescription(''); // Clear description when closing
  };
  const handleCancelRent = async () => {
    const userId =warehouse.warehouseid; // แทนที่ด้วย userId ที่ถูกต้อง
    const rentalId = warehouse.rentalId; // Assuming rentalId is part of warehouse

    const requestBody = {
      rentalId,
      userId,
      description,
    };
    try {
      const response = await fetch('https://localhost:7111/api/Rental/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) { // ตรวจสอบว่า response เป็น 200 OK
        const result = await response.json();
        console.log('Cancellation successful:', result);
        closeCancelDialog(); // ปิด dialog สำหรับการยกเลิก
        onClose(); // ปิด popup โกดัง
      }
      else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log('Cancellation successful:', result);
      closeCancelDialog(); // Close dialog on success
      onClose(); // Close warehouse popup if needed
    } catch (error) {
      console.error('Error canceling rental:', error);
    }
  };
  if (!warehouse) return null;
  const isRentalStatusNull = warehouse.rentalstatus === null;
  const isRentalStatusInactive = warehouse.rentalstatus === 'inactive'||warehouse.rentalstatus === 'cancel';
  return (
    <>
      <Dialog open={open} onClose={onClose} className="warehouse-popup">
        <DialogTitle>📦 popup - การเช่าโกดัง</DialogTitle>
        <DialogContent>
          <div className="popup-content">
            <div className="row">
              <p><strong>รหัสโกดัง:</strong> {warehouse.warehouseid}</p>
              <p><strong>บริษัทที่เช่าโกดัง:</strong> {warehouse.companyName || 'ไม่ระบุ'}</p>
            </div>
            <div className="row">
              <p><strong>ชื่อโกดัง:</strong> {warehouse.warehousename}</p>
              <p><strong>เบอร์โทรติดต่อ:</strong> {warehouse.companyPhone || 'ไม่ระบุ'}</p>
            </div>
            <p><strong>ขนาดพื้นที่:</strong> {warehouse.warehousesize} ตร.ม.</p>
            <p><strong>ที่อยู่โกดัง:</strong> {warehouse.warehouseaddress}</p>
            <p><strong>สถานะโกดัง:</strong> {warehouse.rentalstatus || 'active'}</p>
            <p><strong>เข้าโกดังวันที่:</strong> {warehouse.date_rental_start ?`${new Date(warehouse.date_rental_start).toLocaleDateString()}`: 'ไม่มีคนเช่า'}</p>
            <p><strong>สิ้นสุดการเช่าโกดังวันที่:</strong> {warehouse.date_rental_end? `${new Date(warehouse.date_rental_end).toLocaleDateString()}`: 'ไม่มีคนเช่า'} </p>
            <p><strong>ชื่อพนักงาน:</strong> {warehouse.companyFirstname || 'ไม่ระบุ'} {warehouse.companyLastname || ''}</p>
            <p><strong>รายละเอียดโกดัง:</strong> {warehouse.description || 'ไม่มีข้อมูล'}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={openRentDialog} 
            disabled={isRentalStatusInactive} // Disable if rental status is inactive
          >
            เช่า
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={openCancelDialog} 
            disabled={isRentalStatusNull} // Disable if rental status is null
          >
            ยกเลิกการเช่า
          </Button>
        </DialogActions>
      </Dialog>
      <Rent open={rentDialogOpen} onClose={closeRentDialog} warehouse={warehouse} />
      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={closeCancelDialog}>
        <DialogTitle>ยกเลิกการเช่าโกดัง</DialogTitle>
        <DialogContent>
          <TextField 
            label="รายละเอียดการยกเลิก" 
            variant="outlined" 
            fullWidth 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRent} className="MuiButton-textprimary">
            ยืนยัน
          </Button>
          <Button onClick={closeCancelDialog} className="MuiButton-textSecondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WarehousePopup;
