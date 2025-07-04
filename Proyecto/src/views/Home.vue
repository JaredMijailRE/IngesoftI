<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span class="text-primary-600">USport</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Your ultimate sports management platform built with Vue 3, Electron, and Tailwind CSS
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Icon icon="mdi:vuejs" class="w-6 h-6 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Vue 3</h3>
          <p class="text-gray-600">Modern reactive framework with Composition API</p>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Icon icon="mdi:electron-framework" class="w-6 h-6 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Electron</h3>
          <p class="text-gray-600">Cross-platform desktop application</p>
        </div>

        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Icon icon="mdi:tailwind" class="w-6 h-6 text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
          <p class="text-gray-600">Utility-first CSS framework</p>
        </div>
      </div>

      <div class="text-center">
        <button class="btn-primary px-8 py-3 text-lg" @click="getStarted">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const getStarted = () => {
  // Add your logic here
  console.log('Get started clicked!')
}
</script> 