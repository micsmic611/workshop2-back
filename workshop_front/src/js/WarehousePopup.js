import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const WarehousePopup = ({ open, onClose, warehouseData }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>ข้อมูลโกดัง</DialogTitle>
            <DialogContent>
                <div className="popup-content">
                    <TextField
                        label="รหัสโกดัง"
                        value={warehouseData?.warehouseid || ''} // ใช้ optional chaining
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="ชื่อโกดัง"
                        value={warehouseData?.warehousename || ''}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="บริษัทที่เช่าโกดัง"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="เบอร์โทรติดต่อ"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="ขนาดพื้นที่"
                        value={`${warehouseData?.warehousesize || 0} ตร.ม.`} // ใช้ optional chaining
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="ที่อยู่โกดัง"
                        value={warehouseData?.warehouseaddress || ''}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="สถานะโกดัง"
                        value={warehouseData?.rentalstatus || ''}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="เช่าโกดังวันที่"
                        value={warehouseData?.date_rental_start || ''} // เพิ่มการแสดงวันที่เช่า
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="สิ้นสุดการเช่าโกดังวันที่"
                        value={warehouseData?.date_rental_end || ''} // เพิ่มการแสดงวันที่สิ้นสุดการเช่า
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="รายละเอียดโกดัง"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onClose}>เข้าชม</Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>ยกเลิกการเช่า</Button>
            </DialogActions>
        </Dialog>
    );
};


export default WarehousePopup;
