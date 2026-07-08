import { Router } from 'express';
import employeeController from '../controllers/EmployeeController';
import { authenticate } from '../middlewares/auth';
import { validateEmployee, validateUserId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All employee routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateEmployee, asyncHandler(employeeController.createEmployee.bind(employeeController)));
router.get('/', asyncHandler(employeeController.getAllEmployees.bind(employeeController)));
router.get('/active', asyncHandler(employeeController.getActiveEmployees.bind(employeeController)));
router.put('/:id', validateUserId, asyncHandler(employeeController.updateEmployee.bind(employeeController)));
router.delete('/:id', validateUserId, asyncHandler(employeeController.deleteEmployee.bind(employeeController)));

export default router;
