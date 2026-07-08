import { Router } from 'express';
import companyController from '../controllers/CompanyController';
import { authenticate } from '../middlewares/auth';
import { validateCompany, validateCompanyId } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// All company routes require authentication
router.use(authenticate);

// CRUD operations
router.post('/', validateCompany, asyncHandler(companyController.createCompany.bind(companyController)));
router.get('/', asyncHandler(companyController.getAllCompanies.bind(companyController)));
router.get('/:id', validateCompanyId, asyncHandler(companyController.getCompanyById.bind(companyController)));
router.put('/:id', validateCompanyId, validateCompany, asyncHandler(companyController.updateCompany.bind(companyController)));
router.delete('/:id', validateCompanyId, asyncHandler(companyController.deleteCompany.bind(companyController)));

export default router;
