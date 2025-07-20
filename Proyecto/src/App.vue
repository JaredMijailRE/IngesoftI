<script setup>
// App principal - solo muestra el login
import NotificationToast from '@/components/NotificationToast.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuth } from '../src/composables/useAuth.js'

const { user } = useAuth()
const route = useRoute()
const isLoggedIn = computed(() => user.value)

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      user.value = null
    }
  }
)

</script>

<template>
  <div id="app">
    
    <div v-if="!isLoggedIn" class="flex items-center justify-center min-h-screen bg-gray-100">
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

    <!-- Componente de notificaciones global -->
    <NotificationToast />
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
