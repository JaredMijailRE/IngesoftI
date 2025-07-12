import { DataTypes } from 'sequelize';

export function defineClaseModel(sequelize) {
  return sequelize.define('Clase', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    class_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    recurrence_rule: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'clases',
    timestamps: true,
  });
} 