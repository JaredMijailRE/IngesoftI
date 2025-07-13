<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <!-- Logo y título -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">USport</h2>
        <p class="text-gray-600">Iniciar Sesión</p>
      </div>

      <!-- Formulario -->
      <form v-if="!user" @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <!-- Campo Usuario/Email -->
          <div>
            <label for="login" class="block text-sm font-medium text-gray-700 mb-1">
              Usuario o Email
            </label>
            <input
              id="login"
              v-model="form.login"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa tu usuario o email"
              :disabled="isLoading"
            />
          </div>

          <!-- Campo Contraseña -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Ingresa tu contraseña"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                :disabled="isLoading"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L15 15M3 3l18 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
          {{ error }}
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="user" class="text-green-600 text-sm text-center bg-green-50 p-4 rounded-lg">
          <p class="font-semibold">¡Bienvenido, {{ user.first_name }}!</p>
          <p class="text-xs mt-1">Has iniciado sesión exitosamente en USport</p>
          <div class="mt-3 text-left">
            <p class="text-xs"><strong>Usuario:</strong> {{ user.username }}</p>
            <p class="text-xs"><strong>Email:</strong> {{ user.email }}</p>
          </div>
          <button
            @click="handleLogout"
            class="mt-3 w-full px-3 py-2 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        <!-- Botones -->
        <div class="space-y-4">
          <!-- Botón Iniciar Sesión -->
          <button
            type="submit"
            :disabled="isLoading || !form.login || !form.password"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>

          <!-- Botón Crear Cuenta -->
          <button
            type="button"
            @click="goToRegister"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Crear Nueva Cuenta
          </button>

          <router-link to="/Grupos">Grupos</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const router = useRouter()
const { login, logout, isLoading, error: authError, user } = useAuth()

// Estado reactivo
const form = reactive({
  login: '',
  password: ''
})

const showPassword = ref(false)
const error = ref('')

// Función para manejar el login
async function handleLogin() {
  if (!form.login || !form.password) {
    error.value = 'Todos los campos son obligatorios'
    return
  }

  const result = await login({
    login: form.login,
    password: form.password
  })

  if (result.success) {
    console.log('Login exitoso')
    // Limpiar errores y mantener los datos del usuario visibles
    error.value = ''
  } else {
    error.value = result.error || authError.value
  }
}

// Función para ir a crear cuenta
function goToRegister() {
  alert('Funcionalidad de registro no disponible. Contacta al administrador para crear una cuenta.')
}

// Función para cerrar sesión
function handleLogout() {
  logout()
  // Limpiar formulario
  form.login = ''
  form.password = ''
  error.value = ''
}
</script>
