<template>
  <div class="min-h-screen bg-sportu-400 py-10 px-6">
    <!-- Breadcrumb -->
    <Breadcrumb
      :items="[
        { label: 'Inicio', to: '/' },
        { label: 'Grupos', to: '/' },
        { label: `Grupo ${groupId}`, to: `/grupos/${groupId}/dashboard` },
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
      <!-- ─── src/views/GrupoDashboard.vue ─── -->
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-sportu-100 text-white text-left">
            <th class="p-2">ID</th>
            <th class="p-2">Nombres</th>
            <th class="p-2">Apellidos</th>
            <th class="p-2">Nacimiento</th>
            <th class="p-2">Género</th>
            <th class="p-2">Peso (kg)</th>
            <th class="p-2">Altura (cm)</th>
            <th class="p-2">% Grasa</th>
            <th class="p-2">% Músculo</th>
            <th class="p-2">Preexistencias</th>
            <th class="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in studentList"
            :key="student.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="p-2">{{ student.id }}</td>
            <td class="p-2">{{ student.firstnames }}</td>
            <td class="p-2">{{ student.lastnames }}</td>
            <td class="p-2">{{ student.birthdate }}</td>
            <td class="p-2">{{ student.gender }}</td>
            <td class="p-2">{{ student.peso }}</td>
            <td class="p-2">{{ student.altura }}</td>
            <td class="p-2">{{ student.porcentajegrasa }}</td>
            <td class="p-2">{{ student.porcentajemusculo }}</td>
            <td class="p-2">{{ student.preexistencias || '–' }}</td>
            <td class="p-2 flex space-x-2">
              <!-- Editar -->
              <button
                type="button"
                @click="editStudent(student.id)"
                class="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                aria-label="Editar estudiante"
              >
                <Icon icon="mdi:pencil" />
              </button>
              <!-- Eliminar -->
              <button
                type="button"
                @click="deleteStudent(student.id)"
                class="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                aria-label="Eliminar estudiante"
              >
                <Icon icon="mdi:delete" />
              </button>
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
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { useStudents } from '@/composables/useStudents'

const router = useRouter()
const route = useRoute()
const groupId = Number(route.params.id)

const { studentList, isLoading, loadError, fetchStudents, deleteStudentById } =
  useStudents()

// Carga inicial
onMounted(() => fetchStudents(groupId))

// Si vuelves del form, recarga
watch(
  () => route.fullPath,
  () => {
    if (!route.query.studentId) fetchStudents(groupId)
  }
)

function goToForm() {
  router.push({ name: 'FormStudent', query: { groupId } })
}

async function deleteStudent(id) {
  await deleteStudentById(id)
}

function editStudent(id) {
  router.push({ name: 'FormStudent', query: { groupId, studentId: id } })
}
</script>

<style scoped>
/* Ajustes si los necesitas */
</style>
