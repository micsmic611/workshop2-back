import app from './app';
import { testConnection, syncDatabase } from './config/database';

// Import all models to register them with Sequelize
import './models/Role';
import './models/User';
import './models/Warehouse';
import './models/Company';
import './models/Rental';
import './models/CancelRental';
import './models/Cim';

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database (create tables if not exist)
    // Set force: true to drop and recreate tables (use carefully!)
    await syncDatabase(false);
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏭 Warehouse Rental Management System API 🏭           ║
║                                                           ║
║   Server running on: http://localhost:${PORT}             ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   Database: MySQL (${process.env.DB_NAME || 'warehouse_rental_db'})                  ║
║                                                           ║
║   📚 API Documentation: http://localhost:${PORT}/         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();
