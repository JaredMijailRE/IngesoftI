import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  // Verificar si estamos en un entorno Electron
  const isElectron = typeof window !== 'undefined' && window.electronAPI

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
    request,
    get,
    post,
    put,
    delete: del,
  }
}
