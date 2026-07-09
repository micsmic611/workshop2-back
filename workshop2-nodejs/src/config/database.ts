import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Force DNS to use IPv4 only
dns.setDefaultResultOrder('ipv4first');

// Build connection URI for Supabase Pooler
const buildConnectionUri = (): string => {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const dbName = process.env.DB_NAME || 'postgres';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const projectId = process.env.SUPABASE_PROJECT_ID;
  
  let uri = `postgres://${user}:${password}@${host}:${port}/${dbName}`;
  
  // Add project ID for Supabase pooler
  if (projectId) {
    uri += `?application_name=${projectId}`;
  }
  
  return uri;
};

const sequelize = new Sequelize(buildConnectionUri(), {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Sync database (create tables if not exist)
export const syncDatabase = async (force: boolean = false): Promise<void> => {
  try {
    await sequelize.sync({ force });
    console.log(`✅ Database synchronized ${force ? '(tables recreated)' : '(tables updated)'}.`);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};

export default sequelize;
