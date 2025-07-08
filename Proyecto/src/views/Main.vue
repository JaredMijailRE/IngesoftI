<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const nombre = ref('Nicolas')
const grupos = ref([
  { id: 1, nombre: 'Grupo A' },
  { id: 2, nombre: 'Grupo B' },
  { id: 3, nombre: 'Grupo C' },
  { id: 4, nombre: 'Grupo D' }
])
const eventos = ref([
  { id: 1, nombre: 'Evento 1', fecha: '2025-9-01'  },
  { id: 2, nombre: 'Evento 2', fecha: '2025-10-15' },
  { id: 3, nombre: 'Evento 3', fecha: '2025-11-01' }
])

const toGrupo = (id) => {
  // Hacer el código cuando este lo de los grupos
  console.log('Navegando al grupo con ID: ', id)
}

const toEvento = (id) => {
  // Hacer el código cuando este lo de los eventos
  console.log('Navegando al evento con ID: ', id)
}



</script>

<template>
  <div class="min-h-screen bg-gradient-to-tr from-sportu-600 from-10% via-primary-400 via-80% to-primary-400 p-1">
  <div class="bg-white shadow-md rounded-lg my-auto mx-auto mt-10 mx-10 p-2">

    <div class="container mx-auto px-4 py-3">
      <div class="text-left mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-700 mb-4 mt-4">
          Welcome, <span class="text-primary-600">{{ nombre }}</span>!
        </h1>
      </div>
      
      <!-- Elementos de la Página (Grupos y Eventos) -->
      <hr class="divider mb-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 mx-4">

        <div class="card p-6 shadow-lg transition-shadow">
          <div class="rounded-lg flex items-center justify-left mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="mdi:format-list-bulleted" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4 ml-3">Grupos</h3>
          </div>

          <ul>
            <li v-for="grupo in grupos" :key="grupo.id" class="text-gray-600 mb-2">
              <button class="btn-primary bg-sportu-50 w-full px-5 py-3 text-lg hover:shadow-lg" @click="toGrupo(grupo.id)">
                {{ grupo.nombre }}
              </button>
            </li>
          </ul>
        </div>

        <div class="card p-6 shadow-lg transition-shadow">
          <div class="rounded-lg flex items-center justify-left mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="material-symbols:assignment-outline" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-4 ml-3">Eventos</h3>
          </div>

          <ul>
            <li v-for="evento in eventos" :key="evento.id" class="text-gray-600 mb-2">
              <button class="btn-primary bg-sportu-50 w-full px-5 py-3 text-lg hover:shadow-lg" @click="toEvento(evento.id)">
                <div class="column">  <p>{{ evento.nombre }}</p>   <p class="text-sportu-600 text-xs">{{ evento.fecha }}</p>  </div>
              </button>
            </li>
          </ul>
        </div>
        
      </div>

    </div>

  </div>
  </div>
</template>

<style scoped>

.divider {
  border: none;
  border-top: 2px solid rgba(0, 0, 0, 0.100); 
}

</style>