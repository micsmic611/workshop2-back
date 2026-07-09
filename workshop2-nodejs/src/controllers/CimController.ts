import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import cimService from '../services/CimService';
import { getParamAsNumber } from '../utils/paramHelper';

export class CimController {
  // POST /api/cim
  async createCim(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const cim = await cimService.createCim(req.body);
      res.status(201).json({ message: 'CIM record created successfully', data: cim });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/cim
  async getAllCims(req: Request, res: Response): Promise<void> {
    try {
      const cims = await cimService.getAllCims();
      res.status(200).json({ data: cims });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/cim/:id
  async getCimById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const cim = await cimService.getCimById(getParamAsNumber(req.params.id));
      res.status(200).json({ data: cim });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/cim/:id
  async updateCim(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const cim = await cimService.updateCim(getParamAsNumber(req.params.id), req.body);
      res.status(200).json({ message: 'CIM record updated successfully', data: cim });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/cim/:id
  async deleteCim(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await cimService.deleteCim(getParamAsNumber(req.params.id));
      res.status(200).json({ message: 'CIM record deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new CimController();
