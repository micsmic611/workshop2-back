import { Router } from 'express';
import warehouseController from '../controllers/WarehouseController';
import { authenticate } from '../middlewares/auth';
import { validateWarehouse, validateWarehouseId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All warehouse routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateWarehouse, asyncHandler(warehouseController.createWarehouse.bind(warehouseController)));
router.get('/', asyncHandler(warehouseController.getAllWarehouses.bind(warehouseController)));
router.get('/active', asyncHandler(warehouseController.getActiveWarehouses.bind(warehouseController)));
router.get('/:id', validateWarehouseId, asyncHandler(warehouseController.getWarehouseById.bind(warehouseController)));
router.get('/:id/rentals', validateWarehouseId, asyncHandler(warehouseController.getWarehouseWithRentals.bind(warehouseController)));
router.put('/:id', validateWarehouseId, validateWarehouse, asyncHandler(warehouseController.updateWarehouse.bind(warehouseController)));
router.delete('/:id', validateWarehouseId, asyncHandler(warehouseController.deleteWarehouse.bind(warehouseController)));

export default router;
