<script setup>
// App principal - solo muestra el login
import NotificationToast from '@/components/NotificationToast.vue'
</script>

<template>
  <div id="app">
    <!-- Solo el contenido principal sin navegación -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

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
