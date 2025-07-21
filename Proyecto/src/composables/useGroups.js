// src/composables/useGroups.js
import { ref, onMounted } from 'vue'

export function useGroups() {
  const groups = ref([])
  const isLoading = ref(false)
  const loadError = ref(null)

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
        throw new Error(error || 'Error al cargar grupos')
      }

      // payload tiene: [{ id, name, objectives, students: [...] }, …]
      groups.value = payload
    } catch (err) {
      loadError.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Crea un nuevo grupo y, al éxito, refresca la lista
   */
  async function createGroup({ name, objectives, specific_objectives }) {
    const storageFile = path.join(__dirname, 'storage.json')
    storage = JSON.parse(fs.readFileSync(storageFile, 'utf8'))

    const userId = storage.auth_user.id

    const { success, group, error } = await window.electronAPI.group.create({
      name,
      objectives,
      specific_objectives,
      userId,
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
    fetchGroups,
    createGroup,
  }
}
