# 📚 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT Bearer token:
```
Authorization: Bearer <your_token_here>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Body:**
```json
{
  "user_name": "john_doe",
  "user_password": "password123",
  "user_firstname": "John",
  "user_lastname": "Doe",
  "user_email": "john@example.com",
  "user_phone": "0812345678",
  "user_address": "123 Main St",
  "role_id": 1,
  "user_status": "1"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "user_id": 1,
    "user_name": "john_doe",
    "user_firstname": "John",
    "user_lastname": "Doe",
    ...
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Body:**
```json
{
  "user_name": "john_doe",
  "user_password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "user_name": "john_doe",
    ...
  }
}
```

### 3. Get Current User
**GET** `/api/auth/user`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "data": {
    "user_id": 1,
    "user_name": "john_doe",
    "user_firstname": "John",
    "user_lastname": "Doe",
    ...
  }
}
```

### 4. Logout
**POST** `/api/auth/logout`

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

### 5. Reset Password
**POST** `/api/auth/reset-password`

**Body:**
```json
{
  "username": "john_doe",
  "newPassword": "newPassword123"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

---

## 👥 User Endpoints

**All endpoints require authentication**

### 1. Create User
**POST** `/api/users`

### 2. Get All Users
**GET** `/api/users`

### 3. Get User by ID
**GET** `/api/users/:id`

### 4. Update User
**PUT** `/api/users/:id`

### 5. Delete User (Soft Delete)
**DELETE** `/api/users/:id`

### 6. Get Users by Role
**GET** `/api/users/role/:roleId`

---

## 🏭 Warehouse Endpoints

**All endpoints require authentication**

### 1. Create Warehouse
**POST** `/api/warehouses`

**Body:**
```json
{
  "warehouse_name": "Warehouse A",
  "warehouse_address": "123 Industrial Zone",
  "warehouse_size": 1500.50,
  "warehouse_status": "Active"
}
```

### 2. Get All Warehouses
**GET** `/api/warehouses`

### 3. Get Active Warehouses
**GET** `/api/warehouses/active`

### 4. Get Warehouse by ID
**GET** `/api/warehouses/:id`

### 5. Get Warehouse with Rental Info
**GET** `/api/warehouses/:id/rentals`

### 6. Update Warehouse
**PUT** `/api/warehouses/:id`

### 7. Delete Warehouse
**DELETE** `/api/warehouses/:id`

---

## 🏢 Company Endpoints

**All endpoints require authentication**

### 1. Create Company
**POST** `/api/companies`

**Body:**
```json
{
  "company_name": "ABC Corporation",
  "company_firstname": "John",
  "company_lastname": "Smith",
  "company_email": "contact@abc.com",
  "company_phone": "0812345678",
  "company_address": "456 Business District"
}
```

### 2. Get All Companies
**GET** `/api/companies`

### 3. Get Company by ID
**GET** `/api/companies/:id`

### 4. Update Company
**PUT** `/api/companies/:id`

### 5. Delete Company
**DELETE** `/api/companies/:id`

---

## 📝 Rental Endpoints

**All endpoints require authentication**

### 1. Create Rental
**POST** `/api/rentals`

**Body:**
```json
{
  "company_id": 1,
  "user_id": 1,
  "warehouse_id": 1,
  "date_rental_start": "2026-07-01T00:00:00Z",
  "date_rental_end": "2026-12-31T23:59:59Z",
  "rental_status": "Active",
  "description": "6-month rental contract"
}
```

### 2. Get All Rentals
**GET** `/api/rentals`

### 3. Get Rental by ID
**GET** `/api/rentals/:id`

### 4. Get Rentals by Company
**GET** `/api/rentals/company/:companyId`

### 5. Update Rental
**PUT** `/api/rentals/:id`

### 6. Cancel Rental
**POST** `/api/rentals/:id/cancel`

**Body:**
```json
{
  "description": "Early termination requested by client"
}
```

**Response (200):**
```json
{
  "message": "Rental cancelled successfully",
  "data": {
    "rental": { ... },
    "cancelRecord": { ... }
  }
}
```

---

## 👷 Employee Endpoints

**All endpoints require authentication**

**Note:** Employees are users with `role_id = 1`. Password is automatically set to bcrypt(firstname).

### 1. Create Employee
**POST** `/api/employees`

**Body:**
```json
{
  "user_name": "emp_john",
  "user_firstname": "John",
  "user_lastname": "Worker",
  "user_email": "john.worker@company.com",
  "user_phone": "0823456789",
  "user_address": "789 Employee St",
  "user_status": "1"
}
```

### 2. Get All Employees
**GET** `/api/employees`

### 3. Get Active Employees
**GET** `/api/employees/active`

### 4. Update Employee
**PUT** `/api/employees/:id`

**Note:** If firstname is updated, password will be automatically updated to bcrypt(new_firstname)

### 5. Delete Employee (Soft Delete)
**DELETE** `/api/employees/:id`

---

## 🔢 CIM (Number1) Endpoints

**All endpoints require authentication**

### 1. Create CIM Record
**POST** `/api/cim`

**Body:**
```json
{
  "cim": "CIM-001"
}
```

### 2. Get All CIM Records
**GET** `/api/cim`

### 3. Get CIM by ID
**GET** `/api/cim/:id`

### 4. Update CIM
**PUT** `/api/cim/:id`

### 5. Delete CIM
**DELETE** `/api/cim/:id`

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Username already exists"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden: Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
Currently no rate limiting is implemented. Consider adding it for production.

## CORS
CORS is enabled for `http://localhost:3000` by default. Update `.env` file to change `CORS_ORIGIN`.
