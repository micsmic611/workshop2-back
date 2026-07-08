# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-08

### Added
- Initial release of Workshop2 Node.js project
- Complete migration from C# .NET + MS SQL Server to Node.js + MySQL
- 7 database models (User, Role, Warehouse, Company, Rental, CancelRental, Cim)
- 5 repositories implementing Repository Pattern
- 7 services implementing Business Logic Layer
- 7 controllers implementing API Layer
- 39 RESTful API endpoints
- JWT authentication and authorization
- Password hashing with bcryptjs
- Request validation with express-validator
- Error handling middleware
- CORS support
- Comprehensive documentation (6 MD files)
- Database schema SQL script
- Environment configuration
- TypeScript support
- Development and production build scripts

### Features
- **Authentication**: Register, Login, Logout, Get User, Reset Password
- **User Management**: CRUD operations with soft delete
- **Warehouse Management**: CRUD operations with status tracking
- **Company Management**: CRUD operations
- **Rental Management**: CRUD operations with atomic cancellation
- **Employee Management**: Special handling with auto-password generation
- **CIM Management**: CRUD operations

### Business Logic
- Employee password automatically set to bcrypt(firstname)
- Rental cancellation as atomic operation with transaction
- Warehouse default status set to "Active"
- User soft delete by setting status to '0'

### Documentation
- Quick Start Guide
- Complete API Documentation
- Database Schema Documentation
- Architecture Guide
- Migration Guide from C# to Node.js
- Project Summary

### Security
- JWT token-based authentication
- BCrypt password hashing
- Role-based authorization
- Input validation
- Error handling
- CORS configuration

## [Unreleased]

### Planned Features
- Rate limiting
- Helmet.js for security headers
- Unit tests with Jest
- Integration tests
- API documentation with Swagger
- Logging with Winston
- File upload for warehouse images
- Email notifications
- Real-time updates with Socket.io
- Redis caching
- Docker containerization
- CI/CD pipeline

---

For the complete list of changes, see the [commit history](https://github.com/YOUR_REPO/workshop2-nodejs/commits/main).
