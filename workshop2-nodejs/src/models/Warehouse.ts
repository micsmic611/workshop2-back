import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Warehouse attributes interface
export interface WarehouseAttributes {
  warehouse_id: number;
  warehouse_address?: string;
  warehouse_name?: string;
  warehouse_size?: number;
  warehouse_status?: string;
}

// Warehouse creation attributes
export interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, 'warehouse_id'> {}

// Warehouse model class
class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  public warehouse_id!: number;
  public warehouse_address?: string;
  public warehouse_name?: string;
  public warehouse_size?: number;
  public warehouse_status?: string;
}

// Initialize Warehouse model
Warehouse.init(
  {
    warehouse_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'warehouse_id'
    },
    warehouse_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'warehouse_address'
    },
    warehouse_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'warehouse_name'
    },
    warehouse_size: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'warehouse_size'
    },
    warehouse_status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: 'Active',
      field: 'warehouse_status'
    }
  },
  {
    sequelize,
    tableName: 'warehouse',
    timestamps: false
  }
);

export default Warehouse;
