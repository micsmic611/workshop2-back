// src/js/AddWarehouse.js
import React, { useState } from 'react';
import '../css/add.css';

const AddWarehouse = ({ onClose }) => {
  const [warehousename, setWarehouseName] = useState("");
  const [warehouseaddress, setWarehouseAddress] = useState("");
  const [warehousesize, setWarehouseSize] = useState(0);
  const [warehousestatus, setWarehouseStatus] = useState("active");

  const handleAddWarehouse = async () => {
    const response = await fetch("https://localhost:7111/api/Warehouse/AddWarehouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        warehousename,
        warehouseaddress,
        warehousesize,
        warehousestatus,
      }),
    });

    if (response.ok) {
      alert('เพิ่มโกดังสำเร็จ');
      onClose(); // ปิด popup หลังจากเพิ่มโกดังสำเร็จ
      // คุณสามารถนำทางกลับไปยังหน้าที่ต้องการได้ที่นี่ (ถ้าต้องการ)
    } else {
      alert('เกิดข้อผิดพลาดในการเพิ่มโกดัง');
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
