// src/composables/useGroups.js
import { ref, onMounted } from 'vue'

export function useGroups() {
  const groups = ref([])
  const isLoading = ref(false)
  const loadError = ref(null)
  const dbInitialized = ref(true)

  /**
   * Verifica el estado de la base de datos
   */
  async function checkDatabaseStatus() {
    try {
      const status = await window.electronAPI.db.status()
      dbInitialized.value = status.initialized
      return status
    } catch (err) {
      dbInitialized.value = false
      return { initialized: false }
    }
  }

  /**
   * Reintenta la inicialización de la base de datos
   */
  async function retryDatabaseInit() {
    isLoading.value = true
    loadError.value = null

    try {
      const result = await window.electronAPI.db.retry()
      if (result.success) {
        dbInitialized.value = true
        // Una vez que la DB se reinicializa, intentar cargar los grupos
        await fetchGroups()
      } else {
        throw new Error(
          result.error || 'Error al reinicializar la base de datos'
        )
      }
    } catch (err) {
      loadError.value = err.message
      dbInitialized.value = false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Trae todos los grupos junto con sus estudiantes
   * usando el handler IPC 'group:getAllWithStudents'
   */
  async function fetchGroups() {
    isLoading.value = true
    loadError.value = null

    try {
      const {
        success,
        groups: payload,
        error,
      } = await window.electronAPI.group.getAllWithStudents()

      if (!success) {
        // Si el error es de base de datos no inicializada, verificar el estado
        if (error && error.includes('DB not initialized')) {
          dbInitialized.value = false
          throw new Error(
            'La base de datos no está inicializada. Presiona "Reintentar" para solucionarlo.'
          )
        }
        throw new Error(error || 'Error al cargar grupos')
      }

      // payload tiene: [{ id, name, objectives, students: [...] }, …]
      groups.value = payload
      dbInitialized.value = true
    } catch (err) {
      loadError.value = err.message
      // Verificar el estado de la base de datos si hay un error
      await checkDatabaseStatus()
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Crea un nuevo grupo y, al éxito, refresca la lista
   */
  async function createGroup({ name, objectives, specific_objectives }) {
    const { success, group, error } = await window.electronAPI.group.create({
      name,
      objectives,
      specific_objectives,
    })

    if (!success) {
      throw new Error(error || 'No se pudo crear el grupo')
    }

    // recarga los grupos para incluir el recién creado
    await fetchGroups()
    return group
  }

  onMounted(fetchGroups)

  return {
    groups,
    isLoading,
    loadError,
    dbInitialized,
    fetchGroups,
    createGroup,
    retryDatabaseInit,
    checkDatabaseStatus,
  }
}
