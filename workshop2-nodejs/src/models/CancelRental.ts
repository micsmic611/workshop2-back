import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// CancelRental attributes interface
export interface CancelRentalAttributes {
  cancel_id: number;
  company_id: number;
  user_id: number;
  date_cancel_rental?: Date;
  description?: string;
  warehouse_id: number;
}

// CancelRental creation attributes
export interface CancelRentalCreationAttributes extends Optional<CancelRentalAttributes, 'cancel_id'> {}

// CancelRental model class
class CancelRental extends Model<CancelRentalAttributes, CancelRentalCreationAttributes> implements CancelRentalAttributes {
  public cancel_id!: number;
  public company_id!: number;
  public user_id!: number;
  public date_cancel_rental?: Date;
  public description?: string;
  public warehouse_id!: number;
}

// Initialize CancelRental model
CancelRental.init(
  {
    cancel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'cancel_id'
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    date_cancel_rental: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_cancel_rental'
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'description'
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'warehouse_id'
    }
  },
  {
    sequelize,
    tableName: 'cancel_rental',
    timestamps: false
  }
);

export default CancelRental;
