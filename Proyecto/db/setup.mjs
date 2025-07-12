
import { SequelizeTryConnect } from './connection.js';
import seedDatabase from './seed.js';

// Inicializar la base de datos
(async () => {
  try {
    const { sequelize, models } = await SequelizeTryConnect();
    console.log('✅ Base de datos inicializada correctamente.');
    
    // Ejecutar seeding automáticamente
    await seedDatabase();
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();