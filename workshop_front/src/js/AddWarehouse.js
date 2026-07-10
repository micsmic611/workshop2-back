// src/js/AddWarehouse.js
import React, { useState } from 'react';
import '../css/add.css';

const AddWarehouse = ({ onClose }) => {
  const [warehousename, setWarehouseName] = useState("");
  const [warehouseaddress, setWarehouseAddress] = useState("");
  const [warehousesize, setWarehouseSize] = useState(0);
  const [warehousestatus, setWarehouseStatus] = useState("active");

  const handleAddWarehouse = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("https://workshop2-back.onrender.com/api/warehouses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        warehouse_name: warehousename,
        warehouse_address: warehouseaddress,
        warehouse_size: parseFloat(warehousesize),
        warehouse_status: warehousestatus,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('เพิ่มโกดังสำเร็จ');
      onClose();
      window.location.reload(); // Refresh to show new warehouse
    } else {
      const error = await response.json();
      alert(error.error || 'เกิดข้อผิดพลาดในการเพิ่มโกดัง');
    }
  };

  return (
    <div className="popup">
      <h2>เพิ่มโกดัง</h2>
      <label>
        ชื่อโกดัง:
        <input type="text" value={warehousename} onChange={(e) => setWarehouseName(e.target.value)} />
      </label>
      <label>
        ที่อยู่โกดัง:
        <input type="text" value={warehouseaddress} onChange={(e) => setWarehouseAddress(e.target.value)} />
      </label>
      <label>
        ขนาดโกดัง:
        <input type="number" value={warehousesize} onChange={(e) => setWarehouseSize(e.target.value)} />
      </label>
      <label>
        สถานะโกดัง:
        <select value={warehousestatus} onChange={(e) => setWarehouseStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button onClick={handleAddWarehouse} class="A1">เพิ่มโกดัง</button>
      <button onClick={onClose} class="A2">ปิด</button>
    </div>
  );
};

export default AddWarehouse;
