<script setup>
import NotificationToast from '@/components/NotificationToast.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '../src/composables/useAuth.js'
import { useApi } from '../src/composables/useApi.js'

const { user } = useAuth()
const { getCurrentUser } = useApi()
const route = useRoute()

const isLoading = ref(true)
const isLoggedIn = computed(() => !!user.value)

onMounted(async () => {
  user.value = null
  try {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      user.value = currentUser
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error)
  } finally {
    isLoading.value = false
  }
})

watch(
  () => route.path,
  async newPath => {
    if (newPath === '/') {
      user.value = null
    } else {
      try {
        const currentUser = await getCurrentUser()
        user.value = currentUser
      } catch (e) {
        user.value = null
      }
    }
  }
)
</script>

<template>
  <div id="app">
    <NotificationToast />

    <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <span class="text-gray-500 text-lg">Cargando...</span>
    </div>

    <div
      v-else-if="!isLoggedIn"
      class="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <main class="flex-1 min-h-screen">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <div v-else class="flex">
      <Sidebar />
      <main class="ml-[200px] flex-1 min-h-screen">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
