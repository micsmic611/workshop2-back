import warehouseRepository from '../repositories/WarehouseRepository';
import rentalRepository from '../repositories/RentalRepository';
import { WarehouseCreationAttributes, WarehouseAttributes } from '../models/Warehouse';

export class WarehouseService {
  // Create new warehouse
  async createWarehouse(warehouseData: WarehouseCreationAttributes): Promise<any> {
    // Set default status to 'Active'
    const newWarehouse = await warehouseRepository.create({
      ...warehouseData,
      warehouse_status: warehouseData.warehouse_status || 'Active'
    });

    return newWarehouse.toJSON();
  }

  // Get all warehouses
  async getAllWarehouses(): Promise<any[]> {
    const warehouses = await warehouseRepository.findAll();
    return warehouses.map(w => w.toJSON());
  }

  // Get warehouse by ID
  async getWarehouseById(id: number): Promise<any> {
    const warehouse = await warehouseRepository.findById(id);
    
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    return warehouse.toJSON();
  }

  // Get warehouse with rental information
  async getWarehouseWithRentalInfo(id: number): Promise<any> {
    const warehouse = await warehouseRepository.findById(id);
    
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    // Get all rentals for this warehouse
    const rentals = await rentalRepository.findByWarehouse(id);

    return {
      ...warehouse.toJSON(),
      rentals: rentals.map(r => r.toJSON())
    };
  }

  // Update warehouse
  async updateWarehouse(id: number, warehouseData: Partial<WarehouseAttributes>): Promise<any> {
    const existingWarehouse = await warehouseRepository.findById(id);
    if (!existingWarehouse) {
      throw new Error('Warehouse not found');
    }

    await warehouseRepository.update(id, warehouseData);
    
    // Fetch updated warehouse
    const updatedWarehouse = await warehouseRepository.findById(id);
    if (!updatedWarehouse) {
      throw new Error('Failed to fetch updated warehouse');
    }
    
    return updatedWarehouse.toJSON();
  }

  // Delete warehouse
  async deleteWarehouse(id: number): Promise<void> {
    const warehouse = await warehouseRepository.findById(id);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    await warehouseRepository.delete(id);
  }

  // Get active warehouses
  async getActiveWarehouses(): Promise<any[]> {
    const warehouses = await warehouseRepository.findActiveWarehouses();
    return warehouses.map(w => w.toJSON());
  }
}

export default new WarehouseService();
