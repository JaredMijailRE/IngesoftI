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
      <label class="block font-medium mb-1">Unidad</label>
      <select v-model="form.unit" class="input" required>
        <option value="">Selecciona</option>
        <option value="repeticiones">Repeticiones</option>
        <option value="distancia">Distancia</option>
        <option value="tiempo">Tiempo</option>
        <option value="peso">Peso</option>
      </select>
    </div>
    <div>
      <label class="block font-medium mb-1">Área de impacto</label>
      <select v-model="form.impact_area" class="input">
        <option value="">Ninguna</option>
        <option value="Tronco Inferior">Tronco Inferior</option>
        <option value="Tronco Superior">Tronco Superior</option>
        <option value="Tronco Medio">Tronco Medio</option>
        <option value="Cuerpo Completo">Cuerpo Completo</option>
      </select>
    </div>
    <div>
      <label class="block font-medium mb-1">Tipo</label>
      <select v-model="form.type" class="input">
        <option value="">Ninguno</option>
        <option value="Fuerza">Fuerza</option>
        <option value="Resistencia">Resistencia</option>
        <option value="Elasticidad">Elasticidad</option>
        <option value="Tonificación">Tonificación</option>
      </select>
    </div>
    <div>
      <label class="block font-medium mb-1">Exigencia</label>
      <select v-model="form.exigency" class="input">
        <option value="">Ninguna</option>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
    </div>
    <div>
      <label class="block font-medium mb-1">Descripción</label>
      <textarea v-model="form.description" class="input" rows="2" maxlength="500"></textarea>
    </div>
    <div class="flex justify-end">
      <button 
        type="submit" 
        :disabled="loading"
        class="bg-sportu-600 text-white px-4 py-2 rounded hover:bg-sportu-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Creando...' : 'Añadir Ejercicio' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

const emit = defineEmits(['created'])
const { createEjercicio, loading, error } = useApi()

const form = ref({
  name: '',
  unit: '',
  impact_area: '',
  type: '',
  exigency: '',
  description: ''
})

const resetForm = () => {
  form.value = { name: '', unit: '', impact_area: '', type: '', exigency: '', description: '' }
}

const handleSubmit = async () => {
  // Validar campos requeridos
  if (!form.value.name.trim()) {
    error.value = 'El nombre es requerido'
    return
  }
  if (!form.value.unit) {
    error.value = 'La unidad es requerida'
    return
  }

  try {
    error.value = null
    
    // Limpiar y preparar datos para enviar
    const cleanData = {
      name: form.value.name.trim(),
      unit: form.value.unit,
      impact_area: form.value.impact_area || null,
      type: form.value.type || null,
      exigency: form.value.exigency || null,
      description: form.value.description?.trim() || null
    }
    
    console.log('Enviando datos:', cleanData)
    const result = await createEjercicio(cleanData)
    console.log('Ejercicio creado:', result)
    emit('created')
    resetForm()
  } catch (e) {
    console.error('Error al crear ejercicio:', e)
    error.value = e.message || 'Error al crear el ejercicio'
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sportu-400;
}
</style> 