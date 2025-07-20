<template>
  <div class="flex flex-col h-screen w-[200px] bg-white shadow-lg fixed">
    
    <div class="flex justify-center">
        <RouterLink
            to="/main"
            class="p-6 text-2xl font-bold text-sportu-600 border-b">
            SportU
        </RouterLink>
    </div>

    <!-- Menú -->
    <nav class="flex-1 p-4 space-y-4">
        <RouterLink
            to="/main"
            class="flex items-center px-4 py-2 rounded-md hover:bg-sportu-100 text-gray-700"
            active-class="bg-sportu-200 font-semibold"
        >
            <Icon icon="mdi:house-variant" class="w-5 h-5 mr-3" />
            Inicio
        </RouterLink>

        <RouterLink
            to="/grupos"
            class="flex items-center px-4 py-2 rounded-md hover:bg-sportu-100 text-gray-700"
            active-class="bg-sportu-200 font-semibold"
        >
            <Icon icon="mdi:account-group" class="w-5 h-5 mr-3" />
            Grupos
        </RouterLink>

        <RouterLink
            to="/dashboard"
            class="flex items-center px-4 py-2 rounded-md hover:bg-sportu-100 text-gray-700"
            active-class="bg-sportu-200 font-semibold"
        >
            <Icon icon="mdi:view-dashboard" class="w-5 h-5 mr-3" />
            Planes 
        </RouterLink>

        <RouterLink
            to="/eventos"
            class="flex items-center px-4 py-2 rounded-md hover:bg-sportu-100 text-gray-700"
            active-class="bg-sportu-200 font-semibold"
        >
            <Icon icon="mdi:calendar" class="w-5 h-5 mr-3" />
            Eventos
        </RouterLink>
    </nav>

    <div class="p-4 border-t">
        <button
                    @click="handleLogout"
                    class="flex items-center w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-md"
                >
                    <Icon icon="mdi:logout" class="w-5 h-5 mr-3" />
                    Cerrar sesión
        </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
const { logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/')
}
</script>
