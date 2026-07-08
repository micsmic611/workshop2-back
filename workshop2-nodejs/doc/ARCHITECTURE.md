# 🏗️ Architecture Documentation

## Project Architecture Overview

This project follows the **Repository Pattern** with a clear **3-Layer Architecture** (Presentation, Business Logic, Data Access).

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│                   (React Frontend / API Consumer)           │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   PRESENTATION LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  Controllers │  │  Middlewares │  │    Routes    │    │
│  │   (API)      │  │   (Auth,     │  │  (Express)   │    │
│  │              │  │  Validation) │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Services   │  │  JWT Service │  │   Business   │    │
│  │   (Auth,     │  │   (Token     │  │    Rules     │    │
│  │   User, etc) │  │  Generation) │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   DATA ACCESS LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Repositories │  │   Sequelize  │  │   Models     │    │
│  │   (CRUD)     │  │     ORM      │  │  (Entities)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      DATABASE LAYER                         │
│                        MySQL 8.0+                           │
│              (warehouse_rental_db)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
workshop2-nodejs/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # Database connection & sync
│   │   └── jwt.ts           # JWT token generation & verification
│   │
│   ├── models/              # Sequelize Models (Database entities)
│   │   ├── User.ts
│   │   ├── Role.ts
│   │   ├── Warehouse.ts
│   │   ├── Company.ts
│   │   ├── Rental.ts
│   │   ├── CancelRental.ts
│   │   ├── Cim.ts
│   │   └── index.ts
│   │
│   ├── repositories/        # Data Access Layer
│   │   ├── UserRepository.ts
│   │   ├── WarehouseRepository.ts
│   │   ├── CompanyRepository.ts
│   │   ├── RentalRepository.ts
│   │   ├── CimRepository.ts
│   │   └── index.ts
│   │
│   ├── services/            # Business Logic Layer
│   │   ├── AuthService.ts
│   │   ├── UserService.ts
│   │   ├── WarehouseService.ts
│   │   ├── CompanyService.ts
│   │   ├── RentalService.ts
│   │   ├── EmployeeService.ts
│   │   ├── CimService.ts
│   │   └── index.ts
│   │
│   ├── controllers/         # API Controllers (Request handlers)
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   ├── WarehouseController.ts
│   │   ├── CompanyController.ts
│   │   ├── RentalController.ts
│   │   ├── EmployeeController.ts
│   │   ├── CimController.ts
│   │   └── index.ts
│   │
│   ├── routes/              # Express Routes
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── warehouse.routes.ts
│   │   ├── company.routes.ts
│   │   ├── rental.routes.ts
│   │   ├── employee.routes.ts
│   │   ├── cim.routes.ts
│   │   └── index.ts
│   │
│   ├── middlewares/         # Express Middlewares
│   │   ├── auth.ts          # Authentication & Authorization
│   │   ├── errorHandler.ts  # Error handling
│   │   ├── validation.ts    # Request validation
│   │   └── index.ts
│   │
│   ├── scripts/             # Utility scripts
│   │   └── syncDb.ts        # Database synchronization script
│   │
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
│
├── doc/                     # Documentation
│   ├── API.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   └── MIGRATION.md
│
├── .env                     # Environment variables
├── .gitignore
├── tsconfig.json            # TypeScript configuration
├── package.json
└── README.md
```

---

## 🔄 Request Flow

### Example: User Login

1. **Client** sends POST request to `/api/auth/login`
   ```
   POST /api/auth/login
   Body: { user_name, user_password }
   ```

2. **Route** (`auth.routes.ts`) receives request
   - Applies validation middleware
   - Forwards to controller

3. **Controller** (`AuthController.ts`)
   - Validates request body
   - Calls service method

4. **Service** (`AuthService.ts`)
   - Implements business logic
   - Calls repository methods
   - Verifies password with bcrypt
   - Generates JWT token

5. **Repository** (`UserRepository.ts`)
   - Queries database via Sequelize
   - Returns user data

6. **Controller** formats response
   - Returns JWT token + user data

7. **Client** receives response
   ```json
   {
     "token": "eyJhbGc...",
     "user": { ... }
   }
   ```

---

## 🎯 Design Patterns

### 1. Repository Pattern
**Purpose:** Abstract data access logic from business logic

**Benefits:**
- Easy to test (can mock repositories)
- Centralized data access
- Easy to switch ORM or database

**Example:**
```typescript
// Repository handles database operations
class UserRepository {
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
}

// Service uses repository
class UserService {
  async getUser(id: number) {
    return await userRepository.findById(id);
  }
}
```

### 2. Service Layer Pattern
**Purpose:** Encapsulate business logic

**Benefits:**
- Reusable business logic
- Keeps controllers thin
- Easy to test

**Example:**
```typescript
class AuthService {
  async login(username: string, password: string) {
    // Business logic here
    const user = await userRepository.findByUsername(username);
    if (!user || user.status !== '1') {
      throw new Error('Invalid credentials');
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    const token = generateToken(user.id, user.roleId);
    return { token, user };
  }
}
```

### 3. Middleware Pattern
**Purpose:** Process requests before they reach controllers

**Benefits:**
- Cross-cutting concerns (auth, logging, validation)
- Reusable across routes
- Clean separation of concerns

**Example:**
```typescript
// Authentication middleware
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

### 4. Dependency Injection
**Purpose:** Loose coupling between components

**Benefits:**
- Easy to test
- Flexible and maintainable

**Example:**
```typescript
class UserService {
  constructor(private userRepository: UserRepository) {}
  
  async getUser(id: number) {
    return await this.userRepository.findById(id);
  }
}
```

---

## 🔐 Security Architecture

### 1. Authentication Flow
```
1. User logs in → credentials sent to /api/auth/login
2. Server validates credentials
3. Server generates JWT token with userId & roleId
4. Token returned to client
5. Client stores token (localStorage/cookie)
6. Client includes token in Authorization header for subsequent requests
7. Server validates token in authenticate middleware
```

### 2. Authorization
- Role-based access control (RBAC)
- Middleware checks user role before allowing access
- Different roles: Employee (1), Supervisor (2), Admin (3)

### 3. Password Security
- Bcrypt hashing with salt rounds = 10
- Passwords never stored in plain text
- Business rule: Employee password = bcrypt(firstname)

---

## 🧪 Testing Strategy (Future Implementation)

### Unit Tests
- Test individual functions
- Mock dependencies
- Test services and repositories

### Integration Tests
- Test API endpoints
- Test database interactions
- Use test database

### E2E Tests
- Test complete user flows
- Test with frontend

---

## 🚀 Scalability Considerations

### Current Architecture Supports:
1. **Horizontal Scaling**
   - Stateless design (JWT tokens)
   - Can run multiple server instances

2. **Database Optimization**
   - Sequelize connection pooling
   - Indexes on frequently queried columns

3. **Caching** (Future)
   - Redis for session storage
   - Cache frequently accessed data

4. **Load Balancing** (Future)
   - Multiple server instances
   - Nginx/HAProxy

---

## 📝 Code Conventions

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Use async/await (no callbacks)

### Naming Conventions
- Files: PascalCase for classes (e.g., `UserService.ts`)
- Variables: camelCase (e.g., `userId`)
- Constants: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)
- Classes: PascalCase (e.g., `UserService`)
- Functions: camelCase (e.g., `getUserById`)

### Error Handling
- Use try-catch in async functions
- Throw descriptive errors
- Global error handler in middleware

### Comments
- Document complex business logic
- Use JSDoc for public functions
- Avoid obvious comments

---

## 🔄 Future Improvements

1. **Logging:** Winston or Pino for structured logging
2. **Monitoring:** Prometheus + Grafana
3. **Testing:** Jest + Supertest
4. **API Documentation:** Swagger/OpenAPI
5. **Rate Limiting:** Express-rate-limit
6. **File Upload:** Multer for warehouse images
7. **Email Notifications:** Nodemailer
8. **Real-time Updates:** Socket.io for notifications
9. **Caching:** Redis
10. **Containerization:** Docker + Docker Compose
