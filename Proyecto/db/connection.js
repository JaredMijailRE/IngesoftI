import { Sequelize } from 'sequelize';
// importa tus modelos así: import { definePostModel } from './models/Post.js';

export async function SequelizeTryConnect(config) {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config?.storage || './database.sqlite', 
    logging: false,
  });


  try {
    await sequelize.authenticate();
    console.log('Conexion establecida correctamente.');

    // crear tablas si no existen (migración básica)
    await sequelize.sync({ alter: true }); 

    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('No se pudo conecta a la base de datos', error);
  } finally {
    await sequelize.close(); // cerramos conexión
  }
}
