# 🚀 Render Deployment Guide

คู่มือการ Deploy Backend ไปที่ Render (Free Tier) พร้อมเชื่อมต่อ Supabase

---

## 📋 สิ่งที่เตรียมไว้แล้ว

- ✅ `render.yaml` - Render config file
- ✅ `.renderignore` - ไฟล์ที่ไม่ต้องอัพโหลด
- ✅ `package.json` - เพิ่ม postinstall script
- ✅ TypeScript build config

---

## 🔧 ขั้นตอนการ Deploy

### 1️⃣ เตรียม Git Repository

ถ้ายังไม่มี Git repo ให้สร้างใหม่:

```bash
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
```

Push ขึ้น GitHub:

```bash
# สร้าง repo ใหม่บน GitHub ก่อน
git remote add origin https://github.com/YOUR_USERNAME/workshop2-backend.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ สร้าง Web Service บน Render

1. ไปที่ https://render.com
2. Sign up / Login (ใช้ GitHub account แนะนำ)
3. คลิก **"New +"** → เลือก **"Web Service"**

---

### 3️⃣ เชื่อมต่อ GitHub Repository

1. เลือก repository ที่ต้องการ (workshop2-backend)
2. คลิก **"Connect"**

---

### 4️⃣ ตั้งค่า Web Service

กรอกข้อมูลดังนี้:

#### Basic Settings
- **Name**: `workshop2-backend` (หรือชื่อที่ต้องการ)
- **Region**: `Singapore` (ใกล้ที่สุด)
- **Branch**: `main`
- **Root Directory**: (ว่างไว้)
- **Runtime**: `Node`

#### Build & Deploy Settings
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

#### Instance Type
- **Plan**: **Free** ($0/month)
  - ⚠️ จำกัด: 512 MB RAM, หลับหลังไม่ใช้งาน 15 นาที, 750 ชม./เดือน

---

### 5️⃣ ตั้งค่า Environment Variables

ใน **Environment** section เพิ่มตัวแปรเหล่านี้:

```env
NODE_ENV=production
PORT=5000

# Supabase Database Config (ใช้ค่าจาก .env ของคุณ)
DB_HOST=db.dpdiutbarpwdxwweklgb.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=CimMint6104

# JWT Config
JWT_SECRET=workshop2_secret_key_2026_warehouse_rental_management_system
JWT_EXPIRES_IN=1d

# CORS Config (อนุญาตทุก origin)
CORS_ORIGIN=*
```

**🔒 สำคัญ:**
- คัดลอก `DB_HOST` และ `DB_PASSWORD` จากไฟล์ `.env` ของคุณ
- ถ้าต้องการจำกัด CORS เฉพาะ domain: `CORS_ORIGIN=https://your-frontend.vercel.app`

---

### 6️⃣ Deploy!

1. คลิก **"Create Web Service"**
2. รอสัก 2-5 นาที ให้ Render build และ deploy
3. ตรวจสอบ logs ว่า:
   - ✅ Build สำเร็จ
   - ✅ เชื่อมต่อ database สำเร็จ
   - ✅ Server running on port 5000

---

## 🌐 ทดสอบ Backend API

หลัง deploy สำเร็จ จะได้ URL แบบนี้:

```
https://workshop2-backend.onrender.com
```

### ทดสอบ Endpoints

**1. Health Check / API Docs**
```
GET https://workshop2-backend.onrender.com/
```

**2. Login API**
```
POST https://workshop2-backend.onrender.com/api/auth/login

Body (JSON):
{
  "user_name": "cim",
  "user_password": "cimmic6104"
}
```

**3. Get Users (ต้อง login ก่อน)**
```
GET https://workshop2-backend.onrender.com/api/users

Headers:
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔄 อัพเดท Frontend Config

แก้ไขไฟล์ `workshop_front/src/config/api.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://workshop2-backend.onrender.com/api'
  : 'http://localhost:5000/api';

export default API_BASE_URL;
```

หรือถ้าเป็น React:

```javascript
// workshop_front/src/config/api.js
const API_BASE_URL = 'https://workshop2-backend.onrender.com/api';
export default API_BASE_URL;
```

---

## 🐛 Troubleshooting

### ❌ Build Failed
- ตรวจสอบ `package.json` มี `build` script
- ตรวจสอบ `tsconfig.json` ถูกต้อง
- ดู logs ว่า error ตรงไหน

### ❌ Database Connection Failed
- ตรวจสอบ `DB_HOST` และ `DB_PASSWORD` ใน Environment Variables
- ตรวจสอบว่า Supabase project active
- ลอง reset database password ใน Supabase

### ❌ Service Sleeping (ตื่นช้า)
- Free tier จะหลับหลังไม่ใช้งาน 15 นาที
- ใช้เวลา ~30-60 วินาที ตื่นครั้งแรก
- เทคนิค: ใช้ Uptime Robot ping ทุก 14 นาที (แต่อาจผิด TOS)

### ❌ CORS Error
- ตรวจสอบ `CORS_ORIGIN` ใน Environment Variables
- ใช้ `*` อนุญาตทุก domain (สำหรับ dev)
- Production: ระบุ domain ของ frontend เท่านั้น

---

## 📊 Render Free Tier Limits

| Resource | Limit |
|----------|-------|
| RAM | 512 MB |
| CPU | Shared |
| Bandwidth | 100 GB/month |
| Build Minutes | 500/month |
| Hours | 750/month |
| Sleep | หลับหลังไม่ใช้ 15 นาที |

**💡 เพียงพอสำหรับ:**
- Workshop และ demo
- Prototype และ MVP
- Low-traffic APIs
- Personal projects

---

## 🔄 การ Deploy ครั้งถัดไป

เมื่อแก้ไข code:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Render จะ **auto-deploy** ให้อัตโนมัติ! 🎉

---

## 🔐 Security Best Practices

1. ✅ ใช้ Environment Variables สำหรับ secrets
2. ✅ ไม่ commit `.env` ลง Git
3. ✅ ตั้ง `CORS_ORIGIN` ให้เฉพาะเจาะจง (production)
4. ✅ ใช้ HTTPS only
5. ✅ เปลี่ยน `JWT_SECRET` เป็นค่าที่แข็งแรงกว่า

---

## 🎯 Next Steps

1. ✅ Deploy backend บน Render
2. 🔄 อัพเดท frontend config ให้ชี้ไปที่ Render URL
3. 🚀 Deploy frontend บน Vercel/Netlify
4. 🧪 ทดสอบ end-to-end
5. 📊 เพิ่ม seed data บน Supabase (ถ้าจำเป็น)

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Node.js Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Free Plan Limits](https://render.com/docs/free)

---

## ✅ Deployment Checklist

- [ ] Push code ขึ้น GitHub
- [ ] สร้าง Web Service บน Render
- [ ] เชื่อมต่อ GitHub repository
- [ ] ตั้งค่า Build & Start commands
- [ ] เพิ่ม Environment Variables (DB, JWT, CORS)
- [ ] Deploy และตรวจสอบ logs
- [ ] ทดสอบ API endpoints
- [ ] อัพเดท frontend config
- [ ] รัน seed data (ถ้าจำเป็น)
- [ ] ทดสอบ end-to-end

---

🎉 **ขอให้ Deploy สำเร็จ!**

URL ตัวอย่าง: `https://workshop2-backend.onrender.com`
