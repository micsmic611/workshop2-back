import bcrypt from 'bcryptjs';
import userRepository from '../repositories/UserRepository';
import { UserCreationAttributes, UserAttributes } from '../models/User';

export class UserService {
  // Create new user
  async createUser(userData: UserCreationAttributes): Promise<any> {
    // Check if username exists
    if (await userRepository.usernameExists(userData.user_name)) {
      throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);

    // Create user
    const newUser = await userRepository.create({
      ...userData,
      user_password: hashedPassword,
      user_status: userData.user_status || '1'
    });

    // Remove password from response
    const { user_password, ...userWithoutPassword } = newUser.toJSON();
    return userWithoutPassword;
  }

  // Get all users
  async getAllUsers(): Promise<any[]> {
    const users = await userRepository.findAll();
    
    // Remove passwords from response
    return users.map(user => {
      const { user_password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  }

  // Get user by ID
  async getUserById(id: number): Promise<any> {
    const user = await userRepository.findById(id);
    
    if (!user) {
      throw new Error('User not found');
    }

    const { user_password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  // Update user
  async updateUser(id: number, userData: Partial<UserAttributes>): Promise<any> {
    // Check if user exists
    const existingUser = await userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // If password is being updated, hash it
    if (userData.user_password) {
      userData.user_password = await bcrypt.hash(userData.user_password, 10);
    }

    // Update user
    await userRepository.update(id, userData);
    
    // Fetch updated user
    const updatedUser = await userRepository.findById(id);
    if (!updatedUser) {
      throw new Error('Failed to fetch updated user');
    }

    const { user_password, ...userWithoutPassword } = updatedUser.toJSON();
    return userWithoutPassword;
  }

  // Delete user (soft delete)
  async deleteUser(id: number): Promise<void> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.softDelete(id);
  }

  // Get users by role
  async getUsersByRole(roleId: number): Promise<any[]> {
    const users = await userRepository.findByRole(roleId);
    
    return users.map(user => {
      const { user_password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  }
}

export default new UserService();
