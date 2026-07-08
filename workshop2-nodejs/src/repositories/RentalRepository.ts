import Rental, { RentalCreationAttributes, RentalAttributes } from '../models/Rental';
import CancelRental, { CancelRentalCreationAttributes } from '../models/CancelRental';
import sequelize from '../config/database';
import { Transaction } from 'sequelize';

export class RentalRepository {
  // Create new rental
  async create(rentalData: RentalCreationAttributes): Promise<Rental> {
    return await Rental.create(rentalData);
  }

  // Find rental by ID
  async findById(id: number): Promise<Rental | null> {
    return await Rental.findByPk(id);
  }

  // Get all rentals
  async findAll(): Promise<Rental[]> {
    return await Rental.findAll();
  }

  // Get rentals by company
  async findByCompany(companyId: number): Promise<Rental[]> {
    return await Rental.findAll({ where: { company_id: companyId } });
  }

  // Get rentals by warehouse
  async findByWarehouse(warehouseId: number): Promise<Rental[]> {
    return await Rental.findAll({ where: { warehouse_id: warehouseId } });
  }

  // Get rentals by status
  async findByStatus(status: string): Promise<Rental[]> {
    return await Rental.findAll({ where: { rental_status: status } });
  }

  // Update rental
  async update(id: number, rentalData: Partial<RentalAttributes>): Promise<[number, Rental[]]> {
    return await Rental.update(rentalData, {
      where: { rental_id: id },
      returning: true
    });
  }

  // Delete rental
  async delete(id: number): Promise<number> {
    return await Rental.destroy({ where: { rental_id: id } });
  }

  // Cancel rental (atomic operation with transaction)
  async cancelRental(
    rentalId: number,
    cancelData: CancelRentalCreationAttributes
  ): Promise<{ rental: Rental; cancelRecord: CancelRental }> {
    const transaction: Transaction = await sequelize.transaction();

    try {
      // Update rental status
      await Rental.update(
        { rental_status: 'Cancelled' },
        {
          where: { rental_id: rentalId },
          transaction
        }
      );
      
      // Fetch updated rental
      const rental = await Rental.findByPk(rentalId, { transaction });
      if (!rental) {
        throw new Error('Rental not found after update');
      }

      // Create cancel rental record
      const cancelRecord = await CancelRental.create(cancelData, { transaction });

      // Commit transaction
      await transaction.commit();

      return { rental, cancelRecord };
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      throw error;
    }
  }

  // Check if rental exists
  async exists(id: number): Promise<boolean> {
    const count = await Rental.count({ where: { rental_id: id } });
    return count > 0;
  }
}

export default new RentalRepository();
