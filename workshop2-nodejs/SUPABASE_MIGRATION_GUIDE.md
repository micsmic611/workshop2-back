# 🚀 Supabase Migration Guide

คู่มือการย้ายระบบจาก MySQL ไปใช้ Supabase (PostgreSQL)

## 📋 สิ่งที่เปลี่ยนแปลง

### ✅ ไฟล์ที่ได้อัพเดทแล้ว
- ✅ `package.json` - เปลี่ยนจาก mysql2 เป็น pg และ pg-hstore
- ✅ `src/config/database.ts` - เปลี่ยน dialect เป็น postgres
- ✅ `.env` - อัพเดท config สำหรับ PostgreSQL
- ✅ `database/schema.postgres.sql` - สร้าง PostgreSQL schema ใหม่

---

## 🔧 ขั้นตอนการ Setup

### 1️⃣ สร้าง Supabase Project (Free Tier)

1. ไปที่ https://supabase.com
2. สร้างบัญชีใหม่ (ถ้ายังไม่มี)
3. คลิก **"New Project"**
4. กรอกข้อมูล:
   - **Organization**: สร้างใหม่หรือเลือกที่มีอยู่
   - **Project Name**: `warehouse-rental` (หรือชื่อที่ต้องการ)
   - **Database Password**: สร้างรหัสผ่านที่แข็งแรง (เก็บไว้ดี!)
   - **Region**: เลือก `Southeast Asia (Singapore)` (ใกล้ที่สุด)
   - **Pricing Plan**: **Free** ($0/month)
5. รอสักครู่ให้ Supabase สร้าง project

### 2️⃣ ดึงข้อมูล Connection String

1. ใน Supabase Dashboard ไปที่ **Settings** → **Database**
2. หาส่วน **Connection String** → เลือก **URI**
3. คัดลอก connection string (ตัวอย่าง):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

### 3️⃣ อัพเดทไฟล์ `.env`

แก้ไขไฟล์ `.env` ให้เป็นค่าจาก Supabase:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (Supabase PostgreSQL)
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password-here

# JWT Configuration
JWT_SECRET=workshop2_secret_key_2026_warehouse_rental_management_system
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

**⚠️ สำคัญ:**
- เปลี่ยน `DB_HOST` เป็นค่าจาก Supabase (db.xxxxx.supabase.co)
- เปลี่ยน `DB_PASSWORD` เป็นรหัสผ่านที่คุณตั้งไว้ตอนสร้าง project

### 4️⃣ ติดตั้ง Dependencies ใหม่

```bash
npm install
```

หรือถ้ามี node_modules อยู่แล้ว:

```bash
rm -rf node_modules package-lock.json
npm install
```

### 5️⃣ รัน Database Schema บน Supabase

**วิธีที่ 1: ใช้ Supabase SQL Editor (แนะนำ)**

1. ไปที่ Supabase Dashboard → **SQL Editor**
2. คลิก **"New query"**
3. คัดลอกเนื้อหาจากไฟล์ `database/schema.postgres.sql` ทั้งหมด
4. วางใน SQL Editor
5. คลิก **"Run"**
6. ตรวจสอบว่าไม่มี error

**วิธีที่ 2: ใช้ psql command line**

```bash
psql "postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres" -f database/schema.postgres.sql
```

### 6️⃣ ทดสอบการเชื่อมต่อ

```bash
npm run dev
```

ควรเห็นข้อความ:
```
✅ Database connection established successfully.
🚀 Server running on port 5000
```

---

## 🔍 ตรวจสอบข้อมูลใน Supabase

1. ไปที่ **Table Editor** ใน Supabase Dashboard
2. คุณจะเห็นตารางทั้งหมด:
   - `role`
   - `user`
   - `company`
   - `warehouse`
   - `rental`
   - `cancel_rental`
   - `number1` (CIM)

3. ตรวจสอบข้อมูลตัวอย่างที่ถูก insert:
   - ตาราง `role`: มี 3 roles (Employee, Supervisor, Admin)
   - ตาราง `company`: มี ABC Corporation
   - ตาราง `warehouse`: มี 3 warehouses

---

## 📊 ความแตกต่าง MySQL vs PostgreSQL

| Feature | MySQL | PostgreSQL |
|---------|-------|------------|
| Auto Increment | `AUTO_INCREMENT` | `SERIAL` |
| Datetime | `DATETIME` | `TIMESTAMP` |
| Table Engine | `ENGINE=InnoDB` | ไม่ต้องระบุ |
| Reserved Word | `user` | `"user"` (ต้องใส่ quotes) |
| Upsert | `ON DUPLICATE KEY UPDATE` | `ON CONFLICT DO UPDATE` |
| Port | 3306 | 5432 |

---

## 🎯 การใช้งานต่อ

### รัน Development Server
```bash
npm run dev
```

### Sync Database (ถ้าต้องการให้ Sequelize สร้างตารางใหม่)
```bash
npm run db:sync
```

⚠️ **คำเตือน**: อย่าใช้ในโหมด production

### Seed ข้อมูลทดสอบ
```bash
npm run db:seed
```

---

## 🆓 Supabase Free Tier Limits

| Resource | Limit |
|----------|-------|
| Database Size | 500 MB |
| Storage | 1 GB |
| Bandwidth | 2 GB/month |
| Monthly Active Users | 50,000 |
| Edge Functions | 500,000 invocations/month |

**💡 เพียงพอสำหรับ:**
- Workshop และการทดสอบ
- Prototype และ MVP
- Production ขนาดเล็ก (< 100 concurrent users)

---

## 🐛 Troubleshooting

### ❌ Error: "Connection refused"
- ตรวจสอบ `DB_HOST` และ `DB_PORT` ใน `.env`
- ตรวจสอบว่า Supabase project active อยู่

### ❌ Error: "password authentication failed"
- ตรวจสอบ `DB_PASSWORD` ใน `.env`
- ลอง reset password ใน Supabase Dashboard → Settings → Database

### ❌ Error: "relation does not exist"
- รัน schema SQL อีกครั้งใน Supabase SQL Editor
- ตรวจสอบว่าตารางถูกสร้างใน `public` schema

### ❌ Error: "npm install" ล้มเหลว
```bash
npm cache clean --force
npm install
```

---

## 🔄 การย้ายข้อมูลจาก MySQL (ถ้ามีข้อมูลเดิม)

### ส่งออกข้อมูลจาก MySQL
```bash
mysqldump -u root -p warehouse_rental_db > backup.sql
```

### แปลง SQL Format (manual)
- แก้ `AUTO_INCREMENT` เป็น `SERIAL`
- แก้ `DATETIME` เป็น `TIMESTAMP`
- แก้ `0000-00-00 00:00:00` เป็น `NULL` หรือวันที่จริง

### นำเข้าใน Supabase
ใช้ SQL Editor วาง SQL ที่แปลงแล้ว

---

## 🔐 Security Best Practices

1. **ไม่ commit** ไฟล์ `.env` ลง Git
2. ใช้ **environment variables** บน production
3. เปิดใช้ **Row Level Security (RLS)** ใน Supabase (ขั้นสูง)
4. ใช้ **strong password** สำหรับ database
5. ตั้ง **allowed IPs** ใน Supabase settings (ถ้าจำเป็น)

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Sequelize PostgreSQL](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#postgresql)

---

## ✅ Checklist

- [ ] สร้าง Supabase project แล้ว
- [ ] อัพเดท `.env` ด้วยข้อมูล connection
- [ ] รัน `npm install` สำเร็จ
- [ ] รัน `schema.postgres.sql` บน Supabase
- [ ] ทดสอบ `npm run dev` และเชื่อมต่อสำเร็จ
- [ ] ตรวจสอบตารางใน Supabase Table Editor
- [ ] ทดสอบ API endpoints (Postman/Thunder Client)

---

🎉 **ยินดีด้วย! คุณได้ย้ายไปใช้ Supabase เรียบร้อยแล้ว**
