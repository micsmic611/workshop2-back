import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import '../css/warehousePopup.css'; // นำเข้า CSS

const WarehousePopup = ({ open, onClose, warehouse }) => {
  if (!warehouse) return null; // ตรวจสอบว่ามีข้อมูล

  // เช็คสถานะการเช่า
  const isRentalActive = warehouse.rentalstatus === 'active'; // เช็คว่าเป็น active
  const isRentalInactive = warehouse.rentalstatus === 'inactive'; // เช็คว่าเป็น inactive
  const isRentalNull = warehouse.rentalstatus === null; // เช็คว่าเป็น null

  return (
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
          <p><strong>สถานะโกดัง:</strong> {warehouse.rentalstatus|| 'active'}</p>
          <p>
            <strong>เข้าโกดังวันที่:</strong> 
            {new Date(warehouse.date_rental_start).toLocaleDateString()}
          </p>
          <p>
            <strong>สิ้นสุดการเช่าโกดังวันที่:</strong> 
            {new Date(warehouse.date_rental_end).toLocaleDateString()}
          </p>
          <p><strong>ชื่อพนักงาน:</strong> {warehouse.companyFirstname || 'ไม่ระบุ'} {warehouse.companyLastname || ''}</p>
          <p><strong>รายละเอียดโกดัง:</strong> {warehouse.description || 'ไม่มีข้อมูล'}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          color={isRentalActive || isRentalNull ? 'grey' : 'primary'} // สีปุ่ม "เช่า"
          onClick={isRentalActive || isRentalNull ? null : () => { /* ฟังก์ชันสำหรับเช่า */ onClose(); }} 
          disabled={isRentalInactive} // ปิดการใช้งานปุ่มถ้าสถานะเป็น inactive
        >
          เช่า
        </Button>
        <Button 
          variant="outlined" 
          color={isRentalActive ? 'grey' : 'secondary'} // สีปุ่ม "ยกเลิกการเช่า"
          onClick={isRentalActive ? null : onClose} 
          disabled={isRentalActive} // ปิดการใช้งานปุ่มถ้าสถานะเป็น active
        >
          ยกเลิกการเช่า
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehousePopup;
