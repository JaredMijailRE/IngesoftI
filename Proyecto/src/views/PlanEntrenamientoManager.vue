<template>
  <div
    class="min-h-screen bg-gradient-to-tr from-sportu-100 via-sportu-400 to-sportu-700 p-4"
  >
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Gestión de Planes de Entrenamiento y Ejercicios
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaseCard>
          <template #header>
            <h2 class="text-xl font-semibold text-sportu-700">
              Añadir Ejercicio
            </h2>
          </template>
          <ExerciseForm @created="fetchEjercicios" />
        </BaseCard>
        <BaseCard>
          <template #header>
            <h2 class="text-xl font-semibold text-sportu-700">
              Crear Plan de Entrenamiento
            </h2>
          </template>
          <PlanEntrenamientoForm
            :ejercicios="ejercicios"
            @created="fetchPlanes"
          />
        </BaseCard>
      </div>
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-sportu-700">
              Ejercicios Existentes
            </h2>
          </template>
          <ul>
            <li
              v-for="ej in ejercicios"
              :key="ej.id"
              class="py-3 border-b last:border-b-0 flex justify-between items-center"
            >
              <div>
                <span class="font-medium">{{ ej.name }}</span>
                <span class="text-xs text-gray-500">({{ ej.unit }})</span>
              </div>
              <button
                @click="handleDeleteEjercicio(ej.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                title="Eliminar ejercicio"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </BaseCard>
        <BaseCard>
          <template #header>
            <h2 class="text-lg font-semibold text-sportu-700">
              Planes de Entrenamiento
            </h2>
          </template>
          <ul>
            <li
              v-for="plan in planes"
              :key="plan.id"
              class="py-3 border-b last:border-b-0"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <span class="font-medium">{{ plan.name }}</span>
                  <span class="text-xs text-gray-500">({{ plan.type }})</span>
                  <div class="text-xs text-gray-400">
                    {{ plan.description }}
                  </div>
                  <div class="text-xs mt-1">
                    Ejercicios:
                    <span v-if="plan.ejercicios && plan.ejercicios.length">{{
                      plan.ejercicios.map(e => e.name).join(', ')
                    }}</span
                    ><span v-else>Ninguno</span>
                  </div>
                </div>
                <button
                  @click="handleDeletePlan(plan.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm ml-3"
                  title="Eliminar plan"
                >
                  Eliminar
                </button>
              </div>
            </li>
          </ul>
        </BaseCard>
      </div>
    </div>
    <ConfirmModal
      :is-open="showConfirmModal"
      :title="getConfirmTitle()"
      :message="getConfirmMessage()"
      @confirm="handleConfirmAction"
      @cancel="handleCancelAction"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import ExerciseForm from '@/components/ExerciseForm.vue'
import PlanEntrenamientoForm from '@/components/PlanEntrenamientoForm.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useApi } from '@/composables/useApi'
import { useAppStore } from '@/stores/app'

const ejercicios = ref([])
const planes = ref([])
const { getEjercicios, getPlanes, deleteEjercicio, deletePlan } = useApi()
const appStore = useAppStore()

// Estado del modal de confirmación
const showConfirmModal = ref(false)
const confirmAction = ref(null)
const confirmData = ref(null)

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
      description: ej.description,
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

const handleDeleteEjercicio = async id => {
  confirmAction.value = 'deleteEjercicio'
  confirmData.value = id
  showConfirmModal.value = true
}

const handleDeletePlan = async id => {
  confirmAction.value = 'deletePlan'
  confirmData.value = id
  showConfirmModal.value = true
}

const handleConfirmAction = async () => {
  try {
    if (confirmAction.value === 'deleteEjercicio') {
      await deleteEjercicio(confirmData.value)
      console.log('Ejercicio eliminado:', confirmData.value)
      appStore.addNotification({
        type: 'success',
        title: 'Ejercicio eliminado',
        message: 'El ejercicio se ha eliminado correctamente',
      })
      await fetchEjercicios() // Recargar la lista
    } else if (confirmAction.value === 'deletePlan') {
      await deletePlan(confirmData.value)
      console.log('Plan eliminado:', confirmData.value)
      appStore.addNotification({
        type: 'success',
        title: 'Plan eliminado',
        message: 'El plan de entrenamiento se ha eliminado correctamente',
      })
      await fetchPlanes() // Recargar la lista
    }
  } catch (e) {
    console.error('Error al eliminar:', e)
    appStore.addNotification({
      type: 'error',
      title: 'Error',
      message: 'Error al eliminar: ' + e.message,
    })
  } finally {
    showConfirmModal.value = false
    confirmAction.value = null
    confirmData.value = null
  }
}

const handleCancelAction = () => {
  showConfirmModal.value = false
  confirmAction.value = null
  confirmData.value = null
}

const getConfirmMessage = () => {
  if (confirmAction.value === 'deleteEjercicio') {
    return '¿Estás seguro de que quieres eliminar este ejercicio? Esta acción no se puede deshacer.'
  } else if (confirmAction.value === 'deletePlan') {
    return '¿Estás seguro de que quieres eliminar este plan de entrenamiento? Esta acción no se puede deshacer.'
  }
  return '¿Estás seguro de que quieres realizar esta acción?'
}

const getConfirmTitle = () => {
  if (confirmAction.value === 'deleteEjercicio') {
    return 'Eliminar Ejercicio'
  } else if (confirmAction.value === 'deletePlan') {
    return 'Eliminar Plan de Entrenamiento'
  }
  return 'Confirmar Acción'
}
</script>
