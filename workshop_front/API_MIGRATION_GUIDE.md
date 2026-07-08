# 🔄 API Migration Guide for Frontend

## การอัพเดท API Endpoints จาก C# Backend เป็น Node.js Backend

### 📝 สรุปการเปลี่ยนแปลง

| เดิม (C# Backend) | ใหม่ (Node.js Backend) | วิธีใช้ |
|-------------------|------------------------|---------|
| `http://localhost:5000` | `http://localhost:5000` | เปลี่ยนจาก HTTPS เป็น HTTP |
| `/api/login` | `/api/auth/login` | ย้าย auth endpoints ไปยัง `/api/auth/*` |
| `/api/User/*` | `/api/users/*` | lowercase + plural |
| `/api/Warehouse/*` | `/api/warehouses/*` | lowercase + plural |
| `/api/Company/*` | `/api/companies/*` | lowercase + plural |
| `/api/Rental/*` | `/api/rentals/*` | lowercase + plural |
| `/api/Employee/*` | `/api/employees/*` | lowercase + plural |

---

## 🔐 Authentication Endpoints

### 1. Login (✅ อัพเดทแล้ว)
```javascript
// เดิม
POST http://localhost:5000/api/login
Body: { username, password }

// ใหม่
POST http://localhost:5000/api/auth/login
Body: { user_name, user_password }
Response: { token, user: {...} }
```

### 2. Get Current User
```javascript
// เดิม
GET http://localhost:5000/api/User/GetUserbyUserId?userid=${userId}

// ใหม่
GET http://localhost:5000/api/auth/user
Headers: { Authorization: `Bearer ${token}` }
Response: { data: {...} }
```

---

## 🏭 Warehouse Endpoints

### 1. Get All Warehouses
```javascript
// เดิม
GET http://localhost:5000/api/Warehouse/warehouserental

// ใหม่
GET http://localhost:5000/api/warehouses
Response: { data: [{warehouse_id, warehouse_name, ...}] }
```

### 2. Add Warehouse (✅ อัพเดทแล้ว)
```javascript
// เดิม
POST http://localhost:5000/api/Warehouse/AddWarehouse
Body: { warehousename, warehouseaddress, warehousesize, warehousestatus }

// ใหม่
POST http://localhost:5000/api/warehouses
Body: { 
  warehouse_name, 
  warehouse_address, 
  warehouse_size, 
  warehouse_status 
}
```

### 3. Update Warehouse
```javascript
// เดิม
PUT http://localhost:5000/api/Warehouse/${id}

// ใหม่
PUT http://localhost:5000/api/warehouses/${id}
Body: { warehouse_name, warehouse_address, ... }
```

### 4. Get Warehouse with Rentals
```javascript
// ใหม่ (feature เพิ่ม)
GET http://localhost:5000/api/warehouses/${id}/rentals
Response: { data: { warehouse info + rentals: [...] } }
```

---

## 🏢 Company Endpoints

### 1. Get All Companies
```javascript
// เดิม
GET http://localhost:5000/api/Company/GetAllCompany

// ใหม่
GET http://localhost:5000/api/companies
Response: { data: [{company_id, company_name, ...}] }
```

### 2. Get Company by Name
```javascript
// เดิม
GET http://localhost:5000/api/Company/GetCompanyByName?Companyname=${name}

// ใหม่ (ใช้ filter ฝั่ง client หรือเพิ่ม endpoint)
GET http://localhost:5000/api/companies
// แล้ว filter ใน frontend: companies.filter(c => c.company_name.includes(name))
```

### 3. Add Company
```javascript
// เดิม
POST http://localhost:5000/api/Company/AddCompany

// ใหม่
POST http://localhost:5000/api/companies
Body: {
  company_name,
  company_firstname,
  company_lastname,
  company_email,
  company_phone,
  company_address
}
```

### 4. Update Company
```javascript
// เดิม
PUT http://localhost:5000/api/Company/UpdateCompany?companyid=${id}

// ใหม่
PUT http://localhost:5000/api/companies/${id}
Body: { company_name, company_email, ... }
```

---

## 👥 Employee Endpoints

### 1. Get All Employees
```javascript
// เดิม
GET http://localhost:5000/api/Employee/GetAllEmp

// ใหม่
GET http://localhost:5000/api/employees
Response: { data: [{user_id, user_name, role_id: 1, ...}] }
```

### 2. Get Employee by Name
```javascript
// เดิม
GET http://localhost:5000/api/Employee/GetEmpByName?Username=${name}

// ใหม่ (ใช้ filter ฝั่ง client)
GET http://localhost:5000/api/employees
// แล้ว filter: employees.filter(e => e.user_name.includes(name))
```

### 3. Add Employee
```javascript
// เดิม
POST http://localhost:5000/api/Employee/AddEmp
Body: { username, firstname, lastname, email, phone, address, status }

// ใหม่
POST http://localhost:5000/api/employees
Body: {
  user_name,
  user_firstname,  // password จะถูกตั้งเป็น bcrypt(user_firstname) อัตโนมัติ
  user_lastname,
  user_email,
  user_phone,
  user_address,
  user_status
}
```

### 4. Update Employee
```javascript
// เดิม
PUT http://localhost:5000/api/Employee/UpdateEmp?Userid=${id}

// ใหม่
PUT http://localhost:5000/api/employees/${id}
Body: { user_firstname, user_lastname, ... }
```

---

## 📝 Rental Endpoints

### 1. Get All Rentals
```javascript
// ใหม่
GET http://localhost:5000/api/rentals
Response: { data: [{rental_id, company_id, warehouse_id, ...}] }
```

### 2. Create Rental
```javascript
// เดิม
POST http://localhost:5000/api/Rental/RentalWarehouse
Body: {
  warehouseId,
  userId,
  rentalStart,
  rentalFinish,
  companyId,
  description,
  rentalstatus
}

// ใหม่
POST http://localhost:5000/api/rentals
Body: {
  warehouse_id,
  user_id,
  company_id,
  date_rental_start,  // ISO 8601 format
  date_rental_end,
  rental_status,
  description
}
```

### 3. Cancel Rental
```javascript
// เดิม
PUT http://localhost:5000/api/Rental/update-status
Body: { rentalId, userId, description }

// ใหม่
POST http://localhost:5000/api/rentals/${rentalId}/cancel
Headers: { Authorization: `Bearer ${token}` }  // userId from token
Body: { description }
Response: {
  data: {
    rental: {...},
    cancelRecord: {...}
  }
}
```

### 4. Get Rentals by Company
```javascript
// ใหม่
GET http://localhost:5000/api/rentals/company/${companyId}
```

---

## 🔄 Response Format Changes

### C# Backend (เดิม)
```javascript
{
  "responseCode": "200",
  "responseMessage": "Success",
  "data": [...]
}
```

### Node.js Backend (ใหม่)
```javascript
// Success
{
  "message": "Success message",
  "data": {...}
}

// Error
{
  "error": "Error message"
}
```

---

## 📋 Field Name Mapping

| C# (เดิม) | Node.js (ใหม่) |
|-----------|----------------|
| `username` | `user_name` |
| `password` | `user_password` |
| `firstname` | `user_firstname` |
| `lastname` | `user_lastname` |
| `email` | `user_email` |
| `phone` | `user_phone` |
| `address` | `user_address` |
| `userID` | `user_id` |
| `warehouseid` | `warehouse_id` |
| `warehousename` | `warehouse_name` |
| `warehouseaddress` | `warehouse_address` |
| `warehousesize` | `warehouse_size` |
| `warehousestatus` | `warehouse_status` |
| `company_id` | `company_id` (same) |
| `rentalId` | `rental_id` |
| `rentalStart` | `date_rental_start` |
| `rentalFinish` | `date_rental_end` |
| `rentalstatus` | `rental_status` |

---

## ✅ Checklist การแก้ไข Frontend

### ไฟล์ที่ต้องแก้
- [x] `Login.js` - แก้แล้ว
- [x] `AddWarehouse.js` - แก้แล้ว
- [ ] `Supervisor.js` - ต้องแก้
- [ ] `Employee.js` (SupervisorEmployee.js) - ต้องแก้
- [ ] `SupervisorCompany.js` - ต้องแก้
- [ ] `Rent.js` - ต้องแก้
- [ ] `WarehousePopup.js` - ต้องแก้
- [ ] `Report.js` - ต้องตรวจสอบ
- [ ] `dashboard.js` - ต้องตรวจสอบ

### สิ่งที่ต้องทำในแต่ละไฟล์
1. เปลี่ยน `https` เป็น `http`
2. เปลี่ยน endpoint path ตามตารางข้างต้น
3. เปลี่ยน field names (camelCase → snake_case)
4. เพิ่ม Authorization header สำหรับ protected routes
5. จัดการ response format ใหม่

---

## 🛠️ วิธีใช้ Config File

```javascript
import { API_ENDPOINTS, apiCall } from '../config/api';

// ตัวอย่างการใช้งาน
const login = async (username, password) => {
  const data = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify({ user_name: username, user_password: password })
  });
  return data;
};

const getWarehouses = async () => {
  const data = await apiCall(API_ENDPOINTS.WAREHOUSES.BASE);
  return data;
};
```

---

## 📞 ติดต่อ

หากมีปัญหาหรือข้อสงสัย:
- ตรวจสอบ console.log ใน browser
- ดู Network tab ใน DevTools
- ตรวจสอบ backend logs ที่ terminal
