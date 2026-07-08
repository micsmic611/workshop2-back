import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import warehouseRoutes from './warehouse.routes';
import companyRoutes from './company.routes';
import rentalRoutes from './rental.routes';
import employeeRoutes from './employee.routes';
import cimRoutes from './cim.routes';

const router = Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/companies', companyRoutes);
router.use('/rentals', rentalRoutes);
router.use('/employees', employeeRoutes);
router.use('/cim', cimRoutes);

export default router;
