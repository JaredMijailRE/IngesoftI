<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-2xl font-bold text-primary-600">
            USport
          </router-link>
          
          <div class="flex space-x-6">
            <router-link
              to="/main"> 
              TESTIN
            </router-link>
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-primary-600 transition-colors"
              active-class="text-primary-600 font-medium"
            >
              Home
            </router-link>
            <router-link 
              to="/about" 
              class="text-gray-600 hover:text-primary-600 transition-colors"
              active-class="text-primary-600 font-medium"
            >
              About
            </router-link>
            <router-link 
              to="/logIn" 
            > <button>
              Log in
            </button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
