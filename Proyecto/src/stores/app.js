import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const theme = ref('light')
  const sidebarOpen = ref(false)
  const notifications = ref([])

  // Getters
  const isDark = computed(() => theme.value === 'dark')
  const hasNotifications = computed(() => notifications.value.length > 0)

  // Actions
  const setLoading = loading => {
    isLoading.value = loading
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const addNotification = notification => {
    const id = Date.now()
    notifications.value.push({
      id,
      ...notification,
      timestamp: new Date(),
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = id => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    // State
    isLoading,
    theme,
    sidebarOpen,
    notifications,

    // Getters
    isDark,
    hasNotifications,

    // Actions
    setLoading,
    toggleTheme,
    toggleSidebar,
    addNotification,
    removeNotification,
    clearNotifications,
  }
})
