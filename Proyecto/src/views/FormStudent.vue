<template>
  <div class="min-h-screen bg-gradient-to-t from-sportu-200 via-sportu-300 to-sportu-600 py-9">
    <div class="flex justify-center">
      <div class="card hover:shadow-lg bg-blue-50 transition-shadow w-full max-w-xl mx-8 px-8 py-8 space-y-6">

        <!-- Título -->
        <h1 class="text-2xl text-center font-bold text-gray-700">
          {{ isEditMode ? 'Editar Estudiante' : 'Registro de Estudiante' }}
        </h1>
        <h2 class="text-1xl font-bold text-secondary-600 mb-4">
          {{ isEditMode ? 'Modifica los datos' : 'Crea un nuevo estudiante' }}
        </h2>

        <!-- Identificación -->
        <div>
          <label for="student-id" class="block text-sm font-medium text-gray-700 mb-1">
            Identificación del Estudiante
          </label>
          <input
            id="student-id"
            v-model="form.id"
            type="text"
            required
            class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
            :class="{ 'border-red-500': errors.id }"
          />
          <p v-if="errors.id" class="mt-1 text-sm text-red-500">{{ errors.id }}</p>
        </div>

        <!-- Nombres / Apellidos -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstnames" class="block text-sm font-medium text-gray-700 mb-1">
              Nombres
            </label>
            <input
              id="firstnames"
              v-model="form.firstnames"
              type="text"
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.firstnames }"
            />
            <p v-if="errors.firstnames" class="mt-1 text-sm text-red-500">{{ errors.firstnames }}</p>
          </div>
          <div>
            <label for="lastnames" class="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              id="lastnames"
              v-model="form.lastnames"
              type="text"
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.lastnames }"
            />
            <p v-if="errors.lastnames" class="mt-1 text-sm text-red-500">{{ errors.lastnames }}</p>
          </div>
        </div>

        <!-- Género / Fecha de nacimiento -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <select
              id="gender"
              v-model="form.gender"
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.gender }"
            >
              <option value="" disabled>Selecciona</option>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="O">O</option>
            </select>
            <p v-if="errors.gender" class="mt-1 text-sm text-red-500">{{ errors.gender }}</p>
          </div>
          <div>
            <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Nacimiento
            </label>
            <input
              id="birthdate"
              v-model="form.birthdate"
              type="date"
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.birthdate }"
            />
            <p v-if="errors.birthdate" class="mt-1 text-sm text-red-500">{{ errors.birthdate }}</p>
          </div>
        </div>

        <!-- Peso / Altura -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="peso" class="block text-sm font-medium text-gray-700 mb-1">
              Peso (kg)
            </label>
            <input
              id="peso"
              v-model="form.peso"
              type="number"
              step="0.1"
              min="0"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.peso }"
            />
            <p v-if="errors.peso" class="mt-1 text-sm text-red-500">{{ errors.peso }}</p>
          </div>
          <div>
            <label for="altura" class="block text-sm font-medium text-gray-700 mb-1">
              Altura (cm)
            </label>
            <input
              id="altura"
              v-model="form.altura"
              type="number"
              step="0.1"
              min="0"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.altura }"
            />
            <p v-if="errors.altura" class="mt-1 text-sm text-red-500">{{ errors.altura }}</p>
          </div>
        </div>

        <!-- % Grasa / % Músculo -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="porcentajegrasa" class="block text-sm font-medium text-gray-700 mb-1">
              % Grasa
            </label>
            <input
              id="porcentajegrasa"
              v-model="form.porcentajegrasa"
              type="number"
              step="0.1"
              min="0"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.porcentajegrasa }"
            />
            <p v-if="errors.porcentajegrasa" class="mt-1 text-sm text-red-500">{{ errors.porcentajegrasa }}</p>
          </div>
          <div>
            <label for="porcentajemusculo" class="block text-sm font-medium text-gray-700 mb-1">
              % Músculo
            </label>
            <input
              id="porcentajemusculo"
              v-model="form.porcentajemusculo"
              type="number"
              step="0.1"
              min="0"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
              :class="{ 'border-red-500': errors.porcentajemusculo }"
            />
            <p v-if="errors.porcentajemusculo" class="mt-1 text-sm text-red-500">{{ errors.porcentajemusculo }}</p>
          </div>
        </div>

        <!-- Preexistencias -->
        <div>
          <label for="preexistencias" class="block text-sm font-medium text-gray-700 mb-1">
            Preexistencias Médicas
          </label>
          <input
            id="preexistencias"
            v-model="form.preexistencias"
            type="text"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
            :class="{ 'border-red-500': errors.preexistencias }"
          />
          <p v-if="errors.preexistencias" class="mt-1 text-sm text-red-500">{{ errors.preexistencias }}</p>
        </div>

        <!-- Botones -->
        <div class="flex justify-between items-center mt-6">
          <button
            type="button"
            @click="goBack"
            class="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Regresar
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="isLoading"
            class="px-6 py-2 bg-sportu-600 text-white rounded disabled:opacity-50"
          >
            <span v-if="isLoading">Procesando…</span>
            <span v-else>{{ isEditMode ? 'Actualizar' : 'Registrar' }}</span>
          </button>
        </div>

        <!-- Mensaje -->
        <div
          v-if="signupMessage"
          class="mt-4 p-3 rounded-md text-center"
          :class="signupMessage.includes('exitoso')
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'"
        >
          {{ signupMessage }}
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudents } from '@/composables/useStudents'

const router   = useRouter()
const route    = useRoute()
const { updateStudent } = useStudents()
const groupId  = Number(route.query.groupId)
const studentIdParam = route.query.studentId
const isEditMode     = Boolean(studentIdParam)

if (!groupId) {
  router.replace({ name: 'Grupos' })
}

const form = ref({
  id: '',
  firstnames: '',
  lastnames: '',
  birthdate: '',
  gender: '',
  peso: '',
  altura: '',
  porcentajegrasa: '',
  porcentajemusculo: '',
  preexistencias: ''
})

const errors        = ref({})
const isLoading     = ref(false)
const signupMessage = ref('')

// Carga datos en modo edición
onMounted(async () => {
  if (isEditMode) {
    const { success, students } = await window.electronAPI.student.getAll({ groupId })
    if (success) {
      const record = students.find(s => s.id.toString() === studentIdParam)
      if (record) {
        Object.assign(form.value, {
          id:                String(record.id),
          firstnames:        record.firstnames,
          lastnames:         record.lastnames,
          birthdate:         record.birthdate,
          gender:            record.gender,
          peso:              record.weight,
          altura:            record.height,
          porcentajegrasa:   record.bodyFatPercentage,
          porcentajemusculo: record.muscleMassPercentage,
          preexistencias:    record.medicalConditions
        })
      }
    }
  }
})

function goBack() {
  router.push({ name: 'GrupoDashboard', params: { id: groupId } })
}

function validateForm() {
  errors.value = {}
  if (!form.value.id)         errors.value.id           = 'La identificación es obligatoria.'
  if (!form.value.firstnames) errors.value.firstnames   = 'El nombre es obligatorio.'
  if (!form.value.lastnames)  errors.value.lastnames    = 'El apellido es obligatorio.'
  if (!form.value.birthdate)  errors.value.birthdate    = 'La fecha de nacimiento es obligatoria.'
  if (!form.value.gender)     errors.value.gender       = 'El género es obligatorio.'

  ['peso','altura','porcentajegrasa','porcentajemusculo']
    .forEach(field => {
      const val = form.value[field]
      if (val === '') {
        form.value[field] = null
      } else if (isNaN(Number(val))) {
        errors.value[field] = 'Debe ser un número válido.'
      }
    })

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) {
    signupMessage.value = 'Corrige los errores en el formulario.'
    return
  }

  isLoading.value = true
  signupMessage.value = ''

  const payload = {
    id:                Number(form.value.id),
    groupId,
    firstnames:        form.value.firstnames,
    lastnames:         form.value.lastnames,
    birthdate:         form.value.birthdate,
    gender:            form.value.gender,
    peso:              form.value.peso != null ? Number(form.value.peso) : null,
    altura:            form.value.altura != null ? Number(form.value.altura) : null,
    porcentajegrasa:   form.value.porcentajegrasa != null ? Number(form.value.porcentajegrasa) : null,
    porcentajemusculo: form.value.porcentajemusculo != null ? Number(form.value.porcentajemusculo) : null,
    preexistencias:    form.value.preexistencias || null
  }

  try {
    const response = isEditMode
      ? await updateStudent(payload)
      : await window.electronAPI.student.create(payload)

    if (!response.success) {
      if (typeof response.error === 'object') {
        errors.value = response.error
        signupMessage.value = 'Corrige los errores en el formulario.'
      } else {
        signupMessage.value = response.error
      }
      return
    }

    signupMessage.value = isEditMode ? '¡Actualizado exitosamente!' : '¡Registro exitoso!'
    setTimeout(goBack, 800)
  } catch (e) {
    console.error(e)
    signupMessage.value = 'Error interno del sistema.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Ajustes adicionales si los necesites */
</style>