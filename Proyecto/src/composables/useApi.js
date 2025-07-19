import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  // Verificar si estamos en un entorno Electron
  const isElectron = typeof window !== 'undefined' && window.electronAPI

  const getCurrentUser = async () => {
    try {
      const result = await window.electronAPI.auth.getCurrentUser()
      return result
    } catch (err) {
      throw new Error('No se pudo obtener el usuario actual')
    }
  }

  const getUserGrupos = async () => {
    if (!isElectron) {
      throw new Error('Este composable requiere Electron para funcionar')
    }

    loading.value = true
    error.value = null

    try {
      const result = await window.electronAPI.auth.getCurrentUser()

      if (!result?.id) {
        throw new Error('Usuario no autenticado o ID no disponible')
      }

      const userId = result.id
      const response = await window.electronAPI.user.getGrupos(userId)

      if (response.success) {
        return response
      } else {
        throw new Error(response.error || 'Error al obtener grupos del usuario')
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUserEventos = async userId => {
    if (!isElectron)
      throw new Error('Este composable requiere Electron para funcionar')

    loading.value = true
    error.value = null

    try {
      const result = await window.electronAPI.auth.getCurrentUser()
      if (!result?.id) {
        throw new Error('Usuario no autenticado o ID no disponible')
      }

      const userId = result.id
      const response = await window.electronAPI.user.getEventos(userId)

      if (response.success) {
        return response
      } else {
        throw new Error(
          response.error || 'Error al obtener eventos del usuario'
        )
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const request = async config => {
    if (!isElectron) {
      throw new Error('Este composable requiere Electron para funcionar')
    }

    loading.value = true
    error.value = null

    try {
      const response = await window.electronAPI.api.request(config)

      if (response.success) {
        return response.data
      } else {
        throw new Error(response.error || 'Error en la petición')
      }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (url, config = {}) => request({ ...config, method: 'GET', url })

  const post = (url, data, config = {}) =>
    request({ ...config, method: 'POST', url, data })

  const put = (url, data, config = {}) =>
    request({ ...config, method: 'PUT', url, data })

  const del = (url, config = {}) =>
    request({ ...config, method: 'DELETE', url })

  return {
    loading,
    error,

    getCurrentUser,
    getUserGrupos,
    getUserEventos,

    request,
    get,
    post,
    put,
    delete: del,
  }
}
