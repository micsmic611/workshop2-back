import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Role attributes interface
export interface RoleAttributes {
  role_id: number;
  role_name: string;
}

// Role creation attributes
export interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id'> {}

// Role model class
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public role_id!: number;
  public role_name!: string;
}

// Initialize Role model
Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'role_id'
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'role_name'
    }
  },
  {
    sequelize,
    tableName: 'role',
    timestamps: false
  }
);

export default Role;
