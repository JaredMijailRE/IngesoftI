<template>
  <div class="min-h-screen bg-sportu-400 py-10 px-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="[{ label: 'Inicio', to: '/' }, { label: 'Grupos' }]" />


    <!-- Botón Nuevo Grupo -->
    <div class="flex justify-end mb-4">
      <button
        @click="goToNewGroup"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        <Icon icon="mdi:plus-circle-outline" class="mr-2" />
        Nuevo Grupo
      </button>
    </div>


    <!-- Cargando / Error -->
    <div v-if="isLoading" class="text-white">Cargando grupos…</div>
    <div v-else-if="loadError" class="text-red-200">{{ loadError }}</div>


    <!-- Lista de Grupos -->
    <div v-else class="space-y-4 mt-6">
      <BaseCard
        v-for="group in groups"
        :key="group.id"
        class="transition-shadow"
      >
        <!-- Header clickeable + botón Ir a Grupo -->
        <template #header>
          <div class="w-full flex justify-between items-center px-4 py-3">
            <button
              @click="toggle(group.id)"
              class="flex-1 text-left"
            >
              <span class="text-lg font-semibold text-gray-800">
                {{ group.name }}
              </span>
            </button>
            <div class="flex items-center space-x-2">
              <button
                @click.stop="goToDashboard(group.id)"
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1 rounded"
              >
                Ir a Grupo
              </button>
              <Icon
                @click="toggle(group.id)"
                :icon="expandedId === group.id ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="text-2xl text-gray-600 cursor-pointer"
              />
            </div>
          </div>
        </template>


        <!-- Body con preview de estudiantes -->
        <template #body v-if="expandedId === group.id">
          <div class="p-4 bg-white rounded-b-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-3">
              {{ group.objectives || 'Sin objetivos definidos' }}
            </h2>


            <ul class="space-y-2 mb-4">
              <li
                v-for="stu in group.students"
                :key="stu.id"
                class="border p-2 rounded"
              >
                {{ stu.firstName }} {{ stu.lastName }}
              </li>
              <li v-if="!group.students.length" class="text-gray-500">
                No hay estudiantes en este grupo.
              </li>
            </ul>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>


<script setup>
import { ref }               from 'vue'
import { useRouter }         from 'vue-router'
import { Icon }              from '@iconify/vue'
import Breadcrumb            from '@/components/ui/Breadcrumb.vue'
import BaseCard              from '@/components/BaseCard.vue'
import { useGroups }         from '@/composables/useGroups'


const router = useRouter()
const { groups, isLoading, loadError } = useGroups()
const expandedId = ref(null)


function toggle(id) {
  expandedId.value = expandedId.value === id ? null : id
}


function goToNewGroup() {
  router.push({ name: 'FormGroup' })
}


function goToDashboard(id) {
  router.push({ name: 'GrupoDashboard', params: { id } })
}
</script>


<style scoped>
/* Ajustes de estilo si los necesitas */
</style>



