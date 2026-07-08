# Workshop2 - Warehouse Rental Management System (Node.js + Express + MySQL)

## 📋 Project Overview

ระบบจัดการการเช่าคลังสินค้า (Warehouse Rental Management System) แปลงจาก C# .NET + MS SQL Server มาเป็น Node.js + Express + MySQL

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

## 📁 Project Structure

```
workshop2-nodejs/
├── src/
│   ├── config/           # Configuration files (database, JWT)
│   ├── controllers/      # API Controllers
│   ├── services/         # Business Logic Layer
│   ├── repositories/     # Data Access Layer
│   ├── models/           # Sequelize Models
│   ├── middlewares/      # Express Middlewares (auth, validation)
│   ├── routes/           # API Routes
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── doc/                  # Documentation
├── .env                  # Environment variables
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Create MySQL database:
```sql
CREATE DATABASE warehouse_rental_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. Run database migrations:
```bash
npm run db:sync
```

5. Start development server:
```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:sync` - Sync database models
- `npm run lint` - Run linter

## 🔐 Authentication

The system uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 📚 API Documentation

See [doc/API.md](doc/API.md) for detailed API documentation.

## 🗄️ Database Schema

See [doc/DATABASE.md](doc/DATABASE.md) for database schema and relationships.

## 🏗️ Architecture

This project follows the **Repository Pattern** with a clear separation of concerns:

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Repositories**: Handle data access
- **Models**: Define database schema

See [doc/ARCHITECTURE.md](doc/ARCHITECTURE.md) for more details.

## 🔄 Migration from C# .NET

This project is migrated from C# .NET Core + MS SQL Server. See [doc/MIGRATION.md](doc/MIGRATION.md) for migration details and differences.

## 📄 License

ISC

## 👥 Author

Workshop2 Team
