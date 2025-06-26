const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Send a message to the main process
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),
  
  // Example: Receive a message from the main process
  onMessage: (callback) => ipcRenderer.on('message', callback),
  
  // Example: Get app version
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Example: Open external link
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
}) 