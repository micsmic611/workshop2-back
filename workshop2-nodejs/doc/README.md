# 📚 Documentation Index

Welcome to the Warehouse Rental Management System documentation!

## 📖 Available Documentation

### 1. [Quick Start Guide](./QUICK_START.md) 🚀
**Start here if you're new!**
- Installation steps
- Configuration guide
- First run instructions
- Testing the API
- Troubleshooting

### 2. [API Documentation](./API.md) 📡
Complete API reference for all endpoints:
- Authentication endpoints
- User management
- Warehouse operations
- Company management
- Rental operations
- Employee management
- CIM endpoints
- Error responses

### 3. [Database Schema](./DATABASE.md) 🗄️
Database structure and relationships:
- Table definitions
- Column descriptions
- Relationships (ERD)
- Sample queries
- Migration from MS SQL Server
- Security considerations

### 4. [Architecture Guide](./ARCHITECTURE.md) 🏗️
System design and code organization:
- Architecture overview
- Design patterns (Repository, Service Layer)
- Request flow
- Security architecture
- Code conventions
- Scalability considerations

### 5. [Migration Guide](./MIGRATION.md) 🔄
Migrating from C# .NET to Node.js:
- Technology comparison
- Database migration
- Code examples
- Business logic preservation
- Data migration scripts
- Common issues and solutions

---

## 🎯 Quick Links

### For Developers
- [Project Structure](./ARCHITECTURE.md#-directory-structure)
- [Code Conventions](./ARCHITECTURE.md#-code-conventions)
- [Design Patterns](./ARCHITECTURE.md#-design-patterns)

### For API Users
- [Authentication Flow](./API.md#-authentication-endpoints)
- [Request Examples](./API.md#1-register-user)
- [Error Handling](./API.md#error-responses)

### For Database Admins
- [Database Setup](./DATABASE.md#-sample-sql-queries)
- [Schema Diagram](./DATABASE.md#-entity-relationship-diagram-erd)
- [SQL Scripts](../database/schema.sql)

### For Project Managers
- [Technology Stack](./MIGRATION.md#-migration-summary)
- [Migration Benefits](./MIGRATION.md#-benefits-of-migration)
- [Performance Comparison](./MIGRATION.md#-performance-comparison)

---

## 🗂️ Documentation Structure

```
doc/
├── README.md           # This file - Documentation index
├── QUICK_START.md      # Installation and setup guide
├── API.md              # Complete API reference
├── DATABASE.md         # Database schema and design
├── ARCHITECTURE.md     # System architecture and patterns
└── MIGRATION.md        # Migration guide from C# to Node.js
```

---

## 🆘 Getting Help

### Common Questions

**Q: How do I start the server?**
A: See [Quick Start Guide](./QUICK_START.md#-running-the-application)

**Q: What are the available API endpoints?**
A: See [API Documentation](./API.md)

**Q: How do I set up the database?**
A: See [Quick Start - Configuration](./QUICK_START.md#-configuration)

**Q: What's the project structure?**
A: See [Architecture - Directory Structure](./ARCHITECTURE.md#-directory-structure)

**Q: How do I migrate from C# version?**
A: See [Migration Guide](./MIGRATION.md)

---

## 🔧 System Requirements

- **Node.js**: v16 or higher
- **MySQL**: v8.0 or higher
- **RAM**: 512MB minimum (2GB recommended)
- **Disk Space**: 500MB minimum
- **OS**: Windows, Linux, or macOS

---

## 📦 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | MySQL 8.0+ |
| **ORM** | Sequelize |
| **Authentication** | JWT |
| **Password Hashing** | bcryptjs |
| **Validation** | express-validator |
| **CORS** | cors |

---

## 🎓 Learning Path

### Beginner
1. Read [Quick Start Guide](./QUICK_START.md)
2. Follow installation steps
3. Test the API with curl or Postman
4. Review [API Documentation](./API.md)

### Intermediate
1. Study [Architecture Guide](./ARCHITECTURE.md)
2. Understand Repository Pattern
3. Review code in `src/` folder
4. Explore [Database Schema](./DATABASE.md)

### Advanced
1. Read [Migration Guide](./MIGRATION.md)
2. Implement custom features
3. Optimize database queries
4. Add new endpoints
5. Deploy to production

---

## 📝 Related Files

- **Main README**: [../README.md](../README.md)
- **Package Info**: [../package.json](../package.json)
- **TypeScript Config**: [../tsconfig.json](../tsconfig.json)
- **Environment Example**: [../.env.example](../.env.example)
- **Database Schema**: [../database/schema.sql](../database/schema.sql)

---

## 🔄 Documentation Updates

This documentation is maintained alongside the codebase. If you find any issues or have suggestions:

1. Create an issue
2. Submit a pull request
3. Contact the development team

---

## 📅 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-08 | Initial release - Complete migration from C# to Node.js |

---

## 📞 Support Contacts

- **Technical Support**: [Your email]
- **Bug Reports**: [GitHub Issues or your system]
- **Feature Requests**: [Your process]

---

**Happy Coding! 🎉**

*Last updated: 2026-07-08*
