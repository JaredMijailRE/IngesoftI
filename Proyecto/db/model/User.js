// models/User.js
import { DataTypes } from 'sequelize';

export function defineUserModel(sequelize) {
  return sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
}
