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

// API handlers
ipcMain.handle('api:request', async (event, config) => {
  try {
    // Aquí puedes implementar la lógica para hacer requests HTTP desde el proceso principal
    // Por ahora retornamos un mock
    return { success: true, data: { message: 'API request handled via IPC' } }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('api:get', async (event, url, config = {}) => {
  return await ipcMain.handle('api:request', event, { ...config, method: 'GET', url })
})

ipcMain.handle('api:post', async (event, url, data, config = {}) => {
  return await ipcMain.handle('api:request', event, { ...config, method: 'POST', url, data })
})

ipcMain.handle('api:put', async (event, url, data, config = {}) => {
  return await ipcMain.handle('api:request', event, { ...config, method: 'PUT', url, data })
})

ipcMain.handle('api:delete', async (event, url, config = {}) => {
  return await ipcMain.handle('api:request', event, { ...config, method: 'DELETE', url })
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