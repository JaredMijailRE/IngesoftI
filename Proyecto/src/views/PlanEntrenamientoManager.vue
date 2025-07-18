<template>
  <div class="min-h-screen bg-gradient-to-tr from-sportu-100 via-sportu-400 to-sportu-700 p-4">
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Gestión de Planes de Entrenamiento y Ejercicios
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaseCard>
          <template #header>
            <h2 class="text-xl font-semibold text-sportu-700">Añadir Ejercicio</h2>
          </template>
          <ExerciseForm @created="fetchEjercicios" />
        </BaseCard>
        <BaseCard>
          <template #header>
            <h2 class="text-xl font-semibold text-sportu-700">Crear Plan de Entrenamiento</h2>
          </template>
          <PlanEntrenamientoForm :ejercicios="ejercicios" @created="fetchPlanes" />
        </BaseCard>
      </div>
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-sportu-700">Ejercicios Existentes</h2>
          </template>
          <ul>
            <li v-for="ej in ejercicios" :key="ej.id" class="py-2 border-b last:border-b-0">
              <span class="font-medium">{{ ej.name }}</span> <span class="text-xs text-gray-500">({{ ej.unit }})</span>
            </li>
          </ul>
        </BaseCard>
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-sportu-700">Planes de Entrenamiento</h2>
          </template>
          <ul>
            <li v-for="plan in planes" :key="plan.id" class="py-2 border-b last:border-b-0">
              <span class="font-medium">{{ plan.name }}</span> <span class="text-xs text-gray-500">({{ plan.type }})</span>
              <div class="text-xs text-gray-400">{{ plan.description }}</div>
              <div class="text-xs mt-1">Ejercicios: <span v-if="plan.ejercicios && plan.ejercicios.length">{{ plan.ejercicios.map(e => e.name).join(', ') }}</span><span v-else>Ninguno</span></div>
            </li>
          </ul>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import ExerciseForm from '@/components/ExerciseForm.vue'
import PlanEntrenamientoForm from '@/components/PlanEntrenamientoForm.vue'
import { useApi } from '@/composables/useApi'

const ejercicios = ref([])
const planes = ref([])
const { getEjercicios, getPlanes } = useApi()

const fetchEjercicios = async () => {
  try {
    const res = await getEjercicios()
    console.log('Ejercicios recibidos:', res)
    // Limpiar ejercicios antes de asignarlos
    ejercicios.value = res.map(ej => ({
      id: ej.id,
      name: ej.name,
      unit: ej.unit,
      impact_area: ej.impact_area,
      type: ej.type,
      exigency: ej.exigency,
      description: ej.description
    }))
  } catch (e) {
    console.error('Error al obtener ejercicios:', e)
    ejercicios.value = []
  }
}

const fetchPlanes = async () => {
  try {
    const res = await getPlanes()
    console.log('Planes recibidos:', res)
    planes.value = res
  } catch (e) {
    console.error('Error al obtener planes:', e)
    planes.value = []
  }
}

onMounted(() => {
  fetchEjercicios()
  fetchPlanes()
})
</script> 