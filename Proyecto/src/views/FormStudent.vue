<script setup>
// js
//import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'



const email = ref('')
const preexistencias = ref('')
const firstnames = ref('')
const lastnames = ref('')
const birthdate = ref('')
const gender = ref('')
const altura = ref('')
const id = ref('')
const peso = ref('')
const porcentajegrasa = ref('')
const porcentajemusculo = ref('')

const errors = ref([])
const isLoading = ref(false)
const signupMessage = ref('')

function handleSubmit() {
  errors.value = {}
  signupMessage.value = ''

  // Validaciones
  if (!email.value) {
    errors.value.email = 'El correo es obligatorio.'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.value.email = 'El correo no es válido.'
  }
  
  if (!id.value) {
    errors.value.id = 'La identificación del estudiante es obligatoria.'
  }

  if (!firstnames.value) {
    errors.value.firstnames = 'El nombre es obligatorio.'
  }

  if (!lastnames.value) {
    errors.value.lastnames = 'El apellido es obligatorio.'
  }

  if (!birthdate.value) {
    errors.value.birthdate = 'La fecha de nacimiento es obligatoria.'
  } else {
    const enteredDate = new Date(birthdate.value)
    const today = new Date()

    if (isNaN(enteredDate)) {
      errors.value.birthdate = 'La fecha ingresada no es válida.'
    }else if (enteredDate > today) {
    errors.value.birthdate = 'La fecha de nacimiento no puede ser futura.'
    }

  }

  if (!gender.value) {
    errors.value.gender = 'El genero es obligatorio.'
  }

  // Si no hay errores, proceder con el registro
  if (Object.keys(errors.value).length === 0) {
    isLoading.value = true

    // Preparar datos para el registro
    const Estudiantedata = {
      email: email.value,
      id: id.value,
      firstnames: firstnames.value,
      lastnames: lastnames.value,
      birthdate: birthdate.value,
      gender: gender.value,
      preexistencias: preexistencias.value,
      altura: altura.value,   
      peso: peso.value,
      porcentajegrasa: porcentajegrasa.value,
      porcentajemusculo: porcentajemusculo.value
    }

    // Llamar al método de registro
    window.electronAPI.auth
      .signupEstudiante(Estudiantedata)
      .then(response => {
        if (response.success) {
          signupMessage.value = '¡Registro exitoso! Bienvenido a SportU'
          // Limpiar formulario
          email.value = ''
          id.value = ''
          firstnames.value = ''
          lastnames.value = ''
          birthdate.value = ''
          gender.value = ''
          peso.value = ''
          altura.value = ''
          porcentajegrasa.value = ''
          porcentajemusculo.value = ''
          preexistencias.value = ''

          //
          setTimeout(() => {
            // Aquí podrías redirigir a la página principal o dashboard
            console.log('Usuario registrado:', response.user)
          }, 100)
        } else {
          signupMessage.value = `Error: ${response.error}`
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

  <div class="min-h-screen bg-gradient-to-t from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9">
    <div class="flex justify-center">
      <div class="card hover:shadow-lg bg-blue-50 transition-shadow w flex-col mx-8 px-8 py-8">
        <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">
          Registro de Estudiante
        </h1>
        <h1 class="text-1xl font-bold text-secondary-600 mb-2">
          Crea un nuevo estudiante
        </h1>
        <div class="grid grid-cols-2 gap-2">

            <input
            v-model="firstnames"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            placeholder="Nombres"
            :class="{ 'border-red-500': errors.firstnames }"
            />
            <p v-if="errors.firstnames" class="text-sm text-red-500 mb-2">
            {{ errors.firstnames }}
            </p>

            <input
            v-model="lastnames"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            placeholder="Apellidos"
            :class="{ 'border-red-500': errors.lastnames }"
            />
            <p v-if="errors.lastnames" class="text-sm text-red-500 mb-2">
            {{ errors.lastnames }}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-2">
            <input
                v-model="email"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
                placeholder="Correo del Estudiante"
                :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-sm text-red-500 mb-2">
                {{ errors.email }}
                </p>
            <input
                v-model="id"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
                placeholder="Identificación del Estudiante"
                :class="{ 'border-red-500': errors.id }"
                />
                <p v-if="errors.id" class="text-sm text-red-500 mb-2">
                {{ errors.id }}
                </p>
        </div>


        <div class='grid grid-cols-2 gap-2'>
            <input 
            v-model="gender" 
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Genero":class="{'border-red-500':errors.gender}">
            
            <p v-if="errors.gender" class="text-sm text-red-500 mb-2">{{ errors.gender }}</p>

            <input 
            v-model="birthdate" 
            type="date" 
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" 
            placeholder="Fecha de Nacimiento"
            :class="{'border-red-500':errors.birthdate}">
                
            <p v-if="errors.birthdate" class="text-sm text-red-500 mb-2">
            {{ errors.birthdate }}
            </p>
        </div>

        <div class='grid grid-cols-2 gap-2'>
            <input
            v-model="peso"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            placeholder="Peso (Kg)"
            :class="{ 'border-red-500': errors.peso }"
            />
            <p v-if="errors.peso" class="text-sm text-red-500 mb-2">
                {{ errors.peso }}
            </p>
            
            <input
            v-model="altura"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
            placeholder="Altura (cm)"
            :class="{ 'border-red-500': errors.altura }"
          />
          <p v-if="errors.altura" class="text-sm text-red-500 mb-2">
            {{ errors.altura }}
          </p>

        </div>

        <div class='grid grid-cols-2 gap-2'>
            <input 
            v-model="porcentajegrasa" 
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" 
            placeholder="Porcentaje Grasa Corporal"
            :class="{'border-red-500':errors.porcentajegrasa}">
            
            <p v-if="errors.porcentajegrasa" class="text-sm text-red-500 mb-2">{{ errors.porcentajegrasa }}</p>

            <input 
            v-model="porcentajemusculo" 
            
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" 
            placeholder="Porcentaje Masa Muscular"
            :class="{'border-red-500':errors.porcentajemusculo}">
                
            <p v-if="errors.porcentajemusculo" class="text-sm text-red-500 mb-2">
            {{ errors.porcentajemusculo }}
            </p>
        </div>
        <input
                v-model="preexistencias"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
                placeholder="Preexistencias Médicas"
                :class="{ 'border-red-500': errors.preexistencias }"
                />
                <p v-if="errors.preexistencias" class="text-sm text-red-500 mb-2">
                {{ errors.preexistencias }}
                </p>


        <div class="flex justify-center p-10 pt-2 gap-7">
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
        <h1 class="text-xs font-bold text-secondary-600 mb-2">
          <button class ='color-blue-600 hover:underline flex'
            @click="$router.push('/login')">
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
