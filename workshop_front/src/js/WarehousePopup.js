// WarehousePopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const WarehousePopup = ({ open, onClose, warehouse }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>รายละเอียดโกดัง</DialogTitle>
      <DialogContent>
        {warehouse && (
          <div>
            <p><strong>รหัสโกดัง:</strong> {warehouse.warehouseid}</p>
            <p><strong>ชื่อโกดัง:</strong> {warehouse.warehousename}</p>
            <p><strong>ที่อยู่:</strong> {warehouse.warehouseaddress}</p>
            <p><strong>ขนาดพื้นที่:</strong> {warehouse.warehousesize}</p>
            <p><strong>สถานะ:</strong> {warehouse.rentalstatus}</p>
            <p><strong>วันที่เช่า:</strong> {new Date(warehouse.date_rental_start).toLocaleDateString()} - 
              {new Date(warehouse.date_rental_finish).toLocaleDateString()}
            </p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">ปิด</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehousePopup;
