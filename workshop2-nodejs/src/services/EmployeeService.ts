import bcrypt from 'bcryptjs';
import userRepository from '../repositories/UserRepository';
import { UserCreationAttributes } from '../models/User';

export class EmployeeService {
  // Create new employee (role_id = 1)
  async createEmployee(employeeData: UserCreationAttributes): Promise<any> {
    // Check if username exists
    if (await userRepository.usernameExists(employeeData.user_name)) {
      throw new Error('Username already exists');
    }

    // Business rule: Employee password = bcrypt(firstname)
    const password = employeeData.user_firstname;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee with role_id = 1
    const newEmployee = await userRepository.create({
      ...employeeData,
      user_password: hashedPassword,
      role_id: 1,
      user_status: employeeData.user_status || '1'
    });

    // Remove password from response
    const { user_password, ...employeeWithoutPassword } = newEmployee.toJSON();
    return employeeWithoutPassword;
  }

  // Get all employees (role_id = 1)
  async getAllEmployees(): Promise<any[]> {
    const employees = await userRepository.findByRole(1);
    
    return employees.map(emp => {
      const { user_password, ...empWithoutPassword } = emp.toJSON();
      return empWithoutPassword;
    });
  }

  // Get active employees only
  async getActiveEmployees(): Promise<any[]> {
    const allEmployees = await userRepository.findByRole(1);
    const activeEmployees = allEmployees.filter(emp => emp.user_status === '1');
    
    return activeEmployees.map(emp => {
      const { user_password, ...empWithoutPassword } = emp.toJSON();
      return empWithoutPassword;
    });
  }

  // Update employee
  async updateEmployee(id: number, employeeData: Partial<UserCreationAttributes>): Promise<any> {
    const employee = await userRepository.findById(id);
    
    if (!employee || employee.role_id !== 1) {
      throw new Error('Employee not found');
    }

    // If firstname is updated, update password too (business rule)
    if (employeeData.user_firstname && employeeData.user_firstname !== employee.user_firstname) {
      const newPassword = await bcrypt.hash(employeeData.user_firstname, 10);
      employeeData.user_password = newPassword;
    }

    await userRepository.update(id, employeeData);
    
    // Fetch updated employee
    const updatedEmployee = await userRepository.findById(id);
    if (!updatedEmployee) {
      throw new Error('Failed to fetch updated employee');
    }
    
    const { user_password, ...empWithoutPassword } = updatedEmployee.toJSON();
    return empWithoutPassword;
  }

  // Delete employee (soft delete)
  async deleteEmployee(id: number): Promise<void> {
    const employee = await userRepository.findById(id);
    
    if (!employee || employee.role_id !== 1) {
      throw new Error('Employee not found');
    }

    await userRepository.softDelete(id);
  }
}

export default new EmployeeService();
