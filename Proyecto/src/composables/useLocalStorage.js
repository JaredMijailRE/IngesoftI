import { ref, watch, onMounted, onUnmounted } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  const value = ref(defaultValue)
  
  // Verificar si estamos en un entorno Electron
  const isElectron = typeof window !== 'undefined' && window.electronAPI

  // Cargar valor inicial
  const loadValue = async () => {
    if (!isElectron) {
      return
    }

    try {
      const storedValue = await window.electronAPI.storage.get(key)
      value.value = storedValue !== undefined ? storedValue : defaultValue
    } catch (error) {
      console.error('Error loading value from storage:', error)
      value.value = defaultValue
    }
  }

  // Guardar valor
  const saveValue = async (newValue) => {
    if (!isElectron) {
      return
    }

    try {
      if (newValue === null || newValue === undefined) {
        await window.electronAPI.storage.remove(key)
      } else {
        await window.electronAPI.storage.set(key, newValue)
      }
    } catch (error) {
      console.error('Error saving value to storage:', error)
    }
  }

  // Event listener para cambios en storage
  const handleStorageChange = (event, data) => {
    if (data.key === key) {
      value.value = data.value !== undefined ? data.value : defaultValue
    }
  }

  // Watch for changes and save to storage
  watch(
    value,
    (newValue) => {
      saveValue(newValue)
    },
    { deep: true }
  )

  onMounted(() => {
    loadValue()
    
    if (isElectron) {
      window.electronAPI.events.onStorageChange(handleStorageChange)
    }
  })

  onUnmounted(() => {
    if (isElectron) {
      window.electronAPI.events.removeAllListeners('storage:changed')
    }
  })

  return value
}
