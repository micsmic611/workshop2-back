import companyRepository from '../repositories/CompanyRepository';
import { CompanyCreationAttributes, CompanyAttributes } from '../models/Company';

export class CompanyService {
  // Create new company
  async createCompany(companyData: CompanyCreationAttributes): Promise<any> {
    const newCompany = await companyRepository.create(companyData);
    return newCompany.toJSON();
  }

  // Get all companies
  async getAllCompanies(): Promise<any[]> {
    const companies = await companyRepository.findAll();
    return companies.map(c => c.toJSON());
  }

  // Get company by ID
  async getCompanyById(id: number): Promise<any> {
    const company = await companyRepository.findById(id);
    
    if (!company) {
      throw new Error('Company not found');
    }

    return company.toJSON();
  }

  // Update company
  async updateCompany(id: number, companyData: Partial<CompanyAttributes>): Promise<any> {
    const existingCompany = await companyRepository.findById(id);
    if (!existingCompany) {
      throw new Error('Company not found');
    }

    await companyRepository.update(id, companyData);
    
    // Fetch updated company
    const updatedCompany = await companyRepository.findById(id);
    if (!updatedCompany) {
      throw new Error('Failed to fetch updated company');
    }
    
    return updatedCompany.toJSON();
  }

  // Delete company
  async deleteCompany(id: number): Promise<void> {
    const company = await companyRepository.findById(id);
    if (!company) {
      throw new Error('Company not found');
    }

    await companyRepository.delete(id);
  }
}

export default new CompanyService();
