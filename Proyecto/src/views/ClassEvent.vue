<script setup>
// js
//import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

const groupid = ref('')
const planid = ref('')
const date = ref('')
const recurrence = ref('')
const starttime = ref('')
const finishtime = ref('')
const recurrenceDays = ref([]) // Array de strings, ej: ['L', 'M', 'V']

const daysOfWeek = [
  { label: 'L', value: 'Lunes' },
  { label: 'Ma', value: 'Martes' },
  { label: 'Mi', value: 'Miércoles' },
  { label: 'J', value: 'Jueves' },
  { label: 'V', value: 'Viernes' },
  { label: 'S', value: 'Sábado' },
  { label: 'D', value: 'Domingo' },
]

const errors = ref({})
const isLoading = ref(false)
const signupMessage = ref('')

const { getCurrentUser, getUserGrupos, getUserPlanes, getPlanes } = useApi()

const planes = ref([])

const user = ref({
  username: '',
  grupos: [],
  planes: [],
  gruposIds: [], // Aquí se guardan las PK de grupos
  planesIds: [], // Aquí se guardan las PK de eventos
})

const router = useRouter()

// Función para ir a seleccionar tipo de evento
function goToEventType() {
  router.push('/selecteventtype')
}

onMounted(async () => {
  try {
    const userResponse = await getCurrentUser()
    if (!userResponse) {
      console.warn('No se encontró usuario')
      return
    }

    user.value.username = userResponse.username || ''

    const gruposResponse = await getUserGrupos()
    user.value.grupos = gruposResponse.data || []
    user.value.gruposIds = user.value.grupos.map(g => g.id) // ← Extraer PKs

    try {
      console.log('Entrando a onMounted')
      const res = await getPlanes()
      console.log('Planes recibidos:', res)
      planes.value = res
      console.log('planes.value:', planes.value)
    } catch (err) {
      console.error('Error cargando datos del usuario:', err)
    }

    // const planesResponse = await getPlanes()
    // console.log('Planes recibidos:', planesResponse)
    // planes.value = planesResponse
    //user.value.planes = planesResponse.data || []
    user.value.planesIds = user.value.planes.map(e => e.id) // ← Extraer PKs
  } catch (err) {
    console.error('Error cargando datos del usuario:', err)
  }
})

function toggleDay(dia) {
  const idx = recurrenceDays.value.indexOf(dia)
  if (idx === -1) {
    recurrenceDays.value.push(dia)
  } else {
    recurrenceDays.value.splice(idx, 1)
  }
}
function handleSubmit() {
  errors.value = {}
  signupMessage.value = ''

  // Validaciones
  if (!groupid.value) {
    errors.value.groupid = 'El titulo del evento es obligatorio.'
  }
  if (!planid.value) {
    errors.value.planid = 'La fecha del evento es obligatoria.'
  } else {
    const enteredDate = new Date(date.value)
    const today = new Date()
    if (isNaN(enteredDate)) {
      errors.value.date = 'La fecha ingresada no es válida.'
    } else if (enteredDate < today) {
      errors.value.date = 'La fecha del evento no puede ser pasada.'
    }
  }
  if (!starttime.value) {
    errors.value.starttime = 'El inicio del evento es obligatorio.'
  }

  // Si no hay errores, proceder con el registro
  if (Object.keys(errors.value).length === 0) {
    isLoading.value = true
    const data = {
      groupid: groupid.value,
      planid: planid.value,
      date: date.value,
      recurrence: recurrenceDays.value.join(' '),
      starttime: starttime.value,
      finishtime: finishtime.value,
    }
    window.electronAPI.classEvent
      .create(data)
      .then(response => {
        if (response.success) {
          signupMessage.value = '¡Registro exitoso! Clase creada correctamente.'
          // Limpiar formulario
          groupid.value = ''
          planid.value = ''
          date.value = ''
          recurrence.value = ''
          recurrenceDays.value = []
          starttime.value = ''
          finishtime.value = ''
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
        class="card hover:shadow-lg bg-blue-50 transition-shadow w-1/2 flex-col mx-8 px-8 py-8"
      >
        <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">
          Evento Clase
        </h1>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Id del Grupo</label
            >
            <select
              v-model="groupid"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
              :class="{ 'border-red-500': errors.groupid }"
            >
              <option value="">Seleccionar un Grupo</option>
              <option
                v-for="grupo in user.grupos"
                :key="grupo.id"
                :value="grupo.id"
              >
                {{ grupo.nombre }}
              </option>
            </select>
            <p v-if="errors.groupid" class="text-sm text-red-500 mb-2">
              {{ errors.groupid }}
            </p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Id Plan</label
            >

            <select
              v-model="planid"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
              :class="{ 'border-red-500': errors.planid }"
            >
              <option value="">Selecciona un plan</option>
              <option v-for="plan in planes" :key="plan.id" :value="plan.id">
                {{ plan.name }}
              </option>
            </select>
            <p v-if="errors.planid" class="text-sm text-red-500 mb-2">
              {{ errors.planid }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Fecha</label
            >
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
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Se repite?</label
            >
            <select
              v-model="recurrence"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
              :class="{ 'border-red-500': errors.recurrence }"
            >
              <option value="">Seleccionar</option>
              <option value="y">Sí</option>
              <option value="n">No</option>
            </select>

            <p v-if="errors.recurrence" class="text-sm text-red-500 mb-2">
              {{ errors.recurrence }}
            </p>
          </div>
        </div>
        <!-- Selección de días de la semana en la cual se repite -->
        <div v-if="recurrence === 'y'" class="flex justify-center gap-2 my-2">
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Selecciona los días que se repite</label
          >
        </div>
        <div v-if="recurrence === 'y'" class="flex justify-center gap-2 my-2">
          <button
            v-for="dia in daysOfWeek"
            :key="dia.label"
            type="button"
            :class="[
              'px-3 py-1 rounded border',
              recurrenceDays.includes(dia.label)
                ? 'bg-sportu-600 text-white'
                : 'bg-white text-sportu-600 border-sportu-600',
            ]"
            @click="toggleDay(dia.label)"
          >
            {{ dia.label }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Hora Inicio</label
            >
            <input
              v-model="starttime"
              type="time"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
              :class="{ 'border-red-500': errors.starttime }"
            />

            <p v-if="errors.starttime" class="text-sm text-red-500 mb-2">
              {{ errors.starttime }}
            </p>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Hora fin</label
            >
            <input
              v-model="finishtime"
              type="time"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2"
              :class="{ 'border-red-500': errors.finishtime }"
            />
            <p v-if="errors.finishtime" class="text-sm text-red-500 mb-2">
              {{ errors.finishtime }}
            </p>
          </div>
        </div>

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
          <button
            class="color-blue-600 hover:underline flex"
            @click="goToEventType"
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
