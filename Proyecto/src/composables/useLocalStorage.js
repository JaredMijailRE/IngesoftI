import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

  // Watch for changes and save to localStorage
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })

  return value
} 