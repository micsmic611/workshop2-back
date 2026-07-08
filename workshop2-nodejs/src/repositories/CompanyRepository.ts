import Company, { CompanyCreationAttributes, CompanyAttributes } from '../models/Company';

export class CompanyRepository {
  // Create new company
  async create(companyData: CompanyCreationAttributes): Promise<Company> {
    return await Company.create(companyData);
  }

  // Find company by ID
  async findById(id: number): Promise<Company | null> {
    return await Company.findByPk(id);
  }

  // Get all companies
  async findAll(): Promise<Company[]> {
    return await Company.findAll();
  }

  // Find company by name
  async findByName(name: string): Promise<Company | null> {
    return await Company.findOne({ where: { company_name: name } });
  }

  // Update company
  async update(id: number, companyData: Partial<CompanyAttributes>): Promise<[number, Company[]]> {
    return await Company.update(companyData, {
      where: { company_id: id },
      returning: true
    });
  }

  // Delete company
  async delete(id: number): Promise<number> {
    return await Company.destroy({ where: { company_id: id } });
  }

  // Check if company exists
  async exists(id: number): Promise<boolean> {
    const count = await Company.count({ where: { company_id: id } });
    return count > 0;
  }
}

export default new CompanyRepository();
