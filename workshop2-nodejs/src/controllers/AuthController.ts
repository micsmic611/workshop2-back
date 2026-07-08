import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/AuthService';

export class AuthController {
  // POST /api/auth/register
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = await authService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /api/auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { user_name, user_password } = req.body;
      const result = await authService.login(user_name, user_password);
      
      res.status(200).json({
        message: 'Login successful',
        token: result.token,
        user: result.user
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  // GET /api/auth/user (requires authentication)
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await authService.getUserById(req.user.userId);
      res.status(200).json({ data: user });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // POST /api/auth/logout
  async logout(req: Request, res: Response): Promise<void> {
    // In JWT-based auth, logout is handled client-side by removing the token
    res.status(200).json({ message: 'Logout successful' });
  }

  // POST /api/auth/reset-password
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { username, newPassword } = req.body;
      
      if (!username || !newPassword) {
        res.status(400).json({ error: 'Username and new password are required' });
        return;
      }

      await authService.resetPassword(username, newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
