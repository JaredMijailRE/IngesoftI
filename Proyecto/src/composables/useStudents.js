// src/composables/useStudents.js
import { ref } from 'vue'

export function useStudents() {
  const studentList = ref([])
  const isLoading = ref(false)
  const loadError = ref(null)
  let activeGroupId = null

  /** Trae y guarda la lista de estudiantes de un grupo */
  async function fetchStudents(groupId) {
    activeGroupId = groupId
    isLoading.value = true
    loadError.value = null

    try {
      const res = await window.electronAPI.student.getAll({ groupId })
      if (!res.success) {
        throw new Error(res.error)
      }
      // el handler student:getAll ya devuelve los campos:
      // id, firstnames, lastnames, birthdate, gender,
      // peso, altura, porcentajegrasa, porcentajemusculo, preexistencias
      studentList.value = res.students
    } catch (err) {
      studentList.value = []
      loadError.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  /** Elimina un estudiante y refresca la lista */
  async function deleteStudentById(studentId) {
    if (!confirm('¿Eliminar este estudiante?')) return
    try {
      const res = await window.electronAPI.student.delete(studentId)
      if (!res.success) {
        console.error('Error borrando estudiante:', res.error)
        return
      }
      if (activeGroupId != null) {
        await fetchStudents(activeGroupId)
      }
    } catch (err) {
      console.error('Error interno al eliminar estudiante:', err)
    }
  }

  /** Actualiza un estudiante y, si salió bien, recarga la lista */
  async function updateStudent(payload) {
    const res = await window.electronAPI.student.update(payload)
    if (res.success && activeGroupId != null) {
      await fetchStudents(activeGroupId)
    }
    return res
  }

  return {
    studentList,
    isLoading,
    loadError,
    fetchStudents,
    deleteStudentById,
    updateStudent,
  }
}
