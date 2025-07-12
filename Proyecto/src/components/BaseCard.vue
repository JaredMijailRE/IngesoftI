<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>

    <div :class="contentClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 bg-gray-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'p-6',
    validator: value => ['p-4', 'p-6', 'p-8'].includes(value),
  },
  shadow: {
    type: String,
    default: 'shadow-sm',
    validator: value =>
      ['shadow-none', 'shadow-sm', 'shadow', 'shadow-lg'].includes(value),
  },
  hover: {
    type: Boolean,
    default: false,
  },
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200'
  const shadowClass = props.shadow
  const hoverClass = props.hover
    ? 'hover:shadow-lg transition-shadow duration-200'
    : ''

  return `${baseClasses} ${shadowClass} ${hoverClass}`
})

const contentClasses = computed(() => {
  return props.padding
})
</script>
