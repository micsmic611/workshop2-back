import User, { UserCreationAttributes, UserAttributes } from '../models/User';

export class UserRepository {
  // Create new user
  async create(userData: UserCreationAttributes): Promise<User> {
    return await User.create(userData);
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  // Find user by username
  async findByUsername(username: string): Promise<User | null> {
    return await User.findOne({ where: { user_name: username } });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { user_email: email } });
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  // Get users by role
  async findByRole(roleId: number): Promise<User[]> {
    return await User.findAll({ where: { role_id: roleId } });
  }

  // Get active users only (status = '1')
  async findActiveUsers(): Promise<User[]> {
    return await User.findAll({ where: { user_status: '1' } });
  }

  // Update user
  async update(id: number, userData: Partial<UserAttributes>): Promise<[number, User[]]> {
    return await User.update(userData, {
      where: { user_id: id },
      returning: true
    });
  }

  // Delete user (soft delete by setting status to '0')
  async softDelete(id: number): Promise<number> {
    const [affectedCount] = await User.update(
      { user_status: '0' },
      { where: { user_id: id } }
    );
    return affectedCount;
  }

  // Hard delete user
  async delete(id: number): Promise<number> {
    return await User.destroy({ where: { user_id: id } });
  }

  // Check if username exists
  async usernameExists(username: string): Promise<boolean> {
    const count = await User.count({ where: { user_name: username } });
    return count > 0;
  }

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const count = await User.count({ where: { user_email: email } });
    return count > 0;
  }
}

export default new UserRepository();
