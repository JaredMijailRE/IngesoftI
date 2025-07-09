import { initializeDatabase } from './migrate.js';

export async function SequelizeTryConnect(config) {
  try {
    const { sequelize, models } = await initializeDatabase(config);
    
    // Devolver la instancia de sequelize y los modelos para uso posterior
    return { sequelize, models };
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    throw error;
  }
}

export default SequelizeTryConnect;
