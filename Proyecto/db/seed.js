import bcrypt from 'bcryptjs'
import { getDatabase } from './index.js'

async function seedDatabase() {
  console.log('🌱 Iniciando seeding de la base de datos...')

  try {
    const { models } = await getDatabase()
    const { Profesor } = models

    // Verificar si ya existe el profesor de prueba
    const existingProfesor = await Profesor.findOne({
      where: { email: 'admin@usport.com' },
    })

    if (existingProfesor) {
      console.log('✅ Los datos de prueba ya existen.')
      return
    }

    // Crear contraseña hasheada
    const passwordHash = await bcrypt.hash('admin123', 12)

    // Crear profesor de prueba
    const profesorData = {
      email: 'admin@usport.com',
      username: 'admin',
      password_hash: passwordHash,
      first_name: 'Administrador',
      last_name: 'USport',
      birth_date: '1990-01-01',
      gender: 'M',
      medical_conditions: null,
    }

    await Profesor.create(profesorData)

    console.log('✅ Datos de prueba insertados exitosamente:')
    console.log('   📧 Email: admin@usport.com')
    console.log('   👤 Username: admin')
    console.log('   🔑 Password: admin123')
  } catch (error) {
    console.error('❌ Error durante el seeding:', error)
    throw error
  }
}

// Ejecutar si se llama directamente
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completado')
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 Error en seeding:', error)
      process.exit(1)
    })
}

export default seedDatabase
