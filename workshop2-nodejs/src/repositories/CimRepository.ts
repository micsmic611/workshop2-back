import Cim, { CimCreationAttributes, CimAttributes } from '../models/Cim';

export class CimRepository {
  // Create new cim record
  async create(cimData: CimCreationAttributes): Promise<Cim> {
    return await Cim.create(cimData);
  }

  // Find cim by ID
  async findById(id: number): Promise<Cim | null> {
    return await Cim.findByPk(id);
  }

  // Get all cim records
  async findAll(): Promise<Cim[]> {
    return await Cim.findAll();
  }

  // Update cim
  async update(id: number, cimData: Partial<CimAttributes>): Promise<[number, Cim[]]> {
    return await Cim.update(cimData, {
      where: { cim_id: id },
      returning: true
    });
  }

  // Delete cim
  async delete(id: number): Promise<number> {
    return await Cim.destroy({ where: { cim_id: id } });
  }
}

export default new CimRepository();
