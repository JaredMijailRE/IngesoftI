import { DataTypes } from 'sequelize';

export function defineEstudianteModel(sequelize) {
  return sequelize.define('Estudiante', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // No autoIncrement ya que el ID es el documento de identidad
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
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    body_fat_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    muscle_mass_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  }, {
    tableName: 'estudiantes',
    timestamps: true,
  });
} 