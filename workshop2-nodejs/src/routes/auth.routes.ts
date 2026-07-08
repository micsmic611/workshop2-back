import { Router } from 'express';
import authController from '../controllers/AuthController';
import { authenticate } from '../middlewares/auth';
import { validateRegister, validateLogin } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// Public routes
router.post('/register', validateRegister, asyncHandler(authController.register.bind(authController)));
router.post('/login', validateLogin, asyncHandler(authController.login.bind(authController)));
router.post('/logout', asyncHandler(authController.logout.bind(authController)));
router.post('/reset-password', asyncHandler(authController.resetPassword.bind(authController)));

// Protected routes
router.get('/user', authenticate, asyncHandler(authController.getUser.bind(authController)));

export default router;
