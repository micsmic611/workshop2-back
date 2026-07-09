import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/UserService';
import { getParamAsNumber } from '../utils/paramHelper';

export class UserController {
  // POST /api/users
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await userService.createUser(req.body);
      res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/users/:id
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await userService.getUserById(getParamAsNumber(req.params.id));
      res.status(200).json({ data: user });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/users/:id
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await userService.updateUser(getParamAsNumber(req.params.id), req.body);
      res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/users/:id
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await userService.deleteUser(getParamAsNumber(req.params.id));
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // GET /api/users/role/:roleId
  async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsersByRole(getParamAsNumber(req.params.roleId));
      res.status(200).json({ data: users });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
