import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rent from './Rent'; // Import the Rent dialog component
import '../css/warehousePopup.css';

const WarehousePopup = ({ open, onClose, warehouse }) => {
  const [rentDialogOpen, setRentDialogOpen] = useState(false);

  const openRentDialog = () => setRentDialogOpen(true);
  const closeRentDialog = () => setRentDialogOpen(false);

  if (!warehouse) return null;

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
          <Button variant="contained" color="primary" onClick={openRentDialog}>
            เช่า
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            ยกเลิกการเช่า
          </Button>
        </DialogActions>
      </Dialog>
      <Rent open={rentDialogOpen} onClose={closeRentDialog} warehouse={warehouse} />
    </>
  );
};

export default WarehousePopup;
