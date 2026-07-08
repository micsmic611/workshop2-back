import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Rental attributes interface
export interface RentalAttributes {
  rental_id: number;
  company_id: number;
  user_id: number;
  date_rental_start: Date;
  date_rental_end?: Date;
  warehouse_id: number;
  rental_status: string;
  description?: string;
}

// Rental creation attributes
export interface RentalCreationAttributes extends Optional<RentalAttributes, 'rental_id'> {}

// Rental model class
class Rental extends Model<RentalAttributes, RentalCreationAttributes> implements RentalAttributes {
  public rental_id!: number;
  public company_id!: number;
  public user_id!: number;
  public date_rental_start!: Date;
  public date_rental_end?: Date;
  public warehouse_id!: number;
  public rental_status!: string;
  public description?: string;
}

// Initialize Rental model
Rental.init(
  {
    rental_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'rental_id'
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
    date_rental_start: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_rental_start'
    },
    date_rental_end: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_rental_end'
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'warehouse_id'
    },
    rental_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'rental_status'
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'description'
    }
  },
  {
    sequelize,
    tableName: 'rental',
    timestamps: false
  }
);

export default Rental;
