const { contextBridge, ipcRenderer } = require('electron')

// Exposicion segura de methodos
contextBridge.exposeInMainWorld('electronAPI', {
  // Authentication methods
  auth: {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    logout: () => ipcRenderer.invoke('auth:logout'),
    checkAuth: () => ipcRenderer.invoke('auth:check'),
    getCurrentUser: () => ipcRenderer.invoke('auth:getCurrentUser')
  },
  
  // API methods
  api: {
    request: (config) => ipcRenderer.invoke('api:request', config),
    get: (url, config) => ipcRenderer.invoke('api:get', url, config),
    post: (url, data, config) => ipcRenderer.invoke('api:post', url, data, config),
    put: (url, data, config) => ipcRenderer.invoke('api:put', url, data, config),
    delete: (url, config) => ipcRenderer.invoke('api:delete', url, config)
  },
  
  user: {
    getGrupos: (userId) => ipcRenderer.invoke('user:getGrupos', userId),
    getEventos: (userId) => ipcRenderer.invoke('user:getEventos', userId)
  },

  // LocalStorage methods
  storage: {
    get: (key) => ipcRenderer.invoke('storage:get', key),
    set: (key, value) => ipcRenderer.invoke('storage:set', key, value),
    remove: (key) => ipcRenderer.invoke('storage:remove', key),
    clear: () => ipcRenderer.invoke('storage:clear')
  },
  
  // General app methods
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    openExternal: (url) => ipcRenderer.invoke('app:openExternal'),
    sendMessage: (message) => ipcRenderer.invoke('app:sendMessage', message)
  },
  
  // Event listeners
  events: {
    onAuthChange: (callback) => ipcRenderer.on('auth:changed', callback),
    onStorageChange: (callback) => ipcRenderer.on('storage:changed', callback),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
  }
}) 