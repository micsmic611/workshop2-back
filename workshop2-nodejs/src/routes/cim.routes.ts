import { Router } from 'express';
import cimController from '../controllers/CimController';
import { authenticate } from '../middlewares/auth';
import { validateCim, validateCimId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All CIM routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateCim, asyncHandler(cimController.createCim.bind(cimController)));
router.get('/', asyncHandler(cimController.getAllCims.bind(cimController)));
router.get('/:id', validateCimId, asyncHandler(cimController.getCimById.bind(cimController)));
router.put('/:id', validateCimId, validateCim, asyncHandler(cimController.updateCim.bind(cimController)));
router.delete('/:id', validateCimId, asyncHandler(cimController.deleteCim.bind(cimController)));

export default router;
