import { Sequelize } from 'sequelize';
import config from './config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);


export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexion a la base de datos establecida correctamente');
    return true;
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    return false;
  }
};

export const initDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Base de datos sincronizada correctamente');
    return true;
  } catch (error) {
    console.error('Error sincronizando la base de datos:', error);
    return false;
  }
};

// Close database connection
export const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log('Base de datos cerrada correctamente');
  } catch (error) {
    console.error('error cerrando la conexion a la base de datos:', error);
  }
};

export default sequelize; 