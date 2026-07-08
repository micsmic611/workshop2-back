import { Router } from 'express';
import userController from '../controllers/UserController';
import { authenticate, authorize } from '../middlewares/auth';
import { validateRegister, validateUserId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateRegister, asyncHandler(userController.createUser.bind(userController)));
router.get('/', asyncHandler(userController.getAllUsers.bind(userController)));
router.get('/role/:roleId', asyncHandler(userController.getUsersByRole.bind(userController)));
router.get('/:id', validateUserId, asyncHandler(userController.getUserById.bind(userController)));
router.put('/:id', validateUserId, asyncHandler(userController.updateUser.bind(userController)));
router.delete('/:id', validateUserId, asyncHandler(userController.deleteUser.bind(userController)));

export default router;
