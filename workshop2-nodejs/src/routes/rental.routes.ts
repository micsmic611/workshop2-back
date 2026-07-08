import { Router } from 'express';
import rentalController from '../controllers/RentalController';
import { authenticate } from '../middlewares/auth';
import { validateRental, validateRentalId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All rental routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateRental, asyncHandler(rentalController.createRental.bind(rentalController)));
router.get('/', asyncHandler(rentalController.getAllRentals.bind(rentalController)));
router.get('/company/:companyId', asyncHandler(rentalController.getRentalsByCompany.bind(rentalController)));
router.get('/:id', validateRentalId, asyncHandler(rentalController.getRentalById.bind(rentalController)));
router.put('/:id', validateRentalId, asyncHandler(rentalController.updateRental.bind(rentalController)));
router.post('/:id/cancel', validateRentalId, asyncHandler(rentalController.cancelRental.bind(rentalController)));

export default router;
