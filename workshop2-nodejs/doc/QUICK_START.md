# 🚀 Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** or **yarn**
- **Git** (optional)

---

## 📦 Installation

### 1. Clone or Download the Project

```bash
cd workshop2-nodejs
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mysql2
- sequelize
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator
- TypeScript and type definitions

---

## ⚙️ Configuration

### 1. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=warehouse_rental_db
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2. Create MySQL Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE warehouse_rental_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

Or use the command line:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE warehouse_rental_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Sync Database (Create Tables)

Run the database synchronization script:

```bash
npm run db:sync
```

This will create all tables in your MySQL database automatically using Sequelize.

**⚠️ Warning:** If you want to recreate tables (drop and create), use:
```bash
npm run db:sync:force
```
**This will delete all existing data!**

---

## 🏃 Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will start at `http://localhost:5000`

You should see:

```
✅ Database connection established successfully.
✅ Database synchronized (tables updated).

╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏭 Warehouse Rental Management System API 🏭           ║
║                                                           ║
║   Server running on: http://localhost:5000                ║
║   Environment: development                                ║
║   Database: MySQL (warehouse_rental_db)                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Production Mode

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🧪 Testing the API

### 1. Health Check

Open your browser or use curl:

```bash
curl http://localhost:5000/
```

Response:
```json
{
  "message": "Warehouse Rental Management System API",
  "version": "1.0.0",
  "status": "Running",
  "timestamp": "2026-07-08T14:30:00.000Z"
}
```

### 2. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "john_doe",
    "user_password": "password123",
    "user_firstname": "John",
    "user_lastname": "Doe",
    "user_email": "john@example.com",
    "user_phone": "0812345678"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "john_doe",
    "user_password": "password123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "user_name": "john_doe",
    "user_firstname": "John",
    ...
  }
}
```

### 4. Use the Token for Authenticated Requests

```bash
curl -X GET http://localhost:5000/api/warehouses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔑 Initial Data Setup

### Create Roles

```sql
INSERT INTO role (role_name) VALUES 
('Employee'),    -- role_id = 1
('Supervisor'),  -- role_id = 2
('Admin');       -- role_id = 3
```

### Create Admin User (via API)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "admin",
    "user_password": "admin123",
    "user_firstname": "Admin",
    "user_lastname": "User",
    "user_email": "admin@company.com",
    "role_id": 3,
    "user_status": "1"
  }'
```

---

## 📱 Using with Frontend

Update your React frontend to point to the new API:

```javascript
// In your frontend config
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Login request
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_name: username,
    user_password: password
  })
});

const data = await response.json();
const token = data.token;

// Store token
localStorage.setItem('token', token);

// Use token in subsequent requests
const warehousesResponse = await fetch(`${API_BASE_URL}/warehouses`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🐛 Troubleshooting

### Database Connection Error

**Error:** `Unable to connect to the database`

**Solutions:**
1. Check MySQL is running: `mysql --version`
2. Verify credentials in `.env`
3. Ensure database exists
4. Check MySQL port (default 3306)

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change PORT in `.env` file
2. Kill process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -i :5000
   kill -9 <PID>
   ```

### TypeScript Compilation Errors

**Error:** TypeScript errors during build

**Solutions:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check TypeScript version: `npx tsc --version`

### CORS Issues

**Error:** Frontend getting CORS errors

**Solution:**
Update `CORS_ORIGIN` in `.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

Or allow multiple origins in `src/app.ts`:
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

---

## 📚 Next Steps

1. Read [API Documentation](./API.md) for all available endpoints
2. Review [Database Schema](./DATABASE.md) to understand data structure
3. Study [Architecture](./ARCHITECTURE.md) to understand code organization
4. Check [Migration Guide](./MIGRATION.md) if coming from C# version

---

## 🛠️ Available npm Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run db:sync      # Sync database (create/update tables)
npm run db:sync:force # Force sync (drop and recreate tables)
```

---

## 📞 Support

If you encounter any issues:
1. Check the logs in the terminal
2. Review the documentation in `/doc` folder
3. Check MySQL error logs
4. Ensure all environment variables are set correctly

---

## ✅ Success Checklist

- [ ] Node.js and MySQL installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] MySQL database created
- [ ] Database tables created (`npm run db:sync`)
- [ ] Server starts successfully (`npm run dev`)
- [ ] Can access health check endpoint
- [ ] Can register and login users
- [ ] Frontend can connect to API

---

**🎉 Congratulations! Your Warehouse Rental Management System API is now running!**
