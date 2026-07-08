import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import companyService from '../services/CompanyService';

export class CompanyController {
  // POST /api/companies
  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const company = await companyService.createCompany(req.body);
      res.status(201).json({ message: 'Company created successfully', data: company });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/companies
  async getAllCompanies(req: Request, res: Response): Promise<void> {
    try {
      const companies = await companyService.getAllCompanies();
      res.status(200).json({ data: companies });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/companies/:id
  async getCompanyById(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const company = await companyService.getCompanyById(parseInt(req.params.id));
      res.status(200).json({ data: company });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // PUT /api/companies/:id
  async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const company = await companyService.updateCompany(parseInt(req.params.id), req.body);
      res.status(200).json({ message: 'Company updated successfully', data: company });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE /api/companies/:id
  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await companyService.deleteCompany(parseInt(req.params.id));
      res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new CompanyController();
