const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')

// Check if we're in development mode
const isDev = !app.isPackaged

let storage = {}
let currentUser = null

// Database connection
let dbInstance = null
let ProfesorModel = null

// Initialize database connection using Sequelize
const initDatabase = async () => {
  try {
    // Importar dinámicamente los módulos ES6
    const { getDatabase } = await import('../db/index.js')
    const { models } = await getDatabase()
    
    dbInstance = models
    ProfesorModel = models.Profesor
    
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
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false,
    titleBarStyle: 'default'
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

// Authentication handlers
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
          { email: credentials.login }
        ]
      }
    })

    if (profesor) {
      // Verificar contraseña con bcrypt
      const isValidPassword = await bcrypt.compare(credentials.password, profesor.password_hash)
      
      if (isValidPassword) {
        currentUser = {
          id: profesor.id,
          username: profesor.username,
          email: profesor.email,
          first_name: profesor.first_name,
          last_name: profesor.last_name
        }
        
        // Guardar en storage
        storage.auth_user = currentUser
        storage.auth_token = 'token_' + Date.now()
        saveStorage()
        
        // Notificar cambio
        BrowserWindow.getAllWindows()[0]?.webContents.send('auth:changed', { user: currentUser, isAuthenticated: true })
        
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
  
  BrowserWindow.getAllWindows()[0]?.webContents.send('auth:changed', { user: null, isAuthenticated: false })
  
  return { success: true }
})

ipcMain.handle('auth:check', async () => {
  return { 
    isAuthenticated: !!storage.auth_user, 
    user: storage.auth_user 
  }
})

ipcMain.handle('auth:getCurrentUser', async () => {
  return storage.auth_user
})

// Ejercicios handlers
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
      description: ej.description
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
      description: nuevo.description
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
      order: [['id', 'ASC']]
    })
    
    // Formatear para que ejercicios sea un array simple
    const result = planes.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      type: plan.type,
      ejercicios: plan.Ejercicios?.map(ej => ({ id: ej.id, name: ej.name, unit: ej.unit })) || []
    }))
    
    console.log('Planes encontrados:', result.length)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error en planes:getAll:', error)
    return { success: false, error: error.message }
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
      include: [{ model: models.Ejercicio, through: { attributes: [] } }]
    })
    
    const result = {
      id: planConEjercicios.id,
      name: planConEjercicios.name,
      description: planConEjercicios.description,
      type: planConEjercicios.type,
      ejercicios: planConEjercicios.Ejercicios?.map(ej => ({ id: ej.id, name: ej.name, unit: ej.unit })) || []
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
  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', { key, value })
  
  return { success: true }
})

ipcMain.handle('storage:remove', async (event, key) => {
  delete storage[key]
  saveStorage()
  
  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', { key, value: null })
  
  return { success: true }
})

ipcMain.handle('storage:clear', async () => {
  storage = {}
  saveStorage()
  
  BrowserWindow.getAllWindows()[0]?.webContents.send('storage:changed', { key: null, value: null })
  
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