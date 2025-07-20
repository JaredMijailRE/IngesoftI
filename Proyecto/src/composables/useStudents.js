import { ref } from 'vue'

export function useStudents() {
  const studentList = ref([])
  const isLoading = ref(false)
  const loadError = ref(null)
  let activeGroupId = null

  /** Trae y normaliza la lista de estudiantes de un grupo */
  async function fetchStudents(groupId) {
    const response = await window.electronAPI.group.getAllWithStudents()
    if (response.success) {
      // buscamos el grupo correcto
      const grupo = response.groups.find(g => g.id === groupId)
      studentList.value = (grupo?.students || []).map(record => ({
        id: record.id,
        firstnames: record.firstnames,
        lastnames: record.lastnames,
        birthdate: record.birthdate,
        gender: record.gender,
        peso: record.peso,
        altura: record.altura,
        porcentajegrasa: record.porcentajegrasa,
        porcentajemusculo: record.porcentajemusculo,
        preexistencias: record.preexistencias,
      }))
      loadError.value = null
    } else {
      studentList.value = []
      loadError.value = response.error
    }
  }

  /** Elimina un estudiante y refresca la lista */
  async function deleteStudentById(studentId) {
    if (!confirm('¿Eliminar este estudiante?')) return
    try {
      // 👉 Antes: deleteOne. Ahora delete
      const response = await window.electronAPI.student.delete(studentId)
      if (response.success && activeGroupId != null) {
        await fetchStudents(activeGroupId)
      } else if (!response.success) {
        console.error('Error al eliminar estudiante:', response.error)
      }
    } catch (err) {
      console.error('Error interno al eliminar estudiante:', err)
    }
  }

  async function updateStudent(data) {
    const response = await window.electronAPI.student.update(data)
    if (response.success && activeGroupId != null) {
      await fetchStudents(activeGroupId)
    }
    return response
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
