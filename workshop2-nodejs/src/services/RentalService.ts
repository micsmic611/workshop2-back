import rentalRepository from '../repositories/RentalRepository';
import warehouseRepository from '../repositories/WarehouseRepository';
import companyRepository from '../repositories/CompanyRepository';
import userRepository from '../repositories/UserRepository';
import { RentalCreationAttributes, RentalAttributes } from '../models/Rental';

export class RentalService {
  // Create new rental
  async createRental(rentalData: RentalCreationAttributes): Promise<any> {
    // Validate warehouse exists
    if (!await warehouseRepository.exists(rentalData.warehouse_id)) {
      throw new Error('Warehouse not found');
    }

    // Validate company exists
    if (!await companyRepository.exists(rentalData.company_id)) {
      throw new Error('Company not found');
    }

    // Validate user exists
    if (!await userRepository.findById(rentalData.user_id)) {
      throw new Error('User not found');
    }

    const newRental = await rentalRepository.create(rentalData);
    return newRental.toJSON();
  }

  // Get all rentals
  async getAllRentals(): Promise<any[]> {
    const rentals = await rentalRepository.findAll();
    return rentals.map(r => r.toJSON());
  }

  // Get rental by ID
  async getRentalById(id: number): Promise<any> {
    const rental = await rentalRepository.findById(id);
    
    if (!rental) {
      throw new Error('Rental not found');
    }

    return rental.toJSON();
  }

  // Update rental
  async updateRental(id: number, rentalData: Partial<RentalAttributes>): Promise<any> {
    const existingRental = await rentalRepository.findById(id);
    if (!existingRental) {
      throw new Error('Rental not found');
    }

    await rentalRepository.update(id, rentalData);
    
    // Fetch updated rental
    const updatedRental = await rentalRepository.findById(id);
    if (!updatedRental) {
      throw new Error('Failed to fetch updated rental');
    }
    
    return updatedRental.toJSON();
  }

  // Cancel rental
  async cancelRental(rentalId: number, userId: number, description?: string): Promise<any> {
    const rental = await rentalRepository.findById(rentalId);
    
    if (!rental) {
      throw new Error('Rental not found');
    }

    // Perform atomic cancellation operation
    const result = await rentalRepository.cancelRental(rentalId, {
      company_id: rental.company_id,
      user_id: userId,
      warehouse_id: rental.warehouse_id,
      date_cancel_rental: new Date(),
      description: description || 'Rental cancelled'
    });

    return {
      rental: result.rental.toJSON(),
      cancelRecord: result.cancelRecord.toJSON()
    };
  }

  // Get rentals by company
  async getRentalsByCompany(companyId: number): Promise<any[]> {
    const rentals = await rentalRepository.findByCompany(companyId);
    return rentals.map(r => r.toJSON());
  }
}

export default new RentalService();
