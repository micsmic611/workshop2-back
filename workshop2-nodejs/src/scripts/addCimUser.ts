import sequelize from '../config/database';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Add Cim user
const addCimUser = async () => {
  try {
    console.log('🌱 Adding Cim user...');

    // Check if user already exists
    const existingUser = await User.findOne({ where: { user_name: 'cim' } });
    
    if (existingUser) {
      console.log('⚠️  User "cim" already exists. Updating password...');
      
      // Update password
      const cimPassword = await bcrypt.hash('cimmic6104', 10);
      await User.update(
        {
          user_password: cimPassword,
          user_firstname: 'cim',
          user_lastname: 'mic',
          user_email: 'cim@gmail.com',
          user_phone: '0924304641',
          user_address: 'cim',
          role_id: 1,
          user_status: '1'
        },
        { where: { user_name: 'cim' } }
      );
      console.log('✅ User "cim" updated successfully!');
    } else {
      // Create new user
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
        user_status: '1'
      });
      console.log(`✅ User "cim" created successfully (ID: ${cimUser.user_id})`);
    }

    console.log('\n📝 Cim User Credentials:');
    console.log('┌─────────────┬──────────────┬──────────────────┬──────────┐');
    console.log('│ Username    │ Password     │ Role             │ Role ID  │');
    console.log('├─────────────┼──────────────┼──────────────────┼──────────┤');
    console.log('│ cim         │ cimmic6104   │ Employee         │ 1        │');
    console.log('└─────────────┴──────────────┴──────────────────┴──────────┘');
    console.log('\n💡 Use these credentials to login\n');

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Failed to add Cim user:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Connect to database and add user
const connectAndAddUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');
    await addCimUser();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

connectAndAddUser();
