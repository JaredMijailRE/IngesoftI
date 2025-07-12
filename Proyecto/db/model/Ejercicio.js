import { DataTypes } from 'sequelize';

export function defineEjercicioModel(sequelize) {
  return sequelize.define('Ejercicio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM('repeticiones', 'distancia', 'tiempo', 'peso'),
      allowNull: false,
    },
    impact_area: {
      type: DataTypes.ENUM('Tronco Inferior', 'Tronco Superior', 'Tronco Medio', 'Cuerpo Completo'),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('Fuerza', 'Resistencia', 'Elasticidad', 'Tonificación'),
      allowNull: true,
    },
    exigency: {
      type: DataTypes.ENUM('Baja', 'Media', 'Alta'),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'ejercicios',
    timestamps: true,
  });
} 