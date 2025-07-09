import { ref, reactive } from 'vue'

// Simulación de la API de autenticación hasta que implementemos el IPC de Electron
const authAPI = {
  async login(credentials) {
    // Por ahora simularemos la validación
    // En una implementación real, esto se comunicaría con el proceso principal de Electron
    // o con una API backend
    
    try {
      // Simulación: validar credenciales básicas
      if (credentials.login === 'admin' && credentials.password === 'admin123') {
        return {
          success: true,
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@usport.com',
            first_name: 'Administrador',
            last_name: 'USport'
          }
        }
      } else if (credentials.login === 'admin@usport.com' && credentials.password === 'admin123') {
        return {
          success: true,
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@usport.com',
            first_name: 'Administrador',
            last_name: 'USport'
          }
        }
      } else {
        return {
          success: false,
          error: 'Credenciales incorrectas'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error del servidor'
      }
    }
  }
}

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  const login = async (credentials) => {
    isLoading.value = true
    error.value = ''

    try {
      const result = await authAPI.login(credentials)
      
      if (result.success) {
        user.value = result.user
        isAuthenticated.value = true
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('auth_user', JSON.stringify(result.user))
        localStorage.setItem('auth_token', 'dummy_token')
        
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

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('auth_user')
    const savedToken = localStorage.getItem('auth_token')
    
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

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