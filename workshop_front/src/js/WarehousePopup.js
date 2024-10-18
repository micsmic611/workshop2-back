import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import '../css/warehousePopup.css'; // นำเข้า CSS

const WarehousePopup = ({ open, onClose, warehouse }) => {
  if (!warehouse) return null; // ตรวจสอบว่ามีข้อมูล

  return (
    <Dialog open={open} onClose={onClose} className="warehouse-popup">
      <DialogTitle>📦 popup - การเช่าโกดัง</DialogTitle>
      <DialogContent>
        <div className="popup-content">
          <div className="row">
            <p><strong>รหัสโกดัง:</strong> {warehouse.warehouseid}</p>
            <p><strong>บริษัทที่เช่าโกดัง:</strong> {warehouse.company || 'ไม่ระบุ'}</p>
          </div>
          <div className="row">
            <p><strong>ชื่อโกดัง:</strong> {warehouse.warehousename}</p>
            <p><strong>เบอร์โทรติดต่อ:</strong> {warehouse.phone || 'ไม่ระบุ'}</p>
          </div>
          <p><strong>ขนาดพื้นที่:</strong> {warehouse.warehousesize} ตร.ม.</p>
          <p><strong>ที่อยู่โกดัง:</strong> {warehouse.warehouseaddress}</p>
          <p><strong>สถานะโกดัง:</strong> {warehouse.rentalstatus}</p>
          <p>
            <strong>เข้าโกดังวันที่:</strong> 
            {new Date(warehouse.date_rental_start).toLocaleDateString()}
          </p>
          <p>
            <strong>สิ้นสุดการเช่าโกดังวันที่:</strong> 
            {new Date(warehouse.date_rental_end).toLocaleDateString()}
          </p>
          <p><strong>ชื่อพนักงาน:</strong> {warehouse.employeeName || 'ไม่ระบุ'}</p>
          <p><strong>รายละเอียดโกดัง:</strong> {warehouse.description || 'ไม่มีข้อมูล'}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          เข้า
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} disabled>
          ยกเลิกการเช่า
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehousePopup;
