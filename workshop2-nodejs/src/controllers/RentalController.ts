import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import rentalService from '../services/RentalService';
import { getParamAsNumber } from '../utils/paramHelper';

export class RentalController {
  // POST /api/rentals
  async createRental(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const rental = await rentalService.createRental(req.body);
      res.status(201).json({ message: 'Rental created successfully', data: rental });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/rentals
  async getAllRentals(req: Request, res: Response): Promise<void> {
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json({ data: rentals });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/rentals/:id
  async getRentalById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const rental = await rentalService.getRentalById(getParamAsNumber(req.params.id));
      res.status(200).json({ data: rental });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/rentals/:id
  async updateRental(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const rental = await rentalService.updateRental(getParamAsNumber(req.params.id), req.body);
      res.status(200).json({ message: 'Rental updated successfully', data: rental });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /api/rentals/:id/cancel
  async cancelRental(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { description } = req.body;
      const result = await rentalService.cancelRental(
        getParamAsNumber(req.params.id),
        req.user.userId,
        description
      );
      
      res.status(200).json({ 
        message: 'Rental cancelled successfully', 
        data: result 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/rentals/company/:companyId
  async getRentalsByCompany(req: Request, res: Response): Promise<void> {
    try {
      const rentals = await rentalService.getRentalsByCompany(getParamAsNumber(req.params.companyId));
      res.status(200).json({ data: rentals });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new RentalController();
