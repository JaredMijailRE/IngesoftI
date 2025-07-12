import { DataTypes } from 'sequelize';

export function definePerfilDeportivoModel(sequelize) {
  return sequelize.define('PerfilDeportivo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    body_fat_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    muscle_mass_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'perfiles_deportivos',
    timestamps: true,
  });
} 