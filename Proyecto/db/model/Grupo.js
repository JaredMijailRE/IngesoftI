import { DataTypes } from 'sequelize';

export function defineGrupoModel(sequelize) {
  return sequelize.define('Grupo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    objectives: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specific_objectives: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'grupos',
    timestamps: true,
  });
} 