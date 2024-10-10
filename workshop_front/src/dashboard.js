import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; 

const Dashboard = () => {
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
      <h1>Dashboard</h1>
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

export default Dashboard;
