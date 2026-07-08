import bcrypt from 'bcryptjs';
import userRepository from '../repositories/UserRepository';
import { UserCreationAttributes } from '../models/User';
import { generateToken } from '../config/jwt';

export class AuthService {
  // Register new user
  async register(userData: UserCreationAttributes): Promise<any> {
    // Check if username already exists
    const existingUser = await userRepository.findByUsername(userData.user_name);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    if (userData.user_email) {
      const existingEmail = await userRepository.findByEmail(userData.user_email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);

    // Create user with default role_id = 1 if not specified
    const newUser = await userRepository.create({
      ...userData,
      user_password: hashedPassword,
      role_id: userData.role_id || 1,
      user_status: userData.user_status || '1'
    });

    // Remove password from response
    const { user_password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  }

  // Login user
  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    // Find user by username
    const user = await userRepository.findByUsername(username);
    
    if (!user || user.user_status !== '1') {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.user_password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user.user_id, user.role_id || 0);

    // Remove password from response
    const { user_password, ...userWithoutPassword } = user.toJSON();

    return {
      token,
      user: userWithoutPassword
    };
  }

  // Reset password
  async resetPassword(username: string, newPassword: string): Promise<void> {
    const user = await userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await userRepository.update(user.user_id, {
      user_password: hashedPassword
    });
  }

  // Get user by ID
  async getUserById(userId: number): Promise<any> {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Remove password from response
    const { user_password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }
}

export default new AuthService();
