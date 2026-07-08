import cimRepository from '../repositories/CimRepository';
import { CimCreationAttributes, CimAttributes } from '../models/Cim';

export class CimService {
  // Create new cim record
  async createCim(cimData: CimCreationAttributes): Promise<any> {
    const newCim = await cimRepository.create(cimData);
    return newCim.toJSON();
  }

  // Get all cim records
  async getAllCims(): Promise<any[]> {
    const cims = await cimRepository.findAll();
    return cims.map(c => c.toJSON());
  }

  // Get cim by ID
  async getCimById(id: number): Promise<any> {
    const cim = await cimRepository.findById(id);
    
    if (!cim) {
      throw new Error('Cim record not found');
    }

    return cim.toJSON();
  }

  // Update cim
  async updateCim(id: number, cimData: Partial<CimAttributes>): Promise<any> {
    const existingCim = await cimRepository.findById(id);
    if (!existingCim) {
      throw new Error('Cim record not found');
    }

    await cimRepository.update(id, cimData);
    
    // Fetch updated cim
    const updatedCim = await cimRepository.findById(id);
    if (!updatedCim) {
      throw new Error('Failed to fetch updated cim');
    }
    
    return updatedCim.toJSON();
  }

  // Delete cim
  async deleteCim(id: number): Promise<void> {
    const cim = await cimRepository.findById(id);
    if (!cim) {
      throw new Error('Cim record not found');
    }

    await cimRepository.delete(id);
  }
}

export default new CimService();
