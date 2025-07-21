<template>
  <div class="min-h-screen bg-gradient-to-t from-sportu-200 via-sportu-300 to-sportu-600 flex items-center justify-center p-6">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Crear Nuevo Grupo</h1>

      <!-- Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          maxlength="100"
          class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
          :class="{ 'border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
      </div>

      <!-- Objectives -->
      <div>
        <label for="objectives" class="block text-sm font-medium text-gray-700 mb-1">Objectives</label>
        <textarea
          id="objectives"
          v-model="form.objectives"
          rows="3"
          class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
        ></textarea>
      </div>

      <!-- Specific Objectives -->
      <div>
        <label for="specific" class="block text-sm font-medium text-gray-700 mb-1">Specific Objectives</label>
        <textarea
          id="specific"
          v-model="form.specific_objectives"
          rows="3"
          class="w-full border px-3 py-2 rounded focus:outline-none focus:border-sportu-400"
        ></textarea>
      </div>

      <!-- Botones -->
      <div class="flex justify-between items-center">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="isLoading"
          class="px-6 py-2 bg-sportu-600 text-white rounded disabled:opacity-50"
        >
          <span v-if="isLoading">Creando…</span>
          <span v-else>Crear Grupo</span>
        </button>
      </div>

      <!-- Mensaje de error genérico -->
      <p v-if="submitError" class="mt-4 text-sm text-red-500 text-center">{{ submitError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  objectives: '',
  specific_objectives: ''
})

const errors      = ref({})
const isLoading   = ref(false)
const submitError = ref(null)

function goBack() {
  router.back()
}

function validate() {
  errors.value = {}
  if (!form.value.name.trim()) {
    errors.value.name = 'El nombre es obligatorio.'
  }
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  isLoading.value   = true
  submitError.value = null

  try {
    const { success, group, error } = await window.electronAPI.group.create({
      name: form.value.name.trim(),
      objectives: form.value.objectives.trim() || null,
      specific_objectives: form.value.specific_objectives.trim() || null
    })

    if (!success) {
      submitError.value = error || 'Error creando grupo'
      return
    }

    // Redirigir automáticamente al dashboard del nuevo grupo
    router.replace({ name: 'GrupoDashboard', params: { id: group.id } })
  } catch (err) {
    submitError.value = err.message || 'Error del sistema'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Si necesitas ajustes extra */
</style>
