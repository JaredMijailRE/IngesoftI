<script setup>
// js
//import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Función para crear un evento de tipo deportivo
function goToSportType() {
  router.push('/sportevent')
}

// Función para crear un evento de tipo clase
function goToClassType() {
  router.push('/classevent')
}

</script>

<template>
  <!-- html -->

  <div
    class="min-h-screen bg-gradient-to-t flex items-center justify-center from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9"
  >
    <div class="flex justify-center">
      <div
        class="card hover:shadow-lg bg-blue-50 transition-shadow w flex-col mx-8 px-8 py-8"
      >
        <h1 class="text-2xl text-center font-bold text-gray-700 mb-2">
          Crea un nuevo evento!
        </h1>
        <h1 class="text-1xl font-bold text-secondary-600 mb-2">
          Que tipo de evento quieres crear?
        </h1>
        <!-- Boton para crear un evento de tipo deportivo -->
        <div class="flex justify-center p-2 pt-2 gap-2">
          <button
            type="button"
            @click="goToSportType"
            class="w-full bg-sportu-600 hover:bg-sportu-700 disabled:bg-sportu-400 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <span>Deportivo</span>
          </button>
        </div>
        <!-- Boton para crear un evento de tipo clase -->
        <div class="flex justify-center p-2 pt-2 gap-8 py-2">
          <button
            type="button"
            @click="goToClassType"
            class="w-full bg-sportu-600 hover:bg-sportu-700 disabled:bg-sportu-400 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <span>Clase</span>
          </button>
          </div>
        <!-- Boton para regresar a la página de inicio de sesión -->
        <h1 class="text-xs font-bold text-secondary-600 mb-2">
          <button
            class="color-blue-600 hover:underline flex"
            @click="$router.push('/login')"
          >
            Regresar
          </button>
        </h1>
      </div>
    </div>
  </div>
</template>

<style>
/* css */
</style>
