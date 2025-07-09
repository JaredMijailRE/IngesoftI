import { DataTypes } from 'sequelize';

// Tabla de unión PlanEntrenamiento_Ejercicio
export function definePlanEntrenamientoEjercicioModel(sequelize) {
  return sequelize.define('PlanEntrenamientoEjercicio', {
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ejercicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    repetitions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'plan_entrenamiento_ejercicios',
    timestamps: true,
  });
}

// Tabla de unión Grupo_Estudiante
export function defineGrupoEstudianteModel(sequelize) {
  return sequelize.define('GrupoEstudiante', {
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'grupo_estudiantes',
    timestamps: true,
  });
}

// Tabla Asistencia
export function defineAsistenciaModel(sequelize) {
  return sequelize.define('Asistencia', {
    clase_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    attended: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'asistencias',
    timestamps: true,
  });
}

// Tabla de unión Evento_Grupo
export function defineEventoGrupoModel(sequelize) {
  return sequelize.define('EventoGrupo', {
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'evento_grupos',
    timestamps: true,
  });
}

// Tabla de unión Evento_Estudiante
export function defineEventoEstudianteModel(sequelize) {
  return sequelize.define('EventoEstudiante', {
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'evento_estudiantes',
    timestamps: true,
  });
}

// Tabla de unión Profesor_Grupo
export function defineProfesorGrupoModel(sequelize) {
  return sequelize.define('ProfesorGrupo', {
    profesor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'profesor_grupos',
    timestamps: true,
  });
} 