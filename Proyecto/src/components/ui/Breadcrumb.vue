<script setup>
import { useRouter } from 'vue-router'
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const router = useRouter()

const goTo = (to) => {
  if (to) router.push(to)
}
</script>

<template>
  <nav class="text-sm text-white mb-4">
    <template v-for="(item, index) in items" :key="index">
      <span
        v-if="item.to"
        class="cursor-pointer hover:underline"
        @click="goTo(item.to)"
      >
        {{ item.label }}
      </span>
      <span v-else>{{ item.label }}</span>
      <span v-if="index < items.length - 1"> &gt; </span>
    </template>
  </nav>
</template>