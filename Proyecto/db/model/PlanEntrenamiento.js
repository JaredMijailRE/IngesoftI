import { DataTypes } from 'sequelize';

export function definePlanEntrenamientoModel(sequelize) {
  return sequelize.define('PlanEntrenamiento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('Técnica', 'Velocidad', 'Resistencia', 'Fuerza'),
      allowNull: false,
    },
  }, {
    tableName: 'planes_entrenamiento',
    timestamps: true,
  });
} 