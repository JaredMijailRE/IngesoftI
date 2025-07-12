import { ref, onMounted, onUnmounted } from 'vue'

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  const isElectron = typeof window !== 'undefined' && window.electronAPI

  const login = async (credentials) => {
    isLoading.value = true
    error.value = ''

    try {
      if (!isElectron) {
        throw new Error('Este composable requiere Electron para funcionar')
      }

      const result = await window.electronAPI.auth.login(credentials)
      
      if (result.success) {
        user.value = result.user
        isAuthenticated.value = true
        return { success: true }
      } else {
        error.value = result.error
        return { success: false, error: result.error }
      }
    } catch (err) {
      error.value = 'Error de conexión'
      return { success: false, error: 'Error de conexión' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      if (isElectron) {
        await window.electronAPI.auth.logout()
      }
      user.value = null
      isAuthenticated.value = false
    } catch (err) {
      console.error('Error during logout:', err)
    }
  }

  const checkAuth = async () => {
    try {
      if (!isElectron) {
        return
      }

      const result = await window.electronAPI.auth.check()
      if (result.isAuthenticated) {
        user.value = result.user
        isAuthenticated.value = true
      }
    } catch (err) {
      console.error('Error checking auth:', err)
    }
  }

  // Event listeners para cambios de autenticación
  const handleAuthChange = (event, data) => {
    user.value = data.user
    isAuthenticated.value = data.isAuthenticated
  }

  onMounted(() => {
    checkAuth()
    
    if (isElectron) {
      window.electronAPI.events.onAuthChange(handleAuthChange)
    }
  })

  onUnmounted(() => {
    if (isElectron) {
      window.electronAPI.events.removeAllListeners('auth:changed')
    }
  })

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  }
} 