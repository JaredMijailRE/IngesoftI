const { contextBridge, ipcRenderer } = require('electron')

// Exposicion segura de methodos
contextBridge.exposeInMainWorld('electronAPI', {
  // Authentication methods
  auth: {
    login: credentials => ipcRenderer.invoke('auth:login', credentials),
    signup: userData => ipcRenderer.invoke('auth:signup', userData),
    logout: () => ipcRenderer.invoke('auth:logout'),
    checkAuth: () => ipcRenderer.invoke('auth:check'),
    getCurrentUser: () => ipcRenderer.invoke('auth:getCurrentUser'),
  },

  // Ejercicios methods
  ejercicios: {
    getAll: () => ipcRenderer.invoke('ejercicios:getAll'),
    create: (data) => ipcRenderer.invoke('ejercicios:create', data),
    delete: (id) => ipcRenderer.invoke('ejercicios:delete', id),
    create: data => ipcRenderer.invoke('ejercicios:create', data),
  },

  // Planes de entrenamiento methods
  planes: {
    getAll: () => ipcRenderer.invoke('planes:getAll'),
    create: (data) => ipcRenderer.invoke('planes:create', data),
    delete: (id) => ipcRenderer.invoke('planes:delete', id)
  },
  
  user: {
    getGrupos: () => ipcRenderer.invoke('user:getGrupos'),
    getEventos: (userId) => ipcRenderer.invoke('user:getEventos', userId),
    getGrupos2: (userId) => ipcRenderer.invoke('user:getGrupos2', userId),
    getPlanes: (userId) => ipcRenderer.invoke('user:getPlanes', userId),
    create: data => ipcRenderer.invoke('planes:create', data),
  },

  // LocalStorage methods
  storage: {
    get: key => ipcRenderer.invoke('storage:get', key),
    set: (key, value) => ipcRenderer.invoke('storage:set', key, value),
    remove: key => ipcRenderer.invoke('storage:remove', key),
    clear: () => ipcRenderer.invoke('storage:clear'),
  },

  // Database methods
  db: {
    status: () => ipcRenderer.invoke('db:status'),
    retry: () => ipcRenderer.invoke('db:retry'),
  },

  // General app methods
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    openExternal: url => ipcRenderer.invoke('app:openExternal'),
    sendMessage: message => ipcRenderer.invoke('app:sendMessage', message),
  },

  // Event listeners
  events: {
    onAuthChange: callback => ipcRenderer.on('auth:changed', callback),
    onStorageChange: callback => ipcRenderer.on('storage:changed', callback),
    removeAllListeners: channel => ipcRenderer.removeAllListeners(channel),
  },

  // Student CRUD methods
  student: {
    getAll: filter => ipcRenderer.invoke('student:getAll', filter),
    create: data => ipcRenderer.invoke('student:create', data),
    update: data => ipcRenderer.invoke('student:update', data),
    delete: id => ipcRenderer.invoke('student:delete', id),
  },

  group: {
    getAllWithStudents: () => ipcRenderer.invoke('group:getAllWithStudents'),
    create: data => ipcRenderer.invoke('group:create', data),
    // update: data => ipcRenderer.invoke('group:update', data),
    // delete: id => ipcRenderer.invoke('group:delete', id),
  },
  classEvent: {
    create: (data) => ipcRenderer.invoke('classEvent:create', data)
  },
  sportEvent: {
    create: (data) => ipcRenderer.invoke('sportEvent:create', data)
  },

})
