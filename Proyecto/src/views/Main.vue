<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const usuario = ref({
  username: 'admin',
  grupos: [
    { id: 1, nombre: 'Grupo A' },
    { id: 2, nombre: 'Grupo B' },
    { id: 3, nombre: 'Grupo C' },
    { id: 4, nombre: 'Grupo D' },
    { id: 5, nombre: 'Grupo E' },
    { id: 6, nombre: 'Grupo F' }
  ],
  eventos: [
    { id: 1, nombre: 'Evento 1', fecha: '2025-9-01'  },
    { id: 2, nombre: 'Evento 2', fecha: '2025-10-15' },
    { id: 3, nombre: 'Evento 3', fecha: '2025-11-01' },
    { id: 4, nombre: 'Evento 4', fecha: '2025-12-20' },
    { id: 5, nombre: 'Evento 5', fecha: '2026-01-05' }
  ]
})

const toGrupo = (id) => {
  // Hacer el código cuando este lo de los grupos
  console.log('Navegando al grupo con ID: ', id)
}

const toEvento = (id) => {
  // Hacer el código cuando este lo de los eventos
  console.log('Navegando al evento con ID: ', id)
}

const toCrearGrupo = () => {
  // Hacer el código cuando este lo de crear grupo
  console.log('Navegando a crear un nuevo grupo')
}

const toAgregarEvento = () => {
  // Hacer el código cuando este lo de agregar evento
  console.log('Navegando a agregar un nuevo evento')
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-tr from-sportu-100 from-10% via-sportu-400 via-20% to-sportu-700 p-1">
  <div class="bg-white shadow-md rounded-lg my-10 mx-10 p-2 flex items-center justify-center">

    <div class="container mx-auto px-4 py-3">
      <div class="text-left mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-700 my-4">
          Welcome, <span class="text-sportu-600">{{ usuario.username }}</span>!
        </h1>
      </div>
      
      <!-- Elementos de la Página (Grupos y Eventos) -->
      <hr class="divider mb-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 mx-4" :style="{ minHeight: '369px' }">

        <div class="card p-6 shadow-lg transition-shadow">
          <div class="rounded-lg flex items-center justify-left mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="mdi:format-list-bulleted" class="w-6 h-6 text-sportu-700" />
            </div>
            <h3 class="text-xl font-semibold mb-4 ml-3">Grupos</h3>
          </div>

          <div v-if="usuario.grupos.length != 0">
            <ul>
              <li v-for="grupo in usuario.grupos.slice(0,4)" :key="grupo.id" class="text-gray-600 mb-2">
                <button class="btn-primary bg-sportu-500 w-full px-5 py-3 text-lg hover:bg-sportu-700" @click="toGrupo(grupo.id)">
                  {{ grupo.nombre }}
                </button>
              </li>
            </ul>
          </div>
          <div v-else class="text-gray-600 flex flex-col items-center justify-center h-48">
            <p class="text-gray-500">No tienes grupos asignados</p>
            <button class="bg-white hover:bg-sportu-100 text-gray-400 font-bold px-2.5 py-1 rounded-full" @click="toCrearGrupo()">+</button>
          </div>
        </div>

        <div class="card p-6 shadow-lg transition-shadow">
          <div class="rounded-lg flex items-center justify-left mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="material-symbols:assignment-outline" class="w-6 h-6 text-sportu-700" />
            </div>
            <h3 class="text-xl font-semibold mb-4 ml-3">Eventos</h3>
          </div>

          <div v-if="usuario.eventos.length != 0">
            <ul>
              <li v-for="evento in usuario.eventos.slice(0,3)" :key="evento.id" class="text-gray-600 mb-2">
                <button class="btn-primary bg-sportu-500 w-full px-5 py-3.5 text-lg hover:bg-sportu-700" @click="toEvento(evento.id)">
                  <div class="column">  <p>{{ evento.nombre }}</p>   <p class="text-sportu-100 text-xs">{{ evento.fecha }}</p>  </div>
                </button>
              </li>
            </ul>
          </div>
          <div v-else class="text-gray-600 flex flex-col items-center justify-center h-48">
            <p class="text-gray-500">No tienes eventos programados</p>
            <button class="bg-white hover:bg-sportu-100 text-gray-400 font-bold px-2.5 py-1 rounded-full" @click="toAgregarEvento()">+</button>
          </div>
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