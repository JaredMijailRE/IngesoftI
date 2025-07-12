import { DataTypes } from 'sequelize';

export function defineProfesorModel(sequelize) {
  return sequelize.define('Profesor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: true,
    },
    medical_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'profesores',
    timestamps: true,
  });
} 