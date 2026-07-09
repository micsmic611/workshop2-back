import sequelize from '../config/database';
import Role from '../models/Role';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Seed initial data
const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // 1. Create Roles
    console.log('📋 Creating roles...');
    const roles = await Role.bulkCreate([
      { role_id: 1, role_name: 'Employee' },
      { role_id: 2, role_name: 'Supervisor' },
      { role_id: 3, role_name: 'Admin' }
    ], { ignoreDuplicates: true });
    console.log(`✅ Created ${roles.length} roles`);

    // 2. Create Admin User
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      user_name: 'admin',
      user_password: adminPassword,
      user_firstname: 'Admin',
      user_lastname: 'User',
      user_email: 'admin@warehouse.com',
      user_phone: '0812345678',
      user_address: 'Head Office',
      role_id: 3,
      user_status: '1'
    });
    console.log(`✅ Admin user created (ID: ${adminUser.user_id})`);

    // 3. Create Supervisor User
    console.log('👤 Creating supervisor user...');
    const supervisorPassword = await bcrypt.hash('supervisor123', 10);
    const supervisorUser = await User.create({
      user_name: 'supervisor',
      user_password: supervisorPassword,
      user_firstname: 'Supervisor',
      user_lastname: 'Manager',
      user_email: 'supervisor@warehouse.com',
      user_phone: '0823456789',
      user_address: 'Main Office',
      role_id: 2,
      user_status: '1'
    });
    console.log(`✅ Supervisor user created (ID: ${supervisorUser.user_id})`);

    // 4. Create Employee User (password = bcrypt(firstname))
    console.log('👤 Creating employee user...');
    const employeePassword = await bcrypt.hash('Employee', 10); // firstname = 'Employee'
    const employeeUser = await User.create({
      user_name: 'employee',
      user_password: employeePassword,
      user_firstname: 'Employee',
      user_lastname: 'Worker',
      user_email: 'employee@warehouse.com',
      user_phone: '0834567890',
      user_address: 'Branch Office',
      role_id: 1,
      user_status: '1'
    });
    console.log(`✅ Employee user created (ID: ${employeeUser.user_id})`);

    // 5. Create Cim User
    console.log('👤 Creating cim user...');
    const cimPassword = await bcrypt.hash('cimmic6104', 10);
    const cimUser = await User.create({
      user_name: 'cim',
      user_password: cimPassword,
      user_firstname: 'cim',
      user_lastname: 'mic',
      user_email: 'cim@gmail.com',
      user_phone: '0924304641',
      user_address: 'cim',
      role_id: 1,
      user_status: 'active'
    });
    console.log(`✅ Cim user created (ID: ${cimUser.user_id})`);

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📝 Created Users:');
    console.log('┌─────────────┬──────────────┬──────────────────┬──────────┐');
    console.log('│ Username    │ Password     │ Role             │ Role ID  │');
    console.log('├─────────────┼──────────────┼──────────────────┼──────────┤');
    console.log('│ admin       │ admin123     │ Admin            │ 3        │');
    console.log('│ supervisor  │ supervisor123│ Supervisor       │ 2        │');
    console.log('│ employee    │ Employee     │ Employee         │ 1        │');
    console.log('│ cim         │ cimmic6104   │ Employee         │ 1        │');
    console.log('└─────────────┴──────────────┴──────────────────┴──────────┘');
    console.log('\n💡 Use these credentials to login at: http://localhost:5000/api/auth/login\n');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('⚠️  Users already exist. Skipping...');
      process.exit(0);
    }
    process.exit(1);
  }
};

// Connect to database and seed
const connectAndSeed = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');
    await seedData();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

connectAndSeed();
