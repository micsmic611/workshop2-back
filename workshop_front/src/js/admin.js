import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 

const Admin = () => { // เปลี่ยนชื่อเป็นตัวพิมพ์ใหญ่
  const [token, setToken] = useState('');
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    // ดึงโทเคนจาก localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      // ถอดรหัสโทเคนเพื่อให้ได้ Payload
      try {
        const decoded = jwtDecode(storedToken);
        setPayload(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1> {/* แก้ไขชื่อหัวข้อเป็น Admin Dashboard */}
      <h2>Token:</h2>
      <pre>{token}</pre>
      <h2>Payload:</h2>
      {payload ? (
        <pre>{JSON.stringify(payload, null, 2)}</pre>
      ) : (
        <p>No payload data available.</p>
      )}
    </div>
  );
};

export default Admin;
