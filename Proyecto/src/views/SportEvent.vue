<script setup>
// js
//import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const title = ref('')
const description = ref('')
const localization = ref('')
const price = ref('')
const date = ref('')
const time = ref('')

const errors = ref({})
const isLoading = ref(false)
const signupMessage = ref('')

function handleSubmit() {
  errors.value = {}
  signupMessage.value = ''

  // Validaciones
  if (!title.value) {
    errors.value.title = 'El titulo del evento es obligatorio.'
  }
  if (!date.value) {
    errors.value.date = 'La fecha del evento es obligatoria.'
  } else {
    const enteredDate = new Date(birthdate.value)
    const today = new Date()
    if (isNaN(enteredDate)) {
      errors.value.birthdate = 'La fecha ingresada no es válida.'
    } else if (enteredDate < today) {
      errors.value.birthdate = 'La fecha del evento no puede ser pasada.'
    }
  }
  // Validación de números
  if (price.value && isNaN(Number(price.value))) {
    errors.value.price = 'El precio debe ser un número válido.'
  }
  if (time.value && isNaN(Number(time.value))) {
    errors.value.time = 'La hora debe ser un número válido.'
  }

  // Si no hay errores, proceder con el registro
  if (Object.keys(errors.value).length === 0) {
    isLoading.value = true
    const data = {
      title: title.value,
      description: description.value,
      localization: localization.value,
      price: price.value,
      date: date.value,
      time: time.value
    }
    window.electronAPI.sportEvent
      .create(data)
      .then(response => {
        if (response.success) {
          signupMessage.value = '¡Registro exitoso! Evento creado correctamente.'
          // Limpiar formulario
          title.value = ''
          description.value = ''
          localization.value = ''
          price.value = ''
          date.value = ''
          time.value = ''
          setTimeout(() => {
            console.log('Evento registrado:', response.user)
          }, 100)
        } else {
          if (typeof response.error === 'object') {
            // Errores de validación
            errors.value = response.error
            signupMessage.value = 'Corrige los errores en el formulario.'
          } else {
            signupMessage.value = `Error: ${response.error}`
          }
        }
      })
      .catch(error => {
        console.error('Error en el registro:', error)
        signupMessage.value = 'Error interno del sistema'
      })
      .finally(() => {
        isLoading.value = false
      })
  }
}
</script>

<template>
  <!-- html -->

  <div
    class="min-h-screen bg-gradient-to-t from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9"
  >
    <div class="flex justify-center">
      <div
        class="card hover:shadow-lg bg-blue-50 transition-shadow w flex-col mx-8 px-8 py-8"
      >
        <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">
          Evento Depotivo
        </h1>

        <div class="grid grid-cols-2 gap-2">
          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Titulo del evento</label>
          <input
            v-model="title"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="text-sm text-red-500 mb-2">
            {{ errors.title }}
          </p>
          </div>
          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
          <input
            v-model="description"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.description }"
          />
          <p v-if="errors.description" class="text-sm text-red-500 mb-2">
            {{ errors.description }}
          </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">

          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Ubicación</label>
          <input
            v-model="localization"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.localization }"
          />
          <p v-if="errors.localization" class="text-sm text-red-500 mb-2">
            {{ errors.localization }}
          </p>
          </div>
          
          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Precio</label>
          <input
            v-model="price"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.price }"
          />

          <p v-if="errors.price" class="text-sm text-red-500 mb-2">
            {{ errors.price }}
          </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
          <input
            v-model="date"
            type="date"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.date }"
          />

          <p v-if="errors.date" class="text-sm text-red-500 mb-2">
            {{ errors.date }}
          </p>
          </div>
          <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Hora</label>  
           <input
            v-model="time"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            :class="{ 'border-red-500': errors.time }"
          />
          <p v-if="errors.time" class="text-sm text-red-500 mb-2">
            {{ errors.time }}
          </p>
          </div>
        </div>
        <div class="flex justify-center p-10 pt-2 gap-7">
          <!-- Botón de registro -->
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isLoading"
            class="w-full bg-sportu-600 hover:bg-sportu-700 disabled:bg-sportu-400 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <span v-if="isLoading">Registrando...</span>
            <span v-else>Registrar</span>
          </button>
        </div>
        <!-- Botón para regresar a la selección de eventos -->
        <h1 class="text-xs font-bold text-secondary-600 mb-2">
          <button
            class="color-blue-600 hover:underline flex"
            @click="$router.push('/selecteventtype')"
          >
            Regresar
          </button>
        </h1>

        <!-- Mensaje de resultado del registro -->
        <div
          v-if="signupMessage"
          class="mt-4 p-3 rounded-md text-center"
          :class="
            signupMessage.includes('exitoso')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          "
        >
          {{ signupMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* css */
</style>
