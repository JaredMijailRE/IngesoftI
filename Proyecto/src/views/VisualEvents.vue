<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const eventId = route.params.id

const title = ref('')
const description = ref('')
const localization = ref('')
const price = ref('')
const date = ref('')
const link = ref('')

const isLoading = ref(true)
const loadError = ref('')

onMounted(async () => {
  isLoading.value = true
  loadError.value = ''
  try {
    // Llamada a la API de Electron para obtener el evento por ID
    const response = await window.electronAPI.sportEvent.getById(eventId)
    if (!response || !response.success || !response.event) {
      // No asignar error, solo dejar los campos vacíos
      return
    }
    const event = response.event
    title.value = event.title || ''
    description.value = event.description || ''
    localization.value = event.location || ''
    price.value = event.price || ''
    date.value = event.event_date || ''
    link.value = event.link || ''
  } catch (e) {
    loadError.value = 'Error cargando el evento.'
  } finally {
    isLoading.value = false
  }
})

function goBack() {
  router.push('/main')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-t from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9"
  >
    <div class="flex justify-center">
      <div
        class="card hover:shadow-lg bg-blue-50 transition-shadow w flex-col mx-8 px-8 py-8"
      >
        <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">
          Detalles del Evento Deportivo
        </h1>
        <div v-if="isLoading" class="text-center py-8">Cargando evento...</div>
        <template v-else>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Titulo del evento</label
              >
              <input
                v-model="title"
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Descripción</label
              >
              <input
                v-model="description"
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Ubicación</label
              >
              <input
                v-model="localization"
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Precio</label
              >
              <input
                v-model="price"
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
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
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Link</label
              >
              <input
                v-model="link"
                disabled
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 mb-2 opacity-70"
              />
            </div>
          </div>
        </template>
        <h1 class="text-xs font-bold text-secondary-600 mb-2 mt-4">
          <button class="color-blue-600 hover:underline flex" @click="goBack">
            Regresar
          </button>
        </h1>
      </div>
    </div>
  </div>
</template>

<style>
/* css */
</style>
