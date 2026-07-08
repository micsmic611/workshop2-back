import Warehouse, { WarehouseCreationAttributes, WarehouseAttributes } from '../models/Warehouse';

export class WarehouseRepository {
  // Create new warehouse
  async create(warehouseData: WarehouseCreationAttributes): Promise<Warehouse> {
    return await Warehouse.create(warehouseData);
  }

  // Find warehouse by ID
  async findById(id: number): Promise<Warehouse | null> {
    return await Warehouse.findByPk(id);
  }

  // Get all warehouses
  async findAll(): Promise<Warehouse[]> {
    return await Warehouse.findAll();
  }

  // Get warehouses by status
  async findByStatus(status: string): Promise<Warehouse[]> {
    return await Warehouse.findAll({ where: { warehouse_status: status } });
  }

  // Get active warehouses
  async findActiveWarehouses(): Promise<Warehouse[]> {
    return await Warehouse.findAll({ where: { warehouse_status: 'Active' } });
  }

  // Update warehouse
  async update(id: number, warehouseData: Partial<WarehouseAttributes>): Promise<[number, Warehouse[]]> {
    return await Warehouse.update(warehouseData, {
      where: { warehouse_id: id },
      returning: true
    });
  }

  // Delete warehouse
  async delete(id: number): Promise<number> {
    return await Warehouse.destroy({ where: { warehouse_id: id } });
  }

  // Check if warehouse exists
  async exists(id: number): Promise<boolean> {
    const count = await Warehouse.count({ where: { warehouse_id: id } });
    return count > 0;
  }
}

export default new WarehouseRepository();
