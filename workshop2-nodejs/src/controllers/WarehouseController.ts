import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import warehouseService from '../services/WarehouseService';
import { getParamAsNumber } from '../utils/paramHelper';

export class WarehouseController {
  // POST /api/warehouses
  async createWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const warehouse = await warehouseService.createWarehouse(req.body);
      res.status(201).json({ message: 'Warehouse created successfully', data: warehouse });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/warehouses
  async getAllWarehouses(req: Request, res: Response): Promise<void> {
    try {
      const warehouses = await warehouseService.getAllWarehouses();
      res.status(200).json({ data: warehouses });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/warehouses/:id
  async getWarehouseById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const warehouse = await warehouseService.getWarehouseById(getParamAsNumber(req.params.id));
      res.status(200).json({ data: warehouse });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // GET /api/warehouses/:id/rentals
  async getWarehouseWithRentals(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const warehouse = await warehouseService.getWarehouseWithRentalInfo(getParamAsNumber(req.params.id));
      res.status(200).json({ data: warehouse });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/warehouses/:id
  async updateWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const warehouse = await warehouseService.updateWarehouse(getParamAsNumber(req.params.id), req.body);
      res.status(200).json({ message: 'Warehouse updated successfully', data: warehouse });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/warehouses/:id
  async deleteWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await warehouseService.deleteWarehouse(getParamAsNumber(req.params.id));
      res.status(200).json({ message: 'Warehouse deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // GET /api/warehouses/active
  async getActiveWarehouses(req: Request, res: Response): Promise<void> {
    try {
      const warehouses = await warehouseService.getActiveWarehouses();
      res.status(200).json({ data: warehouses });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new WarehouseController();
