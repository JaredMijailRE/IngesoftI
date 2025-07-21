<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const router = useRouter()

const grupos = ref([
  {
    id: 1,
    nombre: 'Grupo 1',
    curso: 'Curso de ciclismo avanzado',
    listado: ['Ana', 'Luis', 'Carlos', 'Valeria'],
    planes: ['Fondo largo', 'Intervalos', 'Rodaje suave']
  },
  {
    id: 2,
    nombre: 'Grupo 2',
    curso: 'Ciclismo base y técnica',
    listado: ['Pedro', 'Marta', 'Raúl'],
    planes: ['Técnica', 'Subidas', 'Descanso activo']
  },
  {
    id: 3,
    nombre: 'Grupo 3',
    curso: 'Resistencia y fuerza',
    listado: ['Lucía', 'Andrés', 'Sofía'],
    planes: ['Fuerza en cuestas', 'Rodaje largo']
  }
])

const grupoExpandido = ref(null)

const toggleGrupo = (id) => {
  grupoExpandido.value = grupoExpandido.value === id ? null : id
}

const irAGrupo = (id) => {
  router.push({ name: 'GrupoDashboard', params: { id } })
}
</script>

<template>
  <div class="min-h-screen bg-sportu-400 py-10 px-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Inicio', to: '/' }, { label: 'Grupos' }]" />


    <!-- Botón Nuevo Grupo -->
    <div class="flex justify-end mb-4">
      <button
        @click="toggleGrupo(grupo.id)"
        class="bg-white text-left w-full px-6 py-4 text-xl font-semibold shadow-md rounded-lg flex justify-between items-center"
      >
        {{ grupo.nombre }}
        <span class="text-gray-400 text-2xl">
          <Icon :icon="grupoExpandido === grupo.id ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
        </span>
      </button>
    </div>


    <!-- Cargando / Error -->
    <div v-if="isLoading" class="text-white">Cargando grupos…</div>
    <div v-else-if="loadError" class="text-red-200">{{ loadError }}</div>


    <!-- Lista de Grupos -->
    <div v-else class="space-y-4 mt-6">
      <BaseCard
        v-for="group in groups"
        :key="group.id"
        class="transition-shadow"
      >
        <!-- Header clickeable + botón Ir a Grupo -->
        <template #header>
          <div class="w-full flex justify-between items-center px-4 py-3">
            <button
              @click="toggle(group.id)"
              class="flex-1 text-left"
            >
              <span class="text-lg font-semibold text-gray-800">
                {{ group.name }}
              </span>
            </button>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="goToDashboard(group.id)"
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1 rounded"
              >
                Ir a Grupo
              </button>
              <Icon
                @click="toggle(group.id)"
                :icon="expandedId === group.id ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="text-2xl text-gray-600 cursor-pointer"
              />
            </div>
          </div>
        </template>


        <!-- Body con preview de estudiantes -->
        <template #body v-if="expandedId === group.id">
          <div class="p-4 bg-white rounded-b-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-3">
              {{ group.objectives || 'Sin objetivos definidos' }}
            </h2>


            <ul class="space-y-2 mb-4">
              <li
                v-for="stu in group.students"
                :key="stu.id"
                class="border p-2 rounded"
              >
                {{ stu.firstName }} {{ stu.lastName }}
              </li>
            </ul>
          </div>

          <!-- Planes -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Planes de entreno ({{ grupo.planes.length }})</h3>
              <button class="text-xl text-gray-500 hover:text-sportu-600">+</button>
            </div>
            <ul class="space-y-2">
              <li v-for="(plan, i) in grupo.planes" :key="i" class="bg-gray-100 p-2 rounded">
                {{ plan }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref }               from 'vue'
import { useRouter }         from 'vue-router'
import { Icon }              from '@iconify/vue'
import Breadcrumb            from '@/components/ui/Breadcrumb.vue'
import BaseCard              from '@/components/BaseCard.vue'
import { useGroups }         from '@/composables/useGroups'


const router = useRouter()
const { groups, isLoading, loadError } = useGroups()
const expandedId = ref(null)


function toggle(id) {
  expandedId.value = expandedId.value === id ? null : id
}


function goToNewGroup() {
  router.push({ name: 'FormGroup' })
}


function goToDashboard(id) {
  router.push({ name: 'GrupoDashboard', params: { id } })
}
</script>


<style scoped>
/* Si tienes colores personalizados como sportu-600, asegúrate que están definidos en tailwind.config.js */
</style>



