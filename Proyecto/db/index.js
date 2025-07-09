import { SequelizeTryConnect } from './connection.js';

// Variable global para almacenar la instancia de la base de datos
let dbInstance = null;

export async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SequelizeTryConnect();
  }
  return dbInstance;
}

// Función específica para obtener el modelo Profesor (para login)
export async function getProfesorModel() {
  const { models } = await getDatabase();
  return models.Profesor;
}

// Función para cerrar la conexión
export async function closeDatabase() {
  if (dbInstance) {
    await dbInstance.sequelize.close();
    dbInstance = null;
  }
}

// Exportar todos los modelos individualmente para facilitar su uso
export async function getModels() {
  const { models } = await getDatabase();
  return models;
}

export default getDatabase; 