<script setup>
import NotificationToast from '@/components/NotificationToast.vue'
import Sidebar from '@/components/SideBar.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '../src/composables/useAuth.js'

const { user, isAuthenticated, checkAuth } = useAuth()
const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isLoggedIn = computed(() => isAuthenticated.value && !!user.value)

onMounted(async () => {
  // Verificar autenticación al cargar la aplicación
  await checkAuth()
  isLoading.value = false

  // Si no está autenticado y no está en login/signup, redirigir a login
  if (!isLoggedIn.value && route.path !== '/' && route.path !== '/signup') {
    router.push('/')
  }
})

// Observar cambios en la autenticación
watch(isLoggedIn, (newValue) => {
  if (!newValue && route.path !== '/' && route.path !== '/signup') {
    // Si pierde la autenticación, redirigir al login
    router.push('/')
  }
})

// Observar cambios en la ruta
watch(
  () => route.path,
  (newPath) => {
    // Si intenta acceder a una ruta protegida sin estar logueado
    if (!isLoggedIn.value && newPath !== '/' && newPath !== '/signup') {
      router.push('/')
    }
  }
)
</script>

<template>
  <div id="app">
    <NotificationToast />

    <!-- Estado de carga inicial -->
    <div
      v-if="isLoading"
      class="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <span class="text-gray-500 text-lg">Cargando...</span>
      </div>
    </div>

    <!-- Usuario no autenticado - Mostrar solo login/signup -->
    <div
      v-else-if="!isLoggedIn"
      class="min-h-screen bg-gray-100"
    >
      <main class="flex-1 min-h-screen">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Usuario autenticado - Mostrar sidebar y contenido principal -->
    <div v-else class="flex min-h-screen">
      <Sidebar />
      <main class="ml-[200px] flex-1 min-h-screen bg-gray-50">
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
