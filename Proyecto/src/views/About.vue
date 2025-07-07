<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">About USport</h1>

        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-semibold mb-4">Project Overview</h2>
          <p class="text-gray-600 mb-4">
            USport is a modern sports management platform built with
            cutting-edge technologies to provide the best user experience and
            development practices.
          </p>

          <h3 class="text-xl font-semibold mb-3">Technologies Used</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Vue 3 with Composition API</li>
            <li>• Electron for desktop application</li>
            <li>• Tailwind CSS for styling</li>
            <li>• Pinia for state management</li>
            <li>• Vue Router for navigation</li>
            <li>• Bun for package management</li>
            <li>• Vite for build tooling</li>
          </ul>
        </div>

        <div class="card p-8">
          <h2 class="text-2xl font-semibold mb-4">Development Setup</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">Development Server</h3>
              <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                >bun run dev</code
              >
            </div>

            <div>
              <h3 class="font-semibold mb-2">Electron Development</h3>
              <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                >bun run electron:dev</code
              >
            </div>

            <div>
              <h3 class="font-semibold mb-2">Build for Production</h3>
              <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                >bun run build</code
              >
            </div>

            <div>
              <h3 class="font-semibold mb-2">Build Electron App</h3>
              <code class="bg-gray-100 px-2 py-1 rounded text-sm"
                >bun run electron:build</code
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>
