<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const route = useRoute()
const grupoId = route.params.id

const nombreGrupo = ref('') // ✅ Asegúrate de declarar esto

const gruposMock = [
  { id: 1, nombre: 'Grupo Ciclismo Avanzado' },
  { id: 2, nombre: 'Grupo Ciclismo Base' },
  { id: 3, nombre: 'Grupo de Resistencia' }
]

const grupo = gruposMock.find(g => g.id === Number(grupoId))
nombreGrupo.value = grupo ? grupo.nombre : `Grupo ${grupoId}`

const estudiantes = ref([])

const cargarEstudiantes = () => {
  estudiantes.value = [
    {
      id: 1,
      first_name: 'Ana',
      last_name: 'Martínez',
      birth_date: '2005-06-15',
      gender: 'F',
      weight: 60.5,
      height: 165.3,
      body_fat_percentage: 22.5,
      muscle_mass_percentage: 38.2
    },
    {
      id: 2,
      first_name: 'Carlos',
      last_name: 'Ramírez',
      birth_date: '2003-09-20',
      gender: 'M',
      weight: 72.4,
      height: 178.6,
      body_fat_percentage: 18.9,
      muscle_mass_percentage: 42.1
    }
  ]
}

const calcularEdad = (fechaNacimiento) => {
  return dayjs().diff(dayjs(fechaNacimiento), 'year')
}

onMounted(() => {
  cargarEstudiantes()
})
</script>


<template>
  <div class="min-h-screen bg-sportu-400 py-10 px-6">
    <Breadcrumb :items="[
    { label: 'Inicio', to: '/' },
    { label: 'Grupos', to: '/grupos' },
    { label: nombreGrupo }
    ]" />

    <h1 class="text-3xl font-bold text-white mb-6">{{ nombreGrupo }}</h1>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Listado de Estudiantes</h2>
      <div v-if="estudiantes.length > 0" class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse">
          <thead>
            <tr class="bg-sportu-100 text-white text-left">
              <th class="p-2">Nombre</th>
              <th class="p-2">Edad</th>
              <th class="p-2">Género</th>
              <th class="p-2">Peso (kg)</th>
              <th class="p-2">Altura (cm)</th>
              <th class="p-2">% Grasa</th>
              <th class="p-2">% Músculo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="est in estudiantes" :key="est.id" class="border-b hover:bg-gray-100">
              <td class="p-2">{{ est.first_name }} {{ est.last_name }}</td>
              <td class="p-2">{{ calcularEdad(est.birth_date) }}</td>
              <td class="p-2">{{ est.gender }}</td>
              <td class="p-2">{{ est.weight }}</td>
              <td class="p-2">{{ est.height }}</td>
              <td class="p-2">{{ est.body_fat_percentage }}%</td>
              <td class="p-2">{{ est.muscle_mass_percentage }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-gray-500 text-center py-10">No hay estudiantes registrados en este grupo.</div>
    </div>
  </div>
</template>