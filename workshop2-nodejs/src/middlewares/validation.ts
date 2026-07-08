import { body, param, ValidationChain } from 'express-validator';

// User validation
export const validateRegister: ValidationChain[] = [
  body('user_name').notEmpty().withMessage('Username is required'),
  body('user_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('user_firstname').notEmpty().withMessage('First name is required'),
  body('user_lastname').notEmpty().withMessage('Last name is required'),
  body('user_email').optional().isEmail().withMessage('Invalid email format'),
  body('user_phone').optional().isMobilePhone('any').withMessage('Invalid phone number')
];

export const validateLogin: ValidationChain[] = [
  body('user_name').notEmpty().withMessage('Username is required'),
  body('user_password').notEmpty().withMessage('Password is required')
];

export const validateUserId: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID')
];

// Warehouse validation
export const validateWarehouse: ValidationChain[] = [
  body('warehouse_name').optional().isString().withMessage('Warehouse name must be a string'),
  body('warehouse_address').optional().isString().withMessage('Address must be a string'),
  body('warehouse_size').optional().isDecimal().withMessage('Size must be a decimal number'),
  body('warehouse_status').optional().isString().withMessage('Status must be a string')
];

export const validateWarehouseId: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Invalid warehouse ID')
];

// Company validation
export const validateCompany: ValidationChain[] = [
  body('company_name').optional().isString().withMessage('Company name must be a string'),
  body('company_firstname').optional().isString().withMessage('First name must be a string'),
  body('company_lastname').optional().isString().withMessage('Last name must be a string'),
  body('company_email').optional().isEmail().withMessage('Invalid email format'),
  body('company_phone').optional().isMobilePhone('any').withMessage('Invalid phone number')
];

export const validateCompanyId: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Invalid company ID')
];

// Rental validation
export const validateRental: ValidationChain[] = [
  body('company_id').isInt({ min: 1 }).withMessage('Valid company ID is required'),
  body('user_id').isInt({ min: 1 }).withMessage('Valid user ID is required'),
  body('warehouse_id').isInt({ min: 1 }).withMessage('Valid warehouse ID is required'),
  body('date_rental_start').isISO8601().withMessage('Valid start date is required'),
  body('date_rental_end').optional().isISO8601().withMessage('Invalid end date format'),
  body('rental_status').notEmpty().withMessage('Rental status is required')
];

export const validateRentalId: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Invalid rental ID')
];

// Employee validation
export const validateEmployee: ValidationChain[] = [
  body('user_name').notEmpty().withMessage('Username is required'),
  body('user_firstname').notEmpty().withMessage('First name is required'),
  body('user_lastname').notEmpty().withMessage('Last name is required'),
  body('user_email').optional().isEmail().withMessage('Invalid email format'),
  body('user_phone').optional().isMobilePhone('any').withMessage('Invalid phone number')
];

// Cim validation
export const validateCim: ValidationChain[] = [
  body('cim').optional().isString().withMessage('Cim must be a string')
];

export const validateCimId: ValidationChain[] = [
  param('id').isInt({ min: 1 }).withMessage('Invalid CIM ID')
];

export default {
  validateRegister,
  validateLogin,
  validateUserId,
  validateWarehouse,
  validateWarehouseId,
  validateCompany,
  validateCompanyId,
  validateRental,
  validateRentalId,
  validateEmployee,
  validateCim,
  validateCimId
};
