import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Company attributes interface
export interface CompanyAttributes {
  company_id: number;
  company_name?: string;
  company_firstname?: string;
  company_lastname?: string;
  company_email?: string;
  company_phone?: string;
  company_address?: string;
}

// Company creation attributes
export interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'company_id'> {}

// Company model class
class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public company_id!: number;
  public company_name?: string;
  public company_firstname?: string;
  public company_lastname?: string;
  public company_email?: string;
  public company_phone?: string;
  public company_address?: string;
}

// Initialize Company model
Company.init(
  {
    company_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'company_id'
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'company_name'
    },
    company_firstname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'company_firstname'
    },
    company_lastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'company_lastname'
    },
    company_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'company_email'
    },
    company_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'company_phone'
    },
    company_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'company_address'
    }
  },
  {
    sequelize,
    tableName: 'company',
    timestamps: false
  }
);

export default Company;
