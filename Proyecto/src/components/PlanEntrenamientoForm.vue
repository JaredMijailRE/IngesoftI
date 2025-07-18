<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
    <div>
      <label class="block font-medium mb-1">Nombre</label>
      <input v-model="form.name" type="text" class="input" required maxlength="150" />
    </div>
    <div>
      <label class="block font-medium mb-1">Tipo</label>
      <select v-model="form.type" class="input" required>
        <option value="">Selecciona</option>
        <option value="Técnica">Técnica</option>
        <option value="Velocidad">Velocidad</option>
        <option value="Resistencia">Resistencia</option>
        <option value="Fuerza">Fuerza</option>
      </select>
    </div>
    <div>
      <label class="block font-medium mb-1">Descripción</label>
      <textarea v-model="form.description" class="input" rows="2" maxlength="500"></textarea>
    </div>
    <div>
      <label class="block font-medium mb-1">Ejercicios</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="ej in ejercicios" :key="ej.id" class="flex items-center gap-1">
          <input type="checkbox" :value="ej.id" v-model="form.ejercicios" />
          <span>{{ ej.name }}</span>
        </label>
      </div>
    </div>
    <div class="flex justify-end">
      <button 
        type="submit" 
        :disabled="loading"
        class="bg-sportu-600 text-white px-4 py-2 rounded hover:bg-sportu-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Creando...' : 'Crear Plan' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  ejercicios: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['created'])
const { createPlan, loading, error } = useApi()

const form = ref({
  name: '',
  type: '',
  description: '',
  ejercicios: []
})

const resetForm = () => {
  form.value = { name: '', type: '', description: '', ejercicios: [] }
}

const handleSubmit = async () => {
  // Validar campos requeridos
  if (!form.value.name.trim()) {
    error.value = 'El nombre es requerido'
    return
  }
  if (!form.value.type) {
    error.value = 'El tipo es requerido'
    return
  }

  try {
    error.value = null
    
    // Limpiar y preparar datos para enviar
    const cleanData = {
      name: form.value.name.trim(),
      type: form.value.type,
      description: form.value.description?.trim() || null,
      ejercicios: Array.isArray(form.value.ejercicios) 
        ? form.value.ejercicios.filter(id => typeof id === 'number' || typeof id === 'string')
        : []
    }
    
    console.log('Enviando datos del plan:', cleanData)
    const result = await createPlan(cleanData)
    console.log('Plan creado:', result)
    emit('created')
    resetForm()
  } catch (e) {
    console.error('Error al crear plan:', e)
    error.value = e.message || 'Error al crear el plan'
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sportu-400;
}
</style> 