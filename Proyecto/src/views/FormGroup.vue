<!-- src/views/FormStudent.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-t from-sportu-200 via-sportu-300 to-sportu-600 py-9 flex justify-center">
    <div class="card hover:shadow-lg bg-blue-50 transition-shadow w-full max-w-xl mx-4 px-8 py-8 space-y-6">

      <!-- Título -->
      <h1 class="text-2xl text-center font-bold text-gray-700">
        {{ isEditMode ? 'Editar Estudiante' : 'Registro de Estudiante' }}
      </h1>
      <h2 class="text-lg font-semibold text-secondary-600">
        {{ isEditMode ? 'Modifica los datos' : 'Crea un nuevo estudiante' }}
      </h2>

      <!-- Formulario -->
      <div class="space-y-4">
        <div>
          <label for="student-id" class="block text-sm font-medium text-gray-700 mb-1">
            Identificación del Estudiante
          </label>
          <input
            id="student-id"
            v-model="form.id"
            type="text"
            placeholder="Identificación del Estudiante"
            :class="inputClass(errors.id)"
          />
          <p v-if="errors.id" class="mt-1 text-sm text-red-500">{{ errors.id }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstnames" class="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
            <input
              id="firstnames"
              v-model="form.firstnames"
              type="text"
              placeholder="Nombres"
              :class="inputClass(errors.firstnames)"
            />
            <p v-if="errors.firstnames" class="mt-1 text-sm text-red-500">{{ errors.firstnames }}</p>
          </div>
          <div>
            <label for="lastnames" class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input
              id="lastnames"
              v-model="form.lastnames"
              type="text"
              placeholder="Apellidos"
              :class="inputClass(errors.lastnames)"
            />
            <p v-if="errors.lastnames" class="mt-1 text-sm text-red-500">{{ errors.lastnames }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <select
              id="gender"
              v-model="form.gender"
              :class="inputClass(errors.gender)"
            >
              <option value="" disabled>Selecciona</option>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="O">O</option>
            </select>
            <p v-if="errors.gender" class="mt-1 text-sm text-red-500">{{ errors.gender }}</p>
          </div>
          <div>
            <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
            <input
              id="birthdate"
              v-model="form.birthdate"
              type="date"
              :class="inputClass(errors.birthdate)"
            />
            <p v-if="errors.birthdate" class="mt-1 text-sm text-red-500">{{ errors.birthdate }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="peso" class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              id="peso"
              v-model="form.peso"
              type="number" step="0.1" min="0"
              placeholder="Peso (kg)"
              :class="inputClass(errors.peso)"
            />
            <p v-if="errors.peso" class="mt-1 text-sm text-red-500">{{ errors.peso }}</p>
          </div>
          <div>
            <label for="altura" class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <input
              id="altura"
              v-model="form.altura"
              type="number" step="0.1" min="0"
              placeholder="Altura (cm)"
              :class="inputClass(errors.altura)"
            />
            <p v-if="errors.altura" class="mt-1 text-sm text-red-500">{{ errors.altura }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="porcentajegrasa" class="block text-sm font-medium text-gray-700 mb-1">% Grasa</label>
            <input
              id="porcentajegrasa"
              v-model="form.porcentajegrasa"
              type="number" step="0.1" min="0"
              placeholder="% Grasa"
              :class="inputClass(errors.porcentajegrasa)"
            />
            <p v-if="errors.porcentajegrasa" class="mt-1 text-sm text-red-500">{{ errors.porcentajegrasa }}</p>
          </div>
          <div>
            <label for="porcentajemusculo" class="block text-sm font-medium text-gray-700 mb-1">% Músculo</label>
            <input
              id="porcentajemusculo"
              v-model="form.porcentajemusculo"
              type="number" step="0.1" min="0"
              placeholder="% Músculo"
              :class="inputClass(errors.porcentajemusculo)"
            />
            <p v-if="errors.porcentajemusculo" class="mt-1 text-sm text-red-500">{{ errors.porcentajemusculo }}</p>
          </div>
        </div>

        <div>
          <label for="preexistencias" class="block text-sm font-medium text-gray-700 mb-1">Preexistencias Médicas</label>
          <input
            id="preexistencias"
            v-model="form.preexistencias"
            type="text"
            placeholder="Preexistencias Médicas"
            :class="inputClass(errors.preexistencias)"
          />
          <p v-if="errors.preexistencias" class="mt-1 text-sm text-red-500">{{ errors.preexistencias }}</p>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-between items-center pt-6">
        <button @click="goBack" class="px-4 py-2 border rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button
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
        :class="signupMessage.includes('exitoso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
      >
        {{ signupMessage }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudents } from '@/composables/useStudents'

const router = useRouter()
const route = useRoute()
const { updateStudent } = useStudents()

const groupId = Number(route.query.groupId)
if (!groupId) router.replace({ name: 'Grupos' })

const isEditMode = Boolean(route.query.studentId)
const studentIdParam = route.query.studentId

const form = reactive({
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

const errors = reactive({})
const isLoading = ref(false)
const signupMessage = ref('')

// Carga datos para edición
onMounted(async () => {
  if (isEditMode) {
    const { success, students } = await window.electronAPI.student.getAll({ groupId })
    if (success) {
      const rec = students.find(s => s.id.toString() === studentIdParam)
      if (rec) {
        form.id               = String(rec.id)
        form.firstnames       = rec.firstnames
        form.lastnames        = rec.lastnames
        form.birthdate        = rec.birthdate
        form.gender           = rec.gender
        form.peso             = rec.weight
        form.altura           = rec.height
        form.porcentajegrasa  = rec.bodyFatPercentage
        form.porcentajemusculo= rec.muscleMassPercentage
        form.preexistencias   = rec.medicalConditions
      }
    }
  }
})

function inputClass(err) {
  return [
    'w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400 transition-shadow',
    err ? 'border-red-500' : 'border-slate-200 hover:border-slate-300'
  ].join(' ')
}

function validateForm() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.id)              errors.id               = 'La identificación es obligatoria.'
  if (!form.firstnames)      errors.firstnames       = 'El nombre es obligatorio.'
  if (!form.lastnames)       errors.lastnames        = 'El apellido es obligatorio.'
  if (!form.birthdate)       errors.birthdate        = 'La fecha de nacimiento es obligatoria.'
  if (!form.gender)          errors.gender           = 'El género es obligatorio.'

  ;['peso','altura','porcentajegrasa','porcentajemusculo'].forEach(f => {
    const v = form[f]
    if (v !== '' && v != null && isNaN(Number(v))) {
      errors[f] = 'Debe ser un número válido.'
    }
  })

  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validateForm()) {
    signupMessage.value = 'Corrige los errores en el formulario.'
    return
  }

  isLoading.value = true
  signupMessage.value = ''

  const payload = {
    id: Number(form.id),
    groupId,
    firstnames: form.firstnames,
    lastnames: form.lastnames,
    birthdate: form.birthdate,
    gender: form.gender,
    peso: form.peso !== '' ? Number(form.peso) : null,
    altura: form.altura !== '' ? Number(form.altura) : null,
    porcentajegrasa: form.porcentajegrasa !== '' ? Number(form.porcentajegrasa) : null,
    porcentajemusculo: form.porcentajemusculo !== '' ? Number(form.porcentajemusculo) : null,
    preexistencias: form.preexistencias || null
  }

  try {
    const resp = isEditMode
      ? await updateStudent(payload)
      : await window.electronAPI.student.create(payload)

    if (!resp.success) {
      if (typeof resp.error === 'object') {
        Object.assign(errors, resp.error)
        signupMessage.value = 'Corrige los errores en el formulario.'
      } else {
        signupMessage.value = resp.error
      }
      return
    }

    signupMessage.value = isEditMode
      ? '¡Actualizado exitosamente!'
      : '¡Registro exitoso!'
    setTimeout(() => router.push({ name: 'GrupoDashboard', params: { id: groupId } }), 800)

  } catch (e) {
    console.error(e)
    signupMessage.value = 'Error interno del sistema.'
  } finally {
    isLoading.value = false
  }
}

function goBack() {
  router.push({ name: 'GrupoDashboard', params: { id: groupId } })
}
</script>

<style scoped>
/* Si necesitas ajustes adicionales sólo al formulario */
</style>
