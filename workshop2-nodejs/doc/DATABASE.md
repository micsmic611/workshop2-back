# 🗄️ Database Schema

## Database: MySQL 8.0+
**Database Name:** `warehouse_rental_db`
**Character Set:** `utf8mb4`
**Collation:** `utf8mb4_unicode_ci`

---

## 📋 Tables

### 1. **role** (บทบาทผู้ใช้)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| role_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสบทบาท |
| role_name | VARCHAR(255) | NOT NULL | ชื่อบทบาท |

**Example Data:**
```sql
INSERT INTO role (role_name) VALUES 
('Employee'),    -- role_id = 1
('Supervisor'),  -- role_id = 2
('Admin');       -- role_id = 3
```

---

### 2. **user** (ผู้ใช้งานระบบ)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสผู้ใช้ |
| user_name | VARCHAR(255) | NOT NULL, UNIQUE | ชื่อผู้ใช้ (สำหรับ login) |
| user_password | VARCHAR(255) | NOT NULL | รหัสผ่าน (bcrypt hashed) |
| user_firstname | VARCHAR(255) | NOT NULL | ชื่อจริง |
| user_lastname | VARCHAR(255) | NOT NULL | นามสกุล |
| user_email | VARCHAR(255) | NULL | อีเมล |
| user_phone | VARCHAR(20) | NULL | เบอร์โทรศัพท์ |
| user_address | VARCHAR(255) | NULL | ที่อยู่ |
| role_id | INT | NULL, FOREIGN KEY | รหัสบทบาท |
| user_status | VARCHAR(50) | DEFAULT '1' | สถานะ ('1'=Active, '0'=Inactive) |

**Business Rules:**
- `user_status = '1'` = ผู้ใช้งานที่ active
- `user_status = '0'` = ผู้ใช้งานที่ถูก deactivate (soft delete)
- สำหรับ Employee (role_id=1): password = bcrypt(user_firstname)

---

### 3. **company** (บริษัทลูกค้า)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| company_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสบริษัท |
| company_name | VARCHAR(100) | NULL | ชื่อบริษัท |
| company_firstname | VARCHAR(100) | NULL | ชื่อผู้ติดต่อ |
| company_lastname | VARCHAR(100) | NULL | นามสกุลผู้ติดต่อ |
| company_email | VARCHAR(100) | NULL | อีเมลบริษัท |
| company_phone | VARCHAR(20) | NULL | เบอร์โทรบริษัท |
| company_address | VARCHAR(255) | NULL | ที่อยู่บริษัท |

---

### 4. **warehouse** (คลังสินค้า)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| warehouse_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสคลังสินค้า |
| warehouse_address | VARCHAR(255) | NULL | ที่อยู่คลังสินค้า |
| warehouse_name | VARCHAR(100) | NULL | ชื่อคลังสินค้า |
| warehouse_size | DECIMAL(10,2) | NULL | ขนาดคลังสินค้า (ตร.ม.) |
| warehouse_status | VARCHAR(100) | DEFAULT 'Active' | สถานะคลังสินค้า |

**Business Rules:**
- `warehouse_status` defaults to `'Active'` when created
- Common statuses: 'Active', 'Rented', 'Maintenance', 'Inactive'

---

### 5. **rental** (การเช่าคลังสินค้า)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| rental_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสการเช่า |
| company_id | INT | NOT NULL, FOREIGN KEY | รหัสบริษัทผู้เช่า |
| user_id | INT | NOT NULL, FOREIGN KEY | รหัสผู้ใช้ที่ทำรายการ |
| warehouse_id | INT | NOT NULL, FOREIGN KEY | รหัสคลังสินค้าที่เช่า |
| date_rental_start | DATETIME | NOT NULL | วันที่เริ่มเช่า |
| date_rental_end | DATETIME | NULL | วันที่สิ้นสุดการเช่า |
| rental_status | VARCHAR(100) | NOT NULL | สถานะการเช่า |
| description | VARCHAR(100) | NULL | รายละเอียดเพิ่มเติม |

**Relationships:**
- `company_id` → `company.company_id`
- `user_id` → `user.user_id`
- `warehouse_id` → `warehouse.warehouse_id`

**Business Rules:**
- Common statuses: 'Active', 'Completed', 'Cancelled'

---

### 6. **cancel_rental** (บันทึกการยกเลิกการเช่า)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| cancel_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัสการยกเลิก |
| company_id | INT | NOT NULL | รหัสบริษัท |
| user_id | INT | NOT NULL | รหัสผู้ใช้ที่ยกเลิก |
| warehouse_id | INT | NOT NULL | รหัสคลังสินค้า |
| date_cancel_rental | DATETIME | NULL | วันที่ยกเลิก |
| description | VARCHAR(250) | NULL | เหตุผลการยกเลิก |

**Business Rules:**
- สร้างขึ้นพร้อมกับการอัพเดท rental.rental_status เป็น 'Cancelled'
- เป็น **atomic operation** ใช้ transaction เพื่อความ consistent

---

### 7. **number1** (ตาราง CIM)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| cim_id | INT | PRIMARY KEY, AUTO_INCREMENT | รหัส CIM |
| cim | VARCHAR(255) | NULL | ค่า CIM |

---

## 🔗 Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    role     │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐         ┌──────────────┐
│    user     │◄───────┤   rental     │
└─────────────┘   N:1   └──────┬───────┘
                               │
                               │ N:1
                        ┌──────▼─────────┐
                        │   warehouse    │
                        └────────────────┘
                               │
                               │ 1:N
                        ┌──────▼─────────┐
                        │    company     │
                        └────────────────┘
                               │
                               │ 1:N
                        ┌──────▼──────────┐
                        │ cancel_rental   │
                        └─────────────────┘
```

---

## 📝 Sample SQL Queries

### Create Database
```sql
CREATE DATABASE warehouse_rental_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

### Insert Sample Role Data
```sql
INSERT INTO role (role_name) VALUES 
('Employee'),
('Supervisor'),
('Admin');
```

### Get Active Warehouses
```sql
SELECT * FROM warehouse 
WHERE warehouse_status = 'Active';
```

### Get Rentals with Company and Warehouse Info
```sql
SELECT 
  r.*,
  c.company_name,
  w.warehouse_name,
  u.user_firstname,
  u.user_lastname
FROM rental r
JOIN company c ON r.company_id = c.company_id
JOIN warehouse w ON r.warehouse_id = w.warehouse_id
JOIN user u ON r.user_id = u.user_id
WHERE r.rental_status = 'Active';
```

### Get All Active Users (Not Deleted)
```sql
SELECT * FROM user 
WHERE user_status = '1';
```

---

## 🔄 Migration from MS SQL Server to MySQL

### Key Differences:

1. **Data Types:**
   - `nvarchar` → `VARCHAR` with `utf8mb4`
   - `datetime` → `DATETIME` (MySQL uses different format)

2. **Auto Increment:**
   - MS SQL: `IDENTITY(1,1)`
   - MySQL: `AUTO_INCREMENT`

3. **Character Set:**
   - MS SQL: Uses `nvarchar` for Unicode
   - MySQL: Use `utf8mb4` character set for full Unicode support

4. **Case Sensitivity:**
   - MySQL table/column names are case-sensitive on Linux
   - Use lowercase for consistency

---

## 🔐 Security Considerations

1. **Password Storage:**
   - Always use bcrypt with salt rounds ≥ 10
   - Never store plain text passwords

2. **SQL Injection:**
   - Use Sequelize ORM parameterized queries
   - Never concatenate user input into SQL

3. **Sensitive Data:**
   - Consider encrypting email addresses
   - Implement proper access controls

4. **Backups:**
   - Regular database backups
   - Test restore procedures
