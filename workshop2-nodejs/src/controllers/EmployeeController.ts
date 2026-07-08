import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import employeeService from '../services/EmployeeService';

export class EmployeeController {
  // POST /api/employees
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const employee = await employeeService.createEmployee(req.body);
      res.status(201).json({ message: 'Employee created successfully', data: employee });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/employees
  async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await employeeService.getAllEmployees();
      res.status(200).json({ data: employees });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/employees/active
  async getActiveEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await employeeService.getActiveEmployees();
      res.status(200).json({ data: employees });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/employees/:id
  async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const employee = await employeeService.updateEmployee(parseInt(req.params.id), req.body);
      res.status(200).json({ message: 'Employee updated successfully', data: employee });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/employees/:id
  async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await employeeService.deleteEmployee(parseInt(req.params.id));
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new EmployeeController();
