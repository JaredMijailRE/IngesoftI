<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          notification.type === 'error' ? 'ring-red-500' : 'ring-green-500',
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center',
                  notification.type === 'error'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600',
                ]"
              >
                <span v-if="notification.type === 'error'" class="text-sm"
                  >✕</span
                >
                <span v-else class="text-sm">✓</span>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.title }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                @click="removeNotification(notification.id)"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Cerrar</span>
                <span class="h-5 w-5">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const notifications = computed(() => appStore.notifications)

const removeNotification = id => {
  appStore.removeNotification(id)
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
