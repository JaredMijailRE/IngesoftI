import { DataTypes } from 'sequelize';

export function defineEstadisticaEntrenamientoModel(sequelize) {
  return sequelize.define('EstadisticaEntrenamiento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ejercicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    clase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'estadisticas_entrenamiento',
    timestamps: true,
  });
} 