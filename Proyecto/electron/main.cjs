const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { Op, where } = require('sequelize')
const { title } = require('process')

// Check if we're in development mode
const isDev = !app.isPackaged

let storage = {}
let currentUser = null
let currentStudent = null

// Database connection
let dbInstance = null
let ProfesorModel = null
let EstudianteModel = null
let GrupoModel = null
let SportEventModel = null
let ClassEventModel = null

// Initialize database connection using Sequelize
const initDatabase = async () => {
  try {
    // Importar dinámicamente los módulos ES6
    const { getDatabase } = await import('../db/index.js')
    const { models } = await getDatabase()

    dbInstance = models
    ProfesorModel = models.Profesor
    EstudianteModel = models.Estudiante
    GrupoModel = models.Grupo
    SportEventModel = models.Evento
    ClassEventModel = models.Clase

    console.log('Connected to database via Sequelize')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Load storage from file
const storageFile = path.join(__dirname, 'storage.json')
try {
  if (fs.existsSync(storageFile)) {
    storage = JSON.parse(fs.readFileSync(storageFile, 'utf8'))
  }
} catch (error) {
  console.error('Error loading storage:', error)
}

// Save storage to file
const saveStorage = () => {
  try {
    fs.writeFileSync(storageFile, JSON.stringify(storage, null, 2))
  } catch (error) {
    console.error('Error saving storage:', error)
  }
}

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false,
    titleBarStyle: 'default',
  })

  // Load the app
  if (isDev) {
    console.log('Loading development server...')
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    console.log('Loading production build...')
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// IPC Handlers
// ─── electron/main.cjs ───
ipcMain.handle('group:getAllWithStudents', async () => {
  try {
    if (!dbInstance) throw new Error('DB not initialized')
    const { Grupo, Estudiante } = dbInstance

    const grupos = await Grupo.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Estudiante, through: { attributes: [] } }],
    })

    const result = grupos.map(g => ({
      id: g.id,
      name: g.name,
      objectives: g.objectives,
      specific_objectives: g.specific_objectives,
      created_at: g.created_at,
      students: (g.Estudiantes || []).map(e => ({
        // <- aquí los renombramos para que coincidan con el template:
        id: e.id,
        firstnames: e.first_name,
        lastnames: e.last_name,
        birthdate: e.birth_date,
        gender: e.gender,
        peso: e.weight,
        altura: e.height,
        porcentajegrasa: e.body_fat_percentage,
        porcentajemusculo: e.muscle_mass_percentage,
        preexistencias: e.medical_conditions,
      })),
    }))

    return { success: true, groups: result }
  } catch (err) {
    console.error('Error fetching groups with students:', err)
    return { success: false, error: err.message }
  }
})

// Crear grupo
ipcMain.handle('group:create', async (_evt, data) => {
  try {
    if (!dbInstance) throw new Error('DB not initialized')
    const { Grupo } = dbInstance
    const nuevo = await Grupo.create({
      name: data.name,
      objectives: data.objectives,
      specific_objectives: data.specific_objectives,
    })
    
    const storageFile = path.join(__dirname, 'storage.json')
    storage = JSON.parse(fs.readFileSync(storageFile, 'utf8'))

    const userId = storage.auth_user.id

    await dbInstance.ProfesorGrupo.create({
      profesor_id: userId,
      grupo_id: nuevo.id,
    })

    return {
      success: true,
      group: {
        id: nuevo.id,
        name: nuevo.name,
        objectives: nuevo.objectives,
        specific_objectives: nuevo.specific_objectives,
        created_at: nuevo.created_at,
      },
    }
  } catch (err) {
    console.error('Error creating group:', err)
    return { success: false, error: err.message }
  }
})

// Authentication handlers
ipcMain.handle('auth:signup', async (event, userData) => {
  try {
    if (!ProfesorModel) {
      throw new Error('Database not initialized')
    }

    // Verificar si el email o username ya existen
    const existingUser = await ProfesorModel.findOne({
      where: {
        [Op.or]: [{ email: userData.email }, { username: userData.username }],
      },
    })

    if (existingUser) {
      if (existingUser.email === userData.email) {
        return {
          success: false,
          error: 'El correo electrónico ya está registrado',
        }
      } else {
        return { success: false, error: 'El nombre de usuario ya está en uso' }
      }
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(userData.password, 12)

    // Crear el nuevo profesor
    const newProfesor = await ProfesorModel.create({
      email: userData.email,
      username: userData.username,
      password_hash: passwordHash,
      first_name: userData.firstnames,
      last_name: userData.lastnames,
      birth_date: userData.birthdate && userData.birthdate.trim() !== '' ? userData.birthdate : null,
      gender: userData.gender || null,
      medical_conditions: userData.medical_conditions || null,
    })

    // Crear usuario actual
    currentUser = {
      id: newProfesor.id,
      username: newProfesor.username,
      email: newProfesor.email,
      first_name: newProfesor.first_name,
      last_name: newProfesor.last_name,
    }

    // Guardar en storage
    storage.auth_user = currentUser
    storage.auth_token = 'token_' + Date.now()
    saveStorage()

    // Notificar cambio
    BrowserWindow.getAllWindows()[0]?.webContents.send('auth:changed', {
      user: currentUser,
      isAuthenticated: true,
    })

    return {
      success: true,
      user: currentUser,
      message: 'Profesor registrado exitosamente',
    }
  } catch (error) {
    console.error('Signup error:', error)
    return { success: false, error: 'Error del servidor: ' + error.message }
  }
})

ipcMain.handle('auth:login', async (event, credentials) => {
  try {
    if (!ProfesorModel) {
      throw new Error('Database not initialized')
    }

    // Buscar usuario en la base de datos
    const profesor = await ProfesorModel.findOne({
      where: {
        [Op.or]: [
          { username: credentials.login },
          { email: credentials.login },
        ],
      },
    })

    if (profesor) {
      // Verificar contraseña con bcrypt
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        profesor.password_hash
      )

      if (isValidPassword) {
        currentUser = {
          id: profesor.id,
          username: profesor.username,
          email: profesor.email,
          first_name: profesor.first_name,
          last_name: profesor.last_name,
        }

        // Guardar en storage
        storage.auth_user = currentUser
        storage.auth_token = 'token_' + Date.now()
        saveStorage()

        // Notificar cambio
        BrowserWindow.getAllWindows()[0]?.webContents.send('auth:changed', {
          user: currentUser,
          isAuthenticated: true,
        })

        return { success: true, user: currentUser }
      } else {
        return { success: false, error: 'Credenciales incorrectas' }
      }
    } else {
      return { success: false, error: 'Usuario no encontrado' }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Error del servidor: ' + error.message }
  }
})

ipcMain.handle('auth:logout', async () => {
  currentUser = null
  delete storage.auth_user
  delete storage.auth_token
  saveStorage()

  BrowserWindow.getAllWindows()[0]?.webContents.send('auth:changed', {
    user: null,
    isAuthenticated: false,
  })

  return { success: true }
})

ipcMain.handle('auth:check', async () => {
  return {
    isAuthenticated: !!storage.auth_user,
    user: storage.auth_user,
  }
})

ipcMain.handle('auth:getCurrentUser', async () => {
  return storage.auth_user
})

ipcMain.handle('sportEvent:create', async (event, data) => {
  try {
    if (!SportEventModel) throw new Error('Database not initialized');

    // Validación de campos requeridos
    const errors = {};
    if (!data.title) errors.title = 'El titulo es obligatorio.';
    //if (!data.date) errors.date = 'La fecha es obligatoria.';

    // Validación de números
    ['precio'].forEach(field => {
      if (data[field] && isNaN(Number(data[field]))) {
        errors[field] = `El campo ${field} debe ser un número válido.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return { success: false, error: errors };
    }

    // Crear Evento tipo Deportivo
    const newSportEvent = await SportEventModel.create({
      title: data.title,
      description: data.description || null,
      location: data.localization || null,
      price: data.price || null,
      event_date: data.date && data.date.trim() !== '' ? data.date : null,
      link: data.link || null
    });

    return {
      success: true,
      user: {
        title: newSportEvent.title,
        description: newSportEvent.description,
        location: newSportEvent.location,
        price: newSportEvent.price,
        event_date: newSportEvent.event_date,
        link: newSportEvent.link
      },
      message: 'Evento registrado exitosamente'
    };
  } catch (error) {
    console.error('Event create error:', error);
    return { success: false, error: 'Error del servidor: ' + error.message };
  }
});

ipcMain.handle('classEvent:create', async (event, data) => {
  try {
    if (!ClassEventModel) throw new Error('Database not initialized');

    // Validación de campos requeridos
    const errors = {};
    if (!data.groupid) errors.groupid = 'El id del Grupo es obligatorio.';
    if (!data.planid) errors.planid = 'El id del plan es obligatorio.';
    if (!data.starttime) errors.starttime = 'Se debe definir el inicio de la clase.';
    //if (!data.date) errors.date = 'La fecha es obligatoria.';

    // Validación de números
    ['precio'].forEach(field => {
      if (data[field] && isNaN(Number(data[field]))) {
        errors[field] = `El campo ${field} debe ser un número válido.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return { success: false, error: errors };
    }

        // Crear Evento tipo Deportivo
    const newClassEvent = await ClassEventModel.create({
      grupo_id: data.groupid,
      plan_id: data.planid,
      class_date: data.date && data.date.trim() !== '' ? data.date : null,
      recurrence_rule: data.recurrence || null,
      start_time: data.starttime,
      end_time: data.finishtime || null
    });

    return {
      success: true,
      user: {
        grupo_id: newClassEvent.grupo_id,
        plan_id: newClassEvent.plan_id,
        class_date: newClassEvent.class_date,
        recurrence_rule: newClassEvent.recurrence_rule,
        start_time: newClassEvent.start_time,
        end_time: newClassEvent.end_time
      },
      message: 'Evento registrado exitosamente'
    };
  } catch (error) {
    console.error('Event create error:', error);
    return { success: false, error: 'Error del servidor: ' + error.message };
  }
});


// API handlers
ipcMain.handle('user:getGrupos', async (event) => {
  try {
    const { getModels } = await import('../db/index.js')
    const { Profesor, Grupo } = await getModels()

    const storageFile = path.join(__dirname, 'storage.json')
    const storage = JSON.parse(fs.readFileSync(storageFile, 'utf8'))

    const userId = storage.auth_user.id

    const profesor = await Profesor.findByPk(userId, {
      include: {
        model: Grupo,
        through: { attributes: [] } // oculta los datos de ProfesorGrupo
      }
    })

    if (!profesor || !profesor.Grupos || profesor.Grupos.length === 0) {
      return { success: false, error: 'No se encontraron grupos asignados' }
    }

    const grupos = profesor.Grupos.map(grupo => {
      const plain = grupo.get({ plain: true })
      return {
        id: plain.id,
        nombre: plain.name,
        objetivos: plain.objectives,
        objetivos_especificos: plain.specific_objectives
      }
    })

    return { success: true, data: grupos }

  } catch (err) {
    console.error('Error en user:getGrupos:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('user:getEventos', async (event, userId) => {
  try {
    const { getModels } = await import('../db/index.js')
    const { Profesor, Grupo, Evento } = await getModels()

    const profesor = await Profesor.findByPk(userId, {
      include: {
        model: Grupo,
        include: Evento, // incluir eventos dentro de cada grupo
        through: { attributes: [] }
      }
    })

    if (!profesor) {
      return { success: false, error: 'Profesor no encontrado' }
    }

    // Extraer eventos de todos los grupos
    const eventos = profesor.Grupos.flatMap(grupo => grupo.Eventos)

    return { success: true, data: eventos }
  } catch (err) {
    console.error('Error en user:getEventos:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('ejercicios:getAll', async () => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { Ejercicio } = models

    console.log('GET ejercicios - Obteniendo ejercicios')
    const ejercicios = await Ejercicio.findAll({ order: [['id', 'ASC']] })
    console.log('Ejercicios encontrados:', ejercicios.length)

    // Limpiar datos antes de devolver
    const cleanEjercicios = ejercicios.map(ej => ({
      id: ej.id,
      name: ej.name,
      unit: ej.unit,
      impact_area: ej.impact_area,
      type: ej.type,
      exigency: ej.exigency,
      description: ej.description,
    }))

    return { success: true, data: cleanEjercicios }
  } catch (error) {
    console.error('Error en ejercicios:getAll:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('ejercicios:create', async (event, data) => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { Ejercicio } = models

    console.log('POST ejercicios - Creando ejercicio:', data)
    const nuevo = await Ejercicio.create(data)
    console.log('Ejercicio creado:', nuevo.toJSON())

    // Limpiar datos antes de devolver
    const cleanEjercicio = {
      id: nuevo.id,
      name: nuevo.name,
      unit: nuevo.unit,
      impact_area: nuevo.impact_area,
      type: nuevo.type,
      exigency: nuevo.exigency,
      description: nuevo.description,
    }

    return { success: true, data: cleanEjercicio }
  } catch (error) {
    console.error('Error en ejercicios:create:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('ejercicios:delete', async (event, id) => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { Ejercicio } = models

    console.log('DELETE ejercicios - Eliminando ejercicio:', id)
    const ejercicio = await Ejercicio.findByPk(id)
    
    if (!ejercicio) {
      throw new Error('Ejercicio no encontrado')
    }
    
    await ejercicio.destroy()
    console.log('Ejercicio eliminado:', id)
    
    return { success: true, data: { id } }
  } catch (error) {
    console.error('Error en ejercicios:delete:', error)
    return { success: false, error: error.message }
  }
})

// Planes de entrenamiento handlers
ipcMain.handle('planes:getAll', async () => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { PlanEntrenamiento } = models

    console.log('GET planes - Obteniendo planes')
    const planes = await PlanEntrenamiento.findAll({
      include: [{ model: models.Ejercicio, through: { attributes: [] } }],
      order: [['id', 'ASC']],
    })

    // Formatear para que ejercicios sea un array simple
    const result = planes.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      type: plan.type,
      ejercicios:
        plan.Ejercicios?.map(ej => ({
          id: ej.id,
          name: ej.name,
          unit: ej.unit,
        })) || [],
    }))

    console.log('Planes encontrados:', result.length)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error en planes:getAll:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('student:create', async (_evt, data) => {
  console.log('student:create called', data)
  try {
    if (!EstudianteModel || !dbInstance)
      throw new Error('Database not initialized')

    // Validaciones
    const errors = {}
    if (!data.id) errors.id = 'La identificación debe ser numérica.'
    if (!data.firstnames) errors.firstnames = 'El nombre es obligatorio.'
    if (!data.lastnames) errors.lastnames = 'El apellido es obligatorio.'
    if (!data.groupId) errors.groupId = 'El grupo es obligatorio.'
    if (data.gender && !['M', 'F', 'O'].includes(data.gender))
      errors.gender = 'El género debe ser M, F u O.'
    ;['peso', 'altura', 'porcentajegrasa', 'porcentajemusculo'].forEach(f => {
      if (data[f] != null && isNaN(Number(data[f]))) {
        errors[f] = `El campo ${f} debe ser un número válido.`
      }
    })
    if (Object.keys(errors).length) return { success: false, error: errors }

    // ¿Ya existe?
    if (await EstudianteModel.findOne({ where: { id: data.id } })) {
      return { success: false, error: 'El estudiante ya está registrado' }
    }

    // Crear
    const newEst = await EstudianteModel.create({
      id: data.id,
      first_name: data.firstnames,
      last_name: data.lastnames,
      birth_date: data.birthdate || null,
      gender: data.gender || null,
      medical_conditions: data.preexistencias || null,
      weight: data.peso || null,
      height: data.altura || null,
      body_fat_percentage: data.porcentajegrasa || null,
      muscle_mass_percentage: data.porcentajemusculo || null,
    })

    // Asociar
    await dbInstance.GrupoEstudiante.create({
      grupo_id: data.groupId,
      estudiante_id: newEst.id,
    })

    return {
      success: true,
      user: {
        id: newEst.id,
        firstnames: newEst.first_name,
        lastnames: newEst.last_name,
        birthdate: newEst.birth_date,
        gender: newEst.gender,
        preexistencias: newEst.medical_conditions,
        peso: newEst.weight,
        altura: newEst.height,
        porcentajegrasa: newEst.body_fat_percentage,
        porcentajemusculo: newEst.muscle_mass_percentage,
      },
      message: 'Estudiante registrado exitosamente',
    }
  } catch (err) {
    console.error('Student create error:', err)
    return { success: false, error: 'Error del servidor: ' + err.message }
  }
})

ipcMain.handle('student:getAll', async (_evt, { groupId } = {}) => {
  try {
    if (!EstudianteModel || !GrupoModel) throw new Error('DB not initialized')
    const records = await EstudianteModel.findAll({
      include: [
        {
          model: GrupoModel,
          where: { id: groupId },
          through: { attributes: [] },
        },
      ],
      order: [['last_name', 'ASC']],
    })
    const students = records.map(r => ({
      id: r.id,
      firstnames: r.first_name,
      lastnames: r.last_name,
      birthdate: r.birth_date,
      gender: r.gender,
      peso: r.weight,
      altura: r.height,
      porcentajegrasa: r.body_fat_percentage,
      porcentajemusculo: r.muscle_mass_percentage,
      preexistencias: r.medical_conditions,
    }))
    return { success: true, students }
  } catch (err) {
    console.error('Error fetching students:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('student:update', async (_evt, data) => {
  try {
    if (!EstudianteModel) throw new Error('DB not initialized')
    const s = await EstudianteModel.findByPk(data.id)
    if (!s) return { success: false, error: 'Estudiante no encontrado.' }
    await s.update({
      first_name: data.firstnames,
      last_name: data.lastnames,
      birth_date: data.birthdate || null,
      gender: data.gender || null,
      medical_conditions: data.preexistencias || null,
      weight: data.peso || null,
      height: data.altura || null,
      body_fat_percentage: data.porcentajegrasa || null,
      muscle_mass_percentage: data.porcentajemusculo || null,
    })
    return { success: true, message: 'Estudiante actualizado correctamente' }
  } catch (err) {
    console.error('Error updating student:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('student:delete', async (_evt, studentId) => {
  try {
    if (!EstudianteModel) throw new Error('DB not initialized')
    const count = await EstudianteModel.destroy({ where: { id: studentId } })
    if (!count) return { success: false, error: 'Estudiante no encontrado.' }
    return { success: true, message: 'Estudiante eliminado correctamente' }
  } catch (err) {
    console.error('Error deleting student:', err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle('planes:create', async (event, data) => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { PlanEntrenamiento } = models

    console.log('POST planes - Creando plan:', data)
    const { name, description, type, ejercicios } = data
    const plan = await PlanEntrenamiento.create({ name, description, type })

    if (Array.isArray(ejercicios) && ejercicios.length > 0) {
      await plan.setEjercicios(ejercicios)
    }

    // Devolver el plan con ejercicios asociados
    const planConEjercicios = await PlanEntrenamiento.findByPk(plan.id, {
      include: [{ model: models.Ejercicio, through: { attributes: [] } }],
    })

    const result = {
      id: planConEjercicios.id,
      name: planConEjercicios.name,
      description: planConEjercicios.description,
      type: planConEjercicios.type,
      ejercicios:
        planConEjercicios.Ejercicios?.map(ej => ({
          id: ej.id,
          name: ej.name,
          unit: ej.unit,
        })) || [],
    }

    console.log('Plan creado:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error en planes:create:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('planes:delete', async (event, id) => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { PlanEntrenamiento } = models

    console.log('DELETE planes - Eliminando plan:', id)
    const plan = await PlanEntrenamiento.findByPk(id)
    
    if (!plan) {
      throw new Error('Plan no encontrado')
    }
    
    await plan.destroy()
    console.log('Plan eliminado:', id)
    
    return { success: true, data: { id } }
  } catch (error) {
    console.error('Error en planes:delete:', error)
    return { success: false, error: error.message }
  }
})

// Storage handlers
ipcMain.handle('storage:get', async (event, key) => {
  return storage[key]
})

ipcMain.handle('storage:set', async (event, key, value) => {
  storage[key] = value
  saveStorage()

  // Notificar cambio
  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', {
    key,
    value,
  })

  return { success: true }
})

ipcMain.handle('storage:remove', async (event, key) => {
  delete storage[key]
  saveStorage()

  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', {
    key,
    value: null,
  })

  return { success: true }
})

ipcMain.handle('storage:clear', async () => {
  storage = {}
  saveStorage()

  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', {
    key: null,
    value: null,
  })

  return { success: true }
})

// App handlers
ipcMain.handle('app:getVersion', async () => {
  return app.getVersion()
})

ipcMain.handle('app:openExternal', async (event, url) => {
  const { shell } = require('electron')
  await shell.openExternal(url)
  return { success: true }
})

ipcMain.handle('app:sendMessage', async (event, message) => {
  console.log('Message from renderer:', message)
  return { success: true }
})

ipcMain.handle('user:getPlanes', async (event, userId) => {
  try {
    const { getModels } = await import('../db/index.js')
    const models = await getModels()
    const { PlanEntrenamiento } = models

    const planes = await PlanEntrenamiento.findAll({
      order: [['id', 'ASC']]
    })
    const result = planes.map(p => ({ id: p.id, name: p.name }))
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
  try {
    // Initialize database first
    await initDatabase()
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault()
  })
})

// Clean up database connection on app quit
app.on('before-quit', async () => {
  try {
    if (dbInstance) {
      const { closeDatabase } = await import('../db/index.js')
      await closeDatabase()
      console.log('Database connection closed')
    }
  } catch (error) {
    console.error('Error closing database:', error)
  }
})
