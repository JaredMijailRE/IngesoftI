import { Sequelize } from 'sequelize';
import { defineProfesorModel } from './model/Profesor.js';
import { definePerfilDeportivoModel } from './model/PerfilDeportivo.js';
import { defineEstudianteModel } from './model/Estudiante.js';
import { definePlanEntrenamientoModel } from './model/PlanEntrenamiento.js';
import { defineEjercicioModel } from './model/Ejercicio.js';
import { defineGrupoModel } from './model/Grupo.js';
import { defineClaseModel } from './model/Clase.js';
import { defineEventoModel } from './model/Evento.js';
import { defineEstadisticaEntrenamientoModel } from './model/EstadisticaEntrenamiento.js';
import { defineEstadisticaPersonalModel } from './model/EstadisticaPersonal.js';
import {
  definePlanEntrenamientoEjercicioModel,
  defineGrupoEstudianteModel,
  defineAsistenciaModel,
  defineEventoGrupoModel,
  defineEventoEstudianteModel,
  defineProfesorGrupoModel
} from './model/associations.js';

export async function initializeDatabase(config) {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config?.storage || './database.sqlite',
    logging: false,
  });

  try {
    // Probar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente.');

    // Definir modelos
    const Profesor = defineProfesorModel(sequelize);
    const PerfilDeportivo = definePerfilDeportivoModel(sequelize);
    const Estudiante = defineEstudianteModel(sequelize);
    const PlanEntrenamiento = definePlanEntrenamientoModel(sequelize);
    const Ejercicio = defineEjercicioModel(sequelize);
    const Grupo = defineGrupoModel(sequelize);
    const Clase = defineClaseModel(sequelize);
    const Evento = defineEventoModel(sequelize);
    const EstadisticaEntrenamiento = defineEstadisticaEntrenamientoModel(sequelize);
    const EstadisticaPersonal = defineEstadisticaPersonalModel(sequelize);
    
    // Modelos de asociación
    const PlanEntrenamientoEjercicio = definePlanEntrenamientoEjercicioModel(sequelize);
    const GrupoEstudiante = defineGrupoEstudianteModel(sequelize);
    const Asistencia = defineAsistenciaModel(sequelize);
    const EventoGrupo = defineEventoGrupoModel(sequelize);
    const EventoEstudiante = defineEventoEstudianteModel(sequelize);
    const ProfesorGrupo = defineProfesorGrupoModel(sequelize);

    // Definir relaciones
    setupAssociations({
      Profesor,
      PerfilDeportivo,
      Estudiante,
      PlanEntrenamiento,
      Ejercicio,
      Grupo,
      Clase,
      Evento,
      EstadisticaEntrenamiento,
      EstadisticaPersonal,
      PlanEntrenamientoEjercicio,
      GrupoEstudiante,
      Asistencia,
      EventoGrupo,
      EventoEstudiante,
      ProfesorGrupo
    });

    // Sincronizar base de datos (crear tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada correctamente.');
    
    return { sequelize, models: {
      Profesor,
      PerfilDeportivo,
      Estudiante,
      PlanEntrenamiento,
      Ejercicio,
      Grupo,
      Clase,
      Evento,
      EstadisticaEntrenamiento,
      EstadisticaPersonal,
      PlanEntrenamientoEjercicio,
      GrupoEstudiante,
      Asistencia,
      EventoGrupo,
      EventoEstudiante,
      ProfesorGrupo
    }};

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    throw error;
  }
}

function setupAssociations(models) {
  const {
    Profesor,
    PerfilDeportivo,
    Estudiante,
    PlanEntrenamiento,
    Ejercicio,
    Grupo,
    Clase,
    Evento,
    EstadisticaEntrenamiento,
    EstadisticaPersonal,
    PlanEntrenamientoEjercicio,
    GrupoEstudiante,
    Asistencia,
    EventoGrupo,
    EventoEstudiante,
    ProfesorGrupo
  } = models;

  // Relaciones 1:N
  // Profesor -> PerfilDeportivo
  Profesor.hasMany(PerfilDeportivo, { foreignKey: 'profesor_id' });
  PerfilDeportivo.belongsTo(Profesor, { foreignKey: 'profesor_id' });

  // Grupo -> Clase
  Grupo.hasMany(Clase, { foreignKey: 'grupo_id' });
  Clase.belongsTo(Grupo, { foreignKey: 'grupo_id' });

  // PlanEntrenamiento -> Clase
  PlanEntrenamiento.hasMany(Clase, { foreignKey: 'plan_id' });
  Clase.belongsTo(PlanEntrenamiento, { foreignKey: 'plan_id' });

  // Estudiante -> EstadisticaEntrenamiento
  Estudiante.hasMany(EstadisticaEntrenamiento, { foreignKey: 'estudiante_id' });
  EstadisticaEntrenamiento.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });

  // Ejercicio -> EstadisticaEntrenamiento
  Ejercicio.hasMany(EstadisticaEntrenamiento, { foreignKey: 'ejercicio_id' });
  EstadisticaEntrenamiento.belongsTo(Ejercicio, { foreignKey: 'ejercicio_id' });

  // Clase -> EstadisticaEntrenamiento
  Clase.hasMany(EstadisticaEntrenamiento, { foreignKey: 'clase_id' });
  EstadisticaEntrenamiento.belongsTo(Clase, { foreignKey: 'clase_id' });

  // Profesor -> EstadisticaPersonal
  Profesor.hasMany(EstadisticaPersonal, { foreignKey: 'profesor_id' });
  EstadisticaPersonal.belongsTo(Profesor, { foreignKey: 'profesor_id' });

  // PlanEntrenamiento -> EstadisticaPersonal
  PlanEntrenamiento.hasMany(EstadisticaPersonal, { foreignKey: 'plan_id' });
  EstadisticaPersonal.belongsTo(PlanEntrenamiento, { foreignKey: 'plan_id' });

  // Ejercicio -> EstadisticaPersonal
  Ejercicio.hasMany(EstadisticaPersonal, { foreignKey: 'ejercicio_id' });
  EstadisticaPersonal.belongsTo(Ejercicio, { foreignKey: 'ejercicio_id' });

  // Relaciones N:M usando tablas de unión

  // PlanEntrenamiento <-> Ejercicio (con tabla de unión)
  PlanEntrenamiento.belongsToMany(Ejercicio, {
    through: PlanEntrenamientoEjercicio,
    foreignKey: 'plan_id',
    otherKey: 'ejercicio_id'
  });
  Ejercicio.belongsToMany(PlanEntrenamiento, {
    through: PlanEntrenamientoEjercicio,
    foreignKey: 'ejercicio_id',
    otherKey: 'plan_id'
  });

  // Grupo <-> Estudiante (con tabla de unión)
  Grupo.belongsToMany(Estudiante, {
    through: GrupoEstudiante,
    foreignKey: 'grupo_id',
    otherKey: 'estudiante_id'
  });
  Estudiante.belongsToMany(Grupo, {
    through: GrupoEstudiante,
    foreignKey: 'estudiante_id',
    otherKey: 'grupo_id'
  });

  // Clase <-> Estudiante (Asistencia)
  Clase.belongsToMany(Estudiante, {
    through: Asistencia,
    foreignKey: 'clase_id',
    otherKey: 'estudiante_id'
  });
  Estudiante.belongsToMany(Clase, {
    through: Asistencia,
    foreignKey: 'estudiante_id',
    otherKey: 'clase_id'
  });

  // Evento <-> Grupo
  Evento.belongsToMany(Grupo, {
    through: EventoGrupo,
    foreignKey: 'evento_id',
    otherKey: 'grupo_id'
  });
  Grupo.belongsToMany(Evento, {
    through: EventoGrupo,
    foreignKey: 'grupo_id',
    otherKey: 'evento_id'
  });

  // Evento <-> Estudiante
  Evento.belongsToMany(Estudiante, {
    through: EventoEstudiante,
    foreignKey: 'evento_id',
    otherKey: 'estudiante_id'
  });
  Estudiante.belongsToMany(Evento, {
    through: EventoEstudiante,
    foreignKey: 'estudiante_id',
    otherKey: 'evento_id'
  });

  // Profesor <-> Grupo
  Profesor.belongsToMany(Grupo, {
    through: ProfesorGrupo,
    foreignKey: 'profesor_id',
    otherKey: 'grupo_id'
  });
  Grupo.belongsToMany(Profesor, {
    through: ProfesorGrupo,
    foreignKey: 'grupo_id',
    otherKey: 'profesor_id'
  });

  console.log('✅ Asociaciones de modelos configuradas.');
}

export default initializeDatabase; 