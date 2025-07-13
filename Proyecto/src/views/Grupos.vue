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
    <Breadcrumb :items="[
        { label: 'Inicio', to: '/' },
        { label: 'Grupos' }
        ]" />
    <div v-for="grupo in grupos" :key="grupo.id" class="mb-6">
      <button
        @click="toggleGrupo(grupo.id)"
        class="bg-white text-left w-full px-6 py-4 text-xl font-semibold shadow-md rounded-lg flex justify-between items-center"
      >
        {{ grupo.nombre }}
        <span class="text-gray-400 text-2xl">
          <Icon :icon="grupoExpandido === grupo.id ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
        </span>
      </button>

      <div
        v-if="grupoExpandido === grupo.id"
        class="bg-white mt-2 p-6 rounded-lg shadow-inner flex flex-col"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ grupo.curso }}</h2>
          <button
            @click="irAGrupo(grupo.id)"
            class="bg-emerald-600 text-white font-semibold px-4 py-1.5 rounded hover:bg-emerald-700"
          >
            Ir a Grupo
          </button>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Listado -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-medium">Listado ({{ grupo.listado.length }})</h3>
              <a href="#" class="text-sm text-sportu-600 hover:underline">Ver stats</a>
            </div>
            <ul class="space-y-2">
              <li v-for="(nombre, i) in grupo.listado" :key="i" class="bg-gray-100 p-2 rounded">
                {{ nombre }}
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

<style scoped>
/* Si tienes colores personalizados como sportu-600, asegúrate que están definidos en tailwind.config.js */
</style>