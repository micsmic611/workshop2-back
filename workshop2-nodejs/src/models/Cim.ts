import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Cim attributes interface
export interface CimAttributes {
  cim_id: number;
  cim?: string;
}

// Cim creation attributes
export interface CimCreationAttributes extends Optional<CimAttributes, 'cim_id'> {}

// Cim model class
class Cim extends Model<CimAttributes, CimCreationAttributes> implements CimAttributes {
  public cim_id!: number;
  public cim?: string;
}

// Initialize Cim model
Cim.init(
  {
    cim_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'cim_id'
    },
    cim: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'cim'
    }
  },
  {
    sequelize,
    tableName: 'number1',
    timestamps: false
  }
);

export default Cim;
