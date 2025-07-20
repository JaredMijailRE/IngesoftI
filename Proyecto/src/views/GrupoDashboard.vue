<template>
  <div class="min-h-screen bg-sportu-400 py-10 px-6">
    <!-- Breadcrumb -->
    <Breadcrumb
      :items="[
        { label: 'Inicio', to: '/' },
        { label: 'Grupos', to: '/' },
        { label: `Grupo ${groupId}`, to: `/grupos/${groupId}/dashboard` }
      ]"
    />

    <!-- Título y botón Nuevo estudiante -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">
        Estudiantes — Grupo {{ groupId }}
      </h1>
      <button
        @click="goToForm"
        class="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded"
      >
        <Icon icon="mdi:account-plus-outline" class="mr-2" />
        Nuevo estudiante
      </button>
    </div>

    <!-- Estado de carga / error -->
    <div v-if="isLoading" class="text-white">Cargando estudiantes…</div>
    <div v-else-if="loadError" class="text-red-200">{{ loadError }}</div>

    <!-- Tabla de estudiantes -->
    <div
      v-else-if="studentList.length"
      class="bg-white rounded-lg shadow-lg p-6 overflow-x-auto"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombres
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellidos
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de nacimiento
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Género
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peso
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Altura
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              % Grasa
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              % Músculo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preexistencias
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="s in studentList"
            :key="s.id"
            class="hover:bg-gray-100 cursor-pointer"
            @click="editStudent(s.id)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.firstnames }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.lastnames }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.birthdate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.gender }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.peso }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.altura }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.porcentajegrasa }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.porcentajemusculo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ s.preexistencias || '–' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensaje cuando no hay estudiantes -->
    <div
      v-else
      class="text-gray-500 text-center py-10 bg-white rounded-lg shadow-lg"
    >
      No hay estudiantes registrados en este grupo.
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch }    from 'vue'
import { useRoute, useRouter }  from 'vue-router'
import { Icon }                 from '@iconify/vue'
import Breadcrumb               from '@/components/ui/Breadcrumb.vue'
import { useStudents }          from '@/composables/useStudents'

const router   = useRouter()
const route    = useRoute()
const groupId  = Number(route.params.id)

const {
  studentList,
  isLoading,
  loadError,
  fetchStudents,
  deleteStudentById
} = useStudents()

// Carga inicial
onMounted(() => fetchStudents(groupId))

// Si vuelves del form, recarga
watch(() => route.fullPath, () => {
  if (!route.query.studentId) fetchStudents(groupId)
})

function goToForm() {
  router.push({ name: 'FormStudent', params: { id: groupId } })
}

async function deleteStudent(id) {
  await deleteStudentById(id)
}

function editStudent(id) {
  router.push({ name: 'FormStudent', params: { id: groupId }, query: { studentId: id } })
}
</script>

<style scoped>
/* Ajustes si los necesitas */
</style>
