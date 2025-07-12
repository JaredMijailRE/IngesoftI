<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary-600">404</h1>
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div class="space-x-4">
        <router-link to="/" class="btn-primary px-6 py-3">
          Go Home
        </router-link>
        <button @click="goBack" class="btn-secondary px-6 py-3">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
