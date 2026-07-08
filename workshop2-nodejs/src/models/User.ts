import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// User attributes interface
export interface UserAttributes {
  user_id: number;
  user_name: string;
  user_password: string;
  user_firstname: string;
  user_lastname: string;
  user_email?: string;
  user_phone?: string;
  user_address?: string;
  role_id?: number;
  user_status?: string;
}

// User creation attributes (user_id is auto-generated)
export interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

// User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public user_name!: string;
  public user_password!: string;
  public user_firstname!: string;
  public user_lastname!: string;
  public user_email?: string;
  public user_phone?: string;
  public user_address?: string;
  public role_id?: number;
  public user_status?: string;
}

// Initialize User model
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id'
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'user_name'
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'user_password'
    },
    user_firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'user_firstname'
    },
    user_lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'user_lastname'
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_email'
    },
    user_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'user_phone'
    },
    user_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user_address'
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'role_id'
    },
    user_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '1',
      field: 'user_status'
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false
  }
);

export default User;
