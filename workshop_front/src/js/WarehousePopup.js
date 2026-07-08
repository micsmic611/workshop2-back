import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rent from './Rent'; // Import the Rent dialog component
import '../css/warehousePopup.css';

const WarehousePopup = ({ open, onClose, warehouse }) => {
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State สำหรับการเปิด/ปิด dialog แก้ไขข้อมูล
  const [description, setDescription] = useState('');
  const [editWarehouseName, setEditWarehouseName] = useState(warehouse?.warehousename || ''); // State สำหรับชื่อโกดังที่แก้ไข

  const openRentDialog = () => setRentDialogOpen(true);
  const closeRentDialog = () => setRentDialogOpen(false);
  const openCancelDialog = () => setCancelDialogOpen(true);
  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setDescription('');
  };
  const openEditDialog = () => setEditDialogOpen(true); // ฟังก์ชันเปิด dialog แก้ไขข้อมูล
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditWarehouseName(warehouse?.warehousename || ''); // รีเซ็ตชื่อโกดังเมื่อปิด
  };

  const handleCancelRent = async () => {
    const userId = warehouse.warehouseid;
    const rentalId = warehouse.rentalId;

    const requestBody = {
      rentalId,
      userId,
      description,
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/rentals/${rentalId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Cancellation successful:', result);
        closeCancelDialog();
        onClose();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error canceling rental:', error);
    }
  };

  const handleEditWarehouse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/warehouses/${warehouse.warehouseid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ warehouse_name: editWarehouseName }),
      });

      if (response.ok) {
        alert('แก้ไขสำเร็จ');
        closeEditDialog();
        onClose();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error editing warehouse:', error);
    }
  };

  if (!warehouse) return null;

  const isRentalStatusNull = warehouse.rentalstatus === null;
  const isRentalStatusInactive = warehouse.rentalstatus === 'inactive' || warehouse.rentalstatus === 'cancel';

  return (
    <>
      <Dialog open={open} onClose={onClose} className="warehouse-popup">
        <DialogTitle>📦การเช่าโกดัง</DialogTitle>
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
            <p><strong>เข้าโกดังวันที่:</strong> {warehouse.date_rental_start ? `${new Date(warehouse.date_rental_start).toLocaleDateString()}` : 'ไม่มีคนเช่า'}</p>
            <p><strong>สิ้นสุดการเช่าโกดังวันที่:</strong> {warehouse.date_rental_end ? `${new Date(warehouse.date_rental_end).toLocaleDateString()}` : 'ไม่มีคนเช่า'}</p>
            <p><strong>ชื่อพนักงาน:</strong> {warehouse.companyFirstname || 'ไม่ระบุ'} {warehouse.companyLastname || ''}</p>
            <p><strong>รายละเอียดโกดัง:</strong> {warehouse.description || 'ไม่มีข้อมูล'}</p>
          </div>
        </DialogContent>
              <DialogActions>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={openRentDialog} 
          disabled={isRentalStatusInactive}
        >
          เช่า
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={openCancelDialog} 
          disabled={isRentalStatusNull}
        >
          ยกเลิกการเช่า
        </Button>
        {/* Show the edit button only if the rental status is not "inactive" */}
        {warehouse.rentalstatus !== 'inactive' && (
          <Button 
          onClick={openEditDialog} 
          className="custom-button"
        >
          แก้ไขข้อมูล
        </Button>        
        )}
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
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>แก้ไขข้อมูลโกดัง</DialogTitle>
        <DialogContent>
          <TextField 
            label="ชื่อโกดัง" 
            variant="outlined" 
            fullWidth 
            value={editWarehouseName} 
            onChange={(e) => setEditWarehouseName(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditWarehouse} className="MuiButton-textprimary">
            ยืนยัน
          </Button>
          <Button onClick={closeEditDialog} className="MuiButton-textSecondary">
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WarehousePopup;
